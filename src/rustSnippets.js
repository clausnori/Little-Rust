export const rustSnippets = [
  // Основные функции и конструкции
  {
    prefix: "fn",
    snippet: "fn $1($2) -> $3 {\n    $0\n}",
    description: "Define a Rust function",
    fileTypes: ["rust"],
    type: "Function"
  },
  {
    prefix: "let",
    snippet: "let $1 = $2;",
    description: "Define a variable",
    fileTypes: ["rust"],
    type: "Variable"
  },
  {
    prefix: "letm",
    snippet: "let mut $1 = $2;",
    description: "Define a mutable variable",
    fileTypes: ["rust"],
    type: "Variable"
  },
  {
    prefix: "struct",
    snippet: "struct $1 {\n    $2\n}",
    description: "Define a struct",
    fileTypes: ["rust"],
    type: "Struct"
  },
  {
    prefix: "impl",
    snippet: "impl $1 {\n    $2\n}",
    description: "Implement functions for a struct",
    fileTypes: ["rust"],
    type: "Implementation"
  },
  
  // Типы данных и трейты
  {
    prefix: "enum",
    snippet: "enum $1 {\n    $2,\n}",
    description: "Define an enum",
    fileTypes: ["rust"],
    type: "Enum"
  },
  {
    prefix: "trait",
    snippet: "trait $1 {\n    $2\n}",
    description: "Define a trait",
    fileTypes: ["rust"],
    type: "Trait"
  },
  {
    prefix: "implt",
    snippet: "impl $1 for $2 {\n    $3\n}",
    description: "Implement a trait for a type",
    fileTypes: ["rust"],
    type: "Implementation"
  },
  {
    prefix: "derive",
    snippet: "#[derive($1)]\n$0",
    description: "Add derive attribute",
    fileTypes: ["rust"],
    type: "Attribute"
  },
  
  // Методы и функции со специальными возможностями
  {
    prefix: "fnpub",
    snippet: "pub fn $1($2) -> $3 {\n    $0\n}",
    description: "Define a public function",
    fileTypes: ["rust"],
    type: "Function"
  },
  {
    prefix: "fnself",
    snippet: "fn $1(&self, $2) -> $3 {\n    $0\n}",
    description: "Define a method with &self",
    fileTypes: ["rust"],
    type: "Method"
  },
  {
    prefix: "fnmut",
    snippet: "fn $1(&mut self, $2) -> $3 {\n    $0\n}",
    description: "Define a method with &mut self",
    fileTypes: ["rust"],
    type: "Method"
  },
  {
    prefix: "fnstatic",
    snippet: "fn $1() -> $2 {\n    $0\n}",
    description: "Define a static method (no self)",
    fileTypes: ["rust"],
    type: "Method"
  },
  
  // Управление потоком и обработка ошибок
  {
    prefix: "if",
    snippet: "if $1 {\n    $0\n}",
    description: "If statement",
    fileTypes: ["rust"],
    type: "Control Flow"
  },
  {
    prefix: "ifelse",
    snippet: "if $1 {\n    $2\n} else {\n    $0\n}",
    description: "If-else statement",
    fileTypes: ["rust"],
    type: "Control Flow"
  },
  {
    prefix: "ifl",
    snippet: "if let $1 = $2 {\n    $0\n}",
    description: "If-let statement",
    fileTypes: ["rust"],
    type: "Control Flow"
  },
  {
    prefix: "match",
    snippet: "match $1 {\n    $2 => $3,\n    _ => $0,\n}",
    description: "Match expression",
    fileTypes: ["rust"],
    type: "Control Flow"
  },
  {
    prefix: "for",
    snippet: "for $1 in $2 {\n    $0\n}",
    description: "For loop",
    fileTypes: ["rust"],
    type: "Loop"
  },
  {
    prefix: "loop",
    snippet: "loop {\n    $0\n}",
    description: "Infinite loop",
    fileTypes: ["rust"],
    type: "Loop"
  },
  {
    prefix: "while",
    snippet: "while $1 {\n    $0\n}",
    description: "While loop",
    fileTypes: ["rust"],
    type: "Loop"
  },
  {
    prefix: "whilel",
    snippet: "while let $1 = $2 {\n    $0\n}",
    description: "While-let loop",
    fileTypes: ["rust"],
    type: "Loop"
  },
  
  // Обработка ошибок
  {
    prefix: "result",
    snippet: "Result<$1, $2>",
    description: "Result type",
    fileTypes: ["rust"],
    type: "Type"
  },
  {
    prefix: "option",
    snippet: "Option<$1>",
    description: "Option type",
    fileTypes: ["rust"],
    type: "Type"
  },
  {
    prefix: "ok",
    snippet: "Ok($1)",
    description: "Return Ok variant",
    fileTypes: ["rust"],
    type: "Error Handling"
  },
  {
    prefix: "err",
    snippet: "Err($1)",
    description: "Return Err variant",
    fileTypes: ["rust"],
    type: "Error Handling"
  },
  {
    prefix: "some",
    snippet: "Some($1)",
    description: "Some variant",
    fileTypes: ["rust"],
    type: "Option"
  },
  {
    prefix: "none",
    snippet: "None",
    description: "None variant",
    fileTypes: ["rust"],
    type: "Option"
  },
  {
    prefix: "question",
    snippet: "$1?",
    description: "Propagate error with ? operator",
    fileTypes: ["rust"],
    type: "Error Handling"
  },
  {
    prefix: "qoptional",
    snippet: "$1.ok_or($2)?",
    description: "Convert Option to Result and propagate error",
    fileTypes: ["rust"],
    type: "Error Handling"
  },
  
  // Функции-замыкания и итераторы
  {
    prefix: "closure",
    snippet: "|$1| $0",
    description: "Closure",
    fileTypes: ["rust"],
    type: "Closure"
  },
  {
    prefix: "closureb",
    snippet: "|$1| {\n    $0\n}",
    description: "Closure with block",
    fileTypes: ["rust"],
    type: "Closure"
  },
  {
    prefix: "map",
    snippet: ".map(|$1| $0)",
    description: "Iterator map",
    fileTypes: ["rust"],
    type: "Iterator"
  },
  {
    prefix: "filter",
    snippet: ".filter(|$1| $0)",
    description: "Iterator filter",
    fileTypes: ["rust"],
    type: "Iterator"
  },
  {
    prefix: "fold",
    snippet: ".fold($1, |$2, $3| $0)",
    description: "Iterator fold",
    fileTypes: ["rust"],
    type: "Iterator"
  },
  {
    prefix: "collect",
    snippet: ".collect::<$1>()",
    description: "Iterator collect",
    fileTypes: ["rust"],
    type: "Iterator"
  },
  {
    prefix: "colvec",
    snippet: ".collect::<Vec<_>>()",
    description: "Collect into Vec",
    fileTypes: ["rust"],
    type: "Iterator"
  },
  
  // Макросы и атрибуты
  {
    prefix: "macro",
    snippet: "macro_rules! $1 {\n    ($2) => {\n        $0\n    };\n}",
    description: "Define a macro",
    fileTypes: ["rust"],
    type: "Macro"
  },
  {
    prefix: "println",
    snippet: "println!(\"$1\", $0);",
    description: "Print to stdout",
    fileTypes: ["rust"],
    type: "Macro"
  },
  {
    prefix: "dbg",
    snippet: "dbg!($1);",
    description: "Debug print",
    fileTypes: ["rust"],
    type: "Macro"
  },
  {
    prefix: "format",
    snippet: "format!(\"$1\", $0)",
    description: "Format string",
    fileTypes: ["rust"],
    type: "Macro"
  },
  {
    prefix: "allow",
    snippet: "#[allow($1)]",
    description: "Allow lint",
    fileTypes: ["rust"],
    type: "Attribute"
  },
  {
    prefix: "cfg",
    snippet: "#[cfg($1)]",
    description: "Conditional compilation",
    fileTypes: ["rust"],
    type: "Attribute"
  },
  
  // Тестирование
  {
    prefix: "test",
    snippet: "#[test]\nfn $1() {\n    $0\n}",
    description: "Test function",
    fileTypes: ["rust"],
    type: "Test"
  },
  {
    prefix: "assert",
    snippet: "assert!($1);",
    description: "Assert",
    fileTypes: ["rust"],
    type: "Test"
  },
  {
    prefix: "assert_eq",
    snippet: "assert_eq!($1, $2);",
    description: "Assert equals",
    fileTypes: ["rust"],
    type: "Test"
  },
  {
    prefix: "assert_ne",
    snippet: "assert_ne!($1, $2);",
    description: "Assert not equals",
    fileTypes: ["rust"],
    type: "Test"
  },
  {
    prefix: "panic",
    snippet: "panic!(\"$1\");",
    description: "Panic",
    fileTypes: ["rust"],
    type: "Error Handling"
  },
  
  // Асинхронность и многопоточность
  {
    prefix: "async",
    snippet: "async $0",
    description: "Async keyword",
    fileTypes: ["rust"],
    type: "Async"
  },
  {
    prefix: "asyncfn",
    snippet: "async fn $1($2) -> $3 {\n    $0\n}",
    description: "Async function",
    fileTypes: ["rust"],
    type: "Async"
  },
  {
    prefix: "await",
    snippet: ".await",
    description: "Await",
    fileTypes: ["rust"],
    type: "Async"
  },
  {
    prefix: "thread",
    snippet: "std::thread::spawn(|| {\n    $0\n})",
    description: "Spawn thread",
    fileTypes: ["rust"],
    type: "Threading"
  },
  
  // Умные указатели и менеджмент памяти
  {
    prefix: "box",
    snippet: "Box::new($1)",
    description: "Box allocation",
    fileTypes: ["rust"],
    type: "Smart Pointer"
  },
  {
    prefix: "rc",
    snippet: "Rc::new($1)",
    description: "Reference counted pointer",
    fileTypes: ["rust"],
    type: "Smart Pointer"
  },
  {
    prefix: "arc",
    snippet: "Arc::new($1)",
    description: "Atomic reference counted pointer",
    fileTypes: ["rust"],
    type: "Smart Pointer"
  },
  {
    prefix: "cell",
    snippet: "Cell::new($1)",
    description: "Cell",
    fileTypes: ["rust"],
    type: "Smart Pointer"
  },
  {
    prefix: "refcell",
    snippet: "RefCell::new($1)",
    description: "RefCell",
    fileTypes: ["rust"],
    type: "Smart Pointer"
  },
  {
    prefix: "mutex",
    snippet: "Mutex::new($1)",
    description: "Mutex",
    fileTypes: ["rust"],
    type: "Synchronization"
  },
  
  // Модульность и импорты
  {
    prefix: "mod",
    snippet: "mod $1 {\n    $0\n}",
    description: "Module definition",
    fileTypes: ["rust"],
    type: "Module"
  },
  {
    prefix: "use",
    snippet: "use $1;",
    description: "Use statement",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "usestd",
    snippet: "use std::$1;",
    description: "Use from std",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "pub",
    snippet: "pub $0",
    description: "Public modifier",
    fileTypes: ["rust"],
    type: "Visibility"
  },
  {
    prefix: "pubstruct",
    snippet: "pub struct $1 {\n    $2\n}",
    description: "Public struct",
    fileTypes: ["rust"],
    type: "Struct"
  },
  
  // Документация
  {
    prefix: "doc",
    snippet: "/// $0",
    description: "Doc comment",
    fileTypes: ["rust"],
    type: "Documentation"
  },
  {
    prefix: "docmod",
    snippet: "//! $0",
    description: "Module doc comment",
    fileTypes: ["rust"],
    type: "Documentation"
  },
  {
    prefix: "docfn",
    snippet: "/// # $1\n///\n/// $2\n///\n/// ## Examples\n///\n/// ```\n/// $3\n/// ```\n$0",
    description: "Function documentation",
    fileTypes: ["rust"],
    type: "Documentation"
  },
  
  // Специфические типы и идиомы Rust
  {
    prefix: "mainfn",
    snippet: "fn main() {\n    $0\n}",
    description: "Main function",
    fileTypes: ["rust"],
    type: "Function"
  },
  {
    prefix: "mainres",
    snippet: "fn main() -> Result<(), Box<dyn std::error::Error>> {\n    $0\n    Ok(())\n}",
    description: "Main function with Result",
    fileTypes: ["rust"],
    type: "Function"
  },
  {
    prefix: "newtype",
    snippet: "pub struct $1(pub $2);",
    description: "Newtype pattern",
    fileTypes: ["rust"],
    type: "Pattern"
  },
  {
    prefix: "fromimpl",
    snippet: "impl From<$1> for $2 {\n    fn from(value: $1) -> Self {\n        $0\n    }\n}",
    description: "Implement From trait",
    fileTypes: ["rust"],
    type: "Implementation"
  },
  {
    prefix: "defaultimpl",
    snippet: "impl Default for $1 {\n    fn default() -> Self {\n        $0\n    }\n}",
    description: "Implement Default trait",
    fileTypes: ["rust"],
    type: "Implementation"
  },
  {
    prefix: "displayimpl",
    snippet: "impl std::fmt::Display for $1 {\n    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {\n        write!(f, \"$0\")\n    }\n}",
    description: "Implement Display trait",
    fileTypes: ["rust"],
    type: "Implementation"
  },
  {
    prefix: "debugimpl",
    snippet: "impl std::fmt::Debug for $1 {\n    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {\n        f.debug_struct(\"$1\")\n            $0\n            .finish()\n    }\n}",
    description: "Implement Debug trait",
    fileTypes: ["rust"],
    type: "Implementation"
  },

  // Дополнительные структуры данных
  {
    prefix: "vec",
    snippet: "vec![$0]",
    description: "Create a new vector",
    fileTypes: ["rust"],
    type: "Collection"
  },
  {
    prefix: "vecwith",
    snippet: "Vec::with_capacity($0)",
    description: "Vector with capacity",
    fileTypes: ["rust"],
    type: "Collection"
  },
  {
    prefix: "hashmap",
    snippet: "HashMap::new()",
    description: "Create a new HashMap",
    fileTypes: ["rust"],
    type: "Collection"
  },
  {
    prefix: "btreemap",
    snippet: "BTreeMap::new()",
    description: "Create a new BTreeMap",
    fileTypes: ["rust"],
    type: "Collection"
  },
  {
    prefix: "hashset",
    snippet: "HashSet::new()",
    description: "Create a new HashSet",
    fileTypes: ["rust"],
    type: "Collection"
  },
  {
    prefix: "vecmapcapacity",
    snippet: "let mut $1 = Vec::with_capacity($2);\n$0",
    description: "Create vector with capacity",
    fileTypes: ["rust"],
    type: "Collection"
  },
  
  // Декларации импортов для часто используемых библиотек
  {
    prefix: "usecollections",
    snippet: "use std::collections::{$0};",
    description: "Import collections",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "usehashmap",
    snippet: "use std::collections::HashMap;",
    description: "Import HashMap",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "useio",
    snippet: "use std::io::{self, $0};",
    description: "Import IO",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "usefs",
    snippet: "use std::fs;",
    description: "Import filesystem",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "usepath",
    snippet: "use std::path::{Path, PathBuf};",
    description: "Import path",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "usesync",
    snippet: "use std::sync::{Arc, Mutex};",
    description: "Import sync primitives",
    fileTypes: ["rust"],
    type: "Import"
  },
  {
    prefix: "useerror",
    snippet: "use std::error::Error;",
    description: "Import Error trait",
    fileTypes: ["rust"],
    type: "Import"
  },
  
  // Специфические Rust шаблоны
  {
    prefix: "errortype",
    snippet: "#[derive(Debug)]\npub struct $1Error {\n    message: String,\n}\n\nimpl std::fmt::Display for $1Error {\n    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {\n        write!(f, \"{}\", self.message)\n    }\n}\n\nimpl std::error::Error for $1Error {}\n",
    description: "Custom error type",
    fileTypes: ["rust"],
    type: "Error Handling"
  },
  {
    prefix: "builder",
    snippet: "pub struct $1Builder {\n    $2\n}\n\nimpl $1Builder {\n    pub fn new() -> Self {\n        Self {\n            $3\n        }\n    }\n    \n    pub fn $4(mut self, value: $5) -> Self {\n        self.$6 = value;\n        self\n    }\n    \n    pub fn build(self) -> Result<$1, Box<dyn std::error::Error>> {\n        Ok($1 {\n            $7\n        })\n    }\n}\n",
    description: "Builder pattern",
    fileTypes: ["rust"],
    type: "Pattern"
  },
  {
    prefix: "cmdargs",
    snippet: "struct Args {\n    $1\n}\n\nfn parse_args() -> Result<Args, Box<dyn std::error::Error>> {\n    let matches = clap::Command::new(env!(\"CARGO_PKG_NAME\"))\n        .version(env!(\"CARGO_PKG_VERSION\"))\n        .about(env!(\"CARGO_PKG_DESCRIPTION\"))\n        .arg(\n            clap::Arg::new(\"$2\")\n                .short('$3')\n                .long(\"$4\")\n                .help(\"$5\")\n                .required($6)\n        )\n        .get_matches();\n\n    Ok(Args {\n        $7\n    })\n}\n",
    description: "Command line arguments",
    fileTypes: ["rust"],
    type: "CLI"
  }
];