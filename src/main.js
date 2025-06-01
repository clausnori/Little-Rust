import plugin from '../plugin.json';
const { snippetManager } = ace.require("ace/snippets");

const { editor} = editorManager;
function getCurrentFileType(session) {
	const sessionName = session.getMode().$id;
	const parts = sessionName.split("/");
	return parts[parts.length - 1];
}

/* Use DLS for parsing regex patern from .dls ,use dls because it better then
const from old version */
class DLSParser {
	static parse(content) {
		const snippets = [];
		const methods = [];

		const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
		let currentSection = null;
		let currentItem = {};

		for (const line of lines) {
			if (line.startsWith('[snippet]')) {
				if (currentSection === 'snippet' && Object.keys(currentItem).length > 0) {
					snippets.push(this.processItem(currentItem, 'snippet'));
				}
				currentSection = 'snippet';
				currentItem = {};
			} else if (line.startsWith('[method]')) {
				if (currentSection === 'snippet' && Object.keys(currentItem).length > 0) {
					snippets.push(this.processItem(currentItem, 'snippet'));
				} else if (currentSection === 'method' && Object.keys(currentItem).length > 0) {
					methods.push(this.processItem(currentItem, 'method'));
				}
				currentSection = 'method';
				currentItem = {};
			} else if (line.includes(' = ')) {
				const [key,
					...valueParts] = line.split(' = ');
				let value = valueParts.join(' = ').trim();

				if ((value.startsWith('"') && value.endsWith('"')) ||
					(value.startsWith("'") && value.endsWith("'"))) {
					value = value.slice(1, -1);
				}

				currentItem[key.trim()] = value;
			}
		}

		if (currentSection === 'snippet' && Object.keys(currentItem).length > 0) {
			snippets.push(this.processItem(currentItem, 'snippet'));
		} else if (currentSection === 'method' && Object.keys(currentItem).length > 0) {
			methods.push(this.processItem(currentItem, 'method'));
		}

		return {
			snippets,
			methods
		};
	}

	static processItem(item, type) {
		const processed = {
			...item
		};

		Object.keys(processed).forEach(key => {
			if (typeof processed[key] === 'string') {
				processed[key] = processed[key].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
			}
		});

		if (processed.fileTypes && typeof processed.fileTypes === 'string') {
			processed.fileTypes = processed.fileTypes.split(',').map(ft => ft.trim());
		}

		return processed;
	}

}

class AcodeRustIntegration {
	constructor() {
		this.rustSnippets = [];
		this.rustMethods = [];
		this.rustSnippetCompleter = null;
		this.rustMethodCompleter = null;
		this.infoButton = null;
		this.currentMethodInfo = null;
		this.prismLoaded = false;
	}

	async loadPrismJS() {
		if (this.prismLoaded) return;

		try {
			// CND prism.js
			const prismCSS = document.createElement('link');
			prismCSS.rel = 'stylesheet';
			prismCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
			document.head.appendChild(prismCSS);
			
			await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js');
			
			await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-rust.min.js');

			this.prismLoaded = true;
			console.log('Prism.js loaded successfully');
		} catch (error) {
			console.error('Error loading Prism.js:', error);
		}
	}

	loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	processDescription(description) {
		if (!description) return '';

    /* replays rust code in better ui */
		const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
		return description.replace(codeBlockRegex, (match, language, code) => {
			const lang = language || 'rust';
			const escapedCode = code.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
			
			if (this.prismLoaded && window.Prism) {
				try {
					const highlightedCode = window.Prism.highlight(
						code.trim(), 
						window.Prism.languages[lang] || window.Prism.languages.rust || window.Prism.languages.plain,
						lang
					);
					return `<pre class="language-${lang}" style="background: #f8f8f8; padding: 12px; border-radius: 6px; margin: 8px 0; overflow-x: auto; border-left: 4px solid #007acc;"><code class="language-${lang}">${highlightedCode}</code></pre>`;
				} catch (error) {
					console.warn('Error highlighting code:', error);
				}
			}
			
			// Fallback null highlighting
			return `<pre style="background: #f8f8f8; padding: 12px; border-radius: 6px; margin: 8px 0; overflow-x: auto; border-left: 4px solid #007acc;"><code>${escapedCode}</code></pre>`;
		});
	}

	async loadDLSFile() {
		if (!this.baseUrl) {
			console.error("baseUrl is not set. Cannot load rsm.dls.");
			return;
		}

		try {
			const response = await fetch(this.baseUrl + 'rsm.dls');
			const content = await response.text();
			const parsed = DLSParser.parse(content);

			this.rustSnippets = parsed.snippets;
			this.rustMethods = parsed.methods;

			console.log('Loaded snippets:', this.rustSnippets.length);
			console.log('Loaded methods:', this.rustMethods.length);

			this.setVariables();
			this.initializeSnippets();
			this.initializeMethodCompletion();
			this.createInfoButton();
		} catch (error) {
			console.error('Error loading rsm.dls:', error);
		}
	}

	createInfoButton() {
		this.infoButton = document.createElement('button');
		this.infoButton.innerHTML = '💡';
		this.infoButton.style.cssText = `
	position: fixed;
	top: 60px;
	right: 20px;
	z-index: 1000;
	background: transparent;
	border: none;
	border-radius: 50%;
	width: 45px;
	height: 45px;
	font-size: 20px;
	cursor: pointer;
	box-shadow: none;
	display: none;
	transition: all 0.6s ease;
`;

    /* anim for Burton */
		this.infoButton.addEventListener('mouseenter', () => {
			this.infoButton.style.transform = 'scale(1.1)';
		});

		this.infoButton.addEventListener('mouseleave', () => {
			this.infoButton.style.transform = 'scale(1)';
		});

		// Handler click for open UI
		this.infoButton.addEventListener('click', () => {
			this.showMethodInfo();
		});

    //Insert Button in Ace 
		document.body.appendChild(this.infoButton);
	}

	findMethodAtCursor() {
		const session = editor.getSession();
		const cursor = editor.getCursorPosition();
		const line = session.getLine(cursor.row);
		
		// Find patern in cursor position 
		const wordRange = session.getWordRange(cursor.row, cursor.column);
		const word = session.getTextRange(wordRange);
		
		// Around cursor patter
		const beforeCursor = line.substring(0, cursor.column);
		const afterCursor = line.substring(cursor.column);
		
		// Insec most best patter
		const methodRegex = /([a-zA-Z_][a-zA-Z0-9_]*)::/g;
		const matches = [...beforeCursor.matchAll(methodRegex), ...afterCursor.matchAll(methodRegex)];
		
		// Ищем метод в нашем списке
		let foundMethod = null;
		
		// Сначала ищем точное совпадение с текущим словом
		foundMethod = this.rustMethods.find(method => method.name === word);
		
		// Если не найдено, ищем среди найденных методов в строке
		if (!foundMethod) {
			for (const match of matches) {
				const methodName = match[1];
				foundMethod = this.rustMethods.find(method => method.name === methodName);
				if (foundMethod) break;
			}
		}
		
		// Если все еще не найдено, ищем методы, содержащие текущее слово
		if (!foundMethod && word.length > 2) {
			foundMethod = this.rustMethods.find(method => 
				method.name && method.name.toLowerCase().includes(word.toLowerCase())
			);
		}
		
		return foundMethod;
	}

	showMethodInfo() {
		if (!this.currentMethodInfo) {
			this.showNotification('Method not find', 'warning');
			return;
		}

		const method = this.currentMethodInfo;
		const processedDescription = this.processDescription(method.description);
		const processedSnippet = method.snippet ? this.processDescription('```rust\n' + method.snippet + '\n```') : '';

		const modalHTML = `
			<div id="methodInfoModal" style="
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,0.5);
				z-index: 10000;
				display: flex;
				justify-content: center;
				align-items: center;
			">
				<div style="
					background: white;
					padding: 25px;
					border-radius: 12px;
					max-width: 700px;
					max-height: 85vh;
					overflow-y: auto;
					box-shadow: 0 10px 30px rgba(0,0,0,0.3);
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
				">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
						<h2 style="margin: 0; color: #333; font-size: 24px;">📖 ${method.name || 'Method'}</h2>
						<button onclick="this.closest('#methodInfoModal').remove()" style="
							background: #ff4444;
							border: none;
							border-radius: 50%;
							width: 32px;
							height: 32px;
							color: white;
							cursor: pointer;
							font-size: 18px;
							display: flex;
							align-items: center;
							justify-content: center;
						">×</button>
					</div>
					<div style="color: #555; line-height: 1.7; font-size: 15px;">
						${processedDescription ? `<div style="margin-bottom: 20px;"><strong style="color: #007acc; font-size: 16px;">Description:</strong><div style="margin-top: 8px;">${processedDescription}</div></div>` : ''}
						${processedSnippet ? `<div style="margin-bottom: 20px;"><strong style="color: #007acc; font-size: 16px;">Pattern:</strong><div style="margin-top: 8px;">${processedSnippet}</div></div>` : ''}
						${method.meta ? `<p style="margin: 10px 0;"><strong style="color: #007acc;">Type:</strong> <span style="background: #e8f4fd; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${method.meta}</span></p>` : ''}
						${method.fileTypes ? `<p style="margin: 10px 0;"><strong style="color: #007acc;">File Types:</strong> <span style="background: #e8f4fd; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${Array.isArray(method.fileTypes) ? method.fileTypes.join(', ') : method.fileTypes}</span></p>` : ''}
					</div>
				</div>
			</div>
		`;

		// Удаляем предыдущее модальное окно, если есть
		const existingModal = document.getElementById('methodInfoModal');
		if (existingModal) {
			existingModal.remove();
		}

		// Добавляем новое модальное окно
		document.body.insertAdjacentHTML('beforeend', modalHTML);

		// Закрытие по клику вне модального окна
		const modal = document.getElementById('methodInfoModal');
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.remove();
			}
		});

		// Закрытие по Escape
		const escapeHandler = (e) => {
			if (e.key === 'Escape') {
				modal.remove();
				document.removeEventListener('keydown', escapeHandler);
			}
		};
		document.addEventListener('keydown', escapeHandler);
	}

	showNotification(message, type = 'info') {
		const notification = document.createElement('div');
		notification.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			padding: 12px 20px;
			border-radius: 5px;
			color: white;
			z-index: 9999;
			font-family: Arial, sans-serif;
			max-width: 300px;
			box-shadow: 0 2px 10px rgba(0,0,0,0.3);
			background: ${type === 'warning' ? '#ff9800' : '#2196F3'};
		`;
		notification.textContent = message;
		
		document.body.appendChild(notification);
		
		setTimeout(() => {
			notification.remove();
		}, 3000);
	}

	updateInfoButton() {
		const method = this.findMethodAtCursor();
		this.currentMethodInfo = method;
		
		if (method) {
			this.infoButton.style.display = 'block';
			this.infoButton.title = `Show info method: ${method.name}`;
		} else {
			this.infoButton.style.display = 'none';
		}
	}

	setVariables() {
		const {
			variables
		} = snippetManager;
		variables.FILE_NAME = () => {
			const fileName = editorManager.activeFile.filename;
			const dotIndex = fileName.lastIndexOf(".");
			return fileName.slice(0, dotIndex);
		};
	}

	initializeSnippets() {
		this.rustSnippetCompleter = {
			getCompletions: (editor, session, pos, prefix, callback) => {
				const fileType = getCurrentFileType(session);
				const relevantSnippets = this.rustSnippets.filter(s =>
					s.fileTypes && s.fileTypes.includes(fileType)
				);

				const completions = relevantSnippets.map(snippet => ({
					caption: snippet.prefix,
					snippet: snippet.snippet,
					meta: snippet.type || 'snippet',
					value: snippet.snippet,
					type: "snippet",
					docHTML: this.processDescription(snippet.description) || "",
					icon: "icon snippet-icon"
				}));

				callback(null, completions);
			}
		};

		if (editor.completers) {
			editor.completers.unshift(this.rustSnippetCompleter);
		}
	}

	initializeMethodCompletion() {
		this.rustMethodCompleter = {
			getCompletions: (editor, session, pos, prefix, callback) => {
				const fileType = getCurrentFileType(session);
				if (fileType !== "rust") return callback(null, []);

				const filtered = prefix
				? this.rustMethods.filter(m => m.name && m.name.startsWith(prefix)): [];

				const completions = filtered.map(method => ({
					caption: method.name,
					snippet: method.snippet,
					meta: method.meta || 'method',
					type: "method",
					docHTML: this.processDescription(method.description) || "",
					icon: "icon method-icon"
				}));

				callback(null, completions);
			}
		};

		if (editor.completers) {
			editor.completers.unshift(this.rustMethodCompleter);
		}
	}

	async init($page, cacheFile, cacheFileUrl) {
		try {
			if (!this.baseUrl) {
				throw new Error("baseUrl is not set. Cannot load rsm.dls.");
			}

			// Загружаем Prism.js для подсветки синтаксиса
			await this.loadPrismJS();

			if (window.acode) {
				acode.addIcon("snippet-icon", this.baseUrl + "icon-snippet.png");
				acode.addIcon("method-icon", this.baseUrl + "icon-method.png");
			}

			await this.loadDLSFile();

			// Добавляем обработчики событий для отслеживания курсора
			editor.on('changeSelection', () => {
				// Добавляем небольшую задержку, чтобы избежать слишком частых обновлений
				clearTimeout(this.updateTimeout);
				this.updateTimeout = setTimeout(() => {
					this.updateInfoButton();
				}, 100);
			});

			editor.on('changeCursor', () => {
				clearTimeout(this.updateTimeout);
				this.updateTimeout = setTimeout(() => {
					this.updateInfoButton();
				}, 100);
			});

		} catch (error) {
			console.error('Error initializing Rust plugin:', error);
		}
	}

	destroy() {
		if (editor.completers) {
			const index1 = editor.completers.indexOf(this.rustSnippetCompleter);
			const index2 = editor.completers.indexOf(this.rustMethodCompleter);

			if (index1 !== -1) editor.completers.splice(index1, 1);
			if (index2 !== -1) editor.completers.splice(index2, 1);
		}

		// Удаляем кнопку и обработчики событий
		if (this.infoButton) {
			this.infoButton.remove();
		}

		// Очищаем таймаут
		if (this.updateTimeout) {
			clearTimeout(this.updateTimeout);
		}

		// Удаляем модальное окно, если оно открыто
		const modal = document.getElementById('methodInfoModal');
		if (modal) {
			modal.remove();
		}
	}
}

if (window.acode) {
	const rustPlugin = new AcodeRustIntegration();

	window.acode.setPluginInit(
		plugin.id,
		async (initUrl, $page, {
			cacheFileUrl, cacheFile
		}) => {
			const baseUrl = initUrl.endsWith("/") ? initUrl: `${initUrl}/`;
			rustPlugin.baseUrl = baseUrl;
			await rustPlugin.init($page, cacheFile, cacheFileUrl);
		},
		rustPlugin.settingsObj,
	);

	window.acode.setPluginUnmount(plugin.id, () => {
		rustPlugin.destroy();
	});
}