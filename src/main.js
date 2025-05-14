import plugin from '../plugin.json';
const { snippetManager } = ace.require("ace/snippets");
import { rustSnippets } from "./rustSnippets.js"; // Импортируем снипеты для Rust
import { rustMethods } from "./rustMethods.js"

const { editor } = editorManager;

/**
 * Функция для получения текущего типа файла на основе сессии
 * @param {Object} session - объект сессии редактора
 * @returns {string} - тип текущего файла
 */
function getCurrentFileType(session) {
  const sessionNme = session.getMode().$id;
  const sessionNmeParts = sessionNme.split("/");
  return sessionNmeParts[sessionNmeParts.length - 1];
}

/**
 * Класс для управления снипетами и IntelliSense для Rust
 */
class AcodeRustIntegration {
  constructor() {
    this.setVariables();
    this.initializeSnippets(rustSnippets);
    this.initializeMethodCompletion(rustMethods); // Инициализируем базу методов
  }

  /**
   * Устанавливает переменные снипетов
   */
  setVariables() {
    const { variables } = snippetManager;
    variables.FILE_NAME = () => {
      const fileNameWithExtension = editorManager.activeFile.filename;
      const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
      return fileNameWithExtension.slice(0, lastDotIndex);
    };
  }

  /**
   * Инициализирует базу данных и автодополнение для снипетов
   * @param {Array} snippets - массив снипетов
   */
  initializeSnippets(snippets) {
    this.rustSnippetCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const currentFileType = getCurrentFileType(session);

        // Фильтруем снипеты только для файлов типа Rust  
        const relevantSnippets = snippets.filter(s =>  
          s.fileTypes.includes(currentFileType)  
        );  

        const snippetCompletions = relevantSnippets.map(snippet => ({  
          caption: snippet.prefix,  
          snippet: snippet.snippet,  
          meta: snippet.type,  
          value: snippet.snippet,  
          type: "snippet",  
          docHTML: snippet.description || "",  
          icon: "icon snippet-icon"  
        }));  

        callback(null, snippetCompletions);  
      }  
    };  
    editor.completers.unshift(this.rustSnippetCompleter);
  }
  /**
   * Инициализирует базу данных и автодополнение для методов с фильтрацией по паттерну
   */
  initializeMethodCompletion(rustMethods) {
    // Пример базы методов для Rust
    this.rustMethodCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const currentFileType = getCurrentFileType(session);

        if (currentFileType !== "rust") {
          callback(null, []);
          return;
        }

        // Фильтруем методы по началу ввода (паттерну)
        const filteredMethods = rustMethods.filter(method =>
          method.name.startsWith(prefix)
        );

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

  /**
   * Асинхронная инициализация плагина
   */
  async init() {
    acode.addIcon("snippet-icon", this.baseUrl + "icon-snippet.png"); // Иконка для снипетов
    acode.addIcon("method-icon", this.baseUrl + "icon-method.png"); // Иконка для методов
  }

  /**
   * Удаляет плагин и связанные с ним ресурсы
   */
  async destroy() {
    editor.completers.splice(
      editor.completers.indexOf(this.rustSnippetCompleter),
      1
    );
    editor.completers.splice(
      editor.completers.indexOf(this.rustMethodCompleter),
      1
    );
  }
}

if (window.acode) {
  const acodePlugin = new AcodeRustIntegration();

  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith("/")) {
      baseUrl += "/";
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init();
  });

  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}