export const rustMethods = [
	// String Methods
	{
		name: "String::from",
		description: "Creates a new String from a string literal.",
		snippet: "String::from(${1:input})",
		meta: "String method"
	},
	{
		name: "to_string()",
		description: "Creates a new String from a string literal.",
		snippet: "${1:input}.to_string()",
		meta: "String method"
	},
	{
		name: "push_str",
		description: "Appends a string slice to a String",
		snippet: "${1:string}.push_str(${2:str})",
		meta: "String method"
	},
	{
		name: "push",
		description: "Appends a character to a String",
		snippet: "${1:string}.push(${2:char})",
		meta: "String method"
	},
	{
		name: "replace",
		description: "Replaces all matches of a pattern with another string",
		snippet: "${1:string}.replace(${2:from}, ${3:to})",
		meta: "String method"
	},
	{
		name: "trim",
		description: "Returns a string slice with leading and trailing whitespace removed",
		snippet: "${1:string}.trim()",
		meta: "method"
	},
	{
		name: "split",
		description: "Splits a string slice by a pattern",
		snippet: "${1:string}.split(${2:pattern})",
		meta: "method"
	},
	{
		name: "Vec<>",
		description: "Vec Type",
		snippet: "Vec<{$1:type}>",
		meta: "method"
	},
	{
		name: "Box<>",
		description: "Box Type",
		snippet: "Box<{$1:type}>",
		meta: "method"
	},

	// Vector Methods
	{
		name: "Vec::new",
		description: "Creates a new empty vector",
		snippet: "Vec::new()",
		meta: "method"
	},
	{
		name: "vec!",
		description: "Creates a new vector with the specified elements",
		snippet: "vec![${1:elem1}, ${2:elem2}]",
		meta: "macro"
	},
	{
		name: "push",
		description: "Appends an element to the end of a vector",
		snippet: "${1:vec}.push(${2:value})",
		meta: "method"
	},
	{
		name: "pop",
		description: "Removes and returns the last element",
		snippet: "${1:vec}.pop()",
		meta: "method"
	},
	{
		name: "len",
		description: "Returns the number of elements in the vector",
		snippet: "${1:vec}.len()",
		meta: "method"
	},
	{
		name: "is_empty",
		description: "Returns true if the vector contains no elements",
		snippet: "${1:vec}.is_empty()",
		meta: "method"
	},
	{
		name: "insert",
		description: "Inserts an element at position index",
		snippet: "${1:vec}.insert(${2:index}, ${3:element})",
		meta: "method"
	},
	{
		name: "remove",
		description: "Removes and returns the element at position index",
		snippet: "${1:vec}.remove(${2:index})",
		meta: "method"
	},

	// Option Methods
	{
		name: "Some",
		description: "Creates a Some variant of Option containing a value",
		snippet: "Some(${1:value})",
		meta: "constructor"
	},
	{
		name: "None",
		description: "Creates a None variant of Option",
		snippet: "None",
		meta: "constructor"
	},
	{
		name: "unwrap",
		description: "Returns the contained value or panics if the value is None",
		snippet: "${1:option}.unwrap()",
		meta: "method"
	},
	{
		name: "expect",
		description: "Returns the contained value or panics with the provided message",
		snippet: "${1:option}.expect(${2:\"Error message\"})",
		meta: "method"
	},
	{
		name: "unwrap_or",
		description: "Returns the contained value or a default",
		snippet: "${1:option}.unwrap_or(${2:default})",
		meta: "method"
	},
	{
		name: "unwrap_or_else",
		description: "Returns the contained value or computes it from a closure",
		snippet: "${1:option}.unwrap_or_else(${2:||})",
		meta: "method"
	},
	{
		name: "is_some",
		description: "Returns true if the option is a Some value",
		snippet: "${1:option}.is_some()",
		meta: "method"
	},
	{
		name: "is_none",
		description: "Returns true if the option is a None value",
		snippet: "${1:option}.is_none()",
		meta: "method"
	},

	// Result Methods
	{
		name: "Ok",
		description: "Creates an Ok variant of Result containing a value",
		snippet: "Ok(${1:value})",
		meta: "constructor"
	},
	{
		name: "Err",
		description: "Creates an Err variant of Result containing an error",
		snippet: "Err(${1:error})",
		meta: "constructor"
	},
	{
		name: "unwrap",
		description: "Returns the contained Ok value or panics",
		snippet: "${1:result}.unwrap()",
		meta: "method"
	},
	{
		name: "expect",
		description: "Returns the contained Ok value or panics with the provided message",
		snippet: "${1:result}.expect(${2:\"Error message\"})",
		meta: "method"
	},
	{
		name: "unwrap_or",
		description: "Returns the contained Ok value or a default",
		snippet: "${1:result}.unwrap_or(${2:default})",
		meta: "method"
	},
	{
		name: "unwrap_or_else",
		description: "Returns the contained Ok value or computes it from a closure",
		snippet: "${1:result}.unwrap_or_else(${2:||})",
		meta: "method"
	},
	{
		name: "is_ok",
		description: "Returns true if the result is Ok",
		snippet: "${1:result}.is_ok()",
		meta: "method"
	},
	{
		name: "is_err",
		description: "Returns true if the result is Err",
		snippet: "${1:result}.is_err()",
		meta: "method"
	},

	// Iterator Methods
	{
		name: "iter",
		description: "Creates an iterator from a collection",
		snippet: "${1:collection}.iter()",
		meta: "method"
	},
	{
		name: "into_iter",
		description: "Creates an iterator that takes ownership",
		snippet: "${1:collection}.into_iter()",
		meta: "method"
	},
	{
		name: "map",
		description: "Transforms each element using the provided function",
		snippet: "${1:iter}.map(${2:|item| })",
		meta: "method"
	},
	{
		name: "filter",
		description: "Filters elements based on a predicate",
		snippet: "${1:iter}.filter(${2:|item| })",
		meta: "method"
	},
	{
		name: "collect",
		description: "Collects iterator elements into a collection",
		snippet: "${1:iter}.collect::<${2:Vec<_>}>()",
		meta: "method"
	},
	{
		name: "fold",
		description: "Folds the elements using an accumulator and function",
		snippet: "${1:iter}.fold(${2:initial}, ${3:|acc, item| })",
		meta: "method"
	},
	{
		name: "enumerate",
		description: "Adds an index to each element",
		snippet: "${1:iter}.enumerate()",
		meta: "method"
	},
	{
		name: "find",
		description: "Finds the first element satisfying a predicate",
		snippet: "${1:iter}.find(${2:|item| })",
		meta: "method"
	},

	// File I/O Methods
	{
		name: "openfile",
		description: "Opens a file in read-only mode",
		snippet: "File::open(${1:\"path\"})?",
		meta: "method"
	},
	{
		name: "createfile",
		description: "Creates or truncates a file for writing",
		snippet: "File::create(${1:\"path\"})?",
		meta: "method"
	},
	{
		name: "read_to_string",
		description: "Reads file contents into a string",
		snippet: "${1:file}.read_to_string(&mut ${2:string})?",
		meta: "method"
	},
	{
		name: "write_all",
		description: "Writes a buffer to a file",
		snippet: "${1:file}.write_all(${2:bytes})?",
		meta: "method"
	},

	// Hash Map Methods
	{
		name: "HashMap::new",
		description: "Creates a new empty hash map",
		snippet: "HashMap::new()",
		meta: "method"
	},
	{
		name: "insert",
		description: "Inserts a key-value pair into the map",
		snippet: "${1:map}.insert(${2:key}, ${3:value})",
		meta: "method"
	},
	{
		name: "get",
		description: "Gets a reference to the value for the key",
		snippet: "${1:map}.get(&${2:key})",
		meta: "method"
	},
	{
		name: "remove",
		description: "Removes a key from the map, returning its value",
		snippet: "${1:map}.remove(&${2:key})",
		meta: "method"
	},
	{
		name: "contains_key",
		description: "Returns true if the map contains the key",
		snippet: "${1:map}.contains_key(&${2:key})",
		meta: "method"
	},

	// Thread and Concurrency Methods
	{
		name: "thread::spawn",
		description: "Spawns a new thread",
		snippet: "thread::spawn(${1:|| {}})",
		meta: "function"
	},
	{
		name: "Mutex::new",
		description: "Creates a new mutex",
		snippet: "Mutex::new(${1:value})",
		meta: "method"
	},
	{
		name: "Arc::new",
		description: "Creates a new thread-safe reference-counted pointer",
		snippet: "Arc::new(${1:value})",
		meta: "method"
	},

	// Smart Pointers
	{
		name: "Box::new",
		description: "Creates a new box (heap allocation)",
		snippet: "Box::new(${1:value})",
		meta: "method"
	},
	{
		name: "Rc::new",
		description: "Creates a new reference-counted pointer",
		snippet: "Rc::new(${1:value})",
		meta: "method"
	},
	{
		name: "RefCell::new",
		description: "Creates a new mutable memory location with dynamic borrowing",
		snippet: "RefCell::new(${1:value})",
		meta: "method"
	},

	// Error Handling
	{
		name: "panic!",
		description: "Stops execution and unwinds the stack",
		snippet: "panic!(${1:\"message\"})",
		meta: "macro"
	},
	{
		name: "map_err",
		description: "Maps a Result's error value",
		snippet: "${1:result}.map_err(${2:|e| })",
		meta: "method"
	},
	{
		name: "and_then",
		description: "Chains operations that might fail",
		snippet: "${1:result}.and_then(${2:|value| })",
		meta: "method"
	},
	{
		name: "?",
		description: "Error propagation operator",
		snippet: "${1:result}?",
		meta: "operator"
	},

	// Common Traits
	{
		name: "clone",
		description: "Creates a copy of a value",
		snippet: "${1:value}.clone()",
		meta: "method"
	},
	{
		name: "drop",
		description: "Manually drops a value",
		snippet: "drop(${1:value})",
		meta: "function"
	},
	{
		name: "default",
		description: "Creates a default value for a type",
		snippet: "${1:Type}::default()",
		meta: "method"
	},
	{
		name: "eq",
		description: "Tests for equality",
		snippet: "${1:a}.eq(&${2:b})",
		meta: "method"
	},
	{
		name: "cmp",
		description: "Compares two values",
		snippet: "${1:a}.cmp(&${2:b})",
		meta: "method"
	},

	// Async/Await
	{
		name: "async",
		description: "Defines an asynchronous function or block",
		snippet: "async ${1:fn name() {}}",
		meta: "keyword"
	},
	{
		name: "await",
		description: "Waits for an async operation to complete",
		snippet: "${1:future}.await",
		meta: "operator"
	},
	{
		name: "tokio::spawn",
		description: "Spawns a new asynchronous task",
		snippet: "tokio::spawn(async move {${1:}})",
		meta: "function"
	},

	// Testing
	{
		name: "assert!",
		description: "Asserts that a boolean expression is true",
		snippet: "assert!(${1:expression})",
		meta: "macro"
	},
	{
		name: "assert_eq!",
		description: "Asserts that two expressions are equal",
		snippet: "assert_eq!(${1:left}, ${2:right})",
		meta: "macro"
	},
	{
		name: "assert_ne!",
		description: "Asserts that two expressions are not equal",
		snippet: "assert_ne!(${1:left}, ${2:right})",
		meta: "macro"
	},
	// String Methods
	{
		name: "ends_with",
		description: "Checks if a string ends with a given pattern",
		snippet: "${1:string}.ends_with(${2:pattern})",
		meta: "method"
	},
	{
		name: "starts_with",
		description: "Checks if a string starts with a given pattern",
		snippet: "${1:string}.starts_with(${2:pattern})",
		meta: "method"
	},
	{
		name: "to_lowercase",
		description: "Converts a string to lowercase",
		snippet: "${1:string}.to_lowercase()",
		meta: "method"
	},
	{
		name: "to_uppercase",
		description: "Converts a string to uppercase",
		snippet: "${1:string}.to_uppercase()",
		meta: "method"
	},
	{
		name: "repeat",
		description: "Repeats a string a specified number of times",
		snippet: "${1:string}.repeat(${2:n})",
		meta: "method"
	},

	// Vector Methods
	{
		name: "retain",
		description: "Retains only the elements specified by the predicate",
		snippet: "${1:vec}.retain(${2:|x| x > 0})",
		meta: "method"
	},
	{
		name: "clear",
		description: "Removes all elements from the vector",
		snippet: "${1:vec}.clear()",
		meta: "method"
	},
	{
		name: "drain",
		description: "Creates an iterator that removes elements from the vector",
		snippet: "${1:vec}.drain(${2:start..end})",
		meta: "method"
	},
	{
		name: "resize",
		description: "Resizes the vector to the specified length",
		snippet: "${1:vec}.resize(${2:new_len}, ${3:value})",
		meta: "method"
	},
	{
		name: "dedup",
		description: "Removes consecutive repeated elements",
		snippet: "${1:vec}.dedup()",
		meta: "method"
	},

	// Option Methods
	{
		name: "map",
		description: "Applies a function to the contained value",
		snippet: "${1:option}.map(${2:|x| x + 1})",
		meta: "method"
	},
	{
		name: "and_then",
		description: "Chains another Option-producing function",
		snippet: "${1:option}.and_then(${2:|x| Some(x + 1)})",
		meta: "method"
	},
	{
		name: "or_else",
		description: "Returns the contained value or evaluates a closure",
		snippet: "${1:option}.or_else(${2:|| Some(default)})",
		meta: "method"
	},

	// Result Methods
	{
		name: "map_err",
		description: "Transforms the error inside the Result",
		snippet: "${1:result}.map_err(${2:|e| format!(\"Error: {}\", e)})",
		meta: "method"
	},
	{
		name: "and",
		description: "Returns Ok if both Results are Ok",
		snippet: "${1:result}.and(${2:Ok(value)})",
		meta: "method"
	},
	{
		name: "or",
		description: "Returns Ok if either Result is Ok",
		snippet: "${1:result}.or(${2:Ok(alternative)})",
		meta: "method"
	},

	// Iterator Methods
	{
		name: "zip",
		description: "Combines two iterators into a single iterator of pairs",
		snippet: "${1:iter1}.zip(${2:iter2})",
		meta: "method"
	},
	{
		name: "take",
		description: "Takes the first n elements from the iterator",
		snippet: "${1:iter}.take(${2:n})",
		meta: "method"
	},
	{
		name: "skip",
		description: "Skips the first n elements of the iterator",
		snippet: "${1:iter}.skip(${2:n})",
		meta: "method"
	},
	{
		name: "flat_map",
		description: "Maps and flattens an iterator",
		snippet: "${1:iter}.flat_map(${2:|x| x.iter()})",
		meta: "method"
	},
	{
		name: "any",
		description: "Checks if any element matches a predicate",
		snippet: "${1:iter}.any(${2:|x| x > 0})",
		meta: "method"
	},

	// File I/O Methods
	{
		name: "metadata",
		description: "Retrieves metadata for a file",
		snippet: "${1:std::fs::metadata}(${2:\"path\"})?",
		meta: "method"
	},
	{
		name: "fileread",
		description: "Reads data from a file into a buffer",
		snippet: "${1:file}.read(&mut ${2:buffer})?",
		meta: "method"
	},
	{
		name: "filewrite",
		description: "Writes data from a buffer to a file",
		snippet: "${1:file}.write(&${2:buffer})?",
		meta: "method"
	},

	// Hash Map Methods
	{
		name: "entry",
		description: "Gets the entry for a key for in-place modification",
		snippet: "${1:map}.entry(${2:key})",
		meta: "method"
	},
	{
		name: "keys",
		description: "Returns an iterator over the keys of the map",
		snippet: "${1:map}.keys()",
		meta: "method"
	},
	{
		name: "values",
		description: "Returns an iterator over the values of the map",
		snippet: "${1:map}.values()",
		meta: "method"
	},
	{
		name: "iter",
		description: "Returns an iterator over key-value pairs",
		snippet: "${1:map}.iter()",
		meta: "method"
	},

	// Thread and Concurrency Methods
	{
		name: "join",
		description: "Waits for a thread to finish and returns its result",
		snippet: "${1:thread_handle}.join().unwrap()",
		meta: "method"
	},
	{
		name: "RwLock::new",
		description: "Creates a new read-write lock",
		snippet: "RwLock::new(${1:value})",
		meta: "method"
	},
	{
		name: "Condvar::new",
		description: "Creates a new condition variable",
		snippet: "Condvar::new()",
		meta: "method"
	},

	// Smart Pointers
	{
		name: "clone",
		description: "Clones a reference-counted pointer",
		snippet: "${1:rc}.clone()",
		meta: "method"
	},
	{
		name: "upgrade",
		description: "Upgrades a Weak pointer to an Rc if possible",
		snippet: "${1:weak}.upgrade()",
		meta: "method"
	},
	{
		name: "borrow",
		description: "Immutably borrows the value inside a RefCell",
		snippet: "${1:refcell}.borrow()",
		meta: "method"
	},
	{
		name: "borrow_mut",
		description: "Mutably borrows the value inside a RefCell",
		snippet: "${1:refcell}.borrow_mut()",
		meta: "method"
	},

	// Error Handling
	{
		name: "unwrap_err",
		description: "Returns the contained Err value or panics",
		snippet: "${1:result}.unwrap_err()",
		meta: "method"
	},
	{
		name: "Result::inspect",
		description: "Calls a closure on the contained Ok value for inspection",
		snippet: "${1:result}.inspect(${2:|x| println!(\"{:?}\", x)})",
		meta: "method"
	},

	// Common Traits
	{
		name: "Debug::fmt",
		description: "Formats a value using the Debug trait",
		snippet: "format!(\"{:?}\", ${1:value})",
		meta: "method"
	},
	{
		name: "PartialOrd::partial_cmp",
		description: "Partially compares two values",
		snippet: "${1:a}.partial_cmp(&${2:b})",
		meta: "method"
	},

	// Async/Await
	{
		name: "futures::join",
		description: "Waits for multiple futures to complete concurrently",
		snippet: "futures::join!(${1:future1}, ${2:future2})",
		meta: "macro"
	},
	{
		name: "tokio::select",
		description: "Waits for the first of multiple async branches",
		snippet: "tokio::select! { ${1:future} => {}, }",
		meta: "macro"
	},

	// Testing
	{
		name: "assert_matches!",
		description: "Asserts that a value matches a pattern",
		snippet: "assert_matches!(${1:value}, ${2:pattern})",
		meta: "macro"
	},
	{
		name: "bench",
		description: "Benchmarks a piece of code",
		snippet: "#[bench]\nfn ${1:test_name}(b: &mut test::Bencher) { b.iter(|| ${2:code}); }",
		meta: "macro"
	},
	// --- Тригонометрические функции ---
	{
		name: "sin()",
		snippet: "${1:x}.sin()",
		description: "Trigonometry",
		meta: "method"
	},
	{
		name: "cos()",
		snippet: "${1:x}.cos()",
		description: "Trigonometry",
		meta: "method"
	},
	{
		name: "tan()",
		snippet: "${1:x}.tan()",
		description: "Trigonometry",
		meta: "method"
	},
	{
		name: "asin()",
		snippet: "${1:x}.asin()",
		description: "Inverse Trigonometry",
		meta: "method"
	},
	{
		name: "acos()",
		snippet: "${1:x}.acos()",
		description: "Inverse Trigonometry",
		meta: "method"
	},
	{
		name: "atan()",
		snippet: "${1:x}.atan()",
		description: "Inverse Trigonometry",
		meta: "method"
	},
	{
		name: "atan2()",
		snippet: "${1:y}.atan2(${2:x})",
		description: "atan2(y, x)",
		meta: "method"
	},

	// --- Гиперболические функции ---
	{
		name: "sinh()",
		snippet: "${1:x}.sinh()",
		description: "Hyperbolic",
		meta: "method"
	},
	{
		name: "cosh()",
		snippet: "${1:x}.cosh()",
		description: "Hyperbolic",
		meta: "method"
	},
	{
		name: "tanh()",
		snippet: "${1:x}.tanh()",
		description: "Hyperbolic",
		meta: "method"
	},

	// --- Логарифмические функции ---
	{
		name: "ln()",
		snippet: "${1:x}.ln()",
		description: "Natural logarithm",
		meta: "method"
	},
	{
		name: "log10()",
		snippet: "${1:x}.log10()",
		description: "Base-10 logarithm",
		meta: "method"
	},
	{
		name: "log2()",
		snippet: "${1:x}.log2()",
		description: "Base-2 logarithm",
		meta: "method"
	},
	{
		name: "ln_1p()",
		snippet: "${1:x}.ln_1p()",
		description: "ln(1 + x)",
		meta: "method"
	},

	// --- Экспоненциальные функции ---
	{
		name: "exp()",
		snippet: "${1:x}.exp()",
		description: "e^x",
		meta: "method"
	},
	{
		name: "exp2()",
		snippet: "${1:x}.exp2()",
		description: "2^x",
		meta: "method"
	},
	{
		name: "exp_m1()",
		snippet: "${1:x}.exp_m1()",
		description: "e^x - 1",
		meta: "method"
	},

	// --- Степенные функции ---
	{
		name: "powf()",
		snippet: "${1:x}.powf(${2:p})",
		description: "x^p",
		meta: "method"
	},
	{
		name: "sqrt()",
		snippet: "${1:x}.sqrt()",
		description: "Square root",
		meta: "method"
	},
	{
		name: "cbrt()",
		snippet: "${1:x}.cbrt()",
		description: "Cube root",
		meta: "method"
	},
	{
		name: "hypot()",
		snippet: "${1:x}.hypot(${2:y})",
		description: "Hypotenuse",
		meta: "method"
	},

	// --- Функции округления ---
	{
		name: "round()",
		snippet: "${1:x}.round()",
		description: "Round to nearest integer",
		meta: "method"
	},
	{
		name: "floor()",
		snippet: "${1:x}.floor()",
		description: "Round down",
		meta: "method"
	},
	{
		name: "ceil()",
		snippet: "${1:x}.ceil()",
		description: "Round up",
		meta: "method"
	},
	{
		name: "trunc()",
		snippet: "${1:x}.trunc()",
		description: "Truncate decimal",
		meta: "method"
	},
	{
		name: "fract()",
		snippet: "${1:x}.fract()",
		description: "Fractional part",
		meta: "method"
	},

	// --- Методы проверки ---
	{
		name: "is_nan()",
		snippet: "${1:x}.is_nan()",
		description: "Check NaN",
		meta: "method"
	},
	{
		name: "is_finite()",
		snippet: "${1:x}.is_finite()",
		description: "Check finite",
		meta: "method"
	},
	{
		name: "is_infinite()",
		snippet: "${1:x}.is_infinite()",
		description: "Check infinity",
		meta: "method"
	},
	{
		name: "is_normal()",
		snippet: "${1:x}.is_normal()",
		description: "Check normal",
		meta: "method"
	},
	{
		name: "is_subnormal()",
		snippet: "${1:x}.is_subnormal()",
		description: "Check subnormal",
		meta: "method"
	},

	// --- Методы сравнения ---
	{
		name: "min()",
		snippet: "${1:x}.min(${2:y})",
		description: "Minimum",
		meta: "method"
	},
	{
		name: "max()",
		snippet: "${1:x}.max(${2:y})",
		description: "Maximum",
		meta: "method"
	},
	{
		name: "partial_cmp()",
		snippet: "${1:x}.partial_cmp(&${2:y})",
		description: "Partial comparison",
		meta: "method"
	},

	// --- Работа с знаком ---
	{
		name: "abs()",
		snippet: "${1:x}.abs()",
		description: "Absolute value",
		meta: "method"
	},
	{
		name: "signum()",
		snippet: "${1:x}.signum()",
		description: "Sign",
		meta: "method"
	},
	{
		name: "copysign()",
		snippet: "${1:x}.copysign(${2:sign})",
		description: "Copy sign",
		meta: "method"
	},

	// --- Методы разбора ---
	{
		name: "to_bits()",
		snippet: "${1:x}.to_bits()",
		description: "To raw bits",
		meta: "method"
	},
	{
		name: "from_bits()",
		snippet: "f32::from_bits(${1:bits})",
		description: "From raw bits",
		meta: "method"
	},
	{
		name: "is_alphabetic()",
		description: "Checks if the character is alphabetic (letters like a-z, A-Z, and other Unicode alphabets)",
		snippet: "${1:ch}.is_alphabetic()",
		meta: "method"
	},
	{
		name: "is_numeric()",
		description: "Checks if the character is numeric (digits like 0-9 and other Unicode digits)",
		snippet: "${1:ch}.is_numeric()",
		meta: "method"
	},
	{
		name: "to_uppercase()",
		description: "Returns an iterator over the uppercase equivalent(s) of the character (may produce multiple characters)",
		snippet: "${1:ch}.to_uppercase()",
		meta: "method"
	},
	{
		name: "to_lowercase()",
		description: "Returns an iterator over the lowercase equivalent(s) of the character (may produce multiple characters)",
		snippet: "${1:ch}.to_lowercase()",
		meta: "method"
	},
	{
		name: "binary_search()",
		description: "Performs a binary search on sorted slice, returning Ok(index) if found or Err(insert_index) if not found.",
		snippet: "${1:arr}.binary_search(&${2:item})",
		meta: "method"
	},
	{
		name: "contains()",
		description: "Checks if the slice contains a given element using linear search.",
		snippet: "${1:arr}.contains(&${2:item})",
		meta: "method"
	},
	{
		name: "sort()",
		description: "Sorts the slice in place using an adaptive, stable, and memory-efficient sort.",
		snippet: "${1:arr}.sort()",
		meta: "method"
	},
  // Combinators
  {
    name: "map()",
    description: "Transforms each element of the iterator using the provided function",
    snippet: "${1:iter}.map(|x| { /* transform x */ })",
    meta: "method"
  },
  {
    name: "filter()",
    description: "Filters elements, keeping only those for which the predicate returns true",
    snippet: "${1:iter}.filter(|x| { /* condition */ })",
    meta: "method"
  },
  {
    name: "take()",
    description: "Takes the first n elements from the iterator and stops",
    snippet: "${1:iter}.take(${2:n})",
    meta: "method"
  },
  {
    name: "skip()",
    description: "Skips the first n elements and yields the rest",
    snippet: "${1:iter}.skip(${2:n})",
    meta: "method"
  },
  {
    name: "chain()",
    description: "Chains two iterators sequentially, yielding all elements from the first, then the second",
    snippet: "${1:iter1}.chain(${2:iter2})",
    meta: "method"
  },
  {
    name: "zip()",
    description: "Combines two iterators into a single iterator of pairs",
    snippet: "${1:iter1}.zip(${2:iter2})",
    meta: "method"
  },
  {
    name: "enumerate()",
    description: "Yields pairs (index, element) where index is the element's position starting at 0",
    snippet: "${1:iter}.enumerate()",
    meta: "method"
  },

  // Consumers (Collection and Reduction)
  {
    name: "collect()",
    description: "Collects all elements from the iterator into a collection (e.g., Vec, HashSet)",
    snippet: "${1:iter}.collect::<${2:Vec<_}>>()",
    meta: "method"
  },
  {
    name: "count()",
    description: "Counts the number of elements in the iterator",
    snippet: "${1:iter}.count()",
    meta: "method"
  },
  {
    name: "sum()",
    description: "Computes the sum of all elements (requires elements to implement Add + Zero)",
    snippet: "${1:iter}.sum::<${2:i32}>()",
    meta: "method"
  },
  {
    name: "fold()",
    description: "Accumulates all elements by repeatedly applying a closure, starting from an initial value",
    snippet: "${1:iter}.fold(${2:init}, |acc, x| { /* combine acc and x */ })",
    meta: "method"
  },
  {
    name: "reduce()",
    description: "Combines elements using a closure without an initial value (returns Option)",
    snippet: "${1:iter}.reduce(|acc, x| { /* combine acc and x */ })",
    meta: "method"
  },

  // Specific iterator methods
  {
    name: "rev()",
    description: "Reverses the direction of the iterator (only for DoubleEndedIterator)",
    snippet: "${1:iter}.rev()",
    meta: "method"
  },
  {
    name: "peekable()",
    description: "Creates an iterator that allows peeking at the next element without consuming it",
    snippet: "${1:iter}.peekable()",
    meta: "method"
  },
  {
    name: "inspect()",
    description: "Calls a closure on each element for side effects, passing elements through unchanged",
    snippet: "${1:iter}.inspect(|x| { /* side effect */ })",
    meta: "method"
  },
  {
    name: "cmp()",
    description: "Calls a closure on each element for side effects, passing elements through unchanged",
    snippet: "${1:iter}.inspect(|x| { /* side effect */ })",
    meta: "method"
  }
];