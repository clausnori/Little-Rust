import plugin from '../plugin.json';
const { snippetManager } = ace.require("ace/snippets");
import { rustSnippets } from "./rustSnippets.js";
import { rustMethods } from "./rustMethods.js";

const { editor } = editorManager;

function getCurrentFileType(session) {
    const sessionNme = session.getMode().$id;
    const sessionNmeParts = sessionNme.split("/");
    return sessionNmeParts[sessionNmeParts.length - 1];
}

class AcodeRustIntegration {
    constructor() {
        this.setVariables();
        this.initializeSnippets(rustSnippets);
        this.initializeMethodCompletion(rustMethods);
        this.lastContent = "";
        this.currentSnippetInfo = null;
        this.currentMethodInfo = null;
        this.floatingWindowCreated = false;
        this.isRustFileOpen = false;
        this.currentSnippets = [];
        this.activeSnippets = [];
        this.activeMethods = [];
        this.currentPrefix = "";
    }

    setVariables() {
        const { variables } = snippetManager;
        variables.FILE_NAME = () => {
            const fileNameWithExtension = editorManager.activeFile.filename;
            const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
            return fileNameWithExtension.slice(0, lastDotIndex);
        };
    }

    initializeSnippets(snippets) {
        this.rustSnippetCompleter = {
            getCompletions: (editor, session, pos, prefix, callback) => {
                const currentFileType = getCurrentFileType(session);
                const relevantSnippets = snippets.filter(s => s.fileTypes.includes(currentFileType));
                const snippetCompletions = relevantSnippets.map(snippet => ({
                    caption: snippet.prefix,
                    snippet: snippet.snippet,
                    meta: snippet.type,
                    value: snippet.snippet,
                    type: "snippet",
                    docHTML: snippet.description || "",
                    icon: "icon snippet-icon"
                }));

                // Сохраняем текущие снипеты для отображения в плавающем окне
                this.currentSnippets = relevantSnippets;
                this.activeSnippets = relevantSnippets.filter(s => 
                    !prefix || s.prefix.startsWith(prefix));
                this.currentPrefix = prefix;
                this.updateFloatingWindow();

                callback(null, snippetCompletions);
            }
        };
        editor.completers.unshift(this.rustSnippetCompleter);
    }

    initializeMethodCompletion(rustMethods) {
        this.rustMethodCompleter = {
            getCompletions: (editor, session, pos, prefix, callback) => {
                const currentFileType = getCurrentFileType(session);
                if (currentFileType !== "rust") {
                    callback(null, []);
                    return;
                }

                // При вводе текста фильтруем методы
                let filteredMethods = [];
                if (prefix) {
                    filteredMethods = rustMethods.filter(method => method.name.startsWith(prefix));
                    this.activeMethods = filteredMethods;
                    this.currentPrefix = prefix;
                    
                    // Если нашли методы, обновляем плавающее окно
                    if (filteredMethods.length > 0) {
                        this.updateFloatingWindow();
                    }
                } else {
                    this.activeMethods = [];
                }

                const methodCompletions = filteredMethods.map(method => ({
                    caption: method.name,
                    snippet: method.snippet,
                    meta: method.meta,
                    type: "method",
                    docHTML: method.description || "",
                    icon: "icon method-icon"
                }));

                callback(null, methodCompletions);
            }
        };
        editor.completers.unshift(this.rustMethodCompleter);
    }

    createFloatingWindow() {
        const win = document.createElement('div');
        win.id = 'floating-ui';
        win.className = 'floating-window';
        win.innerHTML = `
        <div class="floating-header">Rust by Claus</div>
        <div class="floating-tabs">
            <div class="tab active" data-tab="snippets">Snippets</div>
            <div class="tab" data-tab="methods">Methods</div>
        </div>
        <div class="floating-scroll-container">
            <div class="floating-content" id="floating-content">Wait input...</div>
        </div>
        `;

        // Устанавливаем точные размеры
        win.style.width = '200px';
        win.style.height = '150px';
        // По умолчанию скрываем окно
        win.style.display = 'none';

        document.body.appendChild(win);
        this.floatingWindow = win;
        this.floatingContentEl = document.getElementById("floating-content");
        this.floatingWindowCreated = true;
        this.activeTab = "snippets";

        // Добавление обработчиков событий для вкладок
        const tabs = win.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.activeTab = tab.dataset.tab;
                this.updateFloatingWindow();
            });
        });

        let offsetX = 0,
        offsetY = 0,
        isDragging = false;
        const header = win.querySelector('.floating-header');

        function startDrag(x, y) {
            isDragging = true;
            offsetX = x - win.offsetLeft;
            offsetY = y - win.offsetTop;
        }

        function onMove(x, y) {
            if (!isDragging) return;
            win.style.left = `${x - offsetX}px`;
            win.style.top = `${y - offsetY}px`;
        }

        function stopDrag() {
            isDragging = false;
        }

        header.addEventListener('mousedown', e => {
            startDrag(e.clientX, e.clientY);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', stopMouseDrag);
        });

        function onMouseMove(e) {
            onMove(e.clientX, e.clientY);
        }

        function stopMouseDrag() {
            stopDrag();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', stopMouseDrag);
        }

        header.addEventListener('touchstart', e => {
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
        });

        header.addEventListener('touchmove', e => {
            const t = e.touches[0];
            onMove(t.clientX, t.clientY);
        });

        header.addEventListener('touchend', stopDrag);

        const style = document.createElement("style");
        style.textContent = `
        .floating-window {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            height: 250px;
            background-color: rgba(0, 0, 0, 0.85);
            color: #fff;
            font-family: sans-serif;
            border: 1px solid #444;
            border-radius: 8px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
        }
        .floating-header {
            background: rgba(0, 0, 0, 0.95);
            padding: 8px 12px;
            font-weight: bold;
            border-bottom: 1px solid #555;
            border-radius: 8px 8px 0 0;
            pointer-events: auto;
            cursor: move;
            flex: 0 0 auto;
        }
        .floating-tabs {
            display: flex;
            background: rgba(0, 0, 0, 0.8);
            border-bottom: 1px solid #444;
            flex: 0 0 auto;
        }
        .tab {
            padding: 5px 15px;
            cursor: pointer;
            pointer-events: auto;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .tab.active {
            border-bottom: 2px solid #ff9d00;
            opacity: 1;
        }
        .floating-scroll-container {
            flex: 1 1 auto;
            overflow-y: auto;
            height: calc(100% - 78px); /* Высота окна минус высота заголовка и табов */
            scrollbar-width: thin;
            scrollbar-color: #555 rgba(0, 0, 0, 0.5);
        }
        .floating-scroll-container::-webkit-scrollbar {
            width: 8px;
        }
        .floating-scroll-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 0 0 8px 0;
        }
        .floating-scroll-container::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 4px;
        }
        .floating-content {
            padding: 10px;
            font-size: 13px;
            line-height: 1.4;
        }
        .item-name {
            font-weight: bold;
            color: #ff9d00;
        }
        .item-type {
            color: #88ccff;
            font-style: italic;
        }
        .item-description {
            margin-top: 4px;
            margin-bottom: 8px;
        }
        .current-prefix {
            color: #aaffaa;
            font-style: italic;
            margin-bottom: 10px;
        }
        .empty-message {
            font-style: italic;
            color: #aaa;
        }
        `;
        document.head.appendChild(style);
    }

    // Метод для проверки, открыт ли файл Rust
    checkIfRustFile() {
        if (!editorManager.activeFile) return false;

        const session = editor.getSession();
        const currentFileType = getCurrentFileType(session);
        return currentFileType === "rust";
    }

    // Метод для отображения плавающего окна
    showFloatingWindow() {
        if (!this.floatingWindowCreated) {
            this.createFloatingWindow();
        }

        if (this.floatingWindow) {
            this.floatingWindow.style.display = 'flex';
            this.floatingWindow.style.pointerEvents = 'auto';
            this.isRustFileOpen = true;
            this.updateFloatingWindow();
        }
    }

    // Метод для скрытия плавающего окна
    hideFloatingWindow() {
        if (this.floatingWindow) {
            this.floatingWindow.style.display = 'none';
            this.isRustFileOpen = false;
        }
    }

    updateFloatingVisibility() {
        if (this.checkIfRustFile()) {
            const session = editor.getSession();
            const currentFileType = getCurrentFileType(session);
            const relevantSnippets = rustSnippets.filter(s => s.fileTypes.includes(currentFileType));
            this.currentSnippets = relevantSnippets;
            this.activeSnippets = relevantSnippets;
            this.isRustFileOpen = true;
            this.showFloatingWindow();
        } else {
            this.isRustFileOpen = false;
            this.hideFloatingWindow();
        }
    }

    updateFloatingContent(html) {
        if (this.floatingContentEl && html !== this.lastContent) {
            this.floatingContentEl.innerHTML = html;
            this.lastContent = html;
        }
    }

    updateFloatingWindow() {
        if (!this.isRustFileOpen) return;

        if (this.activeTab === "snippets") {
            this.updateFloatingContentWithSnippetsInfo();
        } else if (this.activeTab === "methods") {
            this.updateFloatingContentWithMethodsInfo();
        }
    }

    updateFloatingContentWithSnippetsInfo() {
        if (!this.isRustFileOpen || !this.currentSnippets) return;

        let html = '';
        
        // Если есть текущий префикс, покажем его
        if (this.currentPrefix) {
            html += `<div class="current-prefix">Typing: "${this.currentPrefix}"</div>`;
            
            // Показываем снипеты, соответствующие текущему префиксу
            if (this.activeSnippets.length > 0) {
                html += '<div><strong>Matching snippets:</strong></div>';
                
                // Показываем все активные снипеты, теперь пользователь может прокрутить
                this.activeSnippets.forEach(snippet => {
                    html += `
                    <div>
                        <div class="item-name">${snippet.prefix}</div>
                        <div class="item-type">${snippet.type}</div>
                        <div class="item-description">${snippet.description || 'No description'}</div>
                    </div>
                    `;
                });
            } else {
                html += `<div class="empty-message">No matching snippets found</div>`;
            }
        } else {
            // Если нет префикса, покажем доступные снипеты
            if (this.currentSnippets.length > 0) {
                html += '<div><strong>Available snippets:</strong></div>';
                
                // Показываем все снипеты, пользователь может прокрутить через все
                this.currentSnippets.forEach(snippet => {
                    html += `
                    <div>
                        <div class="item-name">${snippet.prefix}</div>
                        <div class="item-type">${snippet.type}</div>
                        <div class="item-description">${snippet.description || 'No description'}</div>
                    </div>
                    `;
                });
            } else {
                html += `<div class="empty-message">No snippets available for this file type</div>`;
            }
        }

        this.updateFloatingContent(html);
    }

    updateFloatingContentWithMethodsInfo() {
        if (!this.isRustFileOpen) return;

        let html = '';
        
        // Если есть текущий префикс, покажем его
        if (this.currentPrefix) {
            html += `<div class="current-prefix">Typing: "${this.currentPrefix}"</div>`;
            
            // Показываем методы, соответствующие текущему префиксу
            if (this.activeMethods.length > 0) {
                html += '<div><strong>Matching methods:</strong></div>';
                
                // Показываем все активные методы, теперь пользователь может прокрутить
                this.activeMethods.forEach(method => {
                    html += `
                    <div>
                        <div class="item-name">${method.name}</div>
                        <div class="item-type">${method.meta}</div>
                        <div class="item-description">${method.description || 'No description'}</div>
                    </div>
                    `;
                });
            } else {
                html += `<div class="empty-message">No matching methods found</div>`;
            }
        } else {
            // Если нет префикса, покажем информацию о методах
            html += `<div class="empty-message">Start typing to see available Rust methods</div>`;
        }

        this.updateFloatingContent(html);
    }

    async init() {
        acode.addIcon("snippet-icon", this.baseUrl + "icon-snippet.png");
        acode.addIcon("method-icon", this.baseUrl + "icon-method.png");

        // Создаем плавающее окно, но сразу его скрываем
        this.createFloatingWindow();

        // Проверяем, открыт ли Rust файл при инициализации
        this.updateFloatingVisibility();

        // Отслеживаем изменение типа файла для обновления списка доступных снипетов
        editorManager.on('switch-file', () => {
            this.updateFloatingVisibility();
        });

        editor.on("change", () => {
            if (!this.isRustFileOpen) return;

            const cursor = editor.getCursorPosition();
            const line = editor.session.getLine(cursor.row);
            const prefix = line.substring(0, cursor.column).match(/[\w\.]+$/);

            if (prefix) {
                const prefixStr = prefix[0];
                this.currentPrefix = prefixStr;
                
                // Обновляем активные методы
                this.activeMethods = rustMethods.filter(method => 
                    method.name.startsWith(prefixStr));
                
                // Обновляем активные снипеты
                this.activeSnippets = this.currentSnippets.filter(snippet => 
                    snippet.prefix.startsWith(prefixStr));
                
                // Обновляем плавающее окно
                this.updateFloatingWindow();
            } else {
                // Если нет префикса, сбрасываем активные элементы
                this.currentPrefix = "";
                this.activeMethods = [];
                this.activeSnippets = this.currentSnippets;
                this.updateFloatingWindow();
            }
        });

        // Добавляем обработчик фокуса для редактора
        editor.on("focus", () => {
            if (this.isRustFileOpen) {
                this.showFloatingWindow();
            }
        });
    }

    async destroy() {
        editor.completers.splice(editor.completers.indexOf(this.rustSnippetCompleter), 1);
        editor.completers.splice(editor.completers.indexOf(this.rustMethodCompleter), 1);
        const container = document.getElementById("floating-ui");
        if (container) container.remove();
    }
}

if (window.acode) {
    const acodePlugin = new AcodeRustIntegration();

    acode.setPluginInit(plugin.id, async (baseUrl, $page, {
        cacheFileUrl, cacheFile
    }) => {
        if (!baseUrl.endsWith("/")) baseUrl += "/";
        acodePlugin.baseUrl = baseUrl;
        await acodePlugin.init();
    });

    acode.setPluginUnmount(plugin.id,
        () => {
            acodePlugin.destroy();
        });
}