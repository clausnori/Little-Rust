#!/usr/bin/env python3
"""
WebSocket сервер для проксирования rust-analyzer в веб-клиент
Архитектура: rust-analyzer <=> WebSocket Server <=> JS Client
"""

import asyncio
import json
import logging
import subprocess
import websockets
from typing import Dict, Optional, Any
import threading
import queue
import os
import signal
from pathlib import Path

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RustAnalyzerBridge:
    def __init__(self):
        self.rust_analyzer_process: Optional[subprocess.Popen] = None
        self.loop: Optional[asyncio.AbstractEventLoop] = None
        self.websocket_clients = set()
        self.message_queue = queue.Queue()
        self.ra_to_client_queue = queue.Queue()
        self.client_to_ra_queue = queue.Queue()
        self.running = False
        
    async def start_server(self, host="localhost", port=8765):
        logger.info(f"Запуск WebSocket сервера на {host}:{port}")
        self.loop = asyncio.get_running_loop()
        self.start_rust_analyzer()
        threading.Thread(target=self.rust_analyzer_reader, daemon=True).start()
        threading.Thread(target=self.rust_analyzer_writer, daemon=True).start()

        async with websockets.serve(self.handle_websocket, host, port):
            logger.info("WebSocket сервер запущен")
            await asyncio.Future()
    
    
    def start_rust_analyzer(self):
        """Запускает процесс rust-analyzer"""
        try:
            self.rust_analyzer_process = subprocess.Popen(
                ['rust-analyzer'],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=False,  # Работаем с байтами
                bufsize=0
            )
            self.running = True
            logger.info("rust-analyzer запущен")
        except Exception as e:
            logger.error(f"Ошибка запуска rust-analyzer: {e}")
            raise
    
    def rust_analyzer_reader(self):
	    while self.running and self.rust_analyzer_process:
	        try:
	            message = self.read_lsp_message(self.rust_analyzer_process.stdout)
	            if message:
	                logger.debug(f"Получено от rust-analyzer: {message}")
	                if self.loop:
	                    asyncio.run_coroutine_threadsafe(
	                        self.broadcast_to_clients(message),
	                        self.loop
	                    )
	        except Exception as e:
	            logger.error(f"Ошибка чтения от rust-analyzer: {e}")
	            break
    def rust_analyzer_writer(self):
        """Отправляет сообщения от клиентов в rust-analyzer"""
        while self.running and self.rust_analyzer_process:
            try:
                message = self.client_to_ra_queue.get(timeout=1)
                self.send_lsp_message(self.rust_analyzer_process.stdin, message)
                logger.debug(f"Отправлено в rust-analyzer: {message}")
            except queue.Empty:
                continue
            except Exception as e:
                logger.error(f"Ошибка отправки в rust-analyzer: {e}")
                break
    
    def read_lsp_message(self, stream) -> Optional[Dict]:
        """Читает LSP сообщение из потока"""
        try:
            # Читаем заголовки
            headers = {}
            while True:
                line = stream.readline().decode('utf-8')
                if not line:
                    return None
                line = line.strip()
                if not line:
                    break
                if ':' in line:
                    key, value = line.split(':', 1)
                    headers[key.strip()] = value.strip()
            
            # Читаем содержимое
            content_length = int(headers.get('Content-Length', 0))
            if content_length > 0:
                content = stream.read(content_length).decode('utf-8')
                return json.loads(content)
        except Exception as e:
            logger.error(f"Ошибка парсинга LSP сообщения: {e}")
        return None
    
    def send_lsp_message(self, stream, message: Dict):
        """Отправляет LSP сообщение в поток"""
        try:
            content = json.dumps(message, ensure_ascii=False)
            content_bytes = content.encode('utf-8')
            content_length = len(content_bytes)
            
            header = f"Content-Length: {content_length}\r\n\r\n".encode('utf-8')
            stream.write(header + content_bytes)
            stream.flush()
        except Exception as e:
            logger.error(f"Ошибка отправки LSP сообщения: {e}")
    
    async def handle_websocket(self, websocket, path):
        """Обрабатывает WebSocket подключения"""
        self.websocket_clients.add(websocket)
        logger.info(f"Новый клиент подключен. Всего клиентов: {len(self.websocket_clients)}")
        
        try:
            async for message in websocket:
                try:
                    data = json.loads(message)
                    logger.debug(f"Получено от клиента: {data}")
                    
                    # Отправляем сообщение в rust-analyzer
                    self.client_to_ra_queue.put(data)
                    
                except json.JSONDecodeError as e:
                    logger.error(f"Ошибка парсинга JSON от клиента: {e}")
                    await websocket.send(json.dumps({
                        "error": "Invalid JSON",
                        "message": str(e)
                    }))
        except websockets.exceptions.ConnectionClosed:
            logger.info("Клиент отключился")
        finally:
            self.websocket_clients.discard(websocket)
            logger.info(f"Клиент удален. Осталось клиентов: {len(self.websocket_clients)}")
    
    async def broadcast_to_clients(self, message: Dict):
        """Отправляет сообщение всем подключенным клиентам"""
        if not self.websocket_clients:
            return
        
        message_json = json.dumps(message)
        disconnected_clients = set()
        
        for client in self.websocket_clients:
            try:
                await client.send(message_json)
            except websockets.exceptions.ConnectionClosed:
                disconnected_clients.add(client)
        
        # Удаляем отключенных клиентов
        self.websocket_clients -= disconnected_clients
    
    def stop(self):
        """Останавливает сервер и rust-analyzer"""
        self.running = False
        if self.rust_analyzer_process:
            self.rust_analyzer_process.terminate()
            self.rust_analyzer_process.wait()
        logger.info("Сервер остановлен")


# HTML клиент для тестирования
HTML_CLIENT = '''<!DOCTYPE html>
<html>
<head>
    <title>Rust Analyzer WebSocket Client</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section { margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
        textarea { width: 100%; height: 200px; font-family: monospace; }
        button { padding: 10px 20px; margin: 5px; }
        .log { background: #f5f5f5; padding: 10px; height: 300px; overflow-y: scroll; font-family: monospace; font-size: 12px; }
        .connected { color: green; }
        .disconnected { color: red; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Rust Analyzer WebSocket Client</h1>
        
        <div class="section">
            <h3>Соединение: <span id="status" class="disconnected">Отключено</span></h3>
            <button onclick="connect()">Подключиться</button>
            <button onclick="disconnect()">Отключиться</button>
        </div>
        
        <div class="section">
            <h3>Быстрые команды</h3>
            <button onclick="sendInitialize()">Initialize</button>
            <button onclick="sendDidOpen()">Did Open</button>
            <button onclick="sendCompletion()">Completion</button>
            <button onclick="sendHover()">Hover</button>
        </div>
        
        <div class="section">
            <h3>Отправить сообщение</h3>
            <textarea id="messageInput" placeholder='{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}}'></textarea>
            <br>
            <button onclick="sendMessage()">Отправить</button>
        </div>
        
        <div class="section">
            <h3>Лог сообщений</h3>
            <div id="log" class="log"></div>
            <button onclick="clearLog()">Очистить лог</button>
        </div>
    </div>

    <script>
        let ws = null;
        let messageId = 1;
        
        function connect() {
            ws = new WebSocket('ws://localhost:8765');
            
            ws.onopen = function() {
                document.getElementById('status').textContent = 'Подключено';
                document.getElementById('status').className = 'connected';
                log('WebSocket подключен');
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                log('Получено: ' + JSON.stringify(data, null, 2));
            };
            
            ws.onclose = function() {
                document.getElementById('status').textContent = 'Отключено';
                document.getElementById('status').className = 'disconnected';
                log('WebSocket отключен');
            };
            
            ws.onerror = function(error) {
                log('Ошибка: ' + error);
            };
        }
        
        function disconnect() {
            if (ws) {
                ws.close();
            }
        }
        
        function sendMessage() {
            if (!ws || ws.readyState !== WebSocket.OPEN) {
                alert('WebSocket не подключен');
                return;
            }
            
            const message = document.getElementById('messageInput').value;
            try {
                const parsed = JSON.parse(message);
                ws.send(message);
                log('Отправлено: ' + JSON.stringify(parsed, null, 2));
            } catch (e) {
                alert('Неверный JSON: ' + e.message);
            }
        }
        
        function sendInitialize() {
            const message = {
                "jsonrpc": "2.0",
                "id": messageId++,
                "method": "initialize",
                "params": {
                    "processId": null,
                    "clientInfo": {"name": "web-client", "version": "1.0.0"},
                    "rootUri": "file:///tmp/rust-project",
                    "capabilities": {
                        "textDocument": {
                            "completion": {"completionItem": {"snippetSupport": true}},
                            "hover": {"contentFormat": ["markdown", "plaintext"]}
                        }
                    }
                }
            };
            document.getElementById('messageInput').value = JSON.stringify(message, null, 2);
        }
        
        function sendDidOpen() {
            const message = {
                "jsonrpc": "2.0",
                "method": "textDocument/didOpen",
                "params": {
                    "textDocument": {
                        "uri": "file:///tmp/main.rs",
                        "languageId": "rust",
                        "version": 1,
                        "text": "fn main() {\\n    println!(\\\"Hello, world!\\\");\\n}"
                    }
                }
            };
            document.getElementById('messageInput').value = JSON.stringify(message, null, 2);
        }
        
        function sendCompletion() {
            const message = {
                "jsonrpc": "2.0",
                "id": messageId++,
                "method": "textDocument/completion",
                "params": {
                    "textDocument": {"uri": "file:///tmp/main.rs"},
                    "position": {"line": 1, "character": 12}
                }
            };
            document.getElementById('messageInput').value = JSON.stringify(message, null, 2);
        }
        
        function sendHover() {
            const message = {
                "jsonrpc": "2.0",
                "id": messageId++,
                "method": "textDocument/hover",
                "params": {
                    "textDocument": {"uri": "file:///tmp/main.rs"},
                    "position": {"line": 1, "character": 4}
                }
            };
            document.getElementById('messageInput').value = JSON.stringify(message, null, 2);
        }
        
        function log(message) {
            const logDiv = document.getElementById('log');
            const timestamp = new Date().toLocaleTimeString();
            logDiv.innerHTML += `[${timestamp}] ${message}\\n`;
            logDiv.scrollTop = logDiv.scrollHeight;
        }
        
        function clearLog() {
            document.getElementById('log').innerHTML = '';
        }
    </script>
</body>
</html>'''

async def main():
    # Создаем тестовый HTML файл
    with open('rust_analyzer_client.html', 'w', encoding='utf-8') as f:
        f.write(HTML_CLIENT)
    
    print("HTML клиент сохранен в rust_analyzer_client.html")
    print("Откройте его в браузере для тестирования")
    
    # Запускаем мост
    bridge = RustAnalyzerBridge()
    
    # Обработчик сигналов для корректного завершения
    def signal_handler(signum, frame):
        bridge.stop()
        exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    try:
        await bridge.start_server()
    except KeyboardInterrupt:
        bridge.stop()

if __name__ == "__main__":
    asyncio.run(main())