# Rust Small IntelliSense
(open-source)
**To be published at a later**
This plugin provides a seamless integration for Rust development in the Acode editor. It enhances the developer experience by adding support for Rust snippets, IntelliSense for Rust methods, and autocomplete functionality.

## Features

- **Snippets Integration**: Quickly insert commonly used Rust code snippets with ease.
- **Method IntelliSense**: Autocomplete for Rust standard library methods, filtered by user input.
- **File Type Detection**: Automatically detects Rust files (`.rs`) to enable Rust-specific functionalities.
- **Customizable Icons**: Visual indicators for snippets and methods in autocomplete suggestions.

## Installation

1. Download the plugin from the Acode plugin store or add it manually to your Acode installation.
2. Ensure your Acode editor is updated to the latest version.
3. Once installed, the plugin will automatically activate when you open a Rust file.

## Usage

### Snippets

The plugin comes with a pre-defined set of Rust snippets. These snippets allow you to quickly insert common Rust code patterns. To use:

1. Start typing in the editor.
2. The snippet suggestions will appear in the autocomplete dropdown.
3. Select a snippet and press `Enter` to insert it.

### Method IntelliSense

Rust standard library methods are available for autocomplete. To use:

1. Start typing the method name in a Rust file.
2. The plugin will display suggestions that match the prefix.
3. Select a method and press `Enter` to insert it into your code.

### Icons

- **Snippet Icon**: Indicates a snippet suggestion in the autocomplete dropdown.
- **Method Icon**: Indicates a Rust method suggestion in the autocomplete dropdown.

## File Type Detection

The plugin uses the file extension (`.rs`) to enable Rust-specific features. Only files detected as Rust will display relevant snippets and methods.

## Plugin Development

### Adding Snippets

To add new snippets, edit the `rustSnippets.js` file and follow this structure:

```javascript
{
  prefix: "snippet_prefix",  // Short prefix to trigger the snippet
  snippet: "Code to insert", // The code snippet
  description: "Description of the snippet", // Optional
  type: "snippet"            // Type of the entry
}
```

### Adding Methods

To add additional Rust methods, edit the `rustMethods.js` file and use the following structure:

```javascript
{
  name: "method_name",       // Name of the method
  snippet: "method_snippet", // Code snippet for the method
  description: "Description of the method", // Optional
  meta: "method"             // Metadata (e.g., method, macro, etc.)
}
```

### Plugin Lifecycle Hooks

This plugin uses Acode's plugin lifecycle hooks:

- **`init`**: Handles initialization, setting up icons, and registering snippet/method completers.
- **`destroy`**: Cleans up resources and removes registered completers when the plugin is unmounted.

## Contribution

Contributions are welcome! Whether you want to add new snippets, enhance features, or fix bugs, feel free to submit a pull request.

### Guidelines

1. Ensure your code follows the existing structure and coding style.
2. Test your changes thoroughly.
3. Provide a clear description of your changes in the pull request.

## License

This plugin is open-source and available under the [MIT License](./LICENSE).

## Acknowledgments

Special thanks to the Acode :)

Which doesn't drain all the device's resources.



---
Happy Rust coding! 🦀