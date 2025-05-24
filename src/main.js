import plugin from '../plugin.json';
const { snippetManager } = ace.require("ace/snippets");
import { rustSnippets } from "./rustSnippets.js";
import { rustMethods } from "./rustMethods.js";

const { editor } = editorManager;
function getCurrentFileType(session) {
    const sessionName = session.getMode().$id;
    const parts = sessionName.split("/");
    return parts[parts.length - 1];
}

class AcodeRustIntegration {
    constructor() {
        this.setVariables();
        this.initializeSnippets(rustSnippets);
        this.initializeMethodCompletion(rustMethods);
    }

    setVariables() {
        const { variables } = snippetManager;
        variables.FILE_NAME = () => {
            const fileName = editorManager.activeFile.filename;
            const dotIndex = fileName.lastIndexOf(".");
            return fileName.slice(0, dotIndex);
        };
    }

    initializeSnippets(snippets) {
        this.rustSnippetCompleter = {
            getCompletions: (editor, session, pos, prefix, callback) => {
                const fileType = getCurrentFileType(session);
                const relevantSnippets = snippets.filter(s => s.fileTypes.includes(fileType));
                const completions = relevantSnippets.map(snippet => ({
                    caption: snippet.prefix,
                    snippet: snippet.snippet,
                    meta: snippet.type,
                    value: snippet.snippet,
                    type: "snippet",
                    docHTML: snippet.description || "",
                    icon: "icon snippet-icon"
                }));
                callback(null, completions);
            }
        };
        editor.completers.unshift(this.rustSnippetCompleter);
    }

    initializeMethodCompletion(methods) {
        this.rustMethodCompleter = {
            getCompletions: (editor, session, pos, prefix, callback) => {
                const fileType = getCurrentFileType(session);
                if (fileType !== "rust") return callback(null, []);
                const filtered = prefix
                    ? methods.filter(m => m.name.startsWith(prefix))
                    : [];
                const completions = filtered.map(method => ({
                    caption: method.name,
                    snippet: method.snippet,
                    meta: method.meta,
                    type: "method",
                    docHTML: method.description || "",
                    icon: "icon method-icon"
                }));
                callback(null, completions);
            }
        };
        editor.completers.unshift(this.rustMethodCompleter);
    }

    async init() {
        acode.addIcon("snippet-icon", this.baseUrl + "icon-snippet.png");
        acode.addIcon("method-icon", this.baseUrl + "icon-method.png");
    }

    destroy() {
        const index1 = editor.completers.indexOf(this.rustSnippetCompleter);
        const index2 = editor.completers.indexOf(this.rustMethodCompleter);
        if (index1 !== -1) editor.completers.splice(index1, 1);
        if (index2 !== -1) editor.completers.splice(index2, 1);
    }
}

if (window.acode) {
    const rustPlugin = new AcodeRustIntegration();
    rustPlugin.baseUrl = plugin.url;
    rustPlugin.init();
    window.acode.setPluginInit(plugin.id, rustPlugin.init.bind(rustPlugin));
    window.acode.setPluginUnmount(plugin.id, rustPlugin.destroy.bind(rustPlugin));
}