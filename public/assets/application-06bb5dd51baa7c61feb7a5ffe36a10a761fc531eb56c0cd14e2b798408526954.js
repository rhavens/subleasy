/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
;
(function() {
  this.Gmaps = {
    build: function(type, options) {
      var model;
      if (options == null) {
        options = {};
      }
      model = _.isFunction(options.handler) ? options.handler : Gmaps.Objects.Handler;
      return new model(type, options);
    },
    Builders: {},
    Objects: {},
    Google: {
      Objects: {},
      Builders: {}
    }
  };

}).call(this);
(function() {
  var moduleKeywords,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  this.Gmaps.Base = (function() {
    function Base() {}

    Base.extend = function(obj) {
      var key, ref, value;
      for (key in obj) {
        value = obj[key];
        if (indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((ref = obj.extended) != null) {
        ref.apply(this);
      }
      return this;
    };

    Base.include = function(obj) {
      var key, ref, value;
      for (key in obj) {
        value = obj[key];
        if (indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((ref = obj.included) != null) {
        ref.apply(this);
      }
      return this;
    };

    return Base;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.BaseBuilder = (function() {
    function BaseBuilder() {}

    BaseBuilder.prototype.build = function() {
      return new (this.model_class())(this.serviceObject);
    };

    BaseBuilder.prototype.before_init = function() {};

    BaseBuilder.prototype.after_init = function() {};

    BaseBuilder.prototype.addListener = function(action, fn) {
      return this.primitives().addListener(this.getServiceObject(), action, fn);
    };

    BaseBuilder.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    BaseBuilder.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    BaseBuilder.prototype.model_class = function() {
      return this.constructor.OBJECT;
    };

    return BaseBuilder;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.Builders = function(builderClass, objectClass, primitivesProvider) {
    return {
      build: function(args, provider_options, internal_options) {
        var builder;
        objectClass.PRIMITIVES = primitivesProvider;
        builderClass.OBJECT = objectClass;
        builderClass.PRIMITIVES = primitivesProvider;
        builder = new builderClass(args, provider_options, internal_options);
        return builder.build();
      }
    };
  };

}).call(this);
(function() {
  this.Gmaps.Objects.Handler = (function() {
    function Handler(type, options) {
      this.type = type;
      if (options == null) {
        options = {};
      }
      this.setPrimitives(options);
      this.setOptions(options);
      this._cacheAllBuilders();
      this.resetBounds();
    }

    Handler.prototype.buildMap = function(options, onMapLoad) {
      if (onMapLoad == null) {
        onMapLoad = function() {};
      }
      return this.map = this._builder('Map').build(options, (function(_this) {
        return function() {
          _this._createClusterer();
          return onMapLoad();
        };
      })(this));
    };

    Handler.prototype.addMarkers = function(markers_data, provider_options) {
      return _.map(markers_data, (function(_this) {
        return function(marker_data) {
          return _this.addMarker(marker_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addMarker = function(marker_data, provider_options) {
      var marker;
      marker = this._builder('Marker').build(marker_data, provider_options, this.marker_options);
      marker.setMap(this.getMap());
      this.clusterer.addMarker(marker);
      return marker;
    };

    Handler.prototype.addCircles = function(circles_data, provider_options) {
      return _.map(circles_data, (function(_this) {
        return function(circle_data) {
          return _this.addCircle(circle_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addCircle = function(circle_data, provider_options) {
      return this._addResource('circle', circle_data, provider_options);
    };

    Handler.prototype.addPolylines = function(polylines_data, provider_options) {
      return _.map(polylines_data, (function(_this) {
        return function(polyline_data) {
          return _this.addPolyline(polyline_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addPolyline = function(polyline_data, provider_options) {
      return this._addResource('polyline', polyline_data, provider_options);
    };

    Handler.prototype.addPolygons = function(polygons_data, provider_options) {
      return _.map(polygons_data, (function(_this) {
        return function(polygon_data) {
          return _this.addPolygon(polygon_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addPolygon = function(polygon_data, provider_options) {
      return this._addResource('polygon', polygon_data, provider_options);
    };

    Handler.prototype.addKmls = function(kmls_data, provider_options) {
      return _.map(kmls_data, (function(_this) {
        return function(kml_data) {
          return _this.addKml(kml_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addKml = function(kml_data, provider_options) {
      return this._addResource('kml', kml_data, provider_options);
    };

    Handler.prototype.removeMarkers = function(gem_markers) {
      return _.map(gem_markers, (function(_this) {
        return function(gem_marker) {
          return _this.removeMarker(gem_marker);
        };
      })(this));
    };

    Handler.prototype.removeMarker = function(gem_marker) {
      gem_marker.clear();
      return this.clusterer.removeMarker(gem_marker);
    };

    Handler.prototype.fitMapToBounds = function() {
      return this.map.fitToBounds(this.bounds.getServiceObject());
    };

    Handler.prototype.getMap = function() {
      return this.map.getServiceObject();
    };

    Handler.prototype.setOptions = function(options) {
      this.marker_options = _.extend(this._default_marker_options(), options.markers);
      this.builders = _.extend(this._default_builders(), options.builders);
      return this.models = _.extend(this._default_models(), options.models);
    };

    Handler.prototype.resetBounds = function() {
      return this.bounds = this._builder('Bound').build();
    };

    Handler.prototype.setPrimitives = function(options) {
      return this.primitives = options.primitives === void 0 ? this._rootModule().Primitives() : _.isFunction(options.primitives) ? options.primitives() : options.primitives;
    };

    Handler.prototype.currentInfowindow = function() {
      return this.builders.Marker.CURRENT_INFOWINDOW;
    };

    Handler.prototype._addResource = function(resource_name, resource_data, provider_options) {
      var resource;
      resource = this._builder(resource_name).build(resource_data, provider_options);
      resource.setMap(this.getMap());
      return resource;
    };

    Handler.prototype._cacheAllBuilders = function() {
      var that;
      that = this;
      return _.each(['Bound', 'Circle', 'Clusterer', 'Kml', 'Map', 'Marker', 'Polygon', 'Polyline'], function(kind) {
        return that._builder(kind);
      });
    };

    Handler.prototype._clusterize = function() {
      return _.isObject(this.marker_options.clusterer);
    };

    Handler.prototype._createClusterer = function() {
      return this.clusterer = this._builder('Clusterer').build({
        map: this.getMap()
      }, this.marker_options.clusterer);
    };

    Handler.prototype._default_marker_options = function() {
      return _.clone({
        singleInfowindow: true,
        maxRandomDistance: 0,
        clusterer: {
          maxZoom: 5,
          gridSize: 50
        }
      });
    };

    Handler.prototype._builder = function(name) {
      var name1;
      name = this._capitalize(name);
      if (this[name1 = "__builder" + name] == null) {
        this[name1] = Gmaps.Objects.Builders(this.builders[name], this.models[name], this.primitives);
      }
      return this["__builder" + name];
    };

    Handler.prototype._default_models = function() {
      var models;
      models = _.clone(this._rootModule().Objects);
      if (this._clusterize()) {
        return models;
      } else {
        models.Clusterer = Gmaps.Objects.NullClusterer;
        return models;
      }
    };

    Handler.prototype._capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Handler.prototype._default_builders = function() {
      return _.clone(this._rootModule().Builders);
    };

    Handler.prototype._rootModule = function() {
      if (this.__rootModule == null) {
        this.__rootModule = Gmaps[this.type];
      }
      return this.__rootModule;
    };

    return Handler;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.NullClusterer = (function() {
    function NullClusterer() {}

    NullClusterer.prototype.addMarkers = function() {};

    NullClusterer.prototype.addMarker = function() {};

    NullClusterer.prototype.clear = function() {};

    NullClusterer.prototype.removeMarker = function() {};

    return NullClusterer;

  })();

}).call(this);
(function() {
  this.Gmaps.Google.Objects.Common = {
    getServiceObject: function() {
      return this.serviceObject;
    },
    setMap: function(map) {
      return this.getServiceObject().setMap(map);
    },
    clear: function() {
      return this.getServiceObject().setMap(null);
    },
    show: function() {
      return this.getServiceObject().setVisible(true);
    },
    hide: function() {
      return this.getServiceObject().setVisible(false);
    },
    isVisible: function() {
      return this.getServiceObject().getVisible();
    },
    primitives: function() {
      return this.constructor.PRIMITIVES;
    }
  };

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Bound = (function(superClass) {
    extend(Bound, superClass);

    function Bound(options) {
      this.before_init();
      this.serviceObject = new (this.primitives().latLngBounds);
      this.after_init();
    }

    return Bound;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Circle = (function(superClass) {
    extend(Circle, superClass);

    function Circle(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_circle();
      this.after_init();
    }

    Circle.prototype.create_circle = function() {
      return new (this.primitives().circle)(this.circle_options());
    };

    Circle.prototype.circle_options = function() {
      var base_options;
      base_options = {
        center: new (this.primitives().latLng)(this.args.lat, this.args.lng),
        radius: this.args.radius
      };
      return _.defaults(base_options, this.provider_options);
    };

    return Circle;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Clusterer = (function(superClass) {
    extend(Clusterer, superClass);

    function Clusterer(args, options) {
      this.args = args;
      this.options = options;
      this.before_init();
      this.serviceObject = new (this.primitives().clusterer)(this.args.map, [], this.options);
      this.after_init();
    }

    return Clusterer;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Kml = (function(superClass) {
    extend(Kml, superClass);

    function Kml(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_kml();
      this.after_init();
    }

    Kml.prototype.create_kml = function() {
      return new (this.primitives().kml)(this.args.url, this.kml_options());
    };

    Kml.prototype.kml_options = function() {
      var base_options;
      base_options = {};
      return _.defaults(base_options, this.provider_options);
    };

    return Kml;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Map = (function(superClass) {
    extend(Map, superClass);

    function Map(options, onMapLoad) {
      var provider_options;
      this.before_init();
      provider_options = _.extend(this.default_options(), options.provider);
      this.internal_options = options.internal;
      this.serviceObject = new (this.primitives().map)(document.getElementById(this.internal_options.id), provider_options);
      this.on_map_load(onMapLoad);
      this.after_init();
    }

    Map.prototype.build = function() {
      return new (this.model_class())(this.serviceObject, this.primitives());
    };

    Map.prototype.on_map_load = function(onMapLoad) {
      return this.primitives().addListenerOnce(this.serviceObject, 'idle', onMapLoad);
    };

    Map.prototype.default_options = function() {
      return {
        mapTypeId: this.primitives().mapTypes('ROADMAP'),
        center: new (this.primitives().latLng)(0, 0),
        zoom: 8
      };
    };

    return Map;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Marker = (function(superClass) {
    extend(Marker, superClass);

    Marker.CURRENT_INFOWINDOW = void 0;

    Marker.CACHE_STORE = {};

    function Marker(args, provider_options, internal_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.internal_options = internal_options != null ? internal_options : {};
      this.infowindow_binding = bind(this.infowindow_binding, this);
      this.before_init();
      this.create_marker();
      this.create_infowindow_on_click();
      this.after_init();
    }

    Marker.prototype.build = function() {
      return this.marker = new (this.model_class())(this.serviceObject);
    };

    Marker.prototype.create_marker = function() {
      return this.serviceObject = new (this.primitives().marker)(this.marker_options());
    };

    Marker.prototype.create_infowindow = function() {
      if (!_.isString(this.args.infowindow)) {
        return null;
      }
      return new (this.primitives().infowindow)({
        content: this.args.infowindow
      });
    };

    Marker.prototype.marker_options = function() {
      var base_options, coords;
      coords = this._randomized_coordinates();
      base_options = {
        title: this.args.marker_title,
        position: new (this.primitives().latLng)(coords[0], coords[1]),
        icon: this._get_picture('picture'),
        shadow: this._get_picture('shadow')
      };
      return _.extend(this.provider_options, base_options);
    };

    Marker.prototype.create_infowindow_on_click = function() {
      return this.addListener('click', this.infowindow_binding);
    };

    Marker.prototype.infowindow_binding = function() {
      var base;
      if (this._should_close_infowindow()) {
        this.constructor.CURRENT_INFOWINDOW.close();
      }
      this.marker.panTo();
      if (this.infowindow == null) {
        this.infowindow = this.create_infowindow();
      }
      if (this.infowindow == null) {
        return;
      }
      this.infowindow.open(this.getServiceObject().getMap(), this.getServiceObject());
      if ((base = this.marker).infowindow == null) {
        base.infowindow = this.infowindow;
      }
      return this.constructor.CURRENT_INFOWINDOW = this.infowindow;
    };

    Marker.prototype._get_picture = function(picture_name) {
      if (!_.isObject(this.args[picture_name]) || !_.isString(this.args[picture_name].url)) {
        return null;
      }
      return this._create_or_retrieve_image(this._picture_args(picture_name));
    };

    Marker.prototype._create_or_retrieve_image = function(picture_args) {
      if (this.constructor.CACHE_STORE[picture_args.url] === void 0) {
        this.constructor.CACHE_STORE[picture_args.url] = new (this.primitives().markerImage)(picture_args.url, picture_args.size, picture_args.origin, picture_args.anchor, picture_args.scaledSize);
      }
      return this.constructor.CACHE_STORE[picture_args.url];
    };

    Marker.prototype._picture_args = function(picture_name) {
      return {
        url: this.args[picture_name].url,
        anchor: this._createImageAnchorPosition(this.args[picture_name].anchor),
        size: new (this.primitives().size)(this.args[picture_name].width, this.args[picture_name].height),
        scaledSize: null,
        origin: null
      };
    };

    Marker.prototype._createImageAnchorPosition = function(anchorLocation) {
      if (!_.isArray(anchorLocation)) {
        return null;
      }
      return new (this.primitives().point)(anchorLocation[0], anchorLocation[1]);
    };

    Marker.prototype._should_close_infowindow = function() {
      return this.internal_options.singleInfowindow && (this.constructor.CURRENT_INFOWINDOW != null);
    };

    Marker.prototype._randomized_coordinates = function() {
      var Lat, Lng, dx, dy, random;
      if (!_.isNumber(this.internal_options.maxRandomDistance)) {
        return [this.args.lat, this.args.lng];
      }
      random = function() {
        return Math.random() * 2 - 1;
      };
      dx = this.internal_options.maxRandomDistance * random();
      dy = this.internal_options.maxRandomDistance * random();
      Lat = parseFloat(this.args.lat) + (180 / Math.PI) * (dy / 6378137);
      Lng = parseFloat(this.args.lng) + (90 / Math.PI) * (dx / 6378137) / Math.cos(this.args.lat);
      return [Lat, Lng];
    };

    return Marker;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Polygon = (function(superClass) {
    extend(Polygon, superClass);

    function Polygon(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_polygon();
      this.after_init();
    }

    Polygon.prototype.create_polygon = function() {
      return new (this.primitives().polygon)(this.polygon_options());
    };

    Polygon.prototype.polygon_options = function() {
      var base_options;
      base_options = {
        path: this._build_path()
      };
      return _.defaults(base_options, this.provider_options);
    };

    Polygon.prototype._build_path = function() {
      return _.map(this.args, (function(_this) {
        return function(arg) {
          return new (_this.primitives().latLng)(arg.lat, arg.lng);
        };
      })(this));
    };

    return Polygon;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Polyline = (function(superClass) {
    extend(Polyline, superClass);

    function Polyline(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_polyline();
      this.after_init();
    }

    Polyline.prototype.create_polyline = function() {
      return new (this.primitives().polyline)(this.polyline_options());
    };

    Polyline.prototype.polyline_options = function() {
      var base_options;
      base_options = {
        path: this._build_path()
      };
      return _.defaults(base_options, this.provider_options);
    };

    Polyline.prototype._build_path = function() {
      return _.map(this.args, (function(_this) {
        return function(arg) {
          return new (_this.primitives().latLng)(arg.lat, arg.lng);
        };
      })(this));
    };

    return Polyline;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Bound = (function(superClass) {
    extend(Bound, superClass);

    Bound.include(Gmaps.Google.Objects.Common);

    function Bound(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Bound.prototype.extendWith = function(array_or_object) {
      var collection;
      collection = _.isArray(array_or_object) ? array_or_object : [array_or_object];
      return _.each(collection, (function(_this) {
        return function(object) {
          return object.updateBounds(_this);
        };
      })(this));
    };

    Bound.prototype.extend = function(value) {
      return this.getServiceObject().extend(this.primitives().latLngFromPosition(value));
    };

    return Bound;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Circle = (function(superClass) {
    extend(Circle, superClass);

    Circle.include(Gmaps.Google.Objects.Common);

    function Circle(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Circle.prototype.updateBounds = function(bounds) {
      bounds.extend(this.getServiceObject().getBounds().getNorthEast());
      return bounds.extend(this.getServiceObject().getBounds().getSouthWest());
    };

    return Circle;

  })(Gmaps.Base);

}).call(this);
(function() {
  this.Gmaps.Google.Objects.Clusterer = (function() {
    function Clusterer(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Clusterer.prototype.addMarkers = function(markers) {
      return _.each(markers, (function(_this) {
        return function(marker) {
          return _this.addMarker(marker);
        };
      })(this));
    };

    Clusterer.prototype.addMarker = function(marker) {
      return this.getServiceObject().addMarker(marker.getServiceObject());
    };

    Clusterer.prototype.clear = function() {
      return this.getServiceObject().clearMarkers();
    };

    Clusterer.prototype.removeMarker = function(marker) {
      return this.getServiceObject().removeMarker(marker.getServiceObject());
    };

    Clusterer.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    return Clusterer;

  })();

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Kml = (function(superClass) {
    extend(Kml, superClass);

    function Kml(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Kml.prototype.updateBounds = function(bounds) {};

    Kml.prototype.setMap = function(map) {
      return this.getServiceObject().setMap(map);
    };

    Kml.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    Kml.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    return Kml;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Map = (function(superClass) {
    extend(Map, superClass);

    function Map(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Map.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    Map.prototype.centerOn = function(position) {
      return this.getServiceObject().setCenter(this.primitives().latLngFromPosition(position));
    };

    Map.prototype.fitToBounds = function(boundsObject) {
      if (!boundsObject.isEmpty()) {
        return this.getServiceObject().fitBounds(boundsObject);
      }
    };

    Map.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    return Map;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Marker = (function(superClass) {
    extend(Marker, superClass);

    Marker.include(Gmaps.Google.Objects.Common);

    function Marker(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Marker.prototype.updateBounds = function(bounds) {
      return bounds.extend(this.getServiceObject().position);
    };

    Marker.prototype.panTo = function() {
      return this.getServiceObject().getMap().panTo(this.getServiceObject().getPosition());
    };

    return Marker;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Polygon = (function(superClass) {
    extend(Polygon, superClass);

    Polygon.include(Gmaps.Google.Objects.Common);

    function Polygon(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Polygon.prototype.updateBounds = function(bounds) {
      var i, len, ll, ref, results;
      ref = this.serviceObject.getPath().getArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ll = ref[i];
        results.push(bounds.extend(ll));
      }
      return results;
    };

    return Polygon;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Polyline = (function(superClass) {
    extend(Polyline, superClass);

    Polyline.include(Gmaps.Google.Objects.Common);

    function Polyline(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Polyline.prototype.updateBounds = function(bounds) {
      var i, len, ll, ref, results;
      ref = this.serviceObject.getPath().getArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ll = ref[i];
        results.push(bounds.extend(ll));
      }
      return results;
    };

    return Polyline;

  })(Gmaps.Base);

}).call(this);
(function() {
  this.Gmaps.Google.Primitives = function() {
    var factory;
    factory = {
      point: google.maps.Point,
      size: google.maps.Size,
      circle: google.maps.Circle,
      latLng: google.maps.LatLng,
      latLngBounds: google.maps.LatLngBounds,
      map: google.maps.Map,
      mapTypez: google.maps.MapTypeId,
      markerImage: google.maps.MarkerImage,
      marker: google.maps.Marker,
      infowindow: google.maps.InfoWindow,
      listener: google.maps.event.addListener,
      clusterer: MarkerClusterer,
      listenerOnce: google.maps.event.addListenerOnce,
      polyline: google.maps.Polyline,
      polygon: google.maps.Polygon,
      kml: google.maps.KmlLayer,
      addListener: function(object, event_name, fn) {
        return factory.listener(object, event_name, fn);
      },
      addListenerOnce: function(object, event_name, fn) {
        return factory.listenerOnce(object, event_name, fn);
      },
      mapTypes: function(type) {
        return factory.mapTypez[type];
      },
      latLngFromPosition: function(position) {
        if (_.isArray(position)) {
          return new factory.latLng(position[0], position[1]);
        } else {
          if (_.isNumber(position.lat) && _.isNumber(position.lng)) {
            return new factory.latLng(position.lat, position.lng);
          } else {
            if (_.isFunction(position.getServiceObject)) {
              return position.getServiceObject().getPosition();
            } else {
              return position;
            }
          }
        }
      }
    };
    return factory;
  };

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
!function(){(function(){!function(e,t,n,i){e.site=e.fn.site=function(o){var a,r,s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=e.isPlainObject(o)?e.extend(!0,{},e.site.settings,o):e.extend({},e.site.settings),f=m.namespace,g=m.error,p="module-"+f,v=e(n),h=v,b=this,y=h.data(p);return a={initialize:function(){a.instantiate()},instantiate:function(){a.verbose("Storing instance of site",a),y=a,h.data(p,a)},normalize:function(){a.fix.console(),a.fix.requestAnimationFrame()},fix:{console:function(){a.debug("Normalizing window.console"),(console===i||console.log===i)&&(a.verbose("Console not available, normalizing events"),a.disable.console()),("undefined"==typeof console.group||"undefined"==typeof console.groupEnd||"undefined"==typeof console.groupCollapsed)&&(a.verbose("Console group not available, normalizing events"),t.console.group=function(){},t.console.groupEnd=function(){},t.console.groupCollapsed=function(){}),"undefined"==typeof console.markTimeline&&(a.verbose("Mark timeline not available, normalizing events"),t.console.markTimeline=function(){})},consoleClear:function(){a.debug("Disabling programmatic console clearing"),t.console.clear=function(){}},requestAnimationFrame:function(){a.debug("Normalizing requestAnimationFrame"),t.requestAnimationFrame===i&&(a.debug("RequestAnimationFrame not available, normailizing event"),t.requestAnimationFrame=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(t){return e.fn[t]!==i&&e.fn[t].settings!==i},enabled:{modules:function(t){var n=[];return t=t||m.modules,e.each(t,function(e,t){a.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(t){var n=[];return t=t||m.modules,e.each(t,function(e,t){a.moduleExists(t)||n.push(t)}),n}},change:{setting:function(t,n,o,r){o="string"==typeof o?"all"===o?m.modules:[o]:o||m.modules,r=r!==i?r:!0,e.each(o,function(i,o){var s,c=a.moduleExists(o)?e.fn[o].settings.namespace||!1:!0;a.moduleExists(o)&&(a.verbose("Changing default setting",t,n,o),e.fn[o].settings[t]=n,r&&c&&(s=e(":data(module-"+c+")"),s.length>0&&(a.verbose("Modifying existing settings",s),s[o]("setting",t,n))))})},settings:function(t,n,o){n="string"==typeof n?[n]:n||m.modules,o=o!==i?o:!0,e.each(n,function(n,i){var r;a.moduleExists(i)&&(a.verbose("Changing default setting",t,i),e.extend(!0,e.fn[i].settings,t),o&&f&&(r=e(":data(module-"+f+")"),r.length>0&&(a.verbose("Modifying existing settings",r),r[i]("setting",t))))})}},enable:{console:function(){a.console(!0)},debug:function(e,t){e=e||m.modules,a.debug("Enabling debug for modules",e),a.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||m.modules,a.debug("Enabling verbose debug for modules",e),a.change.setting("verbose",!0,e,t)}},disable:{console:function(){a.console(!1)},debug:function(e,t){e=e||m.modules,a.debug("Disabling debug for modules",e),a.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||m.modules,a.debug("Disabling verbose debug for modules",e),a.change.setting("verbose",!1,e,t)}},console:function(e){if(e){if(y.cache.console===i)return void a.error(g.console);a.debug("Restoring console function"),t.console=y.cache.console}else a.debug("Disabling console function"),y.cache.console=t.console,t.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){a.verbose("Destroying previous site for",h),h.removeData(p)},cache:{},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){m.debug&&(m.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,m.name+":"),a.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,m.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Element:b,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var s,c,l,u=y;return n=n||d,o=b||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(o,n):c!==i&&(l=c),e.isArray(r)?r.push(l):r!==i?r=[r,l]:l!==i&&(r=l),c}},u?(y===i&&a.initialize(),a.invoke(l)):(y!==i&&a.destroy(),a.initialize()),r!==i?r:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!0,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","video","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])}})}(jQuery,window,document),function(e,t,n,i){e.fn.form=function(t,o){var a,r=e(this),s=e.extend(!0,{},e.fn.form.settings,o),c=e.extend({},e.fn.form.settings.defaults,t),l=s.namespace,u=s.metadata,d=s.selector,m=s.className,f=(s.error,"."+l),g="module-"+l,p=r.selector||"",v=(new Date).getTime(),h=[],b=arguments[0],y="string"==typeof b,x=[].slice.call(arguments,1);return r.each(function(){var t,o=e(this),l=e(this).find(d.field),w=e(this).find(d.group),C=e(this).find(d.message),k=(e(this).find(d.prompt),e(this).find(d.submit)),T=e(this).find(d.clear),S=e(this).find(d.reset),A=[],E=!1,P=this,F=o.data(g);t={initialize:function(){t.verbose("Initializing form validation",o,c,s),t.bindEvents(),t.set.defaults(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),F=t,o.data(g,t)},destroy:function(){t.verbose("Destroying previous module",F),t.removeEvents(),o.removeData(g)},refresh:function(){t.verbose("Refreshing selector cache"),l=o.find(d.field)},submit:function(){t.verbose("Submitting form",o),o.submit()},attachEvents:function(n,i){i=i||"submit",e(n).on("click",function(e){t[i](),e.preventDefault()})},bindEvents:function(){s.keyboardShortcuts&&l.on("keydown"+f,t.event.field.keydown),o.on("submit"+f,t.validate.form),l.on("blur"+f,t.event.field.blur),t.attachEvents(k,"submit"),t.attachEvents(S,"reset"),t.attachEvents(T,"clear"),l.each(function(){var n=e(this).prop("type"),i=t.get.changeEvent(n);e(this).on(i+f,t.event.field.change)})},clear:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(m.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(m.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("clear")):s?i.checkbox("uncheck"):(t.verbose("Resetting field value",n,r),n.val(""))})},reset:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(m.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(m.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("restore defaults")):s?(t.verbose("Resetting checkbox value",i,r),i.checkbox(r===!0?"check":"uncheck")):(t.verbose("Resetting field value",n,r),n.val(r))})},removeEvents:function(){o.off(f),l.off(f),k.off(f),l.off(f)},event:{field:{keydown:function(n){var i=e(this),o=n.which,a={enter:13,escape:27};o==a.escape&&(t.verbose("Escape key pressed blurring field"),i.blur()),!n.ctrlKey&&o==a.enter&&i.is(d.input)&&i.not(d.checkbox).length>0&&(k.addClass(m.pressed),E||(i.one("keyup"+f,t.event.field.keyup),t.submit(),t.debug("Enter pressed on input submitting form")),E=!0)},keyup:function(){E=!1,k.removeClass(m.pressed)},blur:function(){var n=e(this),i=n.closest(w);i.hasClass(m.error)?(t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))):("blur"==s.on||"change"==s.on)&&t.validate.field(t.get.validation(n))},change:function(){var n=e(this),i=n.closest(w);("change"==s.on||i.hasClass(m.error)&&s.revalidate)&&(clearTimeout(t.timer),t.timer=setTimeout(function(){t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))},s.delay))}}},get:{changeEvent:function(e){return"checkbox"==e||"radio"==e||"hidden"==e?"change":t.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},field:function(n){return t.verbose("Finding field with identifier",n),l.filter("#"+n).length>0?l.filter("#"+n):l.filter('[name="'+n+'"]').length>0?l.filter('[name="'+n+'"]'):l.filter('[name="'+n+'[]"]').length>0?l.filter('[name="'+n+'[]"]'):l.filter("[data-"+u.validate+'="'+n+'"]').length>0?l.filter("[data-"+u.validate+'="'+n+'"]'):e("<input/>")},fields:function(n){var i=e();return e.each(n,function(e,n){i=i.add(t.get.field(n))}),i},validation:function(n){var i;return e.each(c,function(e,o){t.get.field(o.identifier).get(0)==n.get(0)&&(i=o)}),i||!1},value:function(e){var n,i=[];return i.push(e),n=t.get.values.call(P,i),n[e]},values:function(n){var i=e.isArray(n)?t.get.fields(n):l,o={};return i.each(function(n,i){var a=e(i),r=(a.prop("type"),a.prop("name")),s=a.val(),c=a.is(d.checkbox),l=a.is(d.radio),u=-1!==r.indexOf("[]"),m=c?a.is(":checked"):!1;if(r)if(u)if(r=r.replace("[]",""),o[r]||(o[r]=[]),c){if(!m)return t.debug("Omitted unchecked checkbox",a),!0;o[r].push(s)}else o[r].push(s);else if(l)m&&(o[r]=s);else if(c){if(!m)return t.debug("Omitted unchecked checkbox",a),!0;o[r]=!0}else o[r]=s}),o}},has:{field:function(e){return t.verbose("Checking for existence of a field with identifier",e),l.filter("#"+e).length>0?!0:l.filter('[name="'+e+'"]').length>0?!0:l.filter("[data-"+u.validate+'="'+e+'"]').length>0?!0:!1}},add:{prompt:function(n,a){var r=t.get.field(n),c=r.closest(w),l=c.children(d.prompt),u=0!==l.length;a="string"==typeof a?[a]:a,t.verbose("Adding field error state",n),c.addClass(m.error),s.inline&&(u||(l=s.templates.prompt(a),l.appendTo(c)),l.html(a[0]),u?t.verbose("Inline errors are disabled, no inline error added",n):s.transition&&e.fn.transition!==i&&o.transition("is supported")?(t.verbose("Displaying error with css transition",s.transition),l.transition(s.transition+" in",s.duration)):(t.verbose("Displaying error with fallback javascript animation"),l.fadeIn(s.duration)))},errors:function(e){t.debug("Adding form error messages",e),C.html(s.templates.error(e))}},remove:{prompt:function(n){var a=t.get.field(n.identifier),r=a.closest(w),c=r.children(d.prompt);r.removeClass(m.error),s.inline&&c.is(":visible")&&(t.verbose("Removing prompt for field",n),s.transition&&e.fn.transition!==i&&o.transition("is supported")?c.transition(s.transition+" out",s.duration,function(){c.remove()}):c.fadeOut(s.duration,function(){c.remove()}))}},set:{success:function(){o.removeClass(m.error).addClass(m.success)},defaults:function(){l.each(function(){var t=e(this),n=t.filter(d.checkbox).length>0,i=n?t.is(":checked"):t.val();t.data(u.defaultValue,i)})},error:function(){o.removeClass(m.success).addClass(m.error)},value:function(e,n){var i={};return i[e]=n,t.set.values.call(P,i)},values:function(n){e.isEmptyObject(n)||(e.each(n,function(n,i){var o,a=t.get.field(n),r=a.parent(),s=e.isArray(i),c=r.is(d.uiCheckbox),l=r.is(d.uiDropdown),u=a.is(d.radio)&&c,m=a.length>0;m&&(s&&c?(t.verbose("Selecting multiple",i,a),r.checkbox("uncheck"),e.each(i,function(e,t){o=a.filter('[value="'+t+'"]'),r=o.parent(),o.length>0&&r.checkbox("check")})):u?(t.verbose("Selecting radio value",i,a),a.filter('[value="'+i+'"]').parent(d.uiCheckbox).checkbox("check")):c?(t.verbose("Setting checkbox value",i,r),r.checkbox(i===!0?"check":"uncheck")):l?(t.verbose("Setting dropdown value",i,r),r.dropdown("set selected",i)):(t.verbose("Setting field value",i,a),a.val(i)))}),t.validate.form())}},validate:{form:function(n){var a=!0;return E?!1:(A=[],e.each(c,function(e,n){t.validate.field(n)||(a=!1)}),a?(t.debug("Form has no validation errors, submitting"),t.set.success(),s.onSuccess.call(P,n)):(t.debug("Form has errors"),t.set.error(),s.inline||t.add.errors(A),o.data("moduleApi")!==i&&n.stopImmediatePropagation(),s.onFailure.call(P,A)))},field:function(n){var o=t.get.field(n.identifier),a=!0,r=[];return o.prop("disabled")?(t.debug("Field is disabled. Skipping",n.identifier),a=!0):n.optional&&""===e.trim(o.val())?(t.debug("Field is optional and empty. Skipping",n.identifier),a=!0):n.rules!==i&&e.each(n.rules,function(e,i){t.has.field(n.identifier)&&!t.validate.rule(n,i)&&(t.debug("Field is invalid",n.identifier,i.type),r.push(i.prompt),a=!1)}),a?(t.remove.prompt(n,r),s.onValid.call(o),!0):(A=A.concat(r),t.add.prompt(n.identifier,r),s.onInvalid.call(o,r),!1)},rule:function(n,o){var a,r,c=t.get.field(n.identifier),l=o.type,u=e.trim(c.val()+""),d=/\[(.*)\]/i,m=d.exec(l),f=!0;return m!==i&&null!==m?(a=""+m[1],r=l.replace(m[0],""),f=s.rules[r].call(P,u,a)):f=s.rules[l].call(c,u),f}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},debug:function(){s.debug&&(s.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,s.name+":"),t.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,s.name+":"),t.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;s.performance&&(n=(new Date).getTime(),o=v||n,i=n-o,v=n,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":i})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var n=s.name+":",o=0;v=!1,clearTimeout(t.performance.timer),e.each(h,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",p&&(n+=" '"+p+"'"),r.length>1&&(n+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&h.length>0&&(console.groupCollapsed(n),console.table?console.table(h):e.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||x,o=P||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},y?(F===i&&t.initialize(),t.invoke(b)):(F!==i&&F.invoke("destroy"),t.initialize())}),a!==i?a:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:".reset",submit:".submit",uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{method:"The method you called is not defined."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui red pointing prompt label").html(t[0])}},rules:{checked:function(){return e(this).filter(":checked").length>0},contains:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(new RegExp(t,"i"))},containsExactly:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(new RegExp(t))},email:function(e){var t=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","i");return t.test(e)},empty:function(e){return!(e===i||""===e)},integer:function(e,t){var n,o,a,r=/^\-?\d+$/;return t===i||""===t||".."===t||(-1==t.indexOf("..")?r.test(t)&&(n=o=t-0):(a=t.split("..",2),r.test(a[0])&&(n=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(e)&&(n===i||e>=n)&&(o===i||o>=e)},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,e="string"==typeof e?e.toLowerCase():e,e==t},isExactly:function(e,t){return e==t},length:function(e,t){return e!==i?e.length>=t:!1},match:function(t,n){var o,a=e(this);return a.find("#"+n).length>0?o=a.find("#"+n).val():a.find('[name="'+n+'"]').length>0?o=a.find('[name="'+n+'"]').val():a.find('[data-validate="'+n+'"]').length>0&&(o=a.find('[data-validate="'+n+'"]').val()),o!==i?t.toString()==o.toString():!1},maxLength:function(e,t){return e!==i?e.length<=t:!1},not:function(e,t){return e="string"==typeof e?e.toLowerCase():e,t="string"==typeof t?t.toLowerCase():t,e!=t},notExactly:function(e,t){return e!=t},url:function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.accordion=function(n){{var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var d,m,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.accordion.settings,n):e.extend({},e.fn.accordion.settings),g=f.className,p=f.namespace,v=f.selector,h=f.error,b="."+p,y="module-"+p,x=a.selector||"",w=e(this),C=w.find(v.title),k=w.find(v.content),T=this,S=w.data(y);m={initialize:function(){m.debug("Initializing accordion with bound events",w),w.on("click"+b,v.title,m.event.click),m.observeChanges(),m.instantiate()},instantiate:function(){S=m,w.data(y,m)},destroy:function(){m.debug("Destroying previous accordion for",w),w.removeData(y),C.off(b)},refresh:function(){C=w.find(v.title),k=w.find(v.content)},observeChanges:function(){"MutationObserver"in t&&(d=new MutationObserver(function(){m.debug("DOM tree modified, updating selector cache"),m.refresh()}),d.observe(T,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",d))},event:{click:function(){m.toggle.call(this)}},toggle:function(t){var n=t!==i?"number"==typeof t?C.eq(t):e(t):e(this),o=n.next(k),a=o.is(":visible");m.debug("Toggling visibility of content",n),a?f.collapsible?m.close.call(n):m.debug("Cannot close accordion content collapsing is disabled"):m.open.call(n)},open:function(t){var n=t!==i?"number"==typeof t?C.eq(t):e(t):e(this),o=n.next(k),a=o.is(":animated"),r=o.hasClass(g.active);a||r||(m.debug("Opening accordion content",n),f.exclusive&&m.closeOthers.call(n),n.addClass(g.active),f.animateChildren&&(e.fn.transition!==i&&w.transition("is supported")?o.children().transition({animation:"fade in",useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop().animate({opacity:1},f.duration,m.resetOpacity)),o.stop().slideDown(f.duration,f.easing,function(){o.addClass(g.active),m.reset.display.call(this),f.onOpen.call(this),f.onChange.call(this)}))},close:function(t){var n=t!==i?"number"==typeof t?C.eq(t):e(t):e(this),o=n.next(k),a=o.hasClass(g.active);a&&(m.debug("Closing accordion content",o),n.removeClass(g.active),o.removeClass(g.active).show(),f.animateChildren&&(e.fn.transition!==i&&w.transition("is supported")?o.children().transition({animation:"fade out",useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop().animate({opacity:0},f.duration,m.resetOpacity)),o.stop().slideUp(f.duration,f.easing,function(){m.reset.display.call(this),f.onClose.call(this),f.onChange.call(this)}))},closeOthers:function(t){var n,o,a,r=t!==i?C.eq(t):e(this),s=r.parents(v.content).prev(v.title),c=r.closest(v.accordion),l=v.title+"."+g.active+":visible",u=v.content+"."+g.active+":visible";f.closeNested?(n=c.find(l).not(s),a=n.next(k)):(n=c.find(l).not(s),o=c.find(u).find(l).not(s),n=n.not(o),a=n.next(k)),n.length>0&&(m.debug("Exclusive enabled, closing other content",n),n.removeClass(g.active),f.animateChildren&&(e.fn.transition!==i&&w.transition("is supported")?a.children().transition({animation:"fade out",useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):a.children().stop().animate({opacity:0},f.duration,m.resetOpacity)),a.stop().slideUp(f.duration,f.easing,function(){e(this).removeClass(g.active),m.reset.display.call(this)}))},reset:{display:function(){m.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){m.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){return m.debug("Changing internal",t,n),n===i?m[t]:void(e.isPlainObject(t)?e.extend(!0,m,t):m[t]=n)},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(m.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",x&&(t+=" '"+x+"'"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||u,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},l?(S===i&&m.initialize(),m.invoke(c)):(S!==i&&S.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",debug:!1,verbose:!0,performance:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:500,easing:"easeOutQuint",onOpen:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active"},selector:{accordion:".accordion",title:".title",content:".content"}},e.extend(e.easing,{easeOutQuint:function(e,t,n,i,o){return i*((t=t/o-1)*t*t*t*t+1)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.checkbox=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f=e.extend(!0,{},e.fn.checkbox.settings,n),g=f.className,p=f.namespace,v=f.selector,h=f.error,b="."+p,y="module-"+p,x=e(this),w=e(this).find(v.label).first(),C=e(this).find(v.input),k=x.data(y),T=this;m={initialize:function(){m.verbose("Initializing checkbox",f),m.create.label(),m.add.events(),m.is.checked()?(m.set.checked(),f.fireOnInit&&f.onChecked.call(C.get())):(m.remove.checked(),f.fireOnInit&&f.onUnchecked.call(C.get())),m.observeChanges(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),k=m,x.data(y,m)},destroy:function(){m.verbose("Destroying module"),m.remove.events(),x.removeData(y)},refresh:function(){x=e(this),w=e(this).find(v.label).first(),C=e(this).find(v.input)},observeChanges:function(){"MutationObserver"in t&&(a=new MutationObserver(function(){m.debug("DOM tree modified, updating selector cache"),m.refresh()}),a.observe(T,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",a))},attachEvents:function(t,n){var i=e(t);n=e.isFunction(m[n])?m[n]:m.toggle,i.length>0?(m.debug("Attaching checkbox events to element",t,n),i.on("click"+b,n)):m.error(h.notFound)},event:{keydown:function(e){var t=e.which,n={enter:13,space:32,escape:27};t==n.escape&&(m.verbose("Escape key pressed blurring field"),x.blur()),e.ctrlKey||t!=n.enter&&t!=n.space||(m.verbose("Enter key pressed, toggling checkbox"),m.toggle.call(this),e.preventDefault())}},is:{radio:function(){return x.hasClass(g.radio)},checked:function(){return C.prop("checked")!==i&&C.prop("checked")},unchecked:function(){return!m.is.checked()}},can:{change:function(){return!(x.hasClass(g.disabled)||x.hasClass(g.readOnly)||C.prop("disabled"))},uncheck:function(){return"boolean"==typeof f.uncheckable?f.uncheckable:!m.is.radio()}},set:{checked:function(){x.addClass(g.checked)},tab:function(){C.attr("tabindex")===i&&C.attr("tabindex",0)}},create:{label:function(){C.prevAll(v.label).length>0?(C.prev(v.label).detach().insertAfter(C),m.debug("Moving existing label",w)):m.has.label()||(w=e("<label>").insertAfter(C),m.debug("Creating label",w))}},has:{label:function(){return w.length>0}},add:{events:function(){m.verbose("Attaching checkbox events"),x.on("click"+b,m.toggle).on("keydown"+b,v.input,m.event.keydown)}},remove:{checked:function(){x.removeClass(g.checked)},events:function(){m.debug("Removing events"),x.off(b).removeData(y),C.off(b,m.event.keydown),w.off(b)}},enable:function(){m.debug("Enabling checkbox functionality"),x.removeClass(g.disabled),C.prop("disabled",!1),f.onEnabled.call(C.get())},disable:function(){m.debug("Disabling checkbox functionality"),x.addClass(g.disabled),C.prop("disabled","disabled"),f.onDisabled.call(C.get())},check:function(){m.debug("Enabling checkbox",C),C.prop("checked",!0).trigger("change"),m.set.checked(),C.trigger("blur"),f.onChange.call(C.get()),f.onChecked.call(C.get())},uncheck:function(){m.debug("Disabling checkbox"),C.prop("checked",!1).trigger("change"),m.remove.checked(),C.trigger("blur"),f.onChange.call(C.get()),f.onUnchecked.call(C.get())},toggle:function(){return m.can.change()?(m.verbose("Determining new checkbox state"),void(m.is.unchecked()?m.check():m.is.checked()&&m.can.uncheck()&&m.uncheck())):(console.log(m.can.change()),void m.debug("Checkbox is read-only or disabled, ignoring toggle"))},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=k;return n=n||d,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(h.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(k===i&&m.initialize(),m.invoke(l)):(k!==i&&k.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!0,onChange:function(){},onChecked:function(){},onUnchecked:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",disabled:"disabled",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{input:'input[type="checkbox"], input[type="radio"]',label:"label"}}}(jQuery,window,document),function(e,t,n,i){e.fn.dimmer=function(t){var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return a.each(function(){var d,m,f,g=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),p=g.selector,v=g.namespace,h=g.className,b=g.error,y="."+v,x="module-"+v,w=a.selector||"",C="ontouchstart"in n.documentElement?"touchstart":"click",k=e(this),T=this,S=k.data(x);f={preinitialize:function(){f.is.dimmer()?(m=k.parent(),d=k):(m=k,d=f.has.dimmer()?g.dimmerName?m.children(p.dimmer).filter("."+g.dimmerName):m.children(p.dimmer):f.create())},initialize:function(){f.debug("Initializing dimmer",g),"hover"==g.on?m.on("mouseenter"+y,f.show).on("mouseleave"+y,f.hide):"click"==g.on&&m.on(C+y,f.toggle),f.is.page()&&(f.debug("Setting as a page dimmer",m),f.set.pageDimmer()),f.is.closable()&&(f.verbose("Adding dimmer close event",d),d.on(C+y,f.event.click)),f.set.dimmable(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),S=f,k.data(x,S)
},destroy:function(){f.verbose("Destroying previous module",d),k.removeData(x),m.off(y),d.off(y)},event:{click:function(t){f.verbose("Determining if event occured on dimmer",t),(0===d.find(t.target).length||e(t.target).is(p.content))&&(f.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);f.debug("Add content to dimmer",n),n.parent()[0]!==d[0]&&n.detach().appendTo(d)},create:function(){var t=e(g.template.dimmer());return g.variation&&(f.debug("Creating dimmer with variation",g.variation),t.addClass(h.variation)),g.dimmerName&&(f.debug("Creating named dimmer",g.dimmerName),t.addClass(g.dimmerName)),t.appendTo(m),t},show:function(t){t=e.isFunction(t)?t:function(){},f.debug("Showing dimmer",d,g),f.is.dimmed()&&!f.is.animating()||!f.is.enabled()?f.debug("Dimmer is already shown or disabled"):(f.animate.show(t),g.onShow.call(T),g.onChange.call(T))},hide:function(t){t=e.isFunction(t)?t:function(){},f.is.dimmed()||f.is.animating()?(f.debug("Hiding dimmer",d),f.animate.hide(t),g.onHide.call(T),g.onChange.call(T)):f.debug("Dimmer is not visible")},toggle:function(){f.verbose("Toggling dimmer visibility",d),f.is.dimmed()?f.hide():f.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?d.transition({animation:g.transition+" in",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.set.dimmed()},onComplete:function(){f.set.active(),t()}}):(f.verbose("Showing dimmer animation with javascript"),f.set.dimmed(),d.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(f.get.duration(),1,function(){d.removeAttr("style"),f.set.active(),t()}))},hide:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?(f.verbose("Hiding dimmer with css"),d.transition({animation:g.transition+" out",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.remove.dimmed()},onComplete:function(){f.remove.active(),t()}})):(f.verbose("Hiding dimmer with javascript"),f.remove.dimmed(),d.stop().fadeOut(f.get.duration(),function(){f.remove.active(),d.removeAttr("style"),t()}))}},get:{dimmer:function(){return d},duration:function(){return"object"==typeof g.duration?f.is.active()?g.duration.hide:g.duration.show:g.duration}},has:{dimmer:function(){return g.dimmerName?k.children(p.dimmer).filter("."+g.dimmerName).length>0:k.children(p.dimmer).length>0}},is:{active:function(){return d.hasClass(h.active)},animating:function(){return d.is(":animated")||d.hasClass(h.animating)},closable:function(){return"auto"==g.closable?"hover"==g.on?!1:!0:g.closable},dimmer:function(){return k.is(p.dimmer)},dimmable:function(){return k.is(p.dimmable)},dimmed:function(){return m.hasClass(h.dimmed)},disabled:function(){return m.hasClass(h.disabled)},enabled:function(){return!f.is.disabled()},page:function(){return m.is("body")},pageDimmer:function(){return d.hasClass(h.pageDimmer)}},can:{show:function(){return!d.hasClass(h.disabled)}},set:{active:function(){d.addClass(h.active)},dimmable:function(){m.addClass(h.dimmable)},dimmed:function(){m.addClass(h.dimmed)},pageDimmer:function(){d.addClass(h.pageDimmer)},disabled:function(){d.addClass(h.disabled)}},remove:{active:function(){d.removeClass(h.active)},dimmed:function(){m.removeClass(h.dimmed)},disabled:function(){d.removeClass(h.disabled)}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=g.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",w&&(t+=" '"+w+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||u,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},f.preinitialize(),l?(S===i&&f.initialize(),f.invoke(c)):(S!==i&&S.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",debug:!1,verbose:!0,performance:!0,dimmerName:!1,variation:!1,closable:"auto",transition:"fade",useCSS:!0,on:!1,duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},selector:{dimmable:".dimmable",dimmer:".ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.dropdown=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l="ontouchstart"in n.documentElement,u=(new Date).getTime(),d=[],m=arguments[0],f="string"==typeof m,g=[].slice.call(arguments,1);return r.each(function(){var p,v,h,b,y=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),x=y.className,w=y.metadata,C=y.namespace,k=y.selector,T=y.error,S="."+C,A="module-"+C,E=e(this),P=E.find(k.text),F=E.find(k.search),R=E.find(k.input),D=E.prev().find(k.text).length>0?E.prev().find(k.text):E.prev(),O=E.children(k.menu),z=O.find(k.item),q=!1,j=!1,I=this,N=E.data(A);b={initialize:function(){b.debug("Initializing dropdown",y),b.is.alreadySetup()?b.error(T.alreadySetup):b.setup.layout(),b.save.defaults(),b.set.selected(),b.create.id(),l&&b.bind.touchEvents(),b.bind.mouseEvents(),b.bind.keyboardEvents(),b.observeChanges(),b.instantiate()},instantiate:function(){b.verbose("Storing instance of dropdown",b),N=b,E.data(A,b)},destroy:function(){b.verbose("Destroying previous dropdown for",E),b.remove.tabbable(),E.off(S).removeData(A),O.off(S),s.off(p)},observeChanges:function(){"MutationObserver"in t&&(h=new MutationObserver(function(e){b.is.selectMutation(e)?(b.debug("<select> modified, recreating menu"),b.setup.select()):(b.debug("DOM tree modified, updating selector cache"),b.refresh())}),h.observe(I,{childList:!0,subtree:!0}),b.debug("Setting up mutation observer",h))},create:{id:function(){b.verbose("Creating unique id for element"),v=b.get.uniqueID(),p="."+v}},search:function(){var e;e=F.val(),b.verbose("Searching for query",e),b.filter(e),b.is.searchSelection()&&b.can.show()&&b.show()},setup:{layout:function(){E.is("select")&&b.setup.select(),b.is.search()&&!b.is.searchable()&&(F=e("<input />").addClass(x.search).insertBefore(P)),y.allowTab&&b.set.tabbable()},select:function(){var t=b.get.selectValues();b.debug("Dropdown initialized on a select",t),E.is("select")&&(R=E),R.parent(k.dropdown).length>0?(b.debug("UI dropdown already exists. Creating dropdown menu only"),E=R.closest(k.dropdown),O=E.children(k.menu),0===O.length&&(O=e("<div />").addClass(x.menu).appendTo(E)),O.html(y.templates.menu(t))):(b.debug("Creating entire dropdown from select"),E=e("<div />").attr("class",R.attr("class")).addClass(x.selection).addClass(x.dropdown).html(y.templates.dropdown(t)).insertBefore(R),R.removeAttr("class").prependTo(E)),b.refresh()}},refresh:function(){b.verbose("Refreshing selector cache"),P=E.find(k.text),F=E.find(k.search),R=E.find(k.input),D=E.prev().find(k.text).length>0?E.prev().find(k.text):E.prev(),O=E.children(k.menu),z=O.find(k.item)},toggle:function(){b.verbose("Toggling menu visibility"),b.is.active()?b.hide():b.show()},show:function(t){t=e.isFunction(t)?t:function(){},b.is.searchSelection()&&b.is.allFiltered()||b.can.show()&&!b.is.active()&&(b.debug("Showing dropdown"),b.animate.show(function(){b.can.click()&&b.bind.intent(),b.set.visible(),t.call(I)}),y.onShow.call(I))},hide:function(t){t=e.isFunction(t)?t:function(){},b.is.active()&&(b.debug("Hiding dropdown"),b.animate.hide(function(){b.remove.visible(),t.call(I)}),y.onHide.call(I))},hideOthers:function(){b.verbose("Finding other dropdowns to hide"),r.not(E).has(k.menu+":visible:not(."+x.animating+")").dropdown("hide")},hideSubMenus:function(){var e=O.find(k.menu);e.transition("hide")},bind:{keyboardEvents:function(){b.debug("Binding keyboard events"),E.on("keydown"+S,b.event.keydown),b.is.searchable()&&E.on(b.get.inputEvent(),k.search,b.event.input)},touchEvents:function(){b.debug("Touch device detected binding additional touch events"),b.is.searchSelection()||E.on("touchstart"+S,b.event.test.toggle),O.on("touchstart"+S,k.item,b.event.item.mouseenter)},mouseEvents:function(){b.verbose("Mouse detected binding mouse events"),b.is.searchSelection()?E.on("mousedown"+S,k.menu,b.event.menu.activate).on("mouseup"+S,k.menu,b.event.menu.deactivate).on("click"+S,k.search,b.show).on("focus"+S,k.search,b.event.searchFocus).on("blur"+S,k.search,b.event.searchBlur).on("click"+S,k.text,b.event.searchTextFocus):("click"==y.on?E.on("click"+S,b.event.test.toggle):"hover"==y.on?E.on("mouseenter"+S,b.delay.show).on("mouseleave"+S,b.delay.hide):E.on(y.on+S,b.toggle),E.on("mousedown"+S,b.event.mousedown).on("mouseup"+S,b.event.mouseup).on("focus"+S,b.event.focus).on("blur"+S,b.event.blur)),O.on("mouseenter"+S,k.item,b.event.item.mouseenter).on("mouseleave"+S,k.item,b.event.item.mouseleave).on("click"+S,k.item,b.event.item.click)},intent:function(){b.verbose("Binding hide intent event to document"),l&&s.on("touchstart"+p,b.event.test.touch).on("touchmove"+p,b.event.test.touch),s.on("click"+p,b.event.test.hide)}},unbind:{intent:function(){b.verbose("Removing hide intent event from document"),l&&s.off("touchstart"+p).off("touchmove"+p),s.off("click"+p)}},filter:function(t){var n=e(),i=b.escape.regExp(t),o=new RegExp("^"+i,"igm"),a=new RegExp(i,"ig");b.verbose("Searching for matching values"),z.each(function(){var t=e(this),i=String(b.get.choiceText(t,!1)),r=String(b.get.choiceValue(t,i));i.match(o)||r.match(o)?n=n.add(t):y.fullTextSearch&&(i.match(a)||r.match(a))&&(n=n.add(t))}),b.debug("Setting filter",t),b.remove.filteredItem(),z.not(n).addClass(x.filtered),b.verbose("Selecting first non-filtered element"),b.remove.selectedItem(),z.not("."+x.filtered).eq(0).addClass(x.selected),b.is.allFiltered()&&(b.debug("All items filtered, hiding dropdown",t),b.is.searchSelection()&&b.hide(),y.onNoResults.call(I,t))},focusSearch:function(){b.is.search()&&F.focus()},forceSelection:function(){var e=z.not(x.filtered).filter("."+x.selected).eq(0),t=z.filter("."+x.active).eq(0),n=e.length>0?e:t,i=n.size()>0;i&&b.event.item.click.call(n)},event:{mousedown:function(){q=!0},mouseup:function(){q=!1},focus:function(){!q&&b.is.hidden()&&b.show()},blur:function(){var e=n.activeElement===this;q||e||b.hide()},searchFocus:function(){q=!0,b.show()},searchBlur:function(){var e=n.activeElement===this;j||e||(y.forceSelection?b.forceSelection():b.hide())},searchTextFocus:function(){q=!0,F.focus()},input:function(){b.is.searchSelection()&&b.set.filtered(),clearTimeout(b.timer),b.timer=setTimeout(b.search,y.delay.search)},keydown:function(e){{var t,n=z.not(x.filtered).filter("."+x.selected).eq(0),i=O.children("."+x.active).eq(0),o=n.length>0?n:i,a=o.length>0?o.siblings(":not(."+x.filtered+")").andSelf():O.children(":not(."+x.filtered+")"),r=o.children(k.menu),s=o.closest(k.menu),c=s[0]!==O[0],l=s.is(":visible"),u=e.which,d={enter:13,escape:27,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},m=r.length>0,f=o.length>0;a.size()-1}if(b.is.visible()){if(u==d.enter&&f&&(m&&!y.allowCategorySelection?(b.verbose("Pressed enter on unselectable category, opening sub menu"),u=d.rightArrow):(b.verbose("Enter key pressed, choosing selected item"),b.event.item.click.call(o,e))),u==d.leftArrow&&(c&&(b.verbose("Left key pressed, closing sub-menu"),b.animate.hide(!1,s),o.removeClass(x.selected),s.closest(k.item).addClass(x.selected)),e.preventDefault()),u==d.rightArrow&&(m&&(b.verbose("Right key pressed, opening sub-menu"),b.animate.show(!1,r),o.removeClass(x.selected),r.find(k.item).eq(0).addClass(x.selected)),e.preventDefault()),u==d.upArrow){if(t=f&&l?o.prevAll(k.item+":not(."+x.filtered+")").eq(0):z.eq(0),a.index(t)<0)return void b.verbose("Up key pressed but reached top of current menu");b.verbose("Up key pressed, changing active item"),o.removeClass(x.selected),t.addClass(x.selected),b.set.scrollPosition(t),e.preventDefault()}if(u==d.downArrow){if(t=f&&l?t=o.nextAll(k.item+":not(."+x.filtered+")").eq(0):z.eq(0),0===t.length)return void b.verbose("Down key pressed but reached bottom of current menu");b.verbose("Down key pressed, changing active item"),z.removeClass(x.selected),t.addClass(x.selected),b.set.scrollPosition(t),e.preventDefault()}}else u==d.enter&&(b.verbose("Enter key pressed, showing dropdown"),b.show()),u==d.escape&&(b.verbose("Escape key pressed, closing dropdown"),b.hide()),u==d.downArrow&&(b.verbose("Down key pressed, showing dropdown"),b.show())},test:{toggle:function(e){b.determine.eventInMenu(e,b.toggle)&&e.preventDefault()},touch:function(e){b.determine.eventInMenu(e,function(){"touchstart"==e.type?b.timer=setTimeout(b.hide,y.delay.touch):"touchmove"==e.type&&clearTimeout(b.timer)}),e.stopPropagation()},hide:function(e){b.determine.eventInModule(e,b.hide)}},menu:{activate:function(){j=!0},deactivate:function(){j=!1}},item:{mouseenter:function(t){var n=e(this).children(k.menu),i=e(this).siblings(k.item).children(k.menu);n.length>0&&(clearTimeout(b.itemTimer),b.itemTimer=setTimeout(function(){b.verbose("Showing sub-menu",n),e.each(i,function(){b.animate.hide(!1,e(this))}),b.animate.show(!1,n)},y.delay.show),t.preventDefault())},mouseleave:function(){var t=e(this).children(k.menu);t.length>0&&(clearTimeout(b.itemTimer),b.itemTimer=setTimeout(function(){b.verbose("Hiding sub-menu",t),b.animate.hide(!1,t)},y.delay.hide))},click:function(t){var n=e(this),i=e(t?t.target:""),o=n.find(k.menu),a=b.get.choiceText(n),r=b.get.choiceValue(n,a),s=function(){b.remove.searchTerm(),b.determine.selectAction(a,r)},c=o.length>0,l=o.find(i).length>0;l||c&&!y.allowCategorySelection||s()}},resetStyle:function(){e(this).removeAttr("style")}},determine:{selectAction:function(t,n){b.verbose("Determining action",y.action),e.isFunction(b.action[y.action])?(b.verbose("Triggering preset action",y.action,t,n),b.action[y.action](t,n)):e.isFunction(y.action)?(b.verbose("Triggering user action",y.action,t,n),y.action(t,n)):b.error(T.action,y.action)},eventInModule:function(t,n){return n=e.isFunction(n)?n:function(){},0===e(t.target).closest(E).length?(b.verbose("Triggering event",n),n(),!0):(b.verbose("Event occurred in dropdown, canceling callback"),!1)},eventInMenu:function(t,n){return n=e.isFunction(n)?n:function(){},0===e(t.target).closest(O).length?(b.verbose("Triggering event",n),n(),!0):(b.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},select:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},combo:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},hide:function(){b.hide(function(){b.remove.filteredItem()})}},get:{text:function(){return P.text()},value:function(){return R.length>0?R.val():E.data(w.value)},choiceText:function(e,t){return t=t!==i?t:y.preserveHTML,e!==i?(e.find(k.menu).length>0&&(b.verbose("Retreiving text of element with sub-menu"),e=e.clone(),e.find(k.menu).remove(),e.find(k.menuIcon).remove()),e.data(w.text)!==i?e.data(w.text):t?e.html().trim():e.text().trim()):void 0},choiceValue:function(e,t){return t=t||b.get.choiceText(e),e.data(w.value)!==i?e.data(w.value):"string"==typeof t?t.toLowerCase().trim():t.trim()},inputEvent:function(){var e=F[0];return e?e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup":!1},selectValues:function(){var t={};return t.values=y.sortSelect?{}:[],E.find("option").each(function(){var n=e(this).html(),o=e(this).attr("value")!==i?e(this).attr("value"):n;""===o?t.placeholder=n:y.sortSelect?t.values[o]={name:n,value:o}:t.values.push({name:n,value:o})}),y.sortSelect?b.debug("Retrieved and sorted values from select",t):b.debug("Retreived values from select",t),t},activeItem:function(){return z.filter("."+x.active)},item:function(t,n){var o=!1;return t=t!==i?t:b.get.value()!==i?b.get.value():b.get.text(),n=""===t||0===t?!0:n||!1,t!==i?z.each(function(){var i=e(this),a=b.get.choiceText(i),r=b.get.choiceValue(i,a);n?(b.verbose("Ambiguous dropdown value using strict type check",i,t),r===t?o=e(this):o||a!==t||(o=e(this))):r==t?(b.verbose("Found select item by value",r,t),o=e(this)):o||a!=t||(b.verbose("Found select item by text",a,t),o=e(this))}):t=b.get.text(),o||!1},uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},restore:{defaults:function(){b.restore.defaultText(),b.restore.defaultValue()},defaultText:function(){var e=E.data(w.defaultText);b.debug("Restoring default text",e),b.set.text(e),P.addClass(x.placeholder)},defaultValue:function(){var e=E.data(w.defaultValue);e!==i&&(b.debug("Restoring default value",e),e.length?b.set.selected(e):(b.remove.activeItem(),b.remove.selectedItem()))}},save:{defaults:function(){b.save.defaultText(),b.save.placeholderText(),b.save.defaultValue()},defaultValue:function(){E.data(w.defaultValue,b.get.value())},defaultText:function(){E.data(w.defaultText,P.text())},placeholderText:function(){P.hasClass(x.placeholder)&&E.data(w.placeholderText,P.text())}},clear:function(){var e=E.data(w.placeholderText);b.set.text(e),b.set.value(""),b.remove.activeItem(),b.remove.selectedItem(),P.addClass(x.placeholder)},set:{filtered:function(){var e=F.val(),t="string"==typeof e&&e.length>0;t?P.addClass(x.filtered):P.removeClass(x.filtered)},tabbable:function(){b.is.searchable()?(b.debug("Searchable dropdown initialized"),F.val("").attr("tabindex",0),O.attr("tabindex","-1")):(b.debug("Simple selection dropdown initialized"),E.attr("tabindex")||(E.attr("tabindex",0),O.attr("tabindex","-1")))},scrollPosition:function(e,t){var n,o,a,r,s,c,l,u,d,m=5;e=e||b.get.activeItem(),n=e&&e.length>0,t=t!==i?t:!1,e&&n&&(O.hasClass(x.visible)||O.addClass(x.loading),l=O.height(),a=e.height(),c=O.scrollTop(),s=O.offset().top,r=e.offset().top,o=c-s+r,d=o+m>c+l,u=c>o-m,b.debug("Scrolling to active item",o),(u||d||t)&&O.scrollTop(o).removeClass(x.loading))},text:function(e){"combo"==y.action?(b.debug("Changing combo button text",e,D),y.preserveHTML?D.html(e):D.text(e)):"select"!==y.action&&(b.debug("Changing text",e,P),P.removeClass(x.filtered).removeClass(x.placeholder),y.preserveHTML?P.html(e):P.text(e))},value:function(e){b.debug("Adding selected value to hidden input",e,R),R.length>0?R.val(e).trigger("change"):E.data(w.value,e)},active:function(){E.addClass(x.active)},visible:function(){E.addClass(x.visible)},selected:function(e){var t,n,i=b.get.item(e);i&&(b.debug("Setting selected menu item to",i),b.remove.activeItem(),b.remove.selectedItem(),i.addClass(x.active).addClass(x.selected),t=b.get.choiceText(i),n=b.get.choiceValue(i,t),b.set.text(t),b.set.value(n),y.onChange.call(I,e,t,i))}},remove:{active:function(){E.removeClass(x.active)},visible:function(){E.removeClass(x.visible)},activeItem:function(){z.removeClass(x.active)},filteredItem:function(){z.removeClass(x.filtered)},searchTerm:function(){F.val("")},selectedItem:function(){z.removeClass(x.selected)},tabbable:function(){b.is.searchable()?(b.debug("Searchable dropdown initialized"),F.attr("tabindex","-1"),O.attr("tabindex","-1")):(b.debug("Simple selection dropdown initialized"),E.attr("tabindex","-1"),O.attr("tabindex","-1"))}},is:{active:function(){return E.hasClass(x.active)},alreadySetup:function(){return E.is("select")&&E.parent(k.dropdown).length>0},animating:function(e){return e?e.is(":animated")||e.transition&&e.transition("is animating"):O.is(":animated")||O.transition&&O.transition("is animating")},allFiltered:function(){return z.filter("."+x.filtered).length===z.length},hidden:function(e){return e?e.is(":hidden"):O.is(":hidden")},selectMutation:function(t){var n=!1;return e.each(t,function(t,i){return i.target&&e(i.target).is("select")?(n=!0,!0):void 0}),n},search:function(){return E.hasClass(x.search)},searchable:function(){return F.length>0},searchSelection:function(){return b.is.searchable()&&F.parent().is(E)},selection:function(){return E.hasClass(x.selection)},upward:function(){return E.hasClass(x.upward)},visible:function(e){return e?e.is(":visible"):O.is(":visible")}},can:{click:function(){return l||"click"==y.on},show:function(){return!E.hasClass(x.disabled)}},animate:{show:function(t,n){var o=n||O,a=n?function(){}:function(){b.hideSubMenus(),b.hideOthers(),b.set.active()};t=e.isFunction(t)?t:function(){},b.set.scrollPosition(b.get.activeItem(),!0),b.verbose("Doing menu show animation",o),(b.is.hidden(o)||b.is.animating(o))&&("auto"==y.transition&&(y.transition=b.is.upward()?"slide up":"slide down",b.verbose("Automatically determining animation based on animation direction",y.transition)),"none"==y.transition?t.call(I):e.fn.transition!==i&&E.transition("is supported")?o.transition({animation:y.transition+" in",debug:y.debug,verbose:y.verbose,duration:y.duration,queue:!0,onStart:a,onComplete:function(){t.call(I)}}):"slide down"==y.transition?(a(),o.hide().clearQueue().children().clearQueue().css("opacity",0).delay(50).animate({opacity:1},y.duration,"easeOutQuad",b.event.resetStyle).end().slideDown(100,"easeOutQuad",function(){b.event.resetStyle.call(this),t.call(I)})):"fade"==y.transition?(a(),o.hide().clearQueue().fadeIn(y.duration,function(){b.event.resetStyle.call(this),t.call(I)})):b.error(T.transition,y.transition))},hide:function(t,n){var o=n||O,a=(n?.9*y.duration:y.duration,n?function(){}:function(){b.can.click()&&b.unbind.intent(),b.focusSearch(),b.remove.active()});t=e.isFunction(t)?t:function(){},(b.is.visible(o)||b.is.animating(o))&&(b.verbose("Doing menu hide animation",o),"auto"==y.transition&&(y.transition=b.is.upward()?"slide up":"slide down"),R.trigger("blur"),"none"==y.transition?t.call(I):e.fn.transition!==i&&E.transition("is supported")?o.transition({animation:y.transition+" out",duration:y.duration,debug:y.debug,verbose:y.verbose,queue:!0,onStart:a,onComplete:function(){t.call(I)}}):"slide down"==y.transition?(a(),o.show().clearQueue().children().clearQueue().css("opacity",1).animate({opacity:0},100,"easeOutQuad",b.event.resetStyle).end().delay(50).slideUp(100,"easeOutQuad",function(){b.event.resetStyle.call(this),t.call(I)})):"fade"==y.transition?(a(),o.show().clearQueue().fadeOut(150,function(){b.event.resetStyle.call(this),t.call(I)})):b.error(T.transition))}},delay:{show:function(){b.verbose("Delaying show event to ensure user intent"),clearTimeout(b.timer),b.timer=setTimeout(b.show,y.delay.show)},hide:function(){b.verbose("Delaying hide event to ensure user intent"),clearTimeout(b.timer),b.timer=setTimeout(b.hide,y.delay.hide)}},escape:{regExp:function(e){return e=String(e),e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}},setting:function(t,n){if(b.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,y,t);else{if(n===i)return y[t];y[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},debug:function(){y.debug&&(y.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,y.name+":"),b.debug.apply(console,arguments)))},verbose:function(){y.verbose&&y.debug&&(y.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,y.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,y.name+":"),b.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;y.performance&&(t=(new Date).getTime(),i=u||t,n=t-i,u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:I,"Execution Time":n})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,100)},display:function(){var t=y.name+":",n=0;u=!1,clearTimeout(b.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,o){var r,s,c,l=N;return n=n||g,o=I||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(b.error(T.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},f?(N===i&&b.initialize(),b.invoke(m)):(N!==i&&N.invoke("destroy"),b.initialize())}),a!==i?a:this},e.fn.dropdown.settings={debug:!1,verbose:!0,performance:!0,on:"click",action:"activate",allowTab:!0,fullTextSearch:!1,preserveHTML:!0,sortSelect:!1,allowCategorySelection:!1,delay:{hide:300,show:200,search:50,touch:50},forceSelection:!0,transition:"auto",duration:250,onNoResults:function(){},onChange:function(){},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",method:"The method you called is not defined.",transition:"The requested transition was not found"},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholderText",text:"text",value:"value"},selector:{dropdown:".ui.dropdown",input:'> input[type="hidden"], > select',item:".item",menu:".menu",menuIcon:".dropdown.icon",search:"> input.search, .menu > .search > input, .menu > input.search",text:"> .text:not(.icon)"},className:{active:"active",animating:"animating",disabled:"disabled",dropdown:"ui dropdown",filtered:"filtered",loading:"loading",menu:"menu",placeholder:"default",search:"search",selected:"selected",selection:"selection",upward:"upward",visible:"visible"}},e.fn.dropdown.settings.templates={menu:function(t){var n=(t.placeholder||!1,t.values||{},"");return e.each(t.values,function(e,t){n+='<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),n},dropdown:function(t){var n=t.placeholder||!1,i=(t.values||{},"");return i+='<i class="dropdown icon"></i>',i+=t.placeholder?'<div class="default text">'+n+"</div>":'<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+='<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),i+="</div>"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.modal=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("body"),u=r.selector||"",d=(new Date).getTime(),m=[],f=arguments[0],g="string"==typeof f,p=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,h,b,y,x,w,C,k,T,S=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),A=S.selector,E=S.className,P=S.namespace,F=S.error,R="."+P,D="module-"+P,O=e(this),z=e(S.context),q=O.find(A.close),j=this,I=O.data(D);T={initialize:function(){T.verbose("Initializing dimmer",z),T.create.id(),T.create.dimmer(),T.refreshModals(),T.verbose("Attaching close events",q),T.bind.events(),T.observeChanges(),T.instantiate()},instantiate:function(){T.verbose("Storing instance of modal"),I=T,O.data(D,I)},create:{dimmer:function(){var t={debug:S.debug,dimmerName:"modals",duration:{show:S.duration,hide:S.duration}},n=e.extend(!0,t,S.dimmerSettings);return e.fn.dimmer===i?void T.error(F.dimmer):(T.debug("Creating dimmer with settings",n),y=z.dimmer(n),S.detachable&&(T.verbose("Modal is detachable, moving content into dimmer"),y.dimmer("add content",O)),void(x=y.dimmer("get dimmer")))},id:function(){T.verbose("Creating unique id for element"),C=T.get.uniqueID(),w="."+C}},destroy:function(){T.verbose("Destroying previous modal"),O.removeData(D).off(R),s.off(w),q.off(R),z.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&(k=new MutationObserver(function(){T.debug("DOM tree modified, refreshing"),T.refresh()}),k.observe(j,{childList:!0,subtree:!0}),T.debug("Setting up mutation observer",k))},refresh:function(){T.remove.scrolling(),T.cacheSizes(),T.set.screenHeight(),T.set.type(),T.set.position()},refreshModals:function(){h=O.siblings(A.modal),r=h.add(O)},attachEvents:function(t,n){var i=e(t);n=e.isFunction(T[n])?T[n]:T.toggle,i.length>0?(T.debug("Attaching modal events to element",t,n),i.off(R).on("click"+R,n)):T.error(F.notFound,t)},bind:{events:function(){q.on("click"+R,T.event.close),s.on("resize"+w,T.event.resize)}},get:{uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{close:function(){T.verbose("Closing element pressed"),e(this).is(A.approve)?S.onApprove.call(j)!==!1?T.hide():T.verbose("Approve callback returned false cancelling hide"):e(this).is(A.deny)?S.onDeny.call(j)!==!1?T.hide():T.verbose("Deny callback returned false cancelling hide"):T.hide()},click:function(t){0===e(t.target).closest(O).length&&(T.debug("Dimmer clicked, hiding all modals"),T.is.active()&&(T.remove.clickaway(),S.allowMultiple?T.hide():T.hideAll()))},debounce:function(e,t){clearTimeout(T.timer),T.timer=setTimeout(e,t)},keyboard:function(e){var t=e.which,n=27;t==n&&(S.closable?(T.debug("Escape key pressed hiding modal"),T.hide()):T.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&v(T.refresh)}},toggle:function(){T.is.active()||T.is.animating()?T.hide():T.show()},show:function(t){t=e.isFunction(t)?t:function(){},T.refreshModals(),T.showModal(t)},hide:function(t){t=e.isFunction(t)?t:function(){},T.refreshModals(),T.hideModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},T.is.animating()||!T.is.active()?(T.showDimmer(),T.cacheSizes(),T.set.position(),T.set.screenHeight(),T.set.type(),T.set.clickaway(),!S.allowMultiple&&h.filter(":visible").length>0?(T.debug("Other modals visible, queueing show animation"),T.hideOthers(T.showModal)):(S.onShow.call(j),S.transition&&e.fn.transition!==i&&O.transition("is supported")?(T.debug("Showing modal with css animations"),O.transition({debug:S.debug,animation:S.transition+" in",queue:S.queue,duration:S.duration,useFailSafe:!0,onComplete:function(){S.onVisible.apply(j),T.add.keyboardShortcuts(),T.save.focus(),T.set.active(),T.set.autofocus(),t()
}})):(T.debug("Showing modal with javascript"),O.fadeIn(S.duration,S.easing,function(){S.onVisible.apply(j),T.add.keyboardShortcuts(),T.save.focus(),T.set.active(),t()})))):T.debug("Modal is already visible")},hideModal:function(t){t=e.isFunction(t)?t:function(){},T.debug("Hiding modal"),S.onHide.call(j),(T.is.animating()||T.is.active())&&(S.transition&&e.fn.transition!==i&&O.transition("is supported")?(T.remove.active(),O.transition({debug:S.debug,animation:S.transition+" out",queue:S.queue,duration:S.duration,useFailSafe:!0,onStart:function(){T.othersActive()||T.hideDimmer(),T.remove.keyboardShortcuts()},onComplete:function(){S.onHidden.call(j),T.restore.focus(),t()}})):(T.remove.active(),T.othersActive()||T.hideDimmer(),T.remove.keyboardShortcuts(),O.fadeOut(S.duration,S.easing,function(){S.onHidden.call(j),T.restore.focus(),t()})))},showDimmer:function(){y.dimmer("is animating")||!y.dimmer("is active")?(T.debug("Showing dimmer"),y.dimmer("show")):T.debug("Dimmer already visible")},hideDimmer:function(){return y.dimmer("is animating")||y.dimmer("is active")?void y.dimmer("hide",function(){S.transition&&e.fn.transition!==i&&O.transition("is supported")&&(T.remove.clickaway(),T.remove.screenHeight())}):void T.debug("Dimmer is not visible cannot hide")},hideAll:function(t){t=e.isFunction(t)?t:function(){},r.is(":visible")&&(T.debug("Hiding all visible modals"),T.hideDimmer(),r.filter(":visible").modal("hide modal",t))},hideOthers:function(t){t=e.isFunction(t)?t:function(){},h.is(":visible")&&(T.debug("Hiding other modals",h),h.filter(":visible").modal("hide modal",t))},othersActive:function(){return h.filter("."+E.active).length>0},add:{keyboardShortcuts:function(){T.verbose("Adding keyboard shortcuts"),c.on("keyup"+R,T.event.keyboard)}},save:{focus:function(){b=e(n.activeElement).blur()}},restore:{focus:function(){b&&b.length>0&&b.focus()}},remove:{active:function(){O.removeClass(E.active)},clickaway:function(){S.closable&&x.off("click"+w)},screenHeight:function(){T.cache.height>T.cache.pageHeight&&(T.debug("Removing page height"),l.css("height",""))},keyboardShortcuts:function(){T.verbose("Removing keyboard shortcuts"),c.off("keyup"+R)},scrolling:function(){y.removeClass(E.scrolling),O.removeClass(E.scrolling)}},cacheSizes:function(){var o=O.outerHeight();(T.cache===i||0!==o)&&(T.cache={pageHeight:e(n).outerHeight(),height:o+S.offset,contextHeight:"body"==S.context?e(t).height():y.height()}),T.debug("Caching modal and container sizes",T.cache)},can:{fit:function(){return T.cache.height+2*S.padding<T.cache.contextHeight}},is:{active:function(){return O.hasClass(E.active)},animating:function(){return O.transition("is supported")?O.transition("is animating"):O.is(":visible")},scrolling:function(){return y.hasClass(E.scrolling)},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){if(S.autofocus){var e=O.find(":input:visible"),t=e.filter("[autofocus]"),n=t.length>0?t:e;n.first().focus()}},clickaway:function(){S.closable&&x.on("click"+w,T.event.click)},screenHeight:function(){T.can.fit()?l.css("height",""):(T.debug("Modal is taller than page content, resizing page height"),l.css("height",T.cache.height+S.padding/2))},active:function(){O.addClass(E.active)},scrolling:function(){y.addClass(E.scrolling),O.addClass(E.scrolling)},type:function(){T.can.fit()?(T.verbose("Modal fits on screen"),T.othersActive||T.remove.scrolling()):(T.verbose("Modal cannot fit on screen setting to scrolling"),T.set.scrolling())},position:function(){T.verbose("Centering modal on page",T.cache),O.css(T.can.fit()?{top:"",marginTop:-(T.cache.height/2)}:{marginTop:"",top:c.scrollTop()})}},setting:function(t,n){if(T.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,S,t);else{if(n===i)return S[t];S[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];T[t]=n}},debug:function(){S.debug&&(S.performance?T.performance.log(arguments):(T.debug=Function.prototype.bind.call(console.info,console,S.name+":"),T.debug.apply(console,arguments)))},verbose:function(){S.verbose&&S.debug&&(S.performance?T.performance.log(arguments):(T.verbose=Function.prototype.bind.call(console.info,console,S.name+":"),T.verbose.apply(console,arguments)))},error:function(){T.error=Function.prototype.bind.call(console.error,console,S.name+":"),T.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;S.performance&&(t=(new Date).getTime(),i=d||t,n=t-i,d=t,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:j,"Execution Time":n})),clearTimeout(T.performance.timer),T.performance.timer=setTimeout(T.performance.display,100)},display:function(){var t=S.name+":",n=0;d=!1,clearTimeout(T.performance.timer),e.each(m,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&m.length>0&&(console.groupCollapsed(t),console.table?console.table(m):e.each(m,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(t,n,o){var r,s,c,l=I;return n=n||p,o=j||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},g?(I===i&&T.initialize(),T.invoke(f)):(I!==i&&I.invoke("destroy"),T.initialize())}),a!==i?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",debug:!1,verbose:!0,performance:!0,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,dimmerSettings:{closable:!1,useCSS:!0},context:"body",queue:!1,duration:500,easing:"easeOutExpo",offset:0,transition:"scale",padding:50,onShow:function(){},onHide:function(){},onVisible:function(){},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:".close, .actions .button",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",scrolling:"scrolling"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.nag=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){{var a,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.nag.settings,n):e.extend({},e.fn.nag.settings),f=(m.className,m.selector),g=m.error,p=m.namespace,v="."+p,h=p+"-module",b=e(this),y=b.find(f.close),x=e(m.context?m.context:"body"),w=this,C=b.data(h);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}a={initialize:function(){a.verbose("Initializing element"),b.data(h,a),y.on("click"+v,a.dismiss),m.detachable&&b.parent()[0]!==x[0]&&b.detach().prependTo(x),m.displayTime>0&&setTimeout(a.hide,m.displayTime),a.show()},destroy:function(){a.verbose("Destroying instance"),b.removeData(h).off(v)},show:function(){a.should.show()&&!b.is(":visible")&&(a.debug("Showing nag",m.animation.show),"fade"==m.animation.show?b.fadeIn(m.duration,m.easing):b.slideDown(m.duration,m.easing))},hide:function(){a.debug("Showing nag",m.animation.hide),"fade"==m.animation.show?b.fadeIn(m.duration,m.easing):b.slideUp(m.duration,m.easing)},onHide:function(){a.debug("Removing nag",m.animation.hide),b.remove(),m.onHide&&m.onHide()},dismiss:function(e){m.storageMethod&&a.storage.set(m.key,m.value),a.hide(),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return m.persist?(a.debug("Persistent nag is set, can show nag"),!0):a.storage.get(m.key)!=m.value.toString()?(a.debug("Stored value is not set, can show nag",a.storage.get(m.key)),!0):(a.debug("Stored value is set, cannot show nag",a.storage.get(m.key)),!1)}},get:{storageOptions:function(){var e={};return m.expires&&(e.expires=m.expires),m.domain&&(e.domain=m.domain),m.path&&(e.path=m.path),e}},clear:function(){a.storage.remove(m.key)},storage:{set:function(n,o){var r=a.get.storageOptions();if("localstorage"==m.storageMethod&&t.localStorage!==i)t.localStorage.setItem(n,o),a.debug("Value stored using local storage",n,o);else{if(e.cookie===i)return void a.error(g.noCookieStorage);e.cookie(n,o,r),a.debug("Value stored using cookie",n,o,r)}},get:function(n){var o;return"localstorage"==m.storageMethod&&t.localStorage!==i?o=t.localStorage.getItem(n):e.cookie!==i?o=e.cookie(n):a.error(g.noCookieStorage),("undefined"==o||"null"==o||o===i||null===o)&&(o=i),o},remove:function(n){var o=a.get.storageOptions();"local"==m.storageMethod&&t.store!==i?t.localStorage.removeItem(n):e.cookie!==i?e.removeCookie(n,o):a.error(g.noStorage)}},setting:function(t,n){if(a.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){m.debug&&(m.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,m.name+":"),a.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,m.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:w,"Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,100)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,r){var s,c,l,u=C;return n=n||d,r=w||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(C===i&&a.initialize(),a.invoke(l)):(C!==i&&C.invoke("destroy"),a.initialize())}),o!==i?o:this},e.fn.nag.settings={name:"Nag",debug:!1,verbose:!0,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",storageMethod:"cookie",key:"nag",value:"dismiss",error:{noStorage:"Neither $.cookie or store is defined. A storage solution is required for storing state",method:"The method you called is not defined."},className:{bottom:"bottom",fixed:"fixed"},selector:{close:".close.icon"},speed:500,easing:"easeOutQuad",onHide:function(){}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.popup=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l=("ontouchstart"in n.documentElement,(new Date).getTime()),u=[],d=arguments[0],m="string"==typeof d,f=[].slice.call(arguments,1);return r.each(function(){var n,r,g,p=e.isPlainObject(o)?e.extend(!0,{},e.fn.popup.settings,o):e.extend({},e.fn.popup.settings),v=p.selector,h=p.className,b=p.error,y=p.metadata,x=p.namespace,w="."+p.namespace,C="module-"+x,k=e(this),T=e(p.context),S=p.target?e(p.target):k,A=e(t),E=e("body"),P=0,F=!1,R=this,D=k.data(C);g={initialize:function(){g.debug("Initializing module",k),"click"==p.on?k.on("click"+w,g.toggle):g.get.startEvent()&&k.on(g.get.startEvent()+w,g.event.start).on(g.get.endEvent()+w,g.event.end),p.target&&g.debug("Target set to element",S),A.on("resize"+w,g.event.resize),!g.exists()&&p.preserve&&g.create(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),D=g,k.data(C,D)},refresh:function(){p.popup?n=e(p.popup).eq(0):p.inline&&(n=S.next(v.popup).eq(0)),p.popup?(n.addClass(h.loading),r=g.get.offsetParent(),n.removeClass(h.loading),p.movePopup&&g.has.popup()&&g.get.offsetParent(n)[0]!==r[0]&&(g.debug("Moving popup to the same offset parent as activating element"),n.detach().appendTo(r))):r=p.inline?g.get.offsetParent(S):g.has.popup()?g.get.offsetParent(n):E,r.is("html")&&(g.debug("Setting page as offset parent"),r=E)},reposition:function(){g.refresh(),g.set.position()},destroy:function(){g.debug("Destroying previous module"),n&&!p.preserve&&g.removePopup(),clearTimeout(g.hideTimer),clearTimeout(g.showTimer),k.off(w).removeData(C)},event:{start:function(){var t=e.isPlainObject(p.delay)?p.delay.show:p.delay;clearTimeout(g.hideTimer),g.showTimer=setTimeout(function(){!g.is.hidden()||g.is.active()&&g.is.dropdown()||g.show()},t)},end:function(){var t=e.isPlainObject(p.delay)?p.delay.hide:p.delay;clearTimeout(g.showTimer),g.hideTimer=setTimeout(function(){g.is.visible()&&g.hide()},t)},resize:function(){g.is.visible()&&g.set.position()}},create:function(){var t=k.data(y.html)||p.html,i=k.data(y.variation)||p.variation,o=k.data(y.title)||p.title,a=k.data(y.content)||k.attr("title")||p.content;t||a||o?(g.debug("Creating pop-up html"),t||(t=p.templates.popup({title:o,content:a})),n=e("<div/>").addClass(h.popup).addClass(i).html(t),i&&n.addClass(i),p.inline?(g.verbose("Inserting popup element inline",n),n.insertAfter(k)):(g.verbose("Appending popup element to body",n),n.appendTo(T)),g.refresh(),p.hoverable&&g.bind.popup(),p.onCreate.call(n,R)):0!==S.next(v.popup).length?(g.verbose("Pre-existing popup found"),p.inline=!0,p.popup=S.next(v.popup),g.refresh(),p.hoverable&&g.bind.popup()):p.popup?(g.verbose("Used popup specified in settings"),g.refresh(),p.hoverable&&g.bind.popup()):g.debug("No content specified skipping display",R)},toggle:function(){g.debug("Toggling pop-up"),g.is.hidden()?(g.debug("Popup is hidden, showing pop-up"),g.unbind.close(),g.hideAll(),g.show()):(g.debug("Popup is visible, hiding pop-up"),g.hide())},show:function(t){t=e.isFunction(t)?t:function(){},g.debug("Showing pop-up",p.transition),g.exists()?p.preserve||p.popup||g.refresh():g.create(),n&&g.set.position()&&(g.save.conditions(),g.animate.show(t))},hide:function(t){t=e.isFunction(t)?t:function(){},g.remove.visible(),g.unbind.close(),g.is.visible()&&(g.restore.conditions(),g.animate.hide(t))},hideAll:function(){e(v.popup).filter(":visible").transition(p.transition)},hideGracefully:function(t){t&&0===e(t.target).closest(v.popup).length?(g.debug("Click occurred outside popup hiding popup"),g.hide()):g.debug("Click was inside popup, keeping popup open")},exists:function(){return n?p.inline||p.popup?g.has.popup():n.closest(T).length>=1?!0:!1:!1},removePopup:function(){g.debug("Removing popup",n),g.has.popup()&&!p.popup&&(n.remove(),n=i),p.onRemove.call(n,R)},save:{conditions:function(){g.cache={title:k.attr("title")},g.cache.title&&k.removeAttr("title"),g.verbose("Saving original attributes",g.cache.title)}},restore:{conditions:function(){return g.cache&&g.cache.title&&(k.attr("title",g.cache.title),g.verbose("Restoring original attributes",g.cache.title)),!0}},animate:{show:function(t){t=e.isFunction(t)?t:function(){},p.transition&&e.fn.transition!==i&&k.transition("is supported")?(g.set.visible(),n.transition({animation:p.transition+" in",queue:!1,debug:p.debug,verbose:p.verbose,duration:p.duration,onComplete:function(){g.bind.close(),t.call(n,R),p.onVisible.call(n,R)}})):(g.set.visible(),n.stop().fadeIn(p.duration,p.easing,function(){g.bind.close(),t.call(n,R),p.onVisible.call(n,R)})),p.onShow.call(n,R)},hide:function(t){t=e.isFunction(t)?t:function(){},g.debug("Hiding pop-up"),p.transition&&e.fn.transition!==i&&k.transition("is supported")?n.transition({animation:p.transition+" out",queue:!1,duration:p.duration,debug:p.debug,verbose:p.verbose,onComplete:function(){g.reset(),t.call(n,R),p.onHidden.call(n,R)}}):n.stop().fadeOut(p.duration,p.easing,function(){g.reset(),t.call(n,R),p.onHidden.call(n,R)}),p.onHide.call(n,R)}},get:{startEvent:function(){return"hover"==p.on?"mouseenter":"focus"==p.on?"focus":!1},endEvent:function(){return"hover"==p.on?"mouseleave":"focus"==p.on?"blur":!1},offsetParent:function(t){var n=t!==i?t[0]:k[0],o=n.parentNode,a=e(o);if(o)for(var r="none"===a.css("transform"),s="static"===a.css("position"),c=a.is("html");o&&!c&&s&&r;)o=o.parentNode,a=e(o),r="none"===a.css("transform"),s="static"===a.css("position"),c=a.is("html");return a&&a.length>0?a:e()},offstagePosition:function(i){var o={top:e(t).scrollTop(),bottom:e(t).scrollTop()+e(t).height(),left:0,right:e(t).width()},a={width:n.width(),height:n.height(),offset:n.offset()},r={},s=[];return i=i||!1,a.offset&&i&&(g.verbose("Checking if outside viewable area",a.offset),r={top:a.offset.top<o.top,bottom:a.offset.top+a.height>o.bottom,right:a.offset.left+a.width>o.right,left:a.offset.left<o.left}),e.each(r,function(e,t){t&&s.push(e)}),s.length>0?s.join(" "):!1},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(e){var t=e.split(" "),n=t[0],i=t[1],o={top:"bottom",bottom:"top",left:"right",right:"left"},a={left:"center",center:"right",right:"left"},r={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"},s="top"==n||"bottom"==n,c=!1,l=!1,u=!1;return F||(g.verbose("All available positions available"),F=g.get.positions()),g.debug("Recording last position tried",e),F[e]=!0,"opposite"===p.prefer&&(u=[o[n],i],u=u.join(" "),c=F[u]===!0,g.debug("Trying opposite strategy",u)),"adjacent"===p.prefer&&s&&(u=[n,a[i]],u=u.join(" "),l=F[u]===!0,g.debug("Trying adjacent strategy",u)),(l||c)&&(g.debug("Using backup position",u),u=r[e]),u}},set:{position:function(o,a){var s,c,l,u=(e(t).width(),e(t).height(),S.outerWidth()),d=S.outerHeight(),m=n.outerWidth(),f=n.outerHeight(),v=r.outerWidth(),x=r.outerHeight(),w=p.distanceAway,C=S[0],T=p.inline?parseInt(t.getComputedStyle(C).getPropertyValue("margin-top"),10):0,A=p.inline?parseInt(t.getComputedStyle(C).getPropertyValue(g.is.rtl()?"margin-right":"margin-left"),10):0,E=p.inline||p.popup?S.position():S.offset();switch(o=o||k.data(y.position)||p.position,a=a||k.data(y.offset)||p.offset,P==p.maxSearchDepth&&p.lastResort&&(g.debug("Using last resort position to display",p.lastResort),o=p.lastResort),p.inline&&(g.debug("Adding targets margin to calculation"),"left center"==o||"right center"==o?(a+=T,w+=-A):"top left"==o||"top center"==o||"top right"==o?(a+=A,w-=T):(a+=A,w+=T)),g.debug("Calculating popup positioning",o),s=o,g.is.rtl()&&(s=s.replace(/left|right/g,function(e){return"left"==e?"right":"left"}),g.debug("RTL: Popup positioning updated",s)),s){case"top left":c={top:"auto",bottom:x-E.top+w,left:E.left+a,right:"auto"};break;case"top center":c={bottom:x-E.top+w,left:E.left+u/2-m/2+a,top:"auto",right:"auto"};break;case"top right":c={bottom:x-E.top+w,right:v-E.left-u-a,top:"auto",left:"auto"};break;case"left center":c={top:E.top+d/2-f/2+a,right:v-E.left+w,left:"auto",bottom:"auto"};break;case"right center":c={top:E.top+d/2-f/2+a,left:E.left+u+w,bottom:"auto",right:"auto"};break;case"bottom left":c={top:E.top+d+w,left:E.left+a,bottom:"auto",right:"auto"};break;case"bottom center":c={top:E.top+d+w,left:E.left+u/2-m/2+a,bottom:"auto",right:"auto"};break;case"bottom right":c={top:E.top+d+w,right:v-E.left-u-a,left:"auto",bottom:"auto"}}if(c===i&&g.error(b.invalidPosition,o),g.debug("Calculated popup positioning values",c),n.css(c).removeClass(h.position).addClass(o).addClass(h.loading),l=g.get.offstagePosition(o)){if(g.debug("Popup cant fit into viewport",l),P<p.maxSearchDepth)return P++,o=g.get.nextPosition(o),g.debug("Trying new position",o),n?g.set.position(o):!1;if(!p.lastResort)return g.debug("Popup could not find a position in view",n),g.error(b.cannotPlace),g.remove.attempts(),g.remove.loading(),g.reset(),!1}return g.debug("Position is on stage",o),g.remove.attempts(),g.set.fluidWidth(),g.remove.loading(),!0},fluidWidth:function(){p.setFluidWidth&&n.hasClass(h.fluid)&&n.css("width",r.width())},visible:function(){k.addClass(h.visible)}},remove:{loading:function(){n.removeClass(h.loading)},visible:function(){k.removeClass(h.visible)},attempts:function(){g.verbose("Resetting all searched positions"),P=0,F=!1}},bind:{popup:function(){g.verbose("Allowing hover events on popup to prevent closing"),n&&g.has.popup()&&n.on("mouseenter"+w,g.event.start).on("mouseleave"+w,g.event.end)},close:function(){(p.hideOnScroll===!0||"auto"==p.hideOnScroll&&"click"!=p.on)&&(s.one("touchmove"+w,g.hideGracefully).one("scroll"+w,g.hideGracefully),T.one("touchmove"+w,g.hideGracefully).one("scroll"+w,g.hideGracefully)),"click"==p.on&&p.closable&&(g.verbose("Binding popup close event to document"),s.on("click"+w,function(e){g.verbose("Pop-up clickaway intent detected"),g.hideGracefully.call(R,e)}))}},unbind:{close:function(){(p.hideOnScroll===!0||"auto"==p.hideOnScroll&&"click"!=p.on)&&(s.off("scroll"+w,g.hide),T.off("scroll"+w,g.hide)),"click"==p.on&&p.closable&&(g.verbose("Removing close event from document"),s.off("click"+w))}},has:{popup:function(){return n&&n.length>0}},is:{active:function(){return k.hasClass(h.active)},animating:function(){return n&&n.is(":animated")||n.hasClass(h.animating)},visible:function(){return n&&n.is(":visible")},dropdown:function(){return k.hasClass(h.dropdown)},hidden:function(){return!g.is.visible()},rtl:function(){return"rtl"==k.css("direction")}},reset:function(){g.remove.visible(),p.preserve?e.fn.transition!==i&&n.transition("remove transition"):g.removePopup()},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=p.name+":",n=0;l=!1,clearTimeout(g.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,o){var r,s,c,l=D;return n=n||f,o=R||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},m?(D===i&&g.initialize(),g.invoke(d)):(D!==i&&D.invoke("destroy"),g.initialize())}),a!==i?a:this},e.fn.popup.settings={name:"Popup",debug:!1,verbose:!0,performance:!0,namespace:"popup",onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onHidden:function(){},variation:"",content:!1,html:!1,title:!1,on:"hover",closable:!0,hideOnScroll:"auto",context:"body",position:"top left",prefer:"opposite",lastResort:!1,delay:{show:30,hide:0},setFluidWidth:!0,movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,duration:200,easing:"easeOutQuint",transition:"scale",distanceAway:0,offset:0,maxSearchDepth:20,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"No visible position could be found for the popup",method:"The method you called is not defined."},metadata:{content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},popup:function(t){var n="",o=e.fn.popup.settings.templates.escape;return typeof t!==i&&(typeof t.title!==i&&t.title&&(t.title=o(t.title),n+='<div class="header">'+t.title+"</div>"),typeof t.content!==i&&t.content&&(t.content=o(t.content),n+='<div class="content">'+t.content+"</div>")),n}}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.progress=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),g=f.className,p=f.metadata,v=f.namespace,h=f.selector,b=f.error,y="."+v,x="module-"+v,w=e(this),C=e(this).find(h.bar),k=e(this).find(h.progress),T=e(this).find(h.label),S=this,A=w.data(x),E=!1;m={initialize:function(){m.debug("Initializing progress bar",f),a=m.get.transitionEnd(),m.read.metadata(),m.set.duration(),m.set.initials(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of progress",m),A=m,w.data(x,m)},destroy:function(){m.verbose("Destroying previous progress for",w),clearInterval(A.interval),m.remove.state(),w.removeData(x),A=i},reset:function(){m.set.percent(0)},complete:function(){(m.percent===i||m.percent<100)&&m.set.percent(100)},read:{metadata:function(){w.data(p.percent)&&(m.verbose("Current percent value set from metadata"),m.percent=w.data(p.percent)),w.data(p.total)&&(m.verbose("Total value set from metadata"),m.total=w.data(p.total)),w.data(p.value)&&(m.verbose("Current value set from metadata"),m.value=w.data(p.value))},currentValue:function(){return m.value!==i?m.value:!1}},increment:function(e){var t,n,i,o=m.total||!1;o?(n=m.value||0,e=e||1,i=n+e,t=m.total,m.debug("Incrementing value by",e,n,t),i>t&&(m.debug("Value cannot increment above total",t),i=t),m.set.progress(i)):(n=m.percent||0,e=e||m.get.randomValue(),i=n+e,t=100,m.debug("Incrementing percentage by",e,n),i>t&&(m.debug("Value cannot increment above 100 percent"),i=t),m.set.progress(i))},decrement:function(e){var t,n,i=m.total||!1,o=0;i?(t=m.value||0,e=e||1,n=t-e,m.debug("Decrementing value by",e,t)):(t=m.percent||0,e=e||m.get.randomValue(),n=t-e,m.debug("Decrementing percentage by",e,t)),o>n&&(m.debug("Value cannot decrement below 0"),n=0),m.set.progress(n)},get:{text:function(e){var t=m.value||0,n=m.total||0,i=m.is.visible()&&E?m.get.displayPercent():m.percent||0,o=m.total>0?n-t:100-i;return e=e||"",e=e.replace("{value}",t).replace("{total}",n).replace("{left}",o).replace("{percent}",i),m.debug("Adding variables to progress bar text",e),e},randomValue:function(){return m.debug("Generating random increment percentage"),Math.floor(Math.random()*f.random.max+f.random.min)},transitionEnd:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},displayPercent:function(){var e=C.width(),t=w.width(),n=parseInt(C.css("min-width"),10),i=e>n?e/t*100:m.percent;return Math.round(0===f.precision?i:10*i*f.precision/(10*f.precision))},percent:function(){return m.percent||0},value:function(){return m.value||!1},total:function(){return m.total||!1}},is:{success:function(){return w.hasClass(g.success)},warning:function(){return w.hasClass(g.warning)},error:function(){return w.hasClass(g.error)},active:function(){return w.hasClass(g.active)},visible:function(){return w.is(":visible")}},remove:{state:function(){m.verbose("Removing stored state"),delete m.total,delete m.percent,delete m.value},active:function(){m.verbose("Removing active state"),w.removeClass(g.active)},success:function(){m.verbose("Removing success state"),w.removeClass(g.success)},warning:function(){m.verbose("Removing warning state"),w.removeClass(g.warning)},error:function(){m.verbose("Removing error state"),w.removeClass(g.error)}},set:{barWidth:function(e){e>100?m.error(b.tooHigh,e):0>e?m.error(b.tooLow,e):(C.css("width",e+"%"),w.attr("data-percent",parseInt(e,10)))},duration:function(e){e=e||f.duration,e="number"==typeof e?e+"ms":e,m.verbose("Setting progress bar transition duration",e),C.css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},initials:function(){f.total!==!1&&(m.verbose("Current total set in settings",f.total),m.total=f.total),f.value!==!1&&(m.verbose("Current value set in settings",f.value),m.value=f.value),f.percent!==!1&&(m.verbose("Current percent set in settings",f.percent),m.percent=f.percent),m.percent!==i?m.set.percent(m.percent):m.value!==i&&m.set.progress(m.value)},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e>0&&1>e&&(m.verbose("Module percentage passed as decimal, converting"),e=100*e),e=Math.round(0===f.precision?e:10*e*f.precision/(10*f.precision)),m.percent=e,m.total?m.value=Math.round(e/100*m.total):f.limitValues&&(m.value=m.value>100?100:m.value<0?0:m.value),m.set.barWidth(e),m.is.visible()&&m.set.labelInterval(),m.set.labels(),f.onChange.call(S,e,m.value,m.total)},labelInterval:function(){var e=function(){m.verbose("Bar finished animating, removing continuous label updates"),clearInterval(m.interval),E=!1,m.set.labels()};clearInterval(m.interval),C.one(a+y,e),m.timer=setTimeout(e,f.duration+100),E=!0,m.interval=setInterval(m.set.labels,f.framerate)},labels:function(){m.verbose("Setting both bar progress and outer label text"),m.set.barLabel(),m.set.state()},label:function(e){e=e||"",e&&(e=m.get.text(e),m.debug("Setting label to text",e),T.text(e))},state:function(e){e=e!==i?e:m.percent,100===e?!f.autoSuccess||m.is.warning()||m.is.error()?(m.verbose("Reached 100% removing active state"),m.remove.active()):(m.set.success(),m.debug("Automatically triggering success at 100%")):e>0?(m.verbose("Adjusting active progress bar label",e),m.set.active()):(m.remove.active(),m.set.label(f.text.active))},barLabel:function(e){e!==i?k.text(m.get.text(e)):"ratio"==f.label&&m.total?(m.debug("Adding ratio to bar label"),k.text(m.get.text(f.text.ratio))):"percent"==f.label&&(m.debug("Adding percentage to bar label"),k.text(m.get.text(f.text.percent)))},active:function(e){e=e||f.text.active,m.debug("Setting active state"),f.showActivity&&!m.is.active()&&w.addClass(g.active),m.remove.warning(),m.remove.error(),m.remove.success(),e&&m.set.label(e),f.onActive.call(S,m.value,m.total)
},success:function(e){e=e||f.text.success,m.debug("Setting success state"),w.addClass(g.success),m.remove.active(),m.remove.warning(),m.remove.error(),m.complete(),e&&m.set.label(e),f.onSuccess.call(S,m.total)},warning:function(e){e=e||f.text.warning,m.debug("Setting warning state"),w.addClass(g.warning),m.remove.active(),m.remove.success(),m.remove.error(),m.complete(),e&&m.set.label(e),f.onWarning.call(S,m.value,m.total)},error:function(e){e=e||f.text.error,m.debug("Setting error state"),w.addClass(g.error),m.remove.active(),m.remove.success(),m.remove.warning(),m.complete(),e&&m.set.label(e),f.onError.call(S,m.value,m.total)},total:function(e){m.total=e},progress:function(e){var t,n="string"==typeof e?""!==e.replace(/[^\d.]/g,"")?+e.replace(/[^\d.]/g,""):!1:e;n===!1&&m.error(b.nonNumeric,e),m.total?(m.value=n,t=n/m.total*100,m.debug("Calculating percent complete from total",t),m.set.percent(t)):(t=n,m.debug("Setting value to exact percentage value",t),m.set.percent(t))}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=A;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(A===i&&m.initialize(),m.invoke(l)):(A!==i&&A.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.progress.settings={name:"Progress",namespace:"progress",debug:!1,verbose:!0,performance:!0,random:{min:2,max:5},duration:300,autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:1,framerate:1e3/30,percent:!1,total:!1,value:!1,onChange:function(){},onSuccess:function(){},onActive:function(){},onError:function(){},onWarning:function(){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.rating=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return o.each(function(){var d,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),f=m.namespace,g=m.className,p=m.metadata,v=m.selector,h=(m.error,"."+f),b="module-"+f,y=this,x=e(this).data(b),w=e(this),C=w.find(v.icon);d={initialize:function(){d.verbose("Initializing rating module",m),0===C.length&&d.setup.layout(),m.interactive?d.enable():d.disable(),m.initialRating&&(d.debug("Setting initial rating"),d.setRating(m.initialRating)),w.data(p.rating)&&(d.debug("Rating found in metadata"),d.setRating(w.data(p.rating))),d.instantiate()},instantiate:function(){d.verbose("Instantiating module",m),x=d,w.data(b,d)},destroy:function(){d.verbose("Destroying previous instance",x),w.removeData(b),C.off(h)},refresh:function(){C=w.find(v.icon)},setup:{layout:function(){var t=w.data(p.maxRating)||m.maxRating;d.debug("Generating icon html dynamically"),w.html(e.fn.rating.settings.templates.icon(t)),d.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(g.selected),w.addClass(g.selected),t.addClass(g.selected).prevAll().addClass(g.selected)},mouseleave:function(){w.removeClass(g.selected),C.removeClass(g.selected)},click:function(){var t=e(this),n=d.getRating(),i=C.index(t)+1,o="auto"==m.clearable?1===C.length:m.clearable;o&&n==i?d.clearRating():d.setRating(i)}},clearRating:function(){d.debug("Clearing current rating"),d.setRating(0)},getRating:function(){var e=C.filter("."+g.active).length;return d.verbose("Current rating retrieved",e),e},enable:function(){d.debug("Setting rating to interactive mode"),C.on("mouseenter"+h,d.event.mouseenter).on("mouseleave"+h,d.event.mouseleave).on("click"+h,d.event.click),w.removeClass(g.disabled)},disable:function(){d.debug("Setting rating to read-only mode"),C.off(h),w.addClass(g.disabled)},setRating:function(e){var t=e-1>=0?e-1:0,n=C.eq(t);w.removeClass(g.selected),C.removeClass(g.selected).removeClass(g.active),e>0&&(d.verbose("Setting current rating to",e),n.prevAll().andSelf().addClass(g.active)),m.onRate.call(y,e)},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(n===i)return d[t];d[t]=n}},debug:function(){m.debug&&(m.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,m.name+":"),d.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,m.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,100)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,c,l=x;return o=o||u,a=y||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,o):s!==i&&(c=s),e.isArray(n)?n.push(c):n!==i?n=[n,c]:c!==i&&(n=c),s}},l?(x===i&&d.initialize(),d.invoke(c)):(x!==i&&x.invoke("destroy"),d.initialize())}),n!==i?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",debug:!1,verbose:!0,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",onRate:function(){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";e>=t;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.search=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return e(this).each(function(){var f,g=e.extend(!0,{},e.fn.search.settings,o),p=g.className,v=g.metadata,h=g.regExp,b=g.selector,y=g.error,x=g.namespace,w="."+x,C=x+"-module",k=e(this),T=k.find(b.prompt),S=k.find(b.searchButton),A=k.find(b.results),E=(k.find(b.result),k.find(b.category),this),P=k.data(C);f={initialize:function(){f.verbose("Initializing module");var e=T[0],t=e!==i&&e.oninput!==i?"input":e!==i&&e.onpropertychange!==i?"propertychange":"keyup";g.automatic&&T.on(t+w,f.throttle),T.on("focus"+w,f.event.focus).on("blur"+w,f.event.blur).on("keydown"+w,f.handleKeyboard),S.on("click"+w,f.query),A.on("mousedown"+w,f.event.result.mousedown).on("mouseup"+w,f.event.result.mouseup).on("click"+w,b.result,f.event.result.click),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),P=f,k.data(C,f)},destroy:function(){f.verbose("Destroying instance"),k.removeData(C),T.off(w),S.off(w),A.off(w)},event:{focus:function(){f.set.focus(),clearTimeout(f.timer),f.throttle(),f.has.minimumCharacters()&&f.showResults()},blur:function(){var e=n.activeElement===this;e||f.resultsClicked||(f.cancel.query(),f.remove.focus(),f.timer=setTimeout(f.hideResults,g.hideDelay))},result:{mousedown:function(){f.resultsClicked=!0},mouseup:function(){f.resultsClicked=!1},click:function(n){f.debug("Search result selected");var i=e(this),o=i.find(b.title).eq(0),a=i.find("a[href]").eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,c=(o.html(),o.length>0?o.text():!1),l=f.get.results(),u=f.get.result(c,l);return e.isFunction(g.onSelect)&&g.onSelect.call(E,u,l)===!1?void f.debug("Custom onSelect callback cancelled default select action"):(f.hideResults(),c&&f.set.value(c),void(r&&(f.verbose("Opening search link found in result",a),"_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)))}}},handleKeyboard:function(e){var t,n=k.find(b.result),i=k.find(b.category),o=n.index(n.filter("."+p.active)),a=n.length,r=e.which,s={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40};if(r==s.escape&&(f.verbose("Escape key pressed, blurring search field"),T.trigger("blur")),f.is.visible())if(r==s.enter){if(f.verbose("Enter key pressed, selecting active result"),n.filter("."+p.active).length>0)return f.event.result.click.call(n.filter("."+p.active),e),e.preventDefault(),!1}else r==s.upArrow?(f.verbose("Up key pressed, changing active result"),t=0>o-1?o:o-1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault()):r==s.downArrow&&(f.verbose("Down key pressed, changing active result"),t=o+1>=a?o:o+1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault());else r==s.enter&&(f.verbose("Enter key pressed, executing query"),f.query(),f.set.buttonPressed(),T.one("keyup",f.remove.buttonFocus))},setup:{api:function(){var e={on:!1,action:"search",onFailure:f.error};f.verbose("First request, initializing API"),k.api(e)}},can:{useAPI:function(){return e.fn.api!==i},transition:function(){return g.transition&&e.fn.transition!==i&&k.transition("is supported")}},is:{empty:function(){return""===A.html()},visible:function(){return A.filter(":visible").length>0},focused:function(){return T.filter(":focus").length>0}},get:{value:function(){return T.val()},results:function(){var e=k.data(v.results);return e},result:function(t,n){var i=!1;return t=t||f.get.value(),n=n||f.get.results(),"category"===g.type?(f.debug("Finding result that matches",t),e.each(n,function(n,o){return e.isArray(o.results)&&(i=f.search.object(t,o.results)[0],i.length>0)?!0:void 0})):(f.debug("Finding result in results object",t),i=f.search.object(t,n)[0]),i}},set:{focus:function(){k.addClass(p.focus)},loading:function(){k.addClass(p.loading)},value:function(e){f.verbose("Setting search input value",e),T.val(e),f.query()},buttonPressed:function(){S.addClass(p.pressed)}},remove:{loading:function(){k.removeClass(p.loading)},focus:function(){k.removeClass(p.focus)},buttonPressed:function(){S.removeClass(p.pressed)}},query:function(){var t=f.get.value(),n=f.read.cachedHTML(t);n?(f.debug("Reading result for "+t+" from cache"),f.addResults(n)):(f.debug("Querying for "+t),e.isPlainObject(g.source)||e.isArray(g.source)?f.search.local(t):f.can.useAPI()?g.apiSettings?(f.debug("Searching with specified API settings",g.apiSettings),f.search.remote(t)):e.api.settings.api.search!==i&&(f.debug("Searching with default search API endpoint"),f.search.remote(t)):f.error(y.source),g.onSearchQuery.call(E,t))},search:{local:function(e){var t,n=f.search.object(e,g.content);f.set.loading(),f.save.results(n),f.debug("Returned local search results",n),t=f.generateResults({results:n}),f.remove.loading(),f.write.cachedHTML(e,t),f.addResults(t)},remote:function(t){var n={onSuccess:function(e){f.parse.response.call(E,e,t)},urlData:{query:t}};k.api("get request")||f.setup.api(),e.extend(!0,n,g.apiSettings),f.debug("Executing search",n),f.cancel.query(),k.api("setting",n).api("query")},object:function(t,n){var o=[],a=[],r=e.isArray(g.searchFields)?g.searchFields:[g.searchFields],s=new RegExp(h.exact+t,"i"),c=new RegExp(t,"i");return n=n||g.source,n===i?(f.error(y.source),[]):(e.each(r,function(t,i){e.each(n,function(t,n){var r="string"==typeof n[i],l=-1==e.inArray(n,o)&&-1==e.inArray(n,a);r&&l&&(n[i].match(s)?o.push(n):g.searchFullText&&n[i].match(c)&&a.push(n))})}),e.merge(o,a))}},parse:{response:function(e,t){var n=f.generateResults(e);f.verbose("Parsing server response",e),e!==i&&(t&&(f.write.cachedHTML(t,n),e.results!==i&&f.save.results(e.results)),f.addResults(n))}},throttle:function(){clearTimeout(f.timer),f.has.minimumCharacters()?f.timer=setTimeout(f.query,g.searchDelay):f.hideResults()},cancel:{query:function(){f.can.useAPI()&&k.api("abort")}},has:{minimumCharacters:function(){var e=f.get.value(),t=e.length;return t>=g.minCharacters}},read:{cachedHTML:function(e){var t=k.data(v.cache);return g.cache?(f.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==i?t[e]:!1):!1}},save:{results:function(e){f.verbose("Saving current search results to metadata",e),k.data(v.results,e)}},write:{cachedHTML:function(e,t){var n=k.data(v.cache)!==i?k.data(v.cache):{};g.cache&&(f.verbose("Writing generated html to cache",e,t),n[e]=t,k.data(v.cache,n))}},addResults:function(t){return e.isFunction(g.onResultsAdd)&&g.onResultsAdd.call(A,t)===!1?(f.debug("onResultsAdd callback cancelled default action"),!1):(A.html(t),void f.showResults())},showResults:function(){f.is.visible()||!f.is.focused()||f.is.empty()||(f.can.transition()?(f.debug("Showing results with css animations"),A.transition({animation:g.transition+" in",duration:g.duration,queue:!0})):(f.debug("Showing results with javascript"),A.stop().fadeIn(g.duration,g.easing)),g.onResultsOpen.call(A))},hideResults:function(){f.is.visible()&&(f.can.transition()?(f.debug("Hiding results with css animations"),A.transition({animation:g.transition+" out",duration:g.duration,queue:!0})):(f.debug("Hiding results with javascript"),A.stop().fadeOut(g.duration,g.easing)),g.onResultsClose.call(A))},generateResults:function(t){f.debug("Generating html from response",t);var n=g.templates[g.type],i=e.isPlainObject(t.results)&&!e.isEmptyObject(t.results),o=e.isArray(t.results)&&t.results.length>0,a="";return i||o?(g.maxResults>0&&(i?"standard"==g.type&&f.error(y.maxResults):t.results=t.results.slice(0,g.maxResults)),e.isFunction(n)?a=n(t):f.error(y.noTemplate,!1)):a=f.displayMessage(y.noResults,"empty"),g.onResults.call(E,t),a},displayMessage:function(e,t){return t=t||"standard",f.debug("Displaying message",e,t),f.addResults(g.templates.message(e,t)),g.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=g.name+":",n=0;c=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=P;return n=n||m,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(P===i&&f.initialize(),f.invoke(u)):(P!==i&&P.invoke("destroy"),f.initialize())}),a!==i?a:this},e.fn.search.settings={name:"Search Module",namespace:"search",debug:!1,verbose:!0,performance:!0,type:"standard",minCharacters:1,apiSettings:!1,source:!1,searchFields:["title","description"],searchFullText:!0,automatic:"true",hideDelay:0,searchDelay:100,maxResults:7,cache:!0,transition:"scale",duration:300,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(){},onResults:function(){},onResultsOpen:function(){},onResultsClose:function(){},className:{active:"active",empty:"empty",focus:"focus",loading:"loading",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noTemplate:"A valid template name was not specified.",serverError:"There was an issue with querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results"},regExp:{exact:"(?:s|^)"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},message:function(e,t){var n="";return e!==i&&t!==i&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t){var n="",o=e.fn.search.settings.templates.escape;return t.results!==i?(e.each(t.results,function(t,a){a.results!==i&&a.results.length>0&&(n+='<div class="category"><div class="name">'+a.name+"</div>",e.each(a.results,function(e,t){n+='<div class="result">',t.url&&(n+='<a href="'+t.url+'"></a>'),t.image!==i&&(t.image=o(t.image),n+='<div class="image"> <img src="'+t.image+'" alt=""></div>'),n+='<div class="content">',t.price!==i&&(t.price=o(t.price),n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(t.title=o(t.title),n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div></div>"}),n+="</div>")}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1},standard:function(t){var n="";return t.results!==i?(e.each(t.results,function(e,t){n+=t.url?'<a class="result" href="'+t.url+'">':'<a class="result">',t.image!==i&&(n+='<div class="image"> <img src="'+t.image+'"></div>'),n+='<div class="content">',t.price!==i&&(n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div>",n+="</a>"}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1}}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.shape=function(o){var a,r=e(this),s=(e("body"),(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var t,f,g,p=r.selector||"",v=e.extend(!0,{},e.fn.shape.settings,o),h=v.namespace,b=v.selector,y=v.error,x=v.className,w="."+h,C="module-"+h,k=e(this),T=k.find(b.sides),S=k.find(b.side),A=!1,E=this,P=k.data(C);g={initialize:function(){g.verbose("Initializing module for",E),g.set.defaultSide(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),P=g,k.data(C,P)},destroy:function(){g.verbose("Destroying previous module for",E),k.removeData(C).off(w)},refresh:function(){g.verbose("Refreshing selector cache for",E),k=e(E),T=e(this).find(b.shape),S=e(this).find(b.side)},repaint:function(){g.verbose("Forcing repaint event");{var e=T.get(0)||n.createElement("div");e.offsetWidth}},animate:function(e,n){g.verbose("Animating box with properties",e),n=n||function(e){g.verbose("Executing animation callback"),e!==i&&e.stopPropagation(),g.reset(),g.set.active()},v.beforeChange.call(f.get()),g.get.transitionEvent()?(g.verbose("Starting CSS animation"),k.addClass(x.animating),T.css(e).one(g.get.transitionEvent(),n),g.set.duration(v.duration),m(function(){k.addClass(x.animating),t.addClass(x.hidden)})):n()},queue:function(e){g.debug("Queueing animation of",e),T.one(g.get.transitionEvent(),function(){g.debug("Executing queued animation"),setTimeout(function(){k.shape(e)},0)})},reset:function(){g.verbose("Animating states reset"),k.removeClass(x.animating).attr("style","").removeAttr("style"),T.attr("style","").removeAttr("style"),S.attr("style","").removeAttr("style").removeClass(x.hidden),f.removeClass(x.animating).attr("style","").removeAttr("style")},is:{complete:function(){return S.filter("."+x.active)[0]==f[0]},animating:function(){return k.hasClass(x.animating)}},set:{defaultSide:function(){t=k.find("."+v.className.active),f=t.next(b.side).length>0?t.next(b.side):k.find(b.side).first(),A=!1,g.verbose("Active side set to",t),g.verbose("Next side set to",f)},duration:function(e){e=e||v.duration,e="number"==typeof e?e+"ms":e,g.verbose("Setting animation duration",e),T.add(S).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},stageSize:function(){var e=k.clone().addClass(x.loading),t=e.find("."+v.className.active),n=A?e.find(b.side).eq(A):t.next(b.side).length>0?t.next(b.side):e.find(b.side).first(),i={};t.removeClass(x.active),n.addClass(x.active),e.insertAfter(k),i={width:n.outerWidth(),height:n.outerHeight()},e.remove(),k.css(i),g.verbose("Resizing stage to fit new content",i)},nextSide:function(e){A=e,f=S.filter(e),A=S.index(f),0===f.length&&(g.set.defaultSide(),g.error(y.side)),g.verbose("Next side manually set to",f)},active:function(){g.verbose("Setting new side to active",f),S.removeClass(x.active),f.addClass(x.active),v.onChange.call(f.get()),g.set.defaultSide()}},flip:{up:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip up"):(g.debug("Flipping up",f),g.set.stageSize(),g.stage.above(),g.animate(g.get.transform.up()))):void g.debug("Side already visible",f)},down:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip down"):(g.debug("Flipping down",f),g.set.stageSize(),g.stage.below(),g.animate(g.get.transform.down()))):void g.debug("Side already visible",f)},left:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip left"):(g.debug("Flipping left",f),g.set.stageSize(),g.stage.left(),g.animate(g.get.transform.left()))):void g.debug("Side already visible",f)},right:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip right"):(g.debug("Flipping right",f),g.set.stageSize(),g.stage.right(),g.animate(g.get.transform.right()))):void g.debug("Side already visible",f)},over:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip over"):(g.debug("Flipping over",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.over()))):void g.debug("Side already visible",f)},back:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip back"):(g.debug("Flipping back",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.back()))):void g.debug("Side already visible",f)}},get:{transform:{up:function(){var e={y:-((t.outerHeight()-f.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(-90deg)"}},down:function(){var e={y:-((t.outerHeight()-f.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(90deg)"}},left:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(90deg)"}},right:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(-90deg)"}},over:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(180deg)"}},back:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},nextSide:function(){return t.next(b.side).length>0?t.next(b.side):k.find(b.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight()-f.outerHeight())/2,depth:{active:f.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as above",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight()-f.outerHeight())/2,depth:{active:f.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as below",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-90deg) translateZ("+e.depth.next+"px)"})},right:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(90deg) translateZ("+e.depth.next+"px)"})},behind:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as behind",f,e),t.css({transform:"rotateY(0deg)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){v.debug&&(v.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,v.name+":"),g.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,v.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",p&&(t+=" '"+p+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,c,l=P;return n=n||d,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},u?(P===i&&g.initialize(),g.invoke(l)):(P!==i&&P.invoke("destroy"),g.initialize())}),a!==i?a:this},e.fn.shape.settings={name:"Shape",debug:!1,verbose:!0,performance:!0,namespace:"shape",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:700,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sidebar=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("html"),u=e("head"),d=r.selector||"",m=(new Date).getTime(),f=[],g=arguments[0],p="string"==typeof g,v=[].slice.call(arguments,1),h=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,y,x,w,C,k=e.isPlainObject(o)?e.extend(!0,{},e.fn.sidebar.settings,o):e.extend({},e.fn.sidebar.settings),T=k.selector,S=k.className,A=k.namespace,E=k.regExp,P=k.error,F="."+A,R="module-"+A,D=e(this),O=e(k.context),z=D.children(T.sidebar),q=O.children(T.fixed),j=O.children(T.pusher),I=this,N=D.data(R);
C={initialize:function(){C.debug("Initializing sidebar",o),C.create.id(),w=C.get.transitionEvent(),("auto"==k.useLegacy&&C.is.legacy()||k.useLegacy===!0)&&(k.transition="overlay",k.useLegacy=!0),C.is.ios()&&C.set.ios(),k.delaySetup?h(C.setup.layout):C.setup.layout(),C.instantiate()},instantiate:function(){C.verbose("Storing instance of module",C),N=C,D.data(R,C)},create:{id:function(){C.verbose("Creating unique id for element"),y=C.get.uniqueID(),b="."+y}},destroy:function(){C.verbose("Destroying previous module for",D),C.remove.direction(),D.off(F).removeData(R),O.off(b),s.off(b),c.off(b)},event:{clickaway:function(e){var t=j.find(e.target).length>0||j.is(e.target),n=O.is(e.target);t&&(C.verbose("User clicked on dimmed page"),C.hide()),n&&(C.verbose("User clicked on dimmable context (scaled out page)"),C.hide())},touch:function(){},containScroll:function(){I.scrollTop<=0&&(I.scrollTop=1),I.scrollTop+I.offsetHeight>=I.scrollHeight&&(I.scrollTop=I.scrollHeight-I.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(T.sidebar).length&&t.preventDefault()}},bind:{clickaway:function(){C.verbose("Adding clickaway events to context",O),k.closable&&O.on("click"+b,C.event.clickaway).on("touchend"+b,C.event.clickaway)},scrollLock:function(){k.scrollLock&&(C.debug("Disabling page scroll"),s.on("DOMMouseScroll"+b,C.event.scroll)),C.verbose("Adding events to contain sidebar scroll"),c.on("touchmove"+b,C.event.touch),D.on("scroll"+F,C.event.containScroll)}},unbind:{clickaway:function(){C.verbose("Removing clickaway events from context",O),O.off(b)},scrollLock:function(){C.verbose("Removing scroll lock from page"),c.off(b),s.off(b),D.off("scroll"+F)}},add:{bodyCSS:function(){var t,n=D.outerWidth(),i=D.outerHeight(),o=C.get.direction(),a={left:n,right:-n,top:i,bottom:-i};C.is.rtl()&&(C.verbose("RTL detected, flipping widths"),a.left=-n,a.right=n),t='<style title="'+A+'">',"left"===o||"right"===o?(C.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+o+".sidebar ~ .fixed, .ui.visible."+o+".sidebar ~ .pusher {   -webkit-transform: translate3d("+a[o]+"px, 0, 0);           transform: translate3d("+a[o]+"px, 0, 0); }"):("top"===o||"bottom"==o)&&(t+=" .ui.visible."+o+".sidebar ~ .fixed, .ui.visible."+o+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+a[o]+"px, 0);           transform: translate3d(0, "+a[o]+"px, 0); }"),C.is.ie()&&("left"===o||"right"===o?(C.debug("Adding CSS rules for animation distance",n),t+=" body.pushable > .ui.visible."+o+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+a[o]+"px, 0, 0);           transform: translate3d("+a[o]+"px, 0, 0); }"):("top"===o||"bottom"==o)&&(t+=" body.pushable > .ui.visible."+o+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+a[o]+"px, 0);           transform: translate3d(0, "+a[o]+"px, 0); }"),t+=" body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"),t+="</style>",u.append(t),r=e("style[title="+A+"]"),C.debug("Adding sizing css to head",r)}},refresh:function(){C.verbose("Refreshing selector cache"),O=e(k.context),z=O.children(T.sidebar),j=O.children(T.pusher),q=O.children(T.fixed)},refreshSidebars:function(){C.verbose("Refreshing other sidebars"),z=O.children(T.sidebar)},repaint:function(){C.verbose("Forcing repaint event"),I.style.display="none",I.offsetHeight,I.scrollTop=I.scrollTop,I.style.display=""},setup:{layout:function(){0===O.children(T.pusher).length&&(C.debug("Adding wrapper element for sidebar"),C.error(P.pusher),j=e('<div class="pusher" />'),O.children().not(T.omitted).not(z).wrapAll(j),C.refresh()),(0===D.nextAll(T.pusher).length||D.nextAll(T.pusher)[0]!==j[0])&&(C.debug("Moved sidebar to correct parent element"),C.error(P.movedSidebar,I),D.detach().prependTo(O),C.refresh()),C.set.pushable(),C.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(C[n])?C[n]:C.toggle,i.length>0?(C.debug("Attaching sidebar events to element",t,n),i.on("click"+F,n)):C.error(P.notFound,t)},show:function(t){var n=k.useLegacy===!0?C.legacyPushPage:C.pushPage;if(t=e.isFunction(t)?t:function(){},C.is.hidden()){if(C.refreshSidebars(),k.overlay&&(C.error(P.overlay),k.transition="overlay"),C.refresh(),C.othersActive())if(C.debug("Other sidebars currently visible"),k.exclusive){if("overlay"!=k.transition)return void C.hideOthers(C.show);C.hideOthers()}else k.transition="overlay";n(function(){t.call(I),k.onShow.call(I)}),k.onChange.call(I),k.onVisible.call(I)}else C.debug("Sidebar is already visible")},hide:function(t){var n=k.useLegacy===!0?C.legacyPullPage:C.pullPage;t=e.isFunction(t)?t:function(){},(C.is.visible()||C.is.animating())&&(C.debug("Hiding sidebar",t),C.refreshSidebars(),n(function(){t.call(I),k.onHidden.call(I)}),k.onChange.call(I),k.onHide.call(I))},othersAnimating:function(){return z.not(D).filter("."+S.animating).length>0},othersVisible:function(){return z.not(D).filter("."+S.visible).length>0},othersActive:function(){return C.othersVisible()||C.othersAnimating()},hideOthers:function(e){var t=z.not(D).filter("."+S.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){i++,i==n&&e()})},toggle:function(){C.verbose("Determining toggled direction"),C.is.hidden()?C.show():C.hide()},pushPage:function(t){var n,i,o=C.get.transition(),a="safe"==o?O:"overlay"===o||C.othersActive()?D:j;t=e.isFunction(t)?t:function(){},"scale down"==k.transition&&C.scrollToTop(),C.set.transition(o),C.repaint(),n=function(){C.bind.clickaway(),C.add.bodyCSS(),C.set.animating(),C.set.visible(),C.othersVisible()||k.dimPage&&j.addClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(w+b,i),C.remove.animating(),C.bind.scrollLock(),t.call(I))},a.off(w+b),a.on(w+b,i),h(n)},pullPage:function(t){var n,i,o=C.get.transition(),a="safe"==o?O:"overlay"==o||C.othersActive()?D:j;t=e.isFunction(t)?t:function(){},C.verbose("Removing context push state",C.get.direction()),C.set.transition(o),C.unbind.clickaway(),C.unbind.scrollLock(),n=function(){C.set.animating(),C.remove.visible(),k.dimPage&&!C.othersVisible()&&j.removeClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(w+b,i),C.remove.animating(),C.remove.transition(),C.remove.bodyCSS(),("scale down"==o||k.returnScroll&&C.is.mobile())&&C.scrollBack(),t.call(I))},a.off(w+b),a.on(w+b,i),h(n)},legacyPushPage:function(t){var n=D.width(),i=C.get.direction(),o={};n=n||D.width(),t=e.isFunction(t)?t:function(){},o[i]=n,C.debug("Using javascript to push context",o),C.set.visible(),C.set.transition(),C.set.animating(),k.dimPage&&j.addClass(S.dimmed),O.css("position","relative").animate(o,k.duration,k.easing,function(){C.remove.animating(),C.bind.clickaway(),t.call(I)})},legacyPullPage:function(t){var n=0,i=C.get.direction(),o={};n=n||D.width(),t=e.isFunction(t)?t:function(){},o[i]="0px",C.debug("Using javascript to pull context",o),C.unbind.clickaway(),C.set.animating(),C.remove.visible(),k.dimPage&&!C.othersActive()&&j.removeClass(S.dimmed),O.css("position","relative").animate(o,k.duration,k.easing,function(){C.remove.animating(),t.call(I)})},scrollToTop:function(){C.verbose("Scrolling to top of page to avoid animation issues"),x=e(t).scrollTop(),D.scrollTop(0),t.scrollTo(0,0)},scrollBack:function(){C.verbose("Scrolling back to original page position"),t.scrollTo(0,x)},set:{ios:function(){l.addClass(S.ios)},pushed:function(){O.addClass(S.pushed)},pushable:function(){O.addClass(S.pushable)},active:function(){D.addClass(S.active)},animating:function(){D.addClass(S.animating)},transition:function(e){e=e||C.get.transition(),D.addClass(e)},direction:function(e){e=e||C.get.direction(),D.addClass(S[e])},visible:function(){D.addClass(S.visible)},overlay:function(){D.addClass(S.overlay)}},remove:{bodyCSS:function(){C.debug("Removing body css styles",r),r&&r.length>0&&r.remove()},pushed:function(){O.removeClass(S.pushed)},pushable:function(){O.removeClass(S.pushable)},active:function(){D.removeClass(S.active)},animating:function(){D.removeClass(S.animating)},transition:function(e){e=e||C.get.transition(),D.removeClass(e)},direction:function(e){e=e||C.get.direction(),D.removeClass(S[e])},visible:function(){D.removeClass(S.visible)},overlay:function(){D.removeClass(S.overlay)}},get:{direction:function(){return D.hasClass(S.top)?S.top:D.hasClass(S.right)?S.right:D.hasClass(S.bottom)?S.bottom:S.left},transition:function(){var e,t=C.get.direction();return e=C.is.mobile()?"auto"==k.mobileTransition?k.defaultTransition.mobile[t]:k.mobileTransition:"auto"==k.transition?k.defaultTransition.computer[t]:k.transition,C.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},is:{ie:function(){var e=!t.ActiveXObject&&"ActiveXObject"in t,n="ActiveXObject"in t;return e||n},legacy:function(){var e,o=n.createElement("div"),a={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};n.body.insertBefore(o,null);for(var r in a)o.style[r]!==i&&(o.style[r]="translate3d(1px,1px,1px)",e=t.getComputedStyle(o).getPropertyValue(a[r]));return n.body.removeChild(o),!(e!==i&&e.length>0&&"none"!==e)},ios:function(){var e=navigator.userAgent,t=e.match(E.ios);return t?(C.verbose("Browser was found to be iOS",e),!0):!1},mobile:function(){var e=navigator.userAgent,t=e.match(E.mobile);return t?(C.verbose("Browser was found to be mobile",e),!0):(C.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!C.is.visible()},visible:function(){return D.hasClass(S.visible)},open:function(){return C.is.visible()},closed:function(){return C.is.hidden()},vertical:function(){return D.hasClass(S.top)},animating:function(){return O.hasClass(S.animating)},rtl:function(){return"rtl"==D.css("direction")}},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){k.debug&&(k.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,k.name+":"),C.debug.apply(console,arguments)))},verbose:function(){k.verbose&&k.debug&&(k.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),C.verbose.apply(console,arguments)))},error:function(){C.error=Function.prototype.bind.call(console.error,console,k.name+":"),C.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;k.performance&&(t=(new Date).getTime(),i=m||t,n=t-i,m=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:I,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,100)},display:function(){var t=k.name+":",n=0;m=!1,clearTimeout(C.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",d&&(t+=" '"+d+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,c,l=N;return n=n||v,o=I||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(C.error(P.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},p?(N===i&&C.initialize(),C.invoke(g)):(N!==i&&C.invoke("destroy"),C.initialize())}),a!==i?a:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",debug:!1,verbose:!0,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,useLegacy:"auto",duration:500,easing:"easeInOutQuint",onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}},e.extend(e.easing,{easeInOutQuint:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+n:i/2*((t-=2)*t*t*t*t+2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.sticky=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f,g=e.extend(!0,{},e.fn.sticky.settings,n),p=g.className,v=g.namespace,h=g.error,b="."+v,y="module-"+v,x=e(this),w=e(t),C=x.offsetParent(),k=e(g.scrollContext),T=(x.selector||"",x.data(y)),S=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},A=this;f={initialize:function(){return a=g.context?e(g.context):C,0===a.length?void f.error(h.invalidContext,g.context,x):(f.verbose("Initializing sticky",g,C),f.save.positions(),f.is.hidden()&&f.error(h.visible,x),f.cache.element.height>f.cache.context.height?(f.reset(),void f.error(h.elementSize,x)):(w.on("resize"+b,f.event.resize),k.on("scroll"+b,f.event.scroll),f.observeChanges(),void f.instantiate()))},instantiate:function(){f.verbose("Storing instance of module",f),T=f,x.data(y,f)},destroy:function(){f.verbose("Destroying previous module"),f.reset(),m&&m.disconnect(),w.off("resize"+b,f.event.resize),k.off("scroll"+b,f.event.scroll),x.removeData(y)},observeChanges:function(){var e=a[0];g.observeChanges&&"MutationObserver"in t&&(m=new MutationObserver(function(){clearTimeout(f.timer),f.timer=setTimeout(function(){f.verbose("DOM tree modified, updating sticky menu"),f.refresh()},200)}),m.observe(A,{childList:!0,subtree:!0}),m.observe(e,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",m))},event:{resize:function(){S(function(){f.refresh(),f.stick()})},scroll:function(){S(function(){f.stick(),g.onScroll.call(A)})}},refresh:function(e){f.reset(),e&&(C=x.offsetParent()),f.save.positions(),f.stick(),g.onReposition.call(A)},supports:{sticky:function(){{var t=e("<div/>");t.get()}return t.addClass(p.supported),t.css("position").match("sticky")}},save:{scroll:function(e){f.lastScroll=e},positions:function(){var e={height:w.height()},t={margin:{top:parseInt(x.css("margin-top"),10),bottom:parseInt(x.css("margin-bottom"),10)},offset:x.offset(),width:x.outerWidth(),height:x.outerHeight()},n={offset:a.offset(),height:a.outerHeight()};f.cache={fits:t.height<e.height,window:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},f.set.containerSize(),f.set.size(),f.stick(),f.debug("Caching element positions",f.cache)}},get:{direction:function(e){var t="down";return e=e||k.scrollTop(),f.lastScroll!==i&&(f.lastScroll<e?t="down":f.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||k.scrollTop(),f.lastScroll?e-f.lastScroll:0},currentElementScroll:function(){return f.is.top()?Math.abs(parseInt(x.css("top"),10))||0:Math.abs(parseInt(x.css("bottom"),10))||0},elementScroll:function(e){e=e||k.scrollTop();var t,n=f.cache.element,i=f.cache.window,o=f.get.scrollChange(e),a=n.height-i.height+g.offset,r=f.get.currentElementScroll(),s=r+o;return t=f.cache.fits||0>s?0:s>a?a:s}},remove:{offset:function(){x.css("margin-top","")}},set:{offset:function(){f.verbose("Setting offset on element",g.offset),x.css("margin-top",g.offset)},containerSize:function(){var e=C.get(0).tagName;"HTML"===e||"body"==e?C=x.offsetParent():(f.debug("Settings container size",f.cache.context.height),Math.abs(C.height()-f.cache.context.height)>5&&C.height(f.cache.context.height))},scroll:function(e){f.debug("Setting scroll on element",e),f.is.top()&&x.css("bottom","").css("top",-e),f.is.bottom()&&x.css("top","").css("bottom",e)},size:function(){0!==f.cache.element.height&&0!==f.cache.element.width&&x.css({width:f.cache.element.width,height:f.cache.element.height})}},is:{top:function(){return x.hasClass(p.top)},bottom:function(){return x.hasClass(p.bottom)},initialPosition:function(){return!f.is.fixed()&&!f.is.bound()},hidden:function(){return!x.is(":visible")},bound:function(){return x.hasClass(p.bound)},fixed:function(){return x.hasClass(p.fixed)}},stick:function(){var e=f.cache,t=e.fits,n=e.element,i=e.window,o=e.context,a=f.is.bottom()&&g.pushing?g.bottomOffset:g.offset,r={top:k.scrollTop()+a,bottom:k.scrollTop()+a+i.height},s=(f.get.direction(r.top),f.get.elementScroll(r.top)),c=!t,l=0!==n.height;f.save.scroll(r.top),l&&(f.is.initialPosition()?r.top>=n.top&&(f.debug("Element passed, fixing element to page"),f.fixTop()):f.is.fixed()?f.is.top()?r.top<n.top?(f.debug("Fixed element reached top of container"),f.setInitialPosition()):n.height+r.top-s>o.bottom?(f.debug("Fixed element reached bottom of container"),f.bindBottom()):c&&f.set.scroll(s):f.is.bottom()&&(r.bottom-n.height<n.top?(f.debug("Bottom fixed rail has reached top of container"),f.setInitialPosition()):r.bottom>o.bottom?(f.debug("Bottom fixed rail has reached bottom of container"),f.bindBottom()):c&&f.set.scroll(s)):f.is.bottom()&&(g.pushing?f.is.bound()&&r.bottom<o.bottom&&(f.debug("Fixing bottom attached element to bottom of browser."),f.fixBottom()):f.is.bound()&&r.top<o.bottom-n.height&&(f.debug("Fixing bottom attached element to top of browser."),f.fixTop())))},bindTop:function(){f.debug("Binding element to top of parent container"),f.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.bottom).addClass(p.bound).addClass(p.top),g.onTop.call(A),g.onUnstick.call(A)},bindBottom:function(){f.debug("Binding element to bottom of parent container"),f.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.top).addClass(p.bound).addClass(p.bottom),g.onBottom.call(A),g.onUnstick.call(A)},setInitialPosition:function(){f.unfix(),f.unbind()},fixTop:function(){f.debug("Fixing element to top of page"),f.set.offset(),x.css("left",f.cache.element.left).removeClass(p.bound).removeClass(p.bottom).addClass(p.fixed).addClass(p.top),g.onStick.call(A)},fixBottom:function(){f.debug("Sticking element to bottom of page"),f.set.offset(),x.css("left",f.cache.element.left).removeClass(p.bound).removeClass(p.top).addClass(p.fixed).addClass(p.bottom),g.onStick.call(A)},unbind:function(){f.debug("Removing absolute position on element"),f.remove.offset(),x.removeClass(p.bound).removeClass(p.top).removeClass(p.bottom)},unfix:function(){f.debug("Removing fixed position on element"),f.remove.offset(),x.removeClass(p.fixed).removeClass(p.top).removeClass(p.bottom),g.onUnstick.call(A)},reset:function(){f.debug("Reseting elements position"),f.unbind(),f.unfix(),f.resetCSS()},resetCSS:function(){x.css({top:"",bottom:"",width:"",height:""}),C.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,0)},display:function(){var t=g.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=T;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(T===i&&f.initialize(),f.invoke(l)):(T!==i&&T.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!1,performance:!1,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,observeChanges:!0,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.tab=function(n){var o,a,r=e(e.isFunction(this)?t:this),s=e.isPlainObject(n)?e.extend(!0,{},e.fn.tab.settings,n):e.extend({},e.fn.tab.settings),c=r.selector||"",l=(new Date).getTime(),u=[],d=arguments[0],m="string"==typeof d,f=[].slice.call(arguments,1);return r.each(function(){var n,g,p,v,h,b=s.className,y=s.metadata,x=s.selector,w=s.error,C="."+s.namespace,k="module-"+s.namespace,T=e(this),S={},A=!0,E=0,P=this,F=T.data(k);o={initialize:function(){o.debug("Initializing tab menu item",T),o.determineTabs(),o.debug("Determining tabs",s.context,g),s.auto&&o.set.auto(),e.isWindow(P)||(o.debug("Attaching tab activation events to element",T),T.on("click"+C,o.event.click)),o.instantiate()},determineTabs:function(){var t;"parent"===s.context?(T.closest(x.ui).length>0?(t=T.closest(x.ui),o.verbose("Using closest UI element for determining parent",t)):t=T,n=t.parent(),o.verbose("Determined parent element for creating context",n)):s.context?(n=e(s.context),o.verbose("Using selector for tab context",s.context,n)):n=e("body"),s.childrenOnly?(g=n.children(x.tabs),o.debug("Searching tab context children for tabs",n,g)):(g=n.find(x.tabs),o.debug("Searching tab context for tabs",n,g))},initializeHistory:function(){if(s.history){if(o.debug("Initializing page state"),e.address===i)return o.error(w.state),!1;if("state"==s.historyType){if(o.debug("Using HTML5 to manage state"),s.path===!1)return o.error(w.path),!1;e.address.history(!0).state(s.path)}e.address.bind("change",o.event.history.change)}},instantiate:function(){o.verbose("Storing instance of module",o),F=o,T.data(k,o)},destroy:function(){o.debug("Destroying tabs",T),T.removeData(k).off(C)},event:{click:function(t){var n=e(this).data(y.tab);n!==i?(s.history?(o.verbose("Updating page state",t),e.address.value(n)):(o.verbose("Changing tab",t),o.changeTab(n)),t.preventDefault()):o.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||o.get.initialPath(),a=s.templates.determineTitle(n)||!1;o.performance.display(),o.debug("History change event",n,t),h=t,n!==i&&o.changeTab(n),a&&e.address.title(a)}}},refresh:function(){p&&(o.debug("Refreshing tab",p),o.changeTab(p))},cache:{read:function(e){return e!==i?S[e]:!1},add:function(e,t){e=e||p,o.debug("Adding cached content for",e),S[e]=t},remove:function(e){e=e||p,o.debug("Removing cached content for",e),delete S[e]}},set:{auto:function(){var t="string"==typeof s.path?s.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";o.verbose("Setting up automatic tab retrieval from server",t),e.isPlainObject(s.apiSettings)?s.apiSettings.url=t:s.apiSettings={url:t}},state:function(t){e.address.value(t)}},changeTab:function(i){var a=t.history&&t.history.pushState,r=a&&s.ignoreFirstLoad&&A,c=s.auto||e.isPlainObject(s.apiSettings),l=c&&!r?o.utilities.pathToArray(i):o.get.defaultPathArray(i);i=o.utilities.arrayToPath(l),e.each(l,function(t,a){var u,d,m,f,g=l.slice(0,t+1),b=o.utilities.arrayToPath(g),y=o.is.tab(b),x=t+1==l.length,C=o.get.tabElement(b);if(o.verbose("Looking for tab",a),y){if(o.verbose("Tab was found",a),p=b,v=o.utilities.filterArray(l,g),x?f=!0:(d=l.slice(0,t+2),m=o.utilities.arrayToPath(d),f=!o.is.tab(m),f&&o.verbose("Tab parameters found",d)),f&&c)return r?(o.debug("Ignoring remote content on first tab load",b),A=!1,o.cache.add(i,C.html()),o.activate.all(b),s.onTabInit.call(C,b,v,h),s.onTabLoad.call(C,b,v,h)):(o.activate.navigation(b),o.content.fetch(b,i)),!1;o.debug("Opened local tab",b),o.activate.all(b),o.cache.read(b)||(o.cache.add(b,!0),o.debug("First time tab loaded calling tab init"),s.onTabInit.call(C,b,v,h)),s.onTabLoad.call(C,b,v,h)}else{if(-1!=i.search("/")||""===i)return o.error(w.missingTab,T,n,b),!1;if(u=e("#"+i+', a[name="'+i+'"]'),b=u.closest("[data-tab]").data("tab"),C=o.get.tabElement(b),u&&u.length>0&&b)return o.debug("No tab found, but deep anchor link present, opening parent tab"),o.activate.all(b),o.cache.read(b)||(o.cache.add(b,!0),o.debug("First time tab loaded calling tab init"),s.onTabInit.call(C,b,v,h)),!1}})},content:{fetch:function(t,n){var a,r,c=o.get.tabElement(t),l={dataType:"html",on:"now",onSuccess:function(e){o.cache.add(n,e),o.content.update(t,e),t==p?(o.debug("Content loaded",t),o.activate.tab(t)):o.debug("Content loaded in background",t),s.onTabInit.call(c,t,v,h),s.onTabLoad.call(c,t,v,h)},urlData:{tab:n}},u=c.api("get request")||!1,d=u&&"pending"===u.state();n=n||t,r=o.cache.read(n),o.activate.tab(t),s.cache&&r?(o.debug("Showing existing content",n),o.content.update(t,r),s.onTabLoad.call(c,t,v,h)):d?(o.debug("Content is already loading",n),c.addClass(b.loading)):e.api!==i?(a=e.extend(!0,{headers:{"X-Remote":!0}},s.apiSettings,l),o.debug("Retrieving remote content",n,a),c.api(a)):o.error(w.api)},update:function(e,t){o.debug("Updating html for",e);var n=o.get.tabElement(e);n.html(t)}},activate:{all:function(e){o.activate.tab(e),o.activate.navigation(e)},tab:function(e){var t=o.get.tabElement(e);o.verbose("Showing tab content for",t),t.addClass(b.active).siblings(g).removeClass(b.active+" "+b.loading)},navigation:function(e){var t=o.get.navElement(e);o.verbose("Activating tab navigation for",t,e),t.addClass(b.active).siblings(r).removeClass(b.active+" "+b.loading)}},deactivate:{all:function(){o.deactivate.navigation(),o.deactivate.tabs()},navigation:function(){r.removeClass(b.active)},tabs:function(){g.removeClass(b.active+" "+b.loading)}},is:{tab:function(e){return e!==i?o.get.tabElement(e).length>0:!1}},get:{initialPath:function(){return r.eq(0).data(y.tab)||g.eq(0).data(y.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return o.utilities.pathToArray(o.get.defaultPath(e))},defaultPath:function(e){var t=r.filter("[data-"+y.tab+'^="'+e+'/"]').eq(0),n=t.data(y.tab)||!1;if(n){if(o.debug("Found default tab",n),E<s.maxDepth)return E++,o.get.defaultPath(n);o.error(w.recursion)}else o.debug("No default tabs found for",e,g);return E=0,e},navElement:function(e){return e=e||p,r.filter("[data-"+y.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,a;return e=e||p,i=o.utilities.pathToArray(e),a=o.utilities.last(i),t=g.filter("[data-"+y.tab+'="'+a+'"]'),n=g.filter("[data-"+y.tab+'="'+e+'"]'),t.length>0?t:n},tab:function(){return p}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return e.isArray(t)?t[t.length-1]:!1},pathToArray:function(e){return e===i&&(e=p),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return e.isArray(t)?t.join("/"):!1}},setting:function(t,n){if(o.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,o,t);else{if(n===i)return o[t];o[t]=n}},debug:function(){s.debug&&(s.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,s.name+":"),o.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),o.verbose.apply(console,arguments)))},error:function(){o.error=Function.prototype.bind.call(console.error,console,s.name+":"),o.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;s.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,100)},display:function(){var t=s.name+":",n=0;l=!1,clearTimeout(o.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,r){var s,c,l,u=F;return n=n||f,r=P||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,a){var r=n!=s?a+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||n==s)return u[a]!==i?(c=u[a],!1):(o.error(w.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),c}},m?(F===i&&o.initialize(),o.invoke(d)):(F!==i&&F.invoke("destroy"),o.initialize())}),o&&!m&&o.initializeHistory(),a!==i?a:this},e.tab=function(){e(t).tab.apply(this,arguments)},e.fn.tab.settings={name:"Tab",namespace:"tab",debug:!1,verbose:!0,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,alwaysRefresh:!1,cache:!0,ignoreFirstLoad:!1,apiSettings:!1,onTabInit:function(){},onTabLoad:function(){},templates:{determineTitle:function(){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found for this context.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}
}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.transition=function(){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments,u=l[0],d=[].slice.call(arguments,1),m="string"==typeof u;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(t){var f,g,p,v,h,b,y,x,w,C,k,T=e(this),S=this;k={initialize:function(){f=k.get.settings.apply(S,l),v=f.className,p=f.error,h=f.metadata,C="."+f.namespace,w="module-"+f.namespace,g=T.data(w)||k,y=k.get.animationEndEvent(),x=k.get.animationName(),b=k.get.animationStartEvent(),m&&(m=k.invoke(u)),m===!1&&(k.verbose("Converted arguments into settings object",f),f.interval?k.delay(f.animate):k.animate(),k.instantiate())},instantiate:function(){k.verbose("Storing instance of module",k),g=k,T.data(w,g)},destroy:function(){k.verbose("Destroying previous module for",S),T.removeData(w)},refresh:function(){k.verbose("Refreshing display type on next animation"),delete k.displayType},forceRepaint:function(){k.verbose("Forcing element repaint");var e=T.parent(),t=T.next();0===t.length?T.detach().appendTo(e):T.detach().insertBefore(t)},repaint:function(){k.verbose("Repainting element");S.offsetWidth},delay:function(e){var n,o=f.reverse===!0,r="auto"==f.reverse&&k.get.direction()==v.outward;e=typeof e!==i?e:f.interval,n=o||r?(a.length-t)*f.interval:t*f.interval,k.debug("Delaying animation by",n),setTimeout(k.animate,n)},animate:function(e){if(f=e||f,!k.is.supported())return k.error(p.support),!1;if(k.debug("Preparing animation",f.animation),k.is.animating()){if(f.queue)return!f.allowRepeats&&k.has.direction()&&k.is.occurring()&&k.queuing!==!0?k.debug("Animation is currently occurring, preventing queueing same animation",f.animation):k.queue(f.animation),!1;if(!f.allowRepeats&&k.is.occurring())return k.debug("Animation is already occurring, will not execute repeated animation",f.animation),!1}k.can.animate()?k.set.animating(f.animation):k.error(p.noAnimation,f.animation,S)},reset:function(){k.debug("Resetting animation to beginning conditions"),k.remove.animationEndCallback(),k.restore.conditions(),k.remove.animating()},queue:function(e){k.debug("Queueing animation of",e),k.queuing=!0,T.one(y+C,function(){k.queuing=!1,k.repaint(),k.animate.apply(this,f)})},complete:function(){k.verbose("CSS animation complete",f.animation),k.remove.animationEndCallback(),k.remove.failSafe(),k.is.looping()||(k.is.outward()?(k.verbose("Animation is outward, hiding element"),k.restore.conditions(),k.hide(),f.onHide.call(this)):k.is.inward()?(k.verbose("Animation is outward, showing element"),k.restore.conditions(),k.show(),k.set.display(),f.onShow.call(this)):k.restore.conditions(),k.remove.animation(),k.remove.animating()),f.onComplete.call(this)},has:{direction:function(t){var n=!1;return t=t||f.animation,"string"==typeof t&&(t=t.split(" "),e.each(t,function(e,t){(t===v.inward||t===v.outward)&&(n=!0)})),n},inlineDisplay:function(){var t=T.attr("style")||"";return e.isArray(t.match(/display.*?;/,""))}},set:{animating:function(e){e=e||f.animation,k.is.animating()||k.save.conditions(),k.remove.direction(),k.remove.animationEndCallback(),k.can.transition()&&!k.has.direction()&&k.set.direction(),k.remove.hidden(),k.set.display(),T.addClass(v.animating+" "+v.transition+" "+e).addClass(e).one(y+".complete"+C,k.complete),f.useFailSafe&&k.add.failSafe(),k.set.duration(f.duration),f.onStart.call(this),k.debug("Starting tween",e,T.attr("class"))},duration:function(e,t){t=t||f.duration,t="number"==typeof t?t+"ms":t,k.verbose("Setting animation duration",t),(t||0===t)&&T.css({"-webkit-animation-duration":t,"-moz-animation-duration":t,"-ms-animation-duration":t,"-o-animation-duration":t,"animation-duration":t})},display:function(){var e=k.get.style(),t=k.get.displayType(),n=e+"display: "+t+" !important;";T.css("display",""),k.refresh(),T.css("display")!==t&&(k.verbose("Setting inline visibility to",t),T.attr("style",n))},direction:function(){T.is(":visible")&&!k.is.hidden()?(k.debug("Automatically determining the direction of animation","Outward"),T.removeClass(v.inward).addClass(v.outward)):(k.debug("Automatically determining the direction of animation","Inward"),T.removeClass(v.outward).addClass(v.inward))},looping:function(){k.debug("Transition set to loop"),T.addClass(v.looping)},hidden:function(){k.is.hidden()||T.addClass(v.transition).addClass(v.hidden),"none"!==T.css("display")&&(k.verbose("Overriding default display to hide element"),T.css("display","none"))},visible:function(){T.addClass(v.transition).addClass(v.visible)}},save:{displayType:function(e){T.data(h.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,k.verbose("Saving existence of transition",t,n)},conditions:function(){T.attr("class")||!1,T.attr("style")||"";T.removeClass(f.animation),k.remove.direction(),k.cache={className:T.attr("class"),style:k.get.style()},k.verbose("Saving original attributes",k.cache)}},restore:{conditions:function(){return k.cache===i?!1:(k.cache.className?T.attr("class",k.cache.className):T.removeAttr("class"),k.cache.style&&(k.verbose("Restoring original style attribute",k.cache.style),console.log("restoring cache",k.cache.style),T.attr("style",k.cache.style)),k.is.looping()&&k.remove.looping(),void k.verbose("Restoring original attributes",k.cache))}},add:{failSafe:function(){var e=k.get.duration();k.timer=setTimeout(function(){T.trigger(y)},e+f.failSafeDelay),k.verbose("Adding fail safe timer",k.timer)}},remove:{animating:function(){T.removeClass(v.animating)},animation:function(){T.css({"-webkit-animation":"","-moz-animation":"","-ms-animation":"","-o-animation":"",animation:""})},animationEndCallback:function(){T.off(".complete")},display:function(){T.css("display","")},direction:function(){T.removeClass(v.inward).removeClass(v.outward)},failSafe:function(){k.verbose("Removing fail safe timer",k.timer),k.timer&&clearTimeout(k.timer)},hidden:function(){T.removeClass(v.hidden)},visible:function(){T.removeClass(v.visible)},looping:function(){k.debug("Transitions are no longer looping"),T.removeClass(v.looping),k.forceRepaint()},transition:function(){T.removeClass(v.visible).removeClass(v.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})},direction:function(t){return t=t||f.animation,"string"==typeof t&&(t=t.split(" "),e.each(t,function(e,t){return t===v.inward?v.inward:t===v.outward?v.outward:void 0})),k.can.transition()?T.is(":visible")&&!k.is.hidden()?v.outward:v.inward:"static"},duration:function(e){return e=e||f.duration,e===!1&&(e=T.css("animation-duration")||0),"string"==typeof e?e.indexOf("ms")>-1?parseFloat(e):1e3*parseFloat(e):e},displayType:function(){return f.displayType?f.displayType:(T.data(h.displayType)===i&&k.can.transition(!0),T.data(h.displayType))},style:function(){var e=T.attr("style")||"";return e.replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationName:function(){var e,t=n.createElement("div"),o={animation:"animationName",OAnimation:"oAnimationName",MozAnimation:"mozAnimationName",WebkitAnimation:"webkitAnimationName"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationStartEvent:function(){var e,t=n.createElement("div"),o={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationEndEvent:function(){var e,t=n.createElement("div"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(t.style[e]!==i)return o[e];return!1}},can:{transition:function(t){var n,o,a,r,s,c=T.attr("class"),l=T.prop("tagName"),u=f.animation,d=k.get.transitionExists(u);if(d===i||t){if(k.verbose("Determining whether animation exists"),n=e("<"+l+" />").addClass(c).insertAfter(T),o=n.addClass(u).removeClass(v.inward).removeClass(v.outward).addClass(v.animating).addClass(v.transition).css(x),a=n.addClass(v.inward).css(x),s=n.attr("class",c).removeAttr("style").removeClass(v.hidden).removeClass(v.visible).show().css("display"),k.verbose("Determining final display state",s),n.remove(),o!=a)k.debug("Direction exists for animation",u),r=!0;else{if("none"==o||!o)return void k.debug("No animation defined in css",u);k.debug("Static animation found",u,s),r=!1}k.save.displayType(s),k.save.transitionExists(u,r)}return d!==i?d:r},animate:function(){return k.can.transition()!==i}},is:{animating:function(){return T.hasClass(v.animating)},inward:function(){return T.hasClass(v.inward)},outward:function(){return T.hasClass(v.outward)},looping:function(){return T.hasClass(v.looping)},occurring:function(e){return e=e||f.animation,e="."+e.replace(" ","."),T.filter(e).length>0},visible:function(){return T.is(":visible")},hidden:function(){return"hidden"===T.css("visibility")},supported:function(){return x!==!1&&y!==!1}},hide:function(){k.verbose("Hiding element"),k.is.animating()&&k.reset(),k.remove.display(),k.remove.visible(),k.set.hidden(),k.repaint()},show:function(e){k.verbose("Showing element",e),k.remove.hidden(),k.set.visible(),k.repaint()},start:function(){k.verbose("Starting animation"),T.removeClass(v.disabled)},stop:function(){k.debug("Stopping animation"),T.addClass(v.disabled)},toggle:function(){k.debug("Toggling play status"),T.toggleClass(v.disabled)},setting:function(t,n){if(k.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},debug:function(){f.debug&&(f.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,f.name+":"),k.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),k.verbose.apply(console,arguments)))},error:function(){k.error=Function.prototype.bind.call(console.error,console,f.name+":"),k.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,600)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(k.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=g;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s!==i?s:!1}},k.initialize()}),o!==i?o:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",debug:!1,verbose:!0,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"There is no css animation matching the one you specified.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(e,t,n,i){"use strict";e.fn.video=function(n){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(){var m,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.video.settings,n):e.extend({},e.fn.video.settings),g=f.selector,p=f.className,v=f.error,h=f.metadata,b=f.namespace,y=f.templates,x="."+b,w="module-"+b,C=(e(t),e(this)),k=C.find(g.placeholder),T=C.find(g.playButton),S=C.find(g.embed),A=this,E=C.data(w);m={initialize:function(){m.debug("Initializing video"),m.create(),k.on("click"+x,m.play),T.on("click"+x,m.play),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),E=m,C.data(w,m)},create:function(){var e=C.data(h.image),t=y.video(e);C.html(t),m.refresh(),e||m.play(),m.debug("Creating html for video element",t)},destroy:function(){m.verbose("Destroying previous instance of video"),m.reset(),C.removeData(w).off(x),k.off(x),T.off(x)},refresh:function(){m.verbose("Refreshing selector cache"),k=C.find(g.placeholder),T=C.find(g.playButton),S=C.find(g.embed)},change:function(e,t,n){m.debug("Changing video to ",e,t,n),C.data(h.source,e).data(h.id,t).data(h.url,n),f.onChange()},reset:function(){m.debug("Clearing video embed and showing placeholder"),C.removeClass(p.active),S.html(" "),k.show(),f.onReset()},play:function(){m.debug("Playing video");var e=C.data(h.source)||!1,t=C.data(h.url)||!1,n=C.data(h.id)||!1;S.html(m.generate.html(e,n,t)),C.addClass(p.active),f.onPlay()},get:{source:function(e){return"string"!=typeof e?!1:-1!==e.search("youtube.com")?"youtube":-1!==e.search("vimeo.com")?"vimeo":!1},id:function(e){return e.match(f.regExp.youtube)?e.match(f.regExp.youtube)[1]:e.match(f.regExp.vimeo)?e.match(f.regExp.vimeo)[2]:!1}},generate:{html:function(e,t,n){m.debug("Generating embed html");var i;return e=e||f.source,t=t||f.id,e&&t||n?(e&&t||(e=m.get.source(n),t=m.get.id(n)),"vimeo"==e?i='<iframe src="//player.vimeo.com/video/'+t+"?="+m.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>':"youtube"==e&&(i='<iframe src="//www.youtube.com/embed/'+t+"?="+m.generate.url(e)+'" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')):m.error(v.noVideo),i},url:function(e){var t=f.api?1:0,n="auto"===f.autoplay?C.data("image")!==i:f.autoplay,o=f.hd?1:0,a=f.showUI?1:0,r=f.showUI?0:1,s="";return"vimeo"==e&&(s="api="+t+"&title="+a+"&byline="+a+"&portrait="+a+"&autoplay="+n,f.color&&(s+="&color="+f.color)),"ustream"==e?(s="autoplay="+n,f.color&&(s+="&color="+f.color)):"youtube"==e&&(s="enablejsapi="+t+"&autoplay="+n+"&autohide="+r+"&hq="+o+"&modestbranding=1",f.color&&(s+="&color="+f.color)),s}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=E;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(v.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(E===i&&m.initialize(),m.invoke(l)):(E!==i&&E.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.video.settings={name:"Video",namespace:"video",debug:!1,verbose:!0,performance:!0,metadata:{id:"id",image:"image",source:"source",url:"url"},source:!1,url:!1,id:!1,aspectRatio:16/9,onPlay:function(){},onReset:function(){},onChange:function(){},onPause:function(){},onStop:function(){},width:"auto",height:"auto",autoplay:"auto",color:"#442359",hd:!0,showUI:!1,api:!0,regExp:{youtube:/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,vimeo:/http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/},error:{noVideo:"No video specified",method:"The method you called is not defined"},className:{active:"active"},selector:{embed:".embed",placeholder:".placeholder",playButton:".play"}},e.fn.video.settings.templates={video:function(e){var t="";return e&&(t+='<i class="video play icon"></i><img class="placeholder" src="'+e+'">'),t+='<div class="embed"></div>'}}}(jQuery,window,document),function(e,t,n,i){e.api=e.fn.api=function(n){var o,a=e(e.isFunction(this)?t:this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var t,a,m,f,g,p=e.isPlainObject(n)?e.extend(!0,{},e.fn.api.settings,n):e.extend({},e.fn.api.settings),v=p.namespace,h=p.metadata,b=p.selector,y=p.error,x=p.className,w="."+v,C="module-"+v,k=e(this),T=k.closest(b.form),S=p.stateContext?e(p.stateContext):k,A=this,E=S.get(),P=k.data(C);g={initialize:function(){var e=g.get.event();u||(e?(g.debug("Attaching API events to element",e),k.on(e+w,g.event.trigger)):"now"==p.on&&(g.debug("Querying API now",e),g.query())),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),P=g,k.data(C,P)},destroy:function(){g.verbose("Destroying previous module for",A),k.removeData(C).off(w)},query:function(){if(g.is.disabled())return void g.debug("Element is disabled API request aborted");if(g.is.loading()&&0===p.throttle)return void g.debug("Cancelling request, previous request is still pending");if(p.defaultData&&e.extend(!0,p.urlData,g.get.defaultData()),(p.serializeForm!==!1||S.is("form"))&&("json"==p.serializeForm?e.extend(!0,p.data,g.get.formData()):p.data=g.get.formData()),a=g.get.settings(),a===!1)return g.cancelled=!0,void g.error(y.beforeSend);if(g.cancelled=!1,p.url?(g.debug("Using specified url",m),m=g.add.urlData(p.url)):(m=g.add.urlData(g.get.templateURL()),g.debug("Added URL Data to url",m)),!m){if(!k.is("form"))return void g.error(y.missingURL,p.action);g.debug("No url or action specified, defaulting to form action"),m=k.attr("action")}g.set.loading(),t=e.extend(!0,{},p,{type:p.method||p.type,data:f,url:p.base+m,beforeSend:p.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),g.debug("Querying URL",t.url),g.debug("Sending data",f,t.method),g.verbose("Using AJAX settings",t),g.is.loading()?g.timer=setTimeout(function(){g.request=g.create.request(),g.xhr=g.create.xhr(),p.onRequest.call(E,g.request,g.xhr)},p.throttle):(g.request=g.create.request(),g.xhr=g.create.xhr(),p.onRequest.call(E,g.request,g.xhr))},is:{disabled:function(){return k.filter(p.filter).length>0},loading:function(){return g.request&&"pending"==g.request.state()}},was:{cancelled:function(){return g.cancelled||!1},succesful:function(){return g.request&&"resolved"==g.request.state()},failure:function(){return g.request&&"rejected"==g.request.state()},complete:function(){return g.request&&("resolved"==g.request.state()||"rejected"==g.request.state())}},add:{urlData:function(t,n){var o,a;return t&&(o=t.match(p.regExp.required),a=t.match(p.regExp.optional),n=n||p.urlData,o&&(g.debug("Looking for required URL variables",o),e.each(o,function(o,a){var r=-1!==a.indexOf("$")?a.substr(2,a.length-3):a.substr(1,a.length-2),s=e.isPlainObject(n)&&n[r]!==i?n[r]:k.data(r)!==i?k.data(r):S.data(r)!==i?S.data(r):n[r];return s===i?(g.error(y.requiredParameter,r,t),t=!1,!1):(g.verbose("Found required variable",r,s),void(t=t.replace(a,s)))})),a&&(g.debug("Looking for optional URL variables",o),e.each(a,function(o,a){var r=-1!==a.indexOf("$")?a.substr(3,a.length-4):a.substr(2,a.length-3),s=e.isPlainObject(n)&&n[r]!==i?n[r]:k.data(r)!==i?k.data(r):S.data(r)!==i?S.data(r):n[r];s!==i?(g.verbose("Optional variable Found",r,s),t=t.replace(a,s)):(g.verbose("Optional variable not found",r),t=-1!==t.indexOf("/"+a)?t.replace("/"+a,""):t.replace(a,""))}))),t}},event:{trigger:function(e){g.query(),("submit"==e.type||"click"==e.type)&&e.preventDefault()},xhr:{always:function(){},done:function(e){var t=this,n=(new Date).getTime()-s,i=p.loadingDuration-n;i=i>0?i:0,setTimeout(function(){g.request.resolveWith(t,[e])},i)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-s,a=p.loadingDuration-o;a=a>0?a:0,setTimeout(function(){"abort"!==t?g.request.rejectWith(i,[e,t,n]):g.reset()},a)}},request:{complete:function(e){g.remove.loading(),p.onComplete.call(E,e,k)},done:function(t){g.debug("API Response Received",t),"json"==p.dataType&&e.isFunction(p.successTest)?(g.debug("Checking JSON returned success",p.successTest,t),p.successTest(t)?p.onSuccess.call(E,t,k):(g.debug("JSON test specified by user and response failed",t),p.onFailure.call(E,t,k))):p.onSuccess.call(E,t,k)},error:function(n,o,a){var r,s=p.error[o]!==i?p.error[o]:a;if(n!==i)if(n.readyState!==i&&4==n.readyState){if(200!=n.status&&a!==i&&""!==a)g.error(y.statusMessage+a,t.url);else if("error"==o&&"json"==p.dataType)try{r=e.parseJSON(n.responseText),r&&r.error!==i&&(s=r.error)}catch(c){g.error(y.JSONParse)}g.remove.loading(),g.set.error(),p.errorDuration&&setTimeout(g.remove.error,p.errorDuration),g.debug("API Request error:",s),p.onError.call(E,s,k)}else p.onAbort.call(E,s,k),g.debug("Request Aborted (Most likely caused by page change or CORS Policy)",o,a)}}},create:{request:function(){return e.Deferred().always(g.event.request.complete).done(g.event.request.done).fail(g.event.request.error)},xhr:function(){return e.ajax(t).always(g.event.xhr.always).done(g.event.xhr.done).fail(g.event.xhr.fail)}},set:{error:function(){g.verbose("Adding error state to element",S),S.addClass(x.error)},loading:function(){g.verbose("Adding loading state to element",S),S.addClass(x.loading)}},remove:{error:function(){g.verbose("Removing error state from element",S),S.removeClass(x.error)},loading:function(){g.verbose("Removing loading state from element",S),S.removeClass(x.loading)}},get:{request:function(){return g.request||!1},xhr:function(){return g.xhr||!1},settings:function(){var e;return e=p.beforeSend.call(k,p),e&&(e.success!==i&&(g.debug("Legacy success callback detected",e),g.error(y.legacyParameters,e.success),e.onSuccess=e.success),e.failure!==i&&(g.debug("Legacy failure callback detected",e),g.error(y.legacyParameters,e.failure),e.onFailure=e.failure),e.complete!==i&&(g.debug("Legacy complete callback detected",e),g.error(y.legacyParameters,e.complete),e.onComplete=e.complete)),e===i&&g.error(y.noReturnedValue),e!==i?e:p},defaultData:function(){var t={};return e.isWindow(A)||(k.is("input")?t.value=k.val():k.is("form")||(t.text=k.text())),t},event:function(){return e.isWindow(A)||"now"==p.on?(g.debug("API called without element, no events attached"),!1):"auto"==p.on?k.is("input")?A.oninput!==i?"input":A.onpropertychange!==i?"propertychange":"keyup":k.is("form")?"submit":"click":p.on},formData:function(){var t;return e(this).serializeObject()!==i?t=T.serializeObject():(g.error(y.missingSerialize),t=T.serialize()),g.debug("Retrieved form data",t),t},templateURL:function(e){var t;return e=e||k.data(h.action)||p.action||!1,e&&(g.debug("Looking up url for action",e,p.api),p.api[e]!==i?(t=p.api[e],g.debug("Found template url",t)):g.error(y.missingAction,p.action,p.api)),t}},abort:function(){var e=g.get.xhr();e&&"resolved"!==e.state()&&(g.debug("Cancelling API request"),e.abort(),g.request.rejectWith(p.apiSettings))},reset:function(){g.remove.error(),g.remove.loading()},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,p,t);else{if(n===i)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){p.debug&&(p.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,p.name+":"),g.debug.apply(console,arguments)))},verbose:function(){p.verbose&&p.debug&&(p.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,p.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;p.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=p.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=P;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(g.error(y.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(P===i&&g.initialize(),g.invoke(l)):(P!==i&&P.invoke("destroy"),g.initialize())}),o!==i?o:this},e.api.settings={name:"API",namespace:"api",debug:!0,verbose:!1,performance:!0,on:"auto",filter:".disabled",stateContext:!1,loadingDuration:0,errorDuration:2e3,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,method:"get",data:{},dataType:"json",beforeSend:function(e){return e},beforeXHR:function(){},onRequest:function(){},onSuccess:function(){},onComplete:function(){},onFailure:function(){},onError:function(){},onAbort:function(){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"Required dependency jquery-serialize-object missing, using basic serialize",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{form:"form"},metadata:{action:"action"}},e.api.settings.api={}}(jQuery,window,document),function(e,t,n,i){e.fn.form=function(t,o){var a,r=e(this),s=e.extend(!0,{},e.fn.form.settings,o),c=e.extend({},e.fn.form.settings.defaults,t),l=s.namespace,u=s.metadata,d=s.selector,m=s.className,f=(s.error,"."+l),g="module-"+l,p=r.selector||"",v=(new Date).getTime(),h=[],b=arguments[0],y="string"==typeof b,x=[].slice.call(arguments,1);return r.each(function(){var t,o=e(this),l=e(this).find(d.field),w=e(this).find(d.group),C=e(this).find(d.message),k=(e(this).find(d.prompt),e(this).find(d.submit)),T=e(this).find(d.clear),S=e(this).find(d.reset),A=[],E=!1,P=this,F=o.data(g);t={initialize:function(){t.verbose("Initializing form validation",o,c,s),t.bindEvents(),t.set.defaults(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),F=t,o.data(g,t)},destroy:function(){t.verbose("Destroying previous module",F),t.removeEvents(),o.removeData(g)},refresh:function(){t.verbose("Refreshing selector cache"),l=o.find(d.field)},submit:function(){t.verbose("Submitting form",o),o.submit()},attachEvents:function(n,i){i=i||"submit",e(n).on("click",function(e){t[i](),e.preventDefault()})},bindEvents:function(){s.keyboardShortcuts&&l.on("keydown"+f,t.event.field.keydown),o.on("submit"+f,t.validate.form),l.on("blur"+f,t.event.field.blur),t.attachEvents(k,"submit"),t.attachEvents(S,"reset"),t.attachEvents(T,"clear"),l.each(function(){var n=e(this).prop("type"),i=t.get.changeEvent(n);e(this).on(i+f,t.event.field.change)})},clear:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(m.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(m.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("clear")):s?i.checkbox("uncheck"):(t.verbose("Resetting field value",n,r),n.val(""))})},reset:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(m.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(m.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("restore defaults")):s?(t.verbose("Resetting checkbox value",i,r),i.checkbox(r===!0?"check":"uncheck")):(t.verbose("Resetting field value",n,r),n.val(r))})},removeEvents:function(){o.off(f),l.off(f),k.off(f),l.off(f)},event:{field:{keydown:function(n){var i=e(this),o=n.which,a={enter:13,escape:27};o==a.escape&&(t.verbose("Escape key pressed blurring field"),i.blur()),!n.ctrlKey&&o==a.enter&&i.is(d.input)&&i.not(d.checkbox).length>0&&(k.addClass(m.pressed),E||(i.one("keyup"+f,t.event.field.keyup),t.submit(),t.debug("Enter pressed on input submitting form")),E=!0)},keyup:function(){E=!1,k.removeClass(m.pressed)},blur:function(){var n=e(this),i=n.closest(w);i.hasClass(m.error)?(t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))):("blur"==s.on||"change"==s.on)&&t.validate.field(t.get.validation(n))},change:function(){var n=e(this),i=n.closest(w);("change"==s.on||i.hasClass(m.error)&&s.revalidate)&&(clearTimeout(t.timer),t.timer=setTimeout(function(){t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))
},s.delay))}}},get:{changeEvent:function(e){return"checkbox"==e||"radio"==e||"hidden"==e?"change":t.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},field:function(n){return t.verbose("Finding field with identifier",n),l.filter("#"+n).length>0?l.filter("#"+n):l.filter('[name="'+n+'"]').length>0?l.filter('[name="'+n+'"]'):l.filter('[name="'+n+'[]"]').length>0?l.filter('[name="'+n+'[]"]'):l.filter("[data-"+u.validate+'="'+n+'"]').length>0?l.filter("[data-"+u.validate+'="'+n+'"]'):e("<input/>")},fields:function(n){var i=e();return e.each(n,function(e,n){i=i.add(t.get.field(n))}),i},validation:function(n){var i;return e.each(c,function(e,o){t.get.field(o.identifier).get(0)==n.get(0)&&(i=o)}),i||!1},value:function(e){var n,i=[];return i.push(e),n=t.get.values.call(P,i),n[e]},values:function(n){var i=e.isArray(n)?t.get.fields(n):l,o={};return i.each(function(n,i){var a=e(i),r=(a.prop("type"),a.prop("name")),s=a.val(),c=a.is(d.checkbox),l=a.is(d.radio),u=-1!==r.indexOf("[]"),m=c?a.is(":checked"):!1;if(r)if(u)if(r=r.replace("[]",""),o[r]||(o[r]=[]),c){if(!m)return t.debug("Omitted unchecked checkbox",a),!0;o[r].push(s)}else o[r].push(s);else if(l)m&&(o[r]=s);else if(c){if(!m)return t.debug("Omitted unchecked checkbox",a),!0;o[r]=!0}else o[r]=s}),o}},has:{field:function(e){return t.verbose("Checking for existence of a field with identifier",e),l.filter("#"+e).length>0?!0:l.filter('[name="'+e+'"]').length>0?!0:l.filter("[data-"+u.validate+'="'+e+'"]').length>0?!0:!1}},add:{prompt:function(n,a){var r=t.get.field(n),c=r.closest(w),l=c.children(d.prompt),u=0!==l.length;a="string"==typeof a?[a]:a,t.verbose("Adding field error state",n),c.addClass(m.error),s.inline&&(u||(l=s.templates.prompt(a),l.appendTo(c)),l.html(a[0]),u?t.verbose("Inline errors are disabled, no inline error added",n):s.transition&&e.fn.transition!==i&&o.transition("is supported")?(t.verbose("Displaying error with css transition",s.transition),l.transition(s.transition+" in",s.duration)):(t.verbose("Displaying error with fallback javascript animation"),l.fadeIn(s.duration)))},errors:function(e){t.debug("Adding form error messages",e),C.html(s.templates.error(e))}},remove:{prompt:function(n){var a=t.get.field(n.identifier),r=a.closest(w),c=r.children(d.prompt);r.removeClass(m.error),s.inline&&c.is(":visible")&&(t.verbose("Removing prompt for field",n),s.transition&&e.fn.transition!==i&&o.transition("is supported")?c.transition(s.transition+" out",s.duration,function(){c.remove()}):c.fadeOut(s.duration,function(){c.remove()}))}},set:{success:function(){o.removeClass(m.error).addClass(m.success)},defaults:function(){l.each(function(){var t=e(this),n=t.filter(d.checkbox).length>0,i=n?t.is(":checked"):t.val();t.data(u.defaultValue,i)})},error:function(){o.removeClass(m.success).addClass(m.error)},value:function(e,n){var i={};return i[e]=n,t.set.values.call(P,i)},values:function(n){e.isEmptyObject(n)||(e.each(n,function(n,i){var o,a=t.get.field(n),r=a.parent(),s=e.isArray(i),c=r.is(d.uiCheckbox),l=r.is(d.uiDropdown),u=a.is(d.radio)&&c,m=a.length>0;m&&(s&&c?(t.verbose("Selecting multiple",i,a),r.checkbox("uncheck"),e.each(i,function(e,t){o=a.filter('[value="'+t+'"]'),r=o.parent(),o.length>0&&r.checkbox("check")})):u?(t.verbose("Selecting radio value",i,a),a.filter('[value="'+i+'"]').parent(d.uiCheckbox).checkbox("check")):c?(t.verbose("Setting checkbox value",i,r),r.checkbox(i===!0?"check":"uncheck")):l?(t.verbose("Setting dropdown value",i,r),r.dropdown("set selected",i)):(t.verbose("Setting field value",i,a),a.val(i)))}),t.validate.form())}},validate:{form:function(n){var a=!0;return E?!1:(A=[],e.each(c,function(e,n){t.validate.field(n)||(a=!1)}),a?(t.debug("Form has no validation errors, submitting"),t.set.success(),s.onSuccess.call(P,n)):(t.debug("Form has errors"),t.set.error(),s.inline||t.add.errors(A),o.data("moduleApi")!==i&&n.stopImmediatePropagation(),s.onFailure.call(P,A)))},field:function(n){var o=t.get.field(n.identifier),a=!0,r=[];return o.prop("disabled")?(t.debug("Field is disabled. Skipping",n.identifier),a=!0):n.optional&&""===e.trim(o.val())?(t.debug("Field is optional and empty. Skipping",n.identifier),a=!0):n.rules!==i&&e.each(n.rules,function(e,i){t.has.field(n.identifier)&&!t.validate.rule(n,i)&&(t.debug("Field is invalid",n.identifier,i.type),r.push(i.prompt),a=!1)}),a?(t.remove.prompt(n,r),s.onValid.call(o),!0):(A=A.concat(r),t.add.prompt(n.identifier,r),s.onInvalid.call(o,r),!1)},rule:function(n,o){var a,r,c=t.get.field(n.identifier),l=o.type,u=e.trim(c.val()+""),d=/\[(.*)\]/i,m=d.exec(l),f=!0;return m!==i&&null!==m?(a=""+m[1],r=l.replace(m[0],""),f=s.rules[r].call(P,u,a)):f=s.rules[l].call(c,u),f}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},debug:function(){s.debug&&(s.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,s.name+":"),t.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,s.name+":"),t.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;s.performance&&(n=(new Date).getTime(),o=v||n,i=n-o,v=n,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":i})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var n=s.name+":",o=0;v=!1,clearTimeout(t.performance.timer),e.each(h,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",p&&(n+=" '"+p+"'"),r.length>1&&(n+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&h.length>0&&(console.groupCollapsed(n),console.table?console.table(h):e.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||x,o=P||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},y?(F===i&&t.initialize(),t.invoke(b)):(F!==i&&F.invoke("destroy"),t.initialize())}),a!==i?a:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:".reset",submit:".submit",uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{method:"The method you called is not defined."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui red pointing prompt label").html(t[0])}},rules:{checked:function(){return e(this).filter(":checked").length>0},contains:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(new RegExp(t,"i"))},containsExactly:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(new RegExp(t))},email:function(e){var t=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","i");return t.test(e)},empty:function(e){return!(e===i||""===e)},integer:function(e,t){var n,o,a,r=/^\-?\d+$/;return t===i||""===t||".."===t||(-1==t.indexOf("..")?r.test(t)&&(n=o=t-0):(a=t.split("..",2),r.test(a[0])&&(n=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(e)&&(n===i||e>=n)&&(o===i||o>=e)},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,e="string"==typeof e?e.toLowerCase():e,e==t},isExactly:function(e,t){return e==t},length:function(e,t){return e!==i?e.length>=t:!1},match:function(t,n){var o,a=e(this);return a.find("#"+n).length>0?o=a.find("#"+n).val():a.find('[name="'+n+'"]').length>0?o=a.find('[name="'+n+'"]').val():a.find('[data-validate="'+n+'"]').length>0&&(o=a.find('[data-validate="'+n+'"]').val()),o!==i?t.toString()==o.toString():!1},maxLength:function(e,t){return e!==i?e.length<=t:!1},not:function(e,t){return e="string"==typeof e?e.toLowerCase():e,t="string"==typeof t?t.toLowerCase():t,e!=t},notExactly:function(e,t){return e!=t},url:function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)}}}}(jQuery,window,document),function(e,t,n,i){e.fn.state=function(t){var o,a=e(this),r=a.selector||"",s=("ontouchstart"in n.documentElement,(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var n,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.state.settings,t):e.extend({},e.fn.state.settings),f=m.error,g=m.metadata,p=m.className,v=m.namespace,h=m.states,b=m.text,y="."+v,x=v+"-module",w=e(this),C=this,k=w.data(x);n={initialize:function(){n.verbose("Initializing module"),m.automatic&&n.add.defaults(),m.context&&""!==r?e(m.context).on(r,"mouseenter"+y,n.change.text).on(r,"mouseleave"+y,n.reset.text).on(r,"click"+y,n.toggle.state):w.on("mouseenter"+y,n.change.text).on("mouseleave"+y,n.reset.text).on("click"+y,n.toggle.state),n.instantiate()},instantiate:function(){n.verbose("Storing instance of module",n),k=n,w.data(x,n)},destroy:function(){n.verbose("Destroying previous module",k),w.off(y).removeData(x)},refresh:function(){n.verbose("Refreshing selector cache"),w=e(C)},add:{defaults:function(){var o=t&&e.isPlainObject(t.states)?t.states:{};e.each(m.defaults,function(t,a){n.is[t]!==i&&n.is[t]()&&(n.verbose("Adding default states",t,C),e.extend(m.states,a,o))})}},is:{active:function(){return w.hasClass(p.active)},loading:function(){return w.hasClass(p.loading)},inactive:function(){return!w.hasClass(p.active)},state:function(e){return p[e]===i?!1:w.hasClass(p[e])},enabled:function(){return!w.is(m.filter.active)},disabled:function(){return w.is(m.filter.active)},textEnabled:function(){return!w.is(m.filter.text)},button:function(){return w.is(".button:not(a, .submit)")},input:function(){return w.is("input")},progress:function(){return w.is(".ui.progress")}},allow:function(e){n.debug("Now allowing state",e),h[e]=!0},disallow:function(e){n.debug("No longer allowing",e),h[e]=!1},allows:function(e){return h[e]||!1},enable:function(){w.removeClass(p.disabled)},disable:function(){w.addClass(p.disabled)},setState:function(e){n.allows(e)&&w.addClass(p[e])},removeState:function(e){n.allows(e)&&w.removeClass(p[e])},toggle:{state:function(){var t,o;if(n.allows("active")&&n.is.enabled()){if(n.refresh(),e.fn.api!==i)if(t=w.api("get request"),o=w.api("was cancelled"))n.debug("API Request cancelled by beforesend"),m.activateTest=function(){return!1},m.deactivateTest=function(){return!1};else if(t)return void n.listenTo(t);n.change.state()}}},listenTo:function(t){n.debug("API request detected, waiting for state signal",t),t&&(b.loading&&n.update.text(b.loading),e.when(t).then(function(){"resolved"==t.state()?(n.debug("API request succeeded"),m.activateTest=function(){return!0},m.deactivateTest=function(){return!0}):(n.debug("API request failed"),m.activateTest=function(){return!1},m.deactivateTest=function(){return!1}),n.change.state()}))},change:{state:function(){n.debug("Determining state change direction"),n.is.inactive()?n.activate():n.deactivate(),m.sync&&n.sync(),m.onChange.call(C)},text:function(){n.is.textEnabled()&&(n.is.disabled()?(n.verbose("Changing text to disabled text",b.hover),n.update.text(b.disabled)):n.is.active()?b.hover?(n.verbose("Changing text to hover text",b.hover),n.update.text(b.hover)):b.deactivate&&(n.verbose("Changing text to deactivating text",b.deactivate),n.update.text(b.deactivate)):b.hover?(n.verbose("Changing text to hover text",b.hover),n.update.text(b.hover)):b.activate&&(n.verbose("Changing text to activating text",b.activate),n.update.text(b.activate)))}},activate:function(){m.activateTest.call(C)&&(n.debug("Setting state to active"),w.addClass(p.active),n.update.text(b.active),m.onActivate.call(C))},deactivate:function(){m.deactivateTest.call(C)&&(n.debug("Setting state to inactive"),w.removeClass(p.active),n.update.text(b.inactive),m.onDeactivate.call(C))},sync:function(){n.verbose("Syncing other buttons to current state"),a.not(w).state(n.is.active()?"activate":"deactivate")},get:{text:function(){return m.selector.text?w.find(m.selector.text).text():w.html()},textFor:function(e){return b[e]||!1}},flash:{text:function(e,t,i){var o=n.get.text();n.debug("Flashing text message",e,t),e=e||m.text.flash,t=t||m.flashDuration,i=i||function(){},n.update.text(e),setTimeout(function(){n.update.text(o),i.call(C)},t)}},reset:{text:function(){var e=b.active||w.data(g.storedText),t=b.inactive||w.data(g.storedText);n.is.textEnabled()&&(n.is.active()&&e?(n.verbose("Resetting active text",e),n.update.text(e)):t&&(n.verbose("Resetting inactive text",e),n.update.text(t)))}},update:{text:function(e){var t=n.get.text();e&&e!==t?(n.debug("Updating text",e),m.selector.text?w.data(g.storedText,e).find(m.selector.text).text(e):w.data(g.storedText,e).html(e)):n.debug("Text is already set, ignoring update",e)}},setting:function(t,o){if(n.debug("Changing setting",t,o),e.isPlainObject(t))e.extend(!0,m,t);else{if(o===i)return m[t];m[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,n,t);else{if(o===i)return n[t];n[t]=o}},debug:function(){m.debug&&(m.performance?n.performance.log(arguments):(n.debug=Function.prototype.bind.call(console.info,console,m.name+":"),n.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?n.performance.log(arguments):(n.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),n.verbose.apply(console,arguments)))},error:function(){n.error=Function.prototype.bind.call(console.error,console,m.name+":"),n.error.apply(console,arguments)},performance:{log:function(e){var t,i,o;m.performance&&(t=(new Date).getTime(),o=s||t,i=t-o,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":i})),clearTimeout(n.performance.timer),n.performance.timer=setTimeout(n.performance.display,100)},display:function(){var t=m.name+":",o=0;s=!1,clearTimeout(n.performance.timer),e.each(c,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,a,r){var s,c,l,u=k;return a=a||d,r=C||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(o,a){var r=o!=s?a+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(u[r])&&o!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||o==s)return u[a]!==i?(c=u[a],!1):(n.error(f.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,a):c!==i&&(l=c),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),c}},u?(k===i&&n.initialize(),n.invoke(l)):(k!==i&&k.invoke("destroy"),n.initialize())}),o!==i?o:this},e.fn.state.settings={name:"State",debug:!1,verbose:!0,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{beforeSend:"The before send function has cancelled state change",method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,document),function(e,t,n,i){e.fn.visibility=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return r.each(function(){var r,f=e.extend(!0,{},e.fn.visibility.settings,o),g=f.className,p=f.namespace,v=f.error,h="."+p,b="module-"+p,y=e(t),x=e(this),w=e(f.context),C=(x.offsetParent(),x.selector||"",x.data(b)),k=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},T=this;r={initialize:function(){r.verbose("Initializing visibility",f),r.setup.cache(),r.save.position(),r.should.trackChanges()&&(r.bindEvents(),"image"==f.type&&r.setup.image(),"fixed"==f.type&&r.setup.fixed()),r.checkVisibility(),r.instantiate()},instantiate:function(){r.verbose("Storing instance of module",r),C=r,x.data(b,r)},destroy:function(){r.verbose("Destroying previous module"),x.off(h).removeData(b)},bindEvents:function(){r.verbose("Binding visibility events to scroll and resize"),y.on("resize"+h,r.event.refresh),w.on("scroll"+h,r.event.scroll)},event:{refresh:function(){k(r.refresh)},scroll:function(){r.verbose("Scroll position changed"),f.throttle?(clearTimeout(r.timer),r.timer=setTimeout(r.checkVisibility,f.throttle)):k(r.checkVisibility)}},precache:function(t,i){t instanceof Array||(t=[t]);for(var o=t.length,a=0,r=[],s=n.createElement("img"),c=function(){a++,a>=t.length&&e.isFunction(i)&&i()};o--;)s=n.createElement("img"),s.onload=c,s.onerror=c,s.src=t[o],r.push(s)},should:{trackChanges:function(){return d&&m.length>0?(r.debug("One time query, no need to bind events"),!1):(r.debug("Query is attaching callbacks, watching for changes with scroll"),!0)}},setup:{cache:function(){r.cache={occurred:{},screen:{},element:{}}},image:function(){var e=x.data("src");e&&(r.verbose("Lazy loading image",e),r.topVisible(function(){r.precache(e,function(){r.set.image(e),f.onTopVisible=!1})}))},fixed:function(){r.verbose("Setting up fixed on element pass"),x.visibility({once:!1,continuous:!1,onTopPassed:function(){x.addClass(g.fixed).css({position:"fixed",top:f.offset+"px"}),f.animation&&e.fn.transition!==i&&x.transition(f.transition,f.duration)},onTopPassedReverse:function(){x.removeClass(g.fixed).css({position:"",top:""})}})}},set:{image:function(t){var n=r.cache.screen.bottom<r.cache.element.top;x.attr("src",t),n?(r.verbose("Image outside browser, no show animation"),x.show()):f.transition&&e.fn.transition!==i?x.transition(f.transition,f.duration):x.fadeIn(f.duration)}},refresh:function(){r.debug("Refreshing constants (element width/height)"),r.reset(),r.save.position(),r.checkVisibility(),f.onRefresh.call(T)},reset:function(){r.verbose("Reseting all cached values"),e.isPlainObject(r.cache)&&(r.cache.screen={},r.cache.element={})},checkVisibility:function(){r.verbose("Checking visibility of element",r.cache.element),r.save.calculations(),r.passed(),r.passingReverse(),r.topVisibleReverse(),r.bottomVisibleReverse(),r.topPassedReverse(),r.bottomPassedReverse(),r.passing(),r.topVisible(),r.bottomVisible(),r.topPassed(),r.bottomPassed()},passed:function(t,n){var o=r.get.elementCalculations();if(t!==i&&n!==i)f.onPassed[t]=n;else{if(t!==i)return r.get.pixelsPassed(t)>o.pixelsPassed;o.passing&&e.each(f.onPassed,function(e,t){o.bottomVisible||o.pixelsPassed>r.get.pixelsPassed(e)?r.execute(t,e):f.once||r.remove.occurred(t)})}},passing:function(e){var t=r.get.elementCalculations(),n=e||f.onPassing,o="passing";return e&&(r.debug("Adding callback for passing",e),f.onPassing=e),t.passing?r.execute(n,o):f.once||r.remove.occurred(o),e!==i?t.passing:void 0},topVisible:function(e){var t=r.get.elementCalculations(),n=e||f.onTopVisible,o="topVisible";return e&&(r.debug("Adding callback for top visible",e),f.onTopVisible=e),t.topVisible?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.topVisible:void 0},bottomVisible:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomVisible,o="bottomVisible";return e&&(r.debug("Adding callback for bottom visible",e),f.onBottomVisible=e),t.bottomVisible?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.bottomVisible:void 0},topPassed:function(e){var t=r.get.elementCalculations(),n=e||f.onTopPassed,o="topPassed";return e&&(r.debug("Adding callback for top passed",e),f.onTopPassed=e),t.topPassed?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.topPassed:void 0},bottomPassed:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomPassed,o="bottomPassed";return e&&(r.debug("Adding callback for bottom passed",e),f.onBottomPassed=e),t.bottomPassed?r.execute(n,o):f.once||r.remove.occurred(o),e===i?t.bottomPassed:void 0},passingReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onPassingReverse,o="passingReverse";return e&&(r.debug("Adding callback for passing reverse",e),f.onPassingReverse=e),t.passing?f.once||r.remove.occurred(o):r.get.occurred("passing")&&r.execute(n,o),e!==i?!t.passing:void 0},topVisibleReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onTopVisibleReverse,o="topVisibleReverse";return e&&(r.debug("Adding callback for top visible reverse",e),f.onTopVisibleReverse=e),t.topVisible?f.once||r.remove.occurred(o):r.get.occurred("topVisible")&&r.execute(n,o),e===i?!t.topVisible:void 0},bottomVisibleReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomVisibleReverse,o="bottomVisibleReverse";return e&&(r.debug("Adding callback for bottom visible reverse",e),f.onBottomVisibleReverse=e),t.bottomVisible?f.once||r.remove.occurred(o):r.get.occurred("bottomVisible")&&r.execute(n,o),e===i?!t.bottomVisible:void 0},topPassedReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onTopPassedReverse,o="topPassedReverse";return e&&(r.debug("Adding callback for top passed reverse",e),f.onTopPassedReverse=e),t.topPassed?f.once||r.remove.occurred(o):r.get.occurred("topPassed")&&r.execute(n,o),e===i?!t.onTopPassed:void 0},bottomPassedReverse:function(e){var t=r.get.elementCalculations(),n=e||f.onBottomPassedReverse,o="bottomPassedReverse";return e&&(r.debug("Adding callback for bottom passed reverse",e),f.onBottomPassedReverse=e),t.bottomPassed?f.once||r.remove.occurred(o):r.get.occurred("bottomPassed")&&r.execute(n,o),e===i?!t.bottomPassed:void 0},execute:function(e,t){var n=r.get.elementCalculations(),i=r.get.screenCalculations();e=e||!1,e&&(f.continuous?(r.debug("Callback being called continuously",t,n),e.call(T,n,i)):r.get.occurred(t)||(r.debug("Conditions met",t,n),e.call(T,n,i))),r.save.occurred(t)},remove:{occurred:function(e){e?r.cache.occurred[e]!==i&&r.cache.occurred[e]===!0&&(r.debug("Callback can now be called again",e),r.cache.occurred[e]=!1):r.cache.occurred={}}},save:{calculations:function(){r.verbose("Saving all calculations necessary to determine positioning"),r.save.scroll(),r.save.direction(),r.save.screenCalculations(),r.save.elementCalculations()},occurred:function(e){e&&(r.cache.occurred[e]===i||r.cache.occurred[e]!==!0)&&(r.verbose("Saving callback occurred",e),r.cache.occurred[e]=!0)},scroll:function(){r.cache.scroll=w.scrollTop()+f.offset},direction:function(){var e,t=r.get.scroll(),n=r.get.lastScroll();return e=t>n&&n?"down":n>t&&n?"up":"static",r.cache.direction=e,r.cache.direction},elementPosition:function(){var t=r.get.screenSize();return r.verbose("Saving element position"),e.extend(r.cache.element,{margin:{top:parseInt(x.css("margin-top"),10),bottom:parseInt(x.css("margin-bottom"),10)},fits:T.height<t.height,offset:x.offset(),width:x.outerWidth(),height:x.outerHeight()}),r.cache.element},elementCalculations:function(){var t=r.get.screenCalculations(),n=r.get.elementPosition();f.includeMargin?e.extend(r.cache.element,{top:n.offset.top-n.margin.top,bottom:n.offset.top+n.height+n.margin.bottom}):e.extend(r.cache.element,{top:n.offset.top,bottom:n.offset.top+n.height}),e.extend(r.cache.element,{topVisible:t.bottom>=n.top,topPassed:t.top>=n.top,bottomVisible:t.bottom>=n.bottom,bottomPassed:t.top>=n.bottom,pixelsPassed:0,percentagePassed:0}),e.extend(r.cache.element,{visible:r.cache.element.topVisible||r.cache.element.bottomVisible,passing:r.cache.element.topPassed&&!r.cache.element.bottomPassed,hidden:!r.cache.element.topVisible&&!r.cache.element.bottomVisible}),r.cache.element.passing&&(r.cache.element.pixelsPassed=t.top-n.top,r.cache.element.percentagePassed=(t.top-n.top)/n.height),r.verbose("Updated element calculations",r.cache.element)},screenCalculations:function(){var t=w.scrollTop()+f.offset;return r.cache.scroll===i&&(r.cache.scroll=w.scrollTop()+f.offset),r.save.direction(),e.extend(r.cache.screen,{top:t,bottom:t+r.cache.screen.height}),r.cache.screen},screenSize:function(){r.verbose("Saving window position"),r.cache.screen={height:w.height()}},position:function(){r.save.screenSize(),r.save.elementPosition()}},get:{pixelsPassed:function(e){var t=r.get.elementCalculations();return e.search("%")>-1?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return r.cache.occurred!==i?r.cache.occurred[e]||!1:!1},direction:function(){return r.cache.direction===i&&r.save.direction(),r.cache.direction},elementPosition:function(){return r.cache.element===i&&r.save.elementPosition(),r.cache.element},elementCalculations:function(){return r.cache.element===i&&r.save.elementCalculations(),r.cache.element},screenCalculations:function(){return r.cache.screen===i&&r.save.screenCalculations(),r.cache.screen},screenSize:function(){return r.cache.screen===i&&r.save.screenSize(),r.cache.screen},scroll:function(){return r.cache.scroll===i&&r.save.scroll(),r.cache.scroll},lastScroll:function(){return r.cache.screen===i?(r.debug("First scroll event, no last scroll could be found"),!1):r.cache.screen.top}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,r,t);else{if(n===i)return r[t];r[t]=n}},debug:function(){f.debug&&(f.performance?r.performance.log(arguments):(r.debug=Function.prototype.bind.call(console.info,console,f.name+":"),r.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?r.performance.log(arguments):(r.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),r.verbose.apply(console,arguments)))},error:function(){r.error=Function.prototype.bind.call(console.error,console,f.name+":"),r.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(r.performance.timer),r.performance.timer=setTimeout(r.performance.display,100)},display:function(){var t=f.name+":",n=0;c=!1,clearTimeout(r.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var s,c,l,u=C;return n=n||m,o=T||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var a=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[a])&&n!=s)u=u[a];else{if(u[a]!==i)return c=u[a],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(c=u[o],!1):(r.error(v.method,t),!1);u=u[o]}})),e.isFunction(c)?l=c.apply(o,n):c!==i&&(l=c),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),c}},d?(C===i&&r.initialize(),r.invoke(u)):(C!==i&&C.invoke("destroy"),r.initialize())}),a!==i?a:this},e.fn.visibility.settings={name:"Visibility",namespace:"visibility",className:{fixed:"fixed"},debug:!1,verbose:!1,performance:!0,offset:0,includeMargin:!1,context:t,throttle:!1,type:!1,transition:!1,duration:500,onPassed:{},onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,once:!0,continuous:!1,onRefresh:function(){},onScroll:function(){},error:{method:"The method you called is not defined."}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-css"]={}}(),function(){"undefined"==typeof Package&&(Package={}),Package["semantic:ui-comment"]={}}(),function(){(function(){!function(e,t,n,i){e.fn.dimmer=function(t){var o,a=e(this),r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return a.each(function(){var d,m,f,g=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),p=g.selector,v=g.namespace,h=g.className,b=g.error,y="."+v,x="module-"+v,w=a.selector||"",C="ontouchstart"in n.documentElement?"touchstart":"click",k=e(this),T=this,S=k.data(x);f={preinitialize:function(){f.is.dimmer()?(m=k.parent(),d=k):(m=k,d=f.has.dimmer()?g.dimmerName?m.children(p.dimmer).filter("."+g.dimmerName):m.children(p.dimmer):f.create())},initialize:function(){f.debug("Initializing dimmer",g),"hover"==g.on?m.on("mouseenter"+y,f.show).on("mouseleave"+y,f.hide):"click"==g.on&&m.on(C+y,f.toggle),f.is.page()&&(f.debug("Setting as a page dimmer",m),f.set.pageDimmer()),f.is.closable()&&(f.verbose("Adding dimmer close event",d),d.on(C+y,f.event.click)),f.set.dimmable(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),S=f,k.data(x,S)},destroy:function(){f.verbose("Destroying previous module",d),k.removeData(x),m.off(y),d.off(y)},event:{click:function(t){f.verbose("Determining if event occured on dimmer",t),(0===d.find(t.target).length||e(t.target).is(p.content))&&(f.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);f.debug("Add content to dimmer",n),n.parent()[0]!==d[0]&&n.detach().appendTo(d)},create:function(){var t=e(g.template.dimmer());return g.variation&&(f.debug("Creating dimmer with variation",g.variation),t.addClass(h.variation)),g.dimmerName&&(f.debug("Creating named dimmer",g.dimmerName),t.addClass(g.dimmerName)),t.appendTo(m),t},show:function(t){t=e.isFunction(t)?t:function(){},f.debug("Showing dimmer",d,g),f.is.dimmed()&&!f.is.animating()||!f.is.enabled()?f.debug("Dimmer is already shown or disabled"):(f.animate.show(t),g.onShow.call(T),g.onChange.call(T))},hide:function(t){t=e.isFunction(t)?t:function(){},f.is.dimmed()||f.is.animating()?(f.debug("Hiding dimmer",d),f.animate.hide(t),g.onHide.call(T),g.onChange.call(T)):f.debug("Dimmer is not visible")},toggle:function(){f.verbose("Toggling dimmer visibility",d),f.is.dimmed()?f.hide():f.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?d.transition({animation:g.transition+" in",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.set.dimmed()},onComplete:function(){f.set.active(),t()}}):(f.verbose("Showing dimmer animation with javascript"),f.set.dimmed(),d.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(f.get.duration(),1,function(){d.removeAttr("style"),f.set.active(),t()}))
},hide:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?(f.verbose("Hiding dimmer with css"),d.transition({animation:g.transition+" out",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.remove.dimmed()},onComplete:function(){f.remove.active(),t()}})):(f.verbose("Hiding dimmer with javascript"),f.remove.dimmed(),d.stop().fadeOut(f.get.duration(),function(){f.remove.active(),d.removeAttr("style"),t()}))}},get:{dimmer:function(){return d},duration:function(){return"object"==typeof g.duration?f.is.active()?g.duration.hide:g.duration.show:g.duration}},has:{dimmer:function(){return g.dimmerName?k.children(p.dimmer).filter("."+g.dimmerName).length>0:k.children(p.dimmer).length>0}},is:{active:function(){return d.hasClass(h.active)},animating:function(){return d.is(":animated")||d.hasClass(h.animating)},closable:function(){return"auto"==g.closable?"hover"==g.on?!1:!0:g.closable},dimmer:function(){return k.is(p.dimmer)},dimmable:function(){return k.is(p.dimmable)},dimmed:function(){return m.hasClass(h.dimmed)},disabled:function(){return m.hasClass(h.disabled)},enabled:function(){return!f.is.disabled()},page:function(){return m.is("body")},pageDimmer:function(){return d.hasClass(h.pageDimmer)}},can:{show:function(){return!d.hasClass(h.disabled)}},set:{active:function(){d.addClass(h.active)},dimmable:function(){m.addClass(h.dimmable)},dimmed:function(){m.addClass(h.dimmed)},pageDimmer:function(){d.addClass(h.pageDimmer)},disabled:function(){d.addClass(h.disabled)}},remove:{active:function(){d.removeClass(h.active)},dimmed:function(){m.removeClass(h.dimmed)},disabled:function(){d.removeClass(h.disabled)}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=g.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",w&&(t+=" '"+w+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,c,l=S;return n=n||u,a=T||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(f.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},f.preinitialize(),l?(S===i&&f.initialize(),f.invoke(c)):(S!==i&&S.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",debug:!1,verbose:!0,performance:!0,dimmerName:!1,variation:!1,closable:"auto",transition:"fade",useCSS:!0,on:!1,duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},selector:{dimmable:".dimmable",dimmer:".ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-dimmer"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.dropdown=function(o){var a,r=e(this),s=e(n),c=r.selector||"",l="ontouchstart"in n.documentElement,u=(new Date).getTime(),d=[],m=arguments[0],f="string"==typeof m,g=[].slice.call(arguments,1);return r.each(function(){var p,v,h,b,y=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),x=y.className,w=y.metadata,C=y.namespace,k=y.selector,T=y.error,S="."+C,A="module-"+C,E=e(this),P=E.find(k.text),F=E.find(k.search),R=E.find(k.input),D=E.prev().find(k.text).length>0?E.prev().find(k.text):E.prev(),O=E.children(k.menu),z=O.find(k.item),q=!1,j=!1,I=this,N=E.data(A);b={initialize:function(){b.debug("Initializing dropdown",y),b.is.alreadySetup()?b.error(T.alreadySetup):b.setup.layout(),b.save.defaults(),b.set.selected(),b.create.id(),l&&b.bind.touchEvents(),b.bind.mouseEvents(),b.bind.keyboardEvents(),b.observeChanges(),b.instantiate()},instantiate:function(){b.verbose("Storing instance of dropdown",b),N=b,E.data(A,b)},destroy:function(){b.verbose("Destroying previous dropdown for",E),b.remove.tabbable(),E.off(S).removeData(A),O.off(S),s.off(p)},observeChanges:function(){"MutationObserver"in t&&(h=new MutationObserver(function(e){b.is.selectMutation(e)?(b.debug("<select> modified, recreating menu"),b.setup.select()):(b.debug("DOM tree modified, updating selector cache"),b.refresh())}),h.observe(I,{childList:!0,subtree:!0}),b.debug("Setting up mutation observer",h))},create:{id:function(){b.verbose("Creating unique id for element"),v=b.get.uniqueID(),p="."+v}},search:function(){var e;e=F.val(),b.verbose("Searching for query",e),b.filter(e),b.is.searchSelection()&&b.can.show()&&b.show()},setup:{layout:function(){E.is("select")&&b.setup.select(),b.is.search()&&!b.is.searchable()&&(F=e("<input />").addClass(x.search).insertBefore(P)),y.allowTab&&b.set.tabbable()},select:function(){var t=b.get.selectValues();b.debug("Dropdown initialized on a select",t),E.is("select")&&(R=E),R.parent(k.dropdown).length>0?(b.debug("UI dropdown already exists. Creating dropdown menu only"),E=R.closest(k.dropdown),O=E.children(k.menu),0===O.length&&(O=e("<div />").addClass(x.menu).appendTo(E)),O.html(y.templates.menu(t))):(b.debug("Creating entire dropdown from select"),E=e("<div />").attr("class",R.attr("class")).addClass(x.selection).addClass(x.dropdown).html(y.templates.dropdown(t)).insertBefore(R),R.removeAttr("class").prependTo(E)),b.refresh()}},refresh:function(){b.verbose("Refreshing selector cache"),P=E.find(k.text),F=E.find(k.search),R=E.find(k.input),D=E.prev().find(k.text).length>0?E.prev().find(k.text):E.prev(),O=E.children(k.menu),z=O.find(k.item)},toggle:function(){b.verbose("Toggling menu visibility"),b.is.active()?b.hide():b.show()},show:function(t){t=e.isFunction(t)?t:function(){},b.is.searchSelection()&&b.is.allFiltered()||b.can.show()&&!b.is.active()&&(b.debug("Showing dropdown"),b.animate.show(function(){b.can.click()&&b.bind.intent(),b.set.visible(),t.call(I)}),y.onShow.call(I))},hide:function(t){t=e.isFunction(t)?t:function(){},b.is.active()&&(b.debug("Hiding dropdown"),b.animate.hide(function(){b.remove.visible(),t.call(I)}),y.onHide.call(I))},hideOthers:function(){b.verbose("Finding other dropdowns to hide"),r.not(E).has(k.menu+":visible:not(."+x.animating+")").dropdown("hide")},hideSubMenus:function(){var e=O.find(k.menu);e.transition("hide")},bind:{keyboardEvents:function(){b.debug("Binding keyboard events"),E.on("keydown"+S,b.event.keydown),b.is.searchable()&&E.on(b.get.inputEvent(),k.search,b.event.input)},touchEvents:function(){b.debug("Touch device detected binding additional touch events"),b.is.searchSelection()||E.on("touchstart"+S,b.event.test.toggle),O.on("touchstart"+S,k.item,b.event.item.mouseenter)},mouseEvents:function(){b.verbose("Mouse detected binding mouse events"),b.is.searchSelection()?E.on("mousedown"+S,k.menu,b.event.menu.activate).on("mouseup"+S,k.menu,b.event.menu.deactivate).on("click"+S,k.search,b.show).on("focus"+S,k.search,b.event.searchFocus).on("blur"+S,k.search,b.event.searchBlur).on("click"+S,k.text,b.event.searchTextFocus):("click"==y.on?E.on("click"+S,b.event.test.toggle):"hover"==y.on?E.on("mouseenter"+S,b.delay.show).on("mouseleave"+S,b.delay.hide):E.on(y.on+S,b.toggle),E.on("mousedown"+S,b.event.mousedown).on("mouseup"+S,b.event.mouseup).on("focus"+S,b.event.focus).on("blur"+S,b.event.blur)),O.on("mouseenter"+S,k.item,b.event.item.mouseenter).on("mouseleave"+S,k.item,b.event.item.mouseleave).on("click"+S,k.item,b.event.item.click)},intent:function(){b.verbose("Binding hide intent event to document"),l&&s.on("touchstart"+p,b.event.test.touch).on("touchmove"+p,b.event.test.touch),s.on("click"+p,b.event.test.hide)}},unbind:{intent:function(){b.verbose("Removing hide intent event from document"),l&&s.off("touchstart"+p).off("touchmove"+p),s.off("click"+p)}},filter:function(t){var n=e(),i=b.escape.regExp(t),o=new RegExp("^"+i,"igm"),a=new RegExp(i,"ig");b.verbose("Searching for matching values"),z.each(function(){var t=e(this),i=String(b.get.choiceText(t,!1)),r=String(b.get.choiceValue(t,i));i.match(o)||r.match(o)?n=n.add(t):y.fullTextSearch&&(i.match(a)||r.match(a))&&(n=n.add(t))}),b.debug("Setting filter",t),b.remove.filteredItem(),z.not(n).addClass(x.filtered),b.verbose("Selecting first non-filtered element"),b.remove.selectedItem(),z.not("."+x.filtered).eq(0).addClass(x.selected),b.is.allFiltered()&&(b.debug("All items filtered, hiding dropdown",t),b.is.searchSelection()&&b.hide(),y.onNoResults.call(I,t))},focusSearch:function(){b.is.search()&&F.focus()},forceSelection:function(){var e=z.not(x.filtered).filter("."+x.selected).eq(0),t=z.filter("."+x.active).eq(0),n=e.length>0?e:t,i=n.size()>0;i&&b.event.item.click.call(n)},event:{mousedown:function(){q=!0},mouseup:function(){q=!1},focus:function(){!q&&b.is.hidden()&&b.show()},blur:function(){var e=n.activeElement===this;q||e||b.hide()},searchFocus:function(){q=!0,b.show()},searchBlur:function(){var e=n.activeElement===this;j||e||(y.forceSelection?b.forceSelection():b.hide())},searchTextFocus:function(){q=!0,F.focus()},input:function(){b.is.searchSelection()&&b.set.filtered(),clearTimeout(b.timer),b.timer=setTimeout(b.search,y.delay.search)},keydown:function(e){{var t,n=z.not(x.filtered).filter("."+x.selected).eq(0),i=O.children("."+x.active).eq(0),o=n.length>0?n:i,a=o.length>0?o.siblings(":not(."+x.filtered+")").andSelf():O.children(":not(."+x.filtered+")"),r=o.children(k.menu),s=o.closest(k.menu),c=s[0]!==O[0],l=s.is(":visible"),u=e.which,d={enter:13,escape:27,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},m=r.length>0,f=o.length>0;a.size()-1}if(b.is.visible()){if(u==d.enter&&f&&(m&&!y.allowCategorySelection?(b.verbose("Pressed enter on unselectable category, opening sub menu"),u=d.rightArrow):(b.verbose("Enter key pressed, choosing selected item"),b.event.item.click.call(o,e))),u==d.leftArrow&&(c&&(b.verbose("Left key pressed, closing sub-menu"),b.animate.hide(!1,s),o.removeClass(x.selected),s.closest(k.item).addClass(x.selected)),e.preventDefault()),u==d.rightArrow&&(m&&(b.verbose("Right key pressed, opening sub-menu"),b.animate.show(!1,r),o.removeClass(x.selected),r.find(k.item).eq(0).addClass(x.selected)),e.preventDefault()),u==d.upArrow){if(t=f&&l?o.prevAll(k.item+":not(."+x.filtered+")").eq(0):z.eq(0),a.index(t)<0)return void b.verbose("Up key pressed but reached top of current menu");b.verbose("Up key pressed, changing active item"),o.removeClass(x.selected),t.addClass(x.selected),b.set.scrollPosition(t),e.preventDefault()}if(u==d.downArrow){if(t=f&&l?t=o.nextAll(k.item+":not(."+x.filtered+")").eq(0):z.eq(0),0===t.length)return void b.verbose("Down key pressed but reached bottom of current menu");b.verbose("Down key pressed, changing active item"),z.removeClass(x.selected),t.addClass(x.selected),b.set.scrollPosition(t),e.preventDefault()}}else u==d.enter&&(b.verbose("Enter key pressed, showing dropdown"),b.show()),u==d.escape&&(b.verbose("Escape key pressed, closing dropdown"),b.hide()),u==d.downArrow&&(b.verbose("Down key pressed, showing dropdown"),b.show())},test:{toggle:function(e){b.determine.eventInMenu(e,b.toggle)&&e.preventDefault()},touch:function(e){b.determine.eventInMenu(e,function(){"touchstart"==e.type?b.timer=setTimeout(b.hide,y.delay.touch):"touchmove"==e.type&&clearTimeout(b.timer)}),e.stopPropagation()},hide:function(e){b.determine.eventInModule(e,b.hide)}},menu:{activate:function(){j=!0},deactivate:function(){j=!1}},item:{mouseenter:function(t){var n=e(this).children(k.menu),i=e(this).siblings(k.item).children(k.menu);n.length>0&&(clearTimeout(b.itemTimer),b.itemTimer=setTimeout(function(){b.verbose("Showing sub-menu",n),e.each(i,function(){b.animate.hide(!1,e(this))}),b.animate.show(!1,n)},y.delay.show),t.preventDefault())},mouseleave:function(){var t=e(this).children(k.menu);t.length>0&&(clearTimeout(b.itemTimer),b.itemTimer=setTimeout(function(){b.verbose("Hiding sub-menu",t),b.animate.hide(!1,t)},y.delay.hide))},click:function(t){var n=e(this),i=e(t?t.target:""),o=n.find(k.menu),a=b.get.choiceText(n),r=b.get.choiceValue(n,a),s=function(){b.remove.searchTerm(),b.determine.selectAction(a,r)},c=o.length>0,l=o.find(i).length>0;l||c&&!y.allowCategorySelection||s()}},resetStyle:function(){e(this).removeAttr("style")}},determine:{selectAction:function(t,n){b.verbose("Determining action",y.action),e.isFunction(b.action[y.action])?(b.verbose("Triggering preset action",y.action,t,n),b.action[y.action](t,n)):e.isFunction(y.action)?(b.verbose("Triggering user action",y.action,t,n),y.action(t,n)):b.error(T.action,y.action)},eventInModule:function(t,n){return n=e.isFunction(n)?n:function(){},0===e(t.target).closest(E).length?(b.verbose("Triggering event",n),n(),!0):(b.verbose("Event occurred in dropdown, canceling callback"),!1)},eventInMenu:function(t,n){return n=e.isFunction(n)?n:function(){},0===e(t.target).closest(O).length?(b.verbose("Triggering event",n),n(),!0):(b.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},select:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},combo:function(e,t){t=t!==i?t:e,b.set.selected(t),b.hide(function(){b.remove.filteredItem()})},hide:function(){b.hide(function(){b.remove.filteredItem()})}},get:{text:function(){return P.text()},value:function(){return R.length>0?R.val():E.data(w.value)},choiceText:function(e,t){return t=t!==i?t:y.preserveHTML,e!==i?(e.find(k.menu).length>0&&(b.verbose("Retreiving text of element with sub-menu"),e=e.clone(),e.find(k.menu).remove(),e.find(k.menuIcon).remove()),e.data(w.text)!==i?e.data(w.text):t?e.html().trim():e.text().trim()):void 0},choiceValue:function(e,t){return t=t||b.get.choiceText(e),e.data(w.value)!==i?e.data(w.value):"string"==typeof t?t.toLowerCase().trim():t.trim()},inputEvent:function(){var e=F[0];return e?e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup":!1},selectValues:function(){var t={};return t.values=y.sortSelect?{}:[],E.find("option").each(function(){var n=e(this).html(),o=e(this).attr("value")!==i?e(this).attr("value"):n;""===o?t.placeholder=n:y.sortSelect?t.values[o]={name:n,value:o}:t.values.push({name:n,value:o})}),y.sortSelect?b.debug("Retrieved and sorted values from select",t):b.debug("Retreived values from select",t),t},activeItem:function(){return z.filter("."+x.active)},item:function(t,n){var o=!1;return t=t!==i?t:b.get.value()!==i?b.get.value():b.get.text(),n=""===t||0===t?!0:n||!1,t!==i?z.each(function(){var i=e(this),a=b.get.choiceText(i),r=b.get.choiceValue(i,a);n?(b.verbose("Ambiguous dropdown value using strict type check",i,t),r===t?o=e(this):o||a!==t||(o=e(this))):r==t?(b.verbose("Found select item by value",r,t),o=e(this)):o||a!=t||(b.verbose("Found select item by text",a,t),o=e(this))}):t=b.get.text(),o||!1},uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},restore:{defaults:function(){b.restore.defaultText(),b.restore.defaultValue()},defaultText:function(){var e=E.data(w.defaultText);b.debug("Restoring default text",e),b.set.text(e),P.addClass(x.placeholder)},defaultValue:function(){var e=E.data(w.defaultValue);e!==i&&(b.debug("Restoring default value",e),e.length?b.set.selected(e):(b.remove.activeItem(),b.remove.selectedItem()))}},save:{defaults:function(){b.save.defaultText(),b.save.placeholderText(),b.save.defaultValue()},defaultValue:function(){E.data(w.defaultValue,b.get.value())},defaultText:function(){E.data(w.defaultText,P.text())},placeholderText:function(){P.hasClass(x.placeholder)&&E.data(w.placeholderText,P.text())}},clear:function(){var e=E.data(w.placeholderText);b.set.text(e),b.set.value(""),b.remove.activeItem(),b.remove.selectedItem(),P.addClass(x.placeholder)},set:{filtered:function(){var e=F.val(),t="string"==typeof e&&e.length>0;t?P.addClass(x.filtered):P.removeClass(x.filtered)},tabbable:function(){b.is.searchable()?(b.debug("Searchable dropdown initialized"),F.val("").attr("tabindex",0),O.attr("tabindex","-1")):(b.debug("Simple selection dropdown initialized"),E.attr("tabindex")||(E.attr("tabindex",0),O.attr("tabindex","-1")))},scrollPosition:function(e,t){var n,o,a,r,s,c,l,u,d,m=5;e=e||b.get.activeItem(),n=e&&e.length>0,t=t!==i?t:!1,e&&n&&(O.hasClass(x.visible)||O.addClass(x.loading),l=O.height(),a=e.height(),c=O.scrollTop(),s=O.offset().top,r=e.offset().top,o=c-s+r,d=o+m>c+l,u=c>o-m,b.debug("Scrolling to active item",o),(u||d||t)&&O.scrollTop(o).removeClass(x.loading))},text:function(e){"combo"==y.action?(b.debug("Changing combo button text",e,D),y.preserveHTML?D.html(e):D.text(e)):"select"!==y.action&&(b.debug("Changing text",e,P),P.removeClass(x.filtered).removeClass(x.placeholder),y.preserveHTML?P.html(e):P.text(e))},value:function(e){b.debug("Adding selected value to hidden input",e,R),R.length>0?R.val(e).trigger("change"):E.data(w.value,e)},active:function(){E.addClass(x.active)},visible:function(){E.addClass(x.visible)},selected:function(e){var t,n,i=b.get.item(e);i&&(b.debug("Setting selected menu item to",i),b.remove.activeItem(),b.remove.selectedItem(),i.addClass(x.active).addClass(x.selected),t=b.get.choiceText(i),n=b.get.choiceValue(i,t),b.set.text(t),b.set.value(n),y.onChange.call(I,e,t,i))}},remove:{active:function(){E.removeClass(x.active)},visible:function(){E.removeClass(x.visible)},activeItem:function(){z.removeClass(x.active)},filteredItem:function(){z.removeClass(x.filtered)},searchTerm:function(){F.val("")},selectedItem:function(){z.removeClass(x.selected)},tabbable:function(){b.is.searchable()?(b.debug("Searchable dropdown initialized"),F.attr("tabindex","-1"),O.attr("tabindex","-1")):(b.debug("Simple selection dropdown initialized"),E.attr("tabindex","-1"),O.attr("tabindex","-1"))}},is:{active:function(){return E.hasClass(x.active)},alreadySetup:function(){return E.is("select")&&E.parent(k.dropdown).length>0},animating:function(e){return e?e.is(":animated")||e.transition&&e.transition("is animating"):O.is(":animated")||O.transition&&O.transition("is animating")},allFiltered:function(){return z.filter("."+x.filtered).length===z.length},hidden:function(e){return e?e.is(":hidden"):O.is(":hidden")},selectMutation:function(t){var n=!1;return e.each(t,function(t,i){return i.target&&e(i.target).is("select")?(n=!0,!0):void 0}),n},search:function(){return E.hasClass(x.search)},searchable:function(){return F.length>0},searchSelection:function(){return b.is.searchable()&&F.parent().is(E)},selection:function(){return E.hasClass(x.selection)},upward:function(){return E.hasClass(x.upward)},visible:function(e){return e?e.is(":visible"):O.is(":visible")}},can:{click:function(){return l||"click"==y.on},show:function(){return!E.hasClass(x.disabled)}},animate:{show:function(t,n){var o=n||O,a=n?function(){}:function(){b.hideSubMenus(),b.hideOthers(),b.set.active()};t=e.isFunction(t)?t:function(){},b.set.scrollPosition(b.get.activeItem(),!0),b.verbose("Doing menu show animation",o),(b.is.hidden(o)||b.is.animating(o))&&("auto"==y.transition&&(y.transition=b.is.upward()?"slide up":"slide down",b.verbose("Automatically determining animation based on animation direction",y.transition)),"none"==y.transition?t.call(I):e.fn.transition!==i&&E.transition("is supported")?o.transition({animation:y.transition+" in",debug:y.debug,verbose:y.verbose,duration:y.duration,queue:!0,onStart:a,onComplete:function(){t.call(I)}}):"slide down"==y.transition?(a(),o.hide().clearQueue().children().clearQueue().css("opacity",0).delay(50).animate({opacity:1},y.duration,"easeOutQuad",b.event.resetStyle).end().slideDown(100,"easeOutQuad",function(){b.event.resetStyle.call(this),t.call(I)})):"fade"==y.transition?(a(),o.hide().clearQueue().fadeIn(y.duration,function(){b.event.resetStyle.call(this),t.call(I)})):b.error(T.transition,y.transition))},hide:function(t,n){var o=n||O,a=(n?.9*y.duration:y.duration,n?function(){}:function(){b.can.click()&&b.unbind.intent(),b.focusSearch(),b.remove.active()});t=e.isFunction(t)?t:function(){},(b.is.visible(o)||b.is.animating(o))&&(b.verbose("Doing menu hide animation",o),"auto"==y.transition&&(y.transition=b.is.upward()?"slide up":"slide down"),R.trigger("blur"),"none"==y.transition?t.call(I):e.fn.transition!==i&&E.transition("is supported")?o.transition({animation:y.transition+" out",duration:y.duration,debug:y.debug,verbose:y.verbose,queue:!0,onStart:a,onComplete:function(){t.call(I)}}):"slide down"==y.transition?(a(),o.show().clearQueue().children().clearQueue().css("opacity",1).animate({opacity:0},100,"easeOutQuad",b.event.resetStyle).end().delay(50).slideUp(100,"easeOutQuad",function(){b.event.resetStyle.call(this),t.call(I)})):"fade"==y.transition?(a(),o.show().clearQueue().fadeOut(150,function(){b.event.resetStyle.call(this),t.call(I)})):b.error(T.transition))}},delay:{show:function(){b.verbose("Delaying show event to ensure user intent"),clearTimeout(b.timer),b.timer=setTimeout(b.show,y.delay.show)},hide:function(){b.verbose("Delaying hide event to ensure user intent"),clearTimeout(b.timer),b.timer=setTimeout(b.hide,y.delay.hide)}},escape:{regExp:function(e){return e=String(e),e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}},setting:function(t,n){if(b.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,y,t);else{if(n===i)return y[t];y[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},debug:function(){y.debug&&(y.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,y.name+":"),b.debug.apply(console,arguments)))},verbose:function(){y.verbose&&y.debug&&(y.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,y.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,y.name+":"),b.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;y.performance&&(t=(new Date).getTime(),i=u||t,n=t-i,u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:I,"Execution Time":n})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,100)},display:function(){var t=y.name+":",n=0;u=!1,clearTimeout(b.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,o){var r,s,c,l=N;return n=n||g,o=I||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(b.error(T.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},f?(N===i&&b.initialize(),b.invoke(m)):(N!==i&&N.invoke("destroy"),b.initialize())}),a!==i?a:this},e.fn.dropdown.settings={debug:!1,verbose:!0,performance:!0,on:"click",action:"activate",allowTab:!0,fullTextSearch:!1,preserveHTML:!0,sortSelect:!1,allowCategorySelection:!1,delay:{hide:300,show:200,search:50,touch:50},forceSelection:!0,transition:"auto",duration:250,onNoResults:function(){},onChange:function(){},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",method:"The method you called is not defined.",transition:"The requested transition was not found"},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholderText",text:"text",value:"value"},selector:{dropdown:".ui.dropdown",input:'> input[type="hidden"], > select',item:".item",menu:".menu",menuIcon:".dropdown.icon",search:"> input.search, .menu > .search > input, .menu > input.search",text:"> .text:not(.icon)"},className:{active:"active",animating:"animating",disabled:"disabled",dropdown:"ui dropdown",filtered:"filtered",loading:"loading",menu:"menu",placeholder:"default",search:"search",selected:"selected",selection:"selection",upward:"upward",visible:"visible"}},e.fn.dropdown.settings.templates={menu:function(t){var n=(t.placeholder||!1,t.values||{},"");return e.each(t.values,function(e,t){n+='<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),n},dropdown:function(t){var n=t.placeholder||!1,i=(t.values||{},"");return i+='<i class="dropdown icon"></i>',i+=t.placeholder?'<div class="default text">'+n+"</div>":'<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+='<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),i+="</div>"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-dropdown"]={}}(),function(){"undefined"==typeof Package&&(Package={}),Package["semantic:ui-feed"]={}}(),function(){(function(){!function(e,t,n,i){e.fn.form=function(t,o){var a,r=e(this),s=e.extend(!0,{},e.fn.form.settings,o),c=e.extend({},e.fn.form.settings.defaults,t),l=s.namespace,u=s.metadata,d=s.selector,m=s.className,f=(s.error,"."+l),g="module-"+l,p=r.selector||"",v=(new Date).getTime(),h=[],b=arguments[0],y="string"==typeof b,x=[].slice.call(arguments,1);return r.each(function(){var t,o=e(this),l=e(this).find(d.field),w=e(this).find(d.group),C=e(this).find(d.message),k=(e(this).find(d.prompt),e(this).find(d.submit)),T=e(this).find(d.clear),S=e(this).find(d.reset),A=[],E=!1,P=this,F=o.data(g);t={initialize:function(){t.verbose("Initializing form validation",o,c,s),t.bindEvents(),t.set.defaults(),t.instantiate()},instantiate:function(){t.verbose("Storing instance of module",t),F=t,o.data(g,t)},destroy:function(){t.verbose("Destroying previous module",F),t.removeEvents(),o.removeData(g)},refresh:function(){t.verbose("Refreshing selector cache"),l=o.find(d.field)},submit:function(){t.verbose("Submitting form",o),o.submit()},attachEvents:function(n,i){i=i||"submit",e(n).on("click",function(e){t[i](),e.preventDefault()})},bindEvents:function(){s.keyboardShortcuts&&l.on("keydown"+f,t.event.field.keydown),o.on("submit"+f,t.validate.form),l.on("blur"+f,t.event.field.blur),t.attachEvents(k,"submit"),t.attachEvents(S,"reset"),t.attachEvents(T,"clear"),l.each(function(){var n=e(this).prop("type"),i=t.get.changeEvent(n);e(this).on(i+f,t.event.field.change)})},clear:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(m.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(m.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("clear")):s?i.checkbox("uncheck"):(t.verbose("Resetting field value",n,r),n.val(""))})},reset:function(){l.each(function(){var n=e(this),i=n.parent(),o=n.closest(w),a=o.find(d.prompt),r=n.data(u.defaultValue)||"",s=i.is(d.uiCheckbox),c=i.is(d.uiDropdown),l=o.hasClass(m.error);l&&(t.verbose("Resetting error on field",o),o.removeClass(m.error),a.remove()),c?(t.verbose("Resetting dropdown value",i,r),i.dropdown("restore defaults")):s?(t.verbose("Resetting checkbox value",i,r),i.checkbox(r===!0?"check":"uncheck")):(t.verbose("Resetting field value",n,r),n.val(r))})},removeEvents:function(){o.off(f),l.off(f),k.off(f),l.off(f)},event:{field:{keydown:function(n){var i=e(this),o=n.which,a={enter:13,escape:27};o==a.escape&&(t.verbose("Escape key pressed blurring field"),i.blur()),!n.ctrlKey&&o==a.enter&&i.is(d.input)&&i.not(d.checkbox).length>0&&(k.addClass(m.pressed),E||(i.one("keyup"+f,t.event.field.keyup),t.submit(),t.debug("Enter pressed on input submitting form")),E=!0)},keyup:function(){E=!1,k.removeClass(m.pressed)},blur:function(){var n=e(this),i=n.closest(w);i.hasClass(m.error)?(t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))):("blur"==s.on||"change"==s.on)&&t.validate.field(t.get.validation(n))},change:function(){var n=e(this),i=n.closest(w);("change"==s.on||i.hasClass(m.error)&&s.revalidate)&&(clearTimeout(t.timer),t.timer=setTimeout(function(){t.debug("Revalidating field",n,t.get.validation(n)),t.validate.field(t.get.validation(n))},s.delay))}}},get:{changeEvent:function(e){return"checkbox"==e||"radio"==e||"hidden"==e?"change":t.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},field:function(n){return t.verbose("Finding field with identifier",n),l.filter("#"+n).length>0?l.filter("#"+n):l.filter('[name="'+n+'"]').length>0?l.filter('[name="'+n+'"]'):l.filter('[name="'+n+'[]"]').length>0?l.filter('[name="'+n+'[]"]'):l.filter("[data-"+u.validate+'="'+n+'"]').length>0?l.filter("[data-"+u.validate+'="'+n+'"]'):e("<input/>")},fields:function(n){var i=e();return e.each(n,function(e,n){i=i.add(t.get.field(n))}),i},validation:function(n){var i;return e.each(c,function(e,o){t.get.field(o.identifier).get(0)==n.get(0)&&(i=o)}),i||!1},value:function(e){var n,i=[];return i.push(e),n=t.get.values.call(P,i),n[e]},values:function(n){var i=e.isArray(n)?t.get.fields(n):l,o={};return i.each(function(n,i){var a=e(i),r=(a.prop("type"),a.prop("name")),s=a.val(),c=a.is(d.checkbox),l=a.is(d.radio),u=-1!==r.indexOf("[]"),m=c?a.is(":checked"):!1;if(r)if(u)if(r=r.replace("[]",""),o[r]||(o[r]=[]),c){if(!m)return t.debug("Omitted unchecked checkbox",a),!0;o[r].push(s)}else o[r].push(s);else if(l)m&&(o[r]=s);else if(c){if(!m)return t.debug("Omitted unchecked checkbox",a),!0;o[r]=!0}else o[r]=s}),o}},has:{field:function(e){return t.verbose("Checking for existence of a field with identifier",e),l.filter("#"+e).length>0?!0:l.filter('[name="'+e+'"]').length>0?!0:l.filter("[data-"+u.validate+'="'+e+'"]').length>0?!0:!1}},add:{prompt:function(n,a){var r=t.get.field(n),c=r.closest(w),l=c.children(d.prompt),u=0!==l.length;a="string"==typeof a?[a]:a,t.verbose("Adding field error state",n),c.addClass(m.error),s.inline&&(u||(l=s.templates.prompt(a),l.appendTo(c)),l.html(a[0]),u?t.verbose("Inline errors are disabled, no inline error added",n):s.transition&&e.fn.transition!==i&&o.transition("is supported")?(t.verbose("Displaying error with css transition",s.transition),l.transition(s.transition+" in",s.duration)):(t.verbose("Displaying error with fallback javascript animation"),l.fadeIn(s.duration)))
},errors:function(e){t.debug("Adding form error messages",e),C.html(s.templates.error(e))}},remove:{prompt:function(n){var a=t.get.field(n.identifier),r=a.closest(w),c=r.children(d.prompt);r.removeClass(m.error),s.inline&&c.is(":visible")&&(t.verbose("Removing prompt for field",n),s.transition&&e.fn.transition!==i&&o.transition("is supported")?c.transition(s.transition+" out",s.duration,function(){c.remove()}):c.fadeOut(s.duration,function(){c.remove()}))}},set:{success:function(){o.removeClass(m.error).addClass(m.success)},defaults:function(){l.each(function(){var t=e(this),n=t.filter(d.checkbox).length>0,i=n?t.is(":checked"):t.val();t.data(u.defaultValue,i)})},error:function(){o.removeClass(m.success).addClass(m.error)},value:function(e,n){var i={};return i[e]=n,t.set.values.call(P,i)},values:function(n){e.isEmptyObject(n)||(e.each(n,function(n,i){var o,a=t.get.field(n),r=a.parent(),s=e.isArray(i),c=r.is(d.uiCheckbox),l=r.is(d.uiDropdown),u=a.is(d.radio)&&c,m=a.length>0;m&&(s&&c?(t.verbose("Selecting multiple",i,a),r.checkbox("uncheck"),e.each(i,function(e,t){o=a.filter('[value="'+t+'"]'),r=o.parent(),o.length>0&&r.checkbox("check")})):u?(t.verbose("Selecting radio value",i,a),a.filter('[value="'+i+'"]').parent(d.uiCheckbox).checkbox("check")):c?(t.verbose("Setting checkbox value",i,r),r.checkbox(i===!0?"check":"uncheck")):l?(t.verbose("Setting dropdown value",i,r),r.dropdown("set selected",i)):(t.verbose("Setting field value",i,a),a.val(i)))}),t.validate.form())}},validate:{form:function(n){var a=!0;return E?!1:(A=[],e.each(c,function(e,n){t.validate.field(n)||(a=!1)}),a?(t.debug("Form has no validation errors, submitting"),t.set.success(),s.onSuccess.call(P,n)):(t.debug("Form has errors"),t.set.error(),s.inline||t.add.errors(A),o.data("moduleApi")!==i&&n.stopImmediatePropagation(),s.onFailure.call(P,A)))},field:function(n){var o=t.get.field(n.identifier),a=!0,r=[];return o.prop("disabled")?(t.debug("Field is disabled. Skipping",n.identifier),a=!0):n.optional&&""===e.trim(o.val())?(t.debug("Field is optional and empty. Skipping",n.identifier),a=!0):n.rules!==i&&e.each(n.rules,function(e,i){t.has.field(n.identifier)&&!t.validate.rule(n,i)&&(t.debug("Field is invalid",n.identifier,i.type),r.push(i.prompt),a=!1)}),a?(t.remove.prompt(n,r),s.onValid.call(o),!0):(A=A.concat(r),t.add.prompt(n.identifier,r),s.onInvalid.call(o,r),!1)},rule:function(n,o){var a,r,c=t.get.field(n.identifier),l=o.type,u=e.trim(c.val()+""),d=/\[(.*)\]/i,m=d.exec(l),f=!0;return m!==i&&null!==m?(a=""+m[1],r=l.replace(m[0],""),f=s.rules[r].call(P,u,a)):f=s.rules[l].call(c,u),f}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(n,o){if(e.isPlainObject(n))e.extend(!0,t,n);else{if(o===i)return t[n];t[n]=o}},debug:function(){s.debug&&(s.performance?t.performance.log(arguments):(t.debug=Function.prototype.bind.call(console.info,console,s.name+":"),t.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?t.performance.log(arguments):(t.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),t.verbose.apply(console,arguments)))},error:function(){t.error=Function.prototype.bind.call(console.error,console,s.name+":"),t.error.apply(console,arguments)},performance:{log:function(e){var n,i,o;s.performance&&(n=(new Date).getTime(),o=v||n,i=n-o,v=n,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":i})),clearTimeout(t.performance.timer),t.performance.timer=setTimeout(t.performance.display,100)},display:function(){var n=s.name+":",o=0;v=!1,clearTimeout(t.performance.timer),e.each(h,function(e,t){o+=t["Execution Time"]}),n+=" "+o+"ms",p&&(n+=" '"+p+"'"),r.length>1&&(n+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&h.length>0&&(console.groupCollapsed(n),console.table?console.table(h):e.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(t,n,o){var r,s,c,l=F;return n=n||x,o=P||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},y?(F===i&&t.initialize(),t.invoke(b)):(F!==i&&F.invoke("destroy"),t.initialize())}),a!==i?a:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:".reset",submit:".submit",uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{method:"The method you called is not defined."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui red pointing prompt label").html(t[0])}},rules:{checked:function(){return e(this).filter(":checked").length>0},contains:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(new RegExp(t,"i"))},containsExactly:function(e,t){return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),-1!==e.search(new RegExp(t))},email:function(e){var t=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","i");return t.test(e)},empty:function(e){return!(e===i||""===e)},integer:function(e,t){var n,o,a,r=/^\-?\d+$/;return t===i||""===t||".."===t||(-1==t.indexOf("..")?r.test(t)&&(n=o=t-0):(a=t.split("..",2),r.test(a[0])&&(n=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(e)&&(n===i||e>=n)&&(o===i||o>=e)},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,e="string"==typeof e?e.toLowerCase():e,e==t},isExactly:function(e,t){return e==t},length:function(e,t){return e!==i?e.length>=t:!1},match:function(t,n){var o,a=e(this);return a.find("#"+n).length>0?o=a.find("#"+n).val():a.find('[name="'+n+'"]').length>0?o=a.find('[name="'+n+'"]').val():a.find('[data-validate="'+n+'"]').length>0&&(o=a.find('[data-validate="'+n+'"]').val()),o!==i?t.toString()==o.toString():!1},maxLength:function(e,t){return e!==i?e.length<=t:!1},not:function(e,t){return e="string"==typeof e?e.toLowerCase():e,t="string"==typeof t?t.toLowerCase():t,e!=t},notExactly:function(e,t){return e!=t},url:function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)}}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-form"]={}}(),function(){"undefined"==typeof Package&&(Package={}),Package["semantic:ui-loader"]={}}(),function(){"undefined"==typeof Package&&(Package={}),Package["semantic:ui-menu"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.modal=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("body"),u=r.selector||"",d=(new Date).getTime(),m=[],f=arguments[0],g="string"==typeof f,p=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,h,b,y,x,w,C,k,T,S=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),A=S.selector,E=S.className,P=S.namespace,F=S.error,R="."+P,D="module-"+P,O=e(this),z=e(S.context),q=O.find(A.close),j=this,I=O.data(D);T={initialize:function(){T.verbose("Initializing dimmer",z),T.create.id(),T.create.dimmer(),T.refreshModals(),T.verbose("Attaching close events",q),T.bind.events(),T.observeChanges(),T.instantiate()},instantiate:function(){T.verbose("Storing instance of modal"),I=T,O.data(D,I)},create:{dimmer:function(){var t={debug:S.debug,dimmerName:"modals",duration:{show:S.duration,hide:S.duration}},n=e.extend(!0,t,S.dimmerSettings);return e.fn.dimmer===i?void T.error(F.dimmer):(T.debug("Creating dimmer with settings",n),y=z.dimmer(n),S.detachable&&(T.verbose("Modal is detachable, moving content into dimmer"),y.dimmer("add content",O)),void(x=y.dimmer("get dimmer")))},id:function(){T.verbose("Creating unique id for element"),C=T.get.uniqueID(),w="."+C}},destroy:function(){T.verbose("Destroying previous modal"),O.removeData(D).off(R),s.off(w),q.off(R),z.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&(k=new MutationObserver(function(){T.debug("DOM tree modified, refreshing"),T.refresh()}),k.observe(j,{childList:!0,subtree:!0}),T.debug("Setting up mutation observer",k))},refresh:function(){T.remove.scrolling(),T.cacheSizes(),T.set.screenHeight(),T.set.type(),T.set.position()},refreshModals:function(){h=O.siblings(A.modal),r=h.add(O)},attachEvents:function(t,n){var i=e(t);n=e.isFunction(T[n])?T[n]:T.toggle,i.length>0?(T.debug("Attaching modal events to element",t,n),i.off(R).on("click"+R,n)):T.error(F.notFound,t)},bind:{events:function(){q.on("click"+R,T.event.close),s.on("resize"+w,T.event.resize)}},get:{uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{close:function(){T.verbose("Closing element pressed"),e(this).is(A.approve)?S.onApprove.call(j)!==!1?T.hide():T.verbose("Approve callback returned false cancelling hide"):e(this).is(A.deny)?S.onDeny.call(j)!==!1?T.hide():T.verbose("Deny callback returned false cancelling hide"):T.hide()},click:function(t){0===e(t.target).closest(O).length&&(T.debug("Dimmer clicked, hiding all modals"),T.is.active()&&(T.remove.clickaway(),S.allowMultiple?T.hide():T.hideAll()))},debounce:function(e,t){clearTimeout(T.timer),T.timer=setTimeout(e,t)},keyboard:function(e){var t=e.which,n=27;t==n&&(S.closable?(T.debug("Escape key pressed hiding modal"),T.hide()):T.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&v(T.refresh)}},toggle:function(){T.is.active()||T.is.animating()?T.hide():T.show()},show:function(t){t=e.isFunction(t)?t:function(){},T.refreshModals(),T.showModal(t)},hide:function(t){t=e.isFunction(t)?t:function(){},T.refreshModals(),T.hideModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},T.is.animating()||!T.is.active()?(T.showDimmer(),T.cacheSizes(),T.set.position(),T.set.screenHeight(),T.set.type(),T.set.clickaway(),!S.allowMultiple&&h.filter(":visible").length>0?(T.debug("Other modals visible, queueing show animation"),T.hideOthers(T.showModal)):(S.onShow.call(j),S.transition&&e.fn.transition!==i&&O.transition("is supported")?(T.debug("Showing modal with css animations"),O.transition({debug:S.debug,animation:S.transition+" in",queue:S.queue,duration:S.duration,useFailSafe:!0,onComplete:function(){S.onVisible.apply(j),T.add.keyboardShortcuts(),T.save.focus(),T.set.active(),T.set.autofocus(),t()}})):(T.debug("Showing modal with javascript"),O.fadeIn(S.duration,S.easing,function(){S.onVisible.apply(j),T.add.keyboardShortcuts(),T.save.focus(),T.set.active(),t()})))):T.debug("Modal is already visible")},hideModal:function(t){t=e.isFunction(t)?t:function(){},T.debug("Hiding modal"),S.onHide.call(j),(T.is.animating()||T.is.active())&&(S.transition&&e.fn.transition!==i&&O.transition("is supported")?(T.remove.active(),O.transition({debug:S.debug,animation:S.transition+" out",queue:S.queue,duration:S.duration,useFailSafe:!0,onStart:function(){T.othersActive()||T.hideDimmer(),T.remove.keyboardShortcuts()},onComplete:function(){S.onHidden.call(j),T.restore.focus(),t()}})):(T.remove.active(),T.othersActive()||T.hideDimmer(),T.remove.keyboardShortcuts(),O.fadeOut(S.duration,S.easing,function(){S.onHidden.call(j),T.restore.focus(),t()})))},showDimmer:function(){y.dimmer("is animating")||!y.dimmer("is active")?(T.debug("Showing dimmer"),y.dimmer("show")):T.debug("Dimmer already visible")},hideDimmer:function(){return y.dimmer("is animating")||y.dimmer("is active")?void y.dimmer("hide",function(){S.transition&&e.fn.transition!==i&&O.transition("is supported")&&(T.remove.clickaway(),T.remove.screenHeight())}):void T.debug("Dimmer is not visible cannot hide")},hideAll:function(t){t=e.isFunction(t)?t:function(){},r.is(":visible")&&(T.debug("Hiding all visible modals"),T.hideDimmer(),r.filter(":visible").modal("hide modal",t))},hideOthers:function(t){t=e.isFunction(t)?t:function(){},h.is(":visible")&&(T.debug("Hiding other modals",h),h.filter(":visible").modal("hide modal",t))},othersActive:function(){return h.filter("."+E.active).length>0},add:{keyboardShortcuts:function(){T.verbose("Adding keyboard shortcuts"),c.on("keyup"+R,T.event.keyboard)}},save:{focus:function(){b=e(n.activeElement).blur()}},restore:{focus:function(){b&&b.length>0&&b.focus()}},remove:{active:function(){O.removeClass(E.active)},clickaway:function(){S.closable&&x.off("click"+w)},screenHeight:function(){T.cache.height>T.cache.pageHeight&&(T.debug("Removing page height"),l.css("height",""))},keyboardShortcuts:function(){T.verbose("Removing keyboard shortcuts"),c.off("keyup"+R)},scrolling:function(){y.removeClass(E.scrolling),O.removeClass(E.scrolling)}},cacheSizes:function(){var o=O.outerHeight();(T.cache===i||0!==o)&&(T.cache={pageHeight:e(n).outerHeight(),height:o+S.offset,contextHeight:"body"==S.context?e(t).height():y.height()}),T.debug("Caching modal and container sizes",T.cache)},can:{fit:function(){return T.cache.height+2*S.padding<T.cache.contextHeight}},is:{active:function(){return O.hasClass(E.active)},animating:function(){return O.transition("is supported")?O.transition("is animating"):O.is(":visible")},scrolling:function(){return y.hasClass(E.scrolling)},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){if(S.autofocus){var e=O.find(":input:visible"),t=e.filter("[autofocus]"),n=t.length>0?t:e;n.first().focus()}},clickaway:function(){S.closable&&x.on("click"+w,T.event.click)},screenHeight:function(){T.can.fit()?l.css("height",""):(T.debug("Modal is taller than page content, resizing page height"),l.css("height",T.cache.height+S.padding/2))},active:function(){O.addClass(E.active)},scrolling:function(){y.addClass(E.scrolling),O.addClass(E.scrolling)},type:function(){T.can.fit()?(T.verbose("Modal fits on screen"),T.othersActive||T.remove.scrolling()):(T.verbose("Modal cannot fit on screen setting to scrolling"),T.set.scrolling())},position:function(){T.verbose("Centering modal on page",T.cache),O.css(T.can.fit()?{top:"",marginTop:-(T.cache.height/2)}:{marginTop:"",top:c.scrollTop()})}},setting:function(t,n){if(T.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,S,t);else{if(n===i)return S[t];S[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];T[t]=n}},debug:function(){S.debug&&(S.performance?T.performance.log(arguments):(T.debug=Function.prototype.bind.call(console.info,console,S.name+":"),T.debug.apply(console,arguments)))},verbose:function(){S.verbose&&S.debug&&(S.performance?T.performance.log(arguments):(T.verbose=Function.prototype.bind.call(console.info,console,S.name+":"),T.verbose.apply(console,arguments)))},error:function(){T.error=Function.prototype.bind.call(console.error,console,S.name+":"),T.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;S.performance&&(t=(new Date).getTime(),i=d||t,n=t-i,d=t,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:j,"Execution Time":n})),clearTimeout(T.performance.timer),T.performance.timer=setTimeout(T.performance.display,100)},display:function(){var t=S.name+":",n=0;d=!1,clearTimeout(T.performance.timer),e.each(m,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&m.length>0&&(console.groupCollapsed(t),console.table?console.table(m):e.each(m,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(t,n,o){var r,s,c,l=I;return n=n||p,o=j||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},g?(I===i&&T.initialize(),T.invoke(f)):(I!==i&&I.invoke("destroy"),T.initialize())}),a!==i?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",debug:!1,verbose:!0,performance:!0,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,dimmerSettings:{closable:!1,useCSS:!0},context:"body",queue:!1,duration:500,easing:"easeOutExpo",offset:0,transition:"scale",padding:50,onShow:function(){},onHide:function(){},onVisible:function(){},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:".close, .actions .button",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",scrolling:"scrolling"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-modal"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.progress=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),g=f.className,p=f.metadata,v=f.namespace,h=f.selector,b=f.error,y="."+v,x="module-"+v,w=e(this),C=e(this).find(h.bar),k=e(this).find(h.progress),T=e(this).find(h.label),S=this,A=w.data(x),E=!1;m={initialize:function(){m.debug("Initializing progress bar",f),a=m.get.transitionEnd(),m.read.metadata(),m.set.duration(),m.set.initials(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of progress",m),A=m,w.data(x,m)},destroy:function(){m.verbose("Destroying previous progress for",w),clearInterval(A.interval),m.remove.state(),w.removeData(x),A=i},reset:function(){m.set.percent(0)},complete:function(){(m.percent===i||m.percent<100)&&m.set.percent(100)},read:{metadata:function(){w.data(p.percent)&&(m.verbose("Current percent value set from metadata"),m.percent=w.data(p.percent)),w.data(p.total)&&(m.verbose("Total value set from metadata"),m.total=w.data(p.total)),w.data(p.value)&&(m.verbose("Current value set from metadata"),m.value=w.data(p.value))},currentValue:function(){return m.value!==i?m.value:!1}},increment:function(e){var t,n,i,o=m.total||!1;o?(n=m.value||0,e=e||1,i=n+e,t=m.total,m.debug("Incrementing value by",e,n,t),i>t&&(m.debug("Value cannot increment above total",t),i=t),m.set.progress(i)):(n=m.percent||0,e=e||m.get.randomValue(),i=n+e,t=100,m.debug("Incrementing percentage by",e,n),i>t&&(m.debug("Value cannot increment above 100 percent"),i=t),m.set.progress(i))},decrement:function(e){var t,n,i=m.total||!1,o=0;i?(t=m.value||0,e=e||1,n=t-e,m.debug("Decrementing value by",e,t)):(t=m.percent||0,e=e||m.get.randomValue(),n=t-e,m.debug("Decrementing percentage by",e,t)),o>n&&(m.debug("Value cannot decrement below 0"),n=0),m.set.progress(n)},get:{text:function(e){var t=m.value||0,n=m.total||0,i=m.is.visible()&&E?m.get.displayPercent():m.percent||0,o=m.total>0?n-t:100-i;return e=e||"",e=e.replace("{value}",t).replace("{total}",n).replace("{left}",o).replace("{percent}",i),m.debug("Adding variables to progress bar text",e),e},randomValue:function(){return m.debug("Generating random increment percentage"),Math.floor(Math.random()*f.random.max+f.random.min)},transitionEnd:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},displayPercent:function(){var e=C.width(),t=w.width(),n=parseInt(C.css("min-width"),10),i=e>n?e/t*100:m.percent;return Math.round(0===f.precision?i:10*i*f.precision/(10*f.precision))},percent:function(){return m.percent||0},value:function(){return m.value||!1},total:function(){return m.total||!1}},is:{success:function(){return w.hasClass(g.success)},warning:function(){return w.hasClass(g.warning)},error:function(){return w.hasClass(g.error)},active:function(){return w.hasClass(g.active)},visible:function(){return w.is(":visible")}},remove:{state:function(){m.verbose("Removing stored state"),delete m.total,delete m.percent,delete m.value},active:function(){m.verbose("Removing active state"),w.removeClass(g.active)},success:function(){m.verbose("Removing success state"),w.removeClass(g.success)},warning:function(){m.verbose("Removing warning state"),w.removeClass(g.warning)},error:function(){m.verbose("Removing error state"),w.removeClass(g.error)}},set:{barWidth:function(e){e>100?m.error(b.tooHigh,e):0>e?m.error(b.tooLow,e):(C.css("width",e+"%"),w.attr("data-percent",parseInt(e,10)))},duration:function(e){e=e||f.duration,e="number"==typeof e?e+"ms":e,m.verbose("Setting progress bar transition duration",e),C.css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},initials:function(){f.total!==!1&&(m.verbose("Current total set in settings",f.total),m.total=f.total),f.value!==!1&&(m.verbose("Current value set in settings",f.value),m.value=f.value),f.percent!==!1&&(m.verbose("Current percent set in settings",f.percent),m.percent=f.percent),m.percent!==i?m.set.percent(m.percent):m.value!==i&&m.set.progress(m.value)},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e>0&&1>e&&(m.verbose("Module percentage passed as decimal, converting"),e=100*e),e=Math.round(0===f.precision?e:10*e*f.precision/(10*f.precision)),m.percent=e,m.total?m.value=Math.round(e/100*m.total):f.limitValues&&(m.value=m.value>100?100:m.value<0?0:m.value),m.set.barWidth(e),m.is.visible()&&m.set.labelInterval(),m.set.labels(),f.onChange.call(S,e,m.value,m.total)},labelInterval:function(){var e=function(){m.verbose("Bar finished animating, removing continuous label updates"),clearInterval(m.interval),E=!1,m.set.labels()};clearInterval(m.interval),C.one(a+y,e),m.timer=setTimeout(e,f.duration+100),E=!0,m.interval=setInterval(m.set.labels,f.framerate)},labels:function(){m.verbose("Setting both bar progress and outer label text"),m.set.barLabel(),m.set.state()},label:function(e){e=e||"",e&&(e=m.get.text(e),m.debug("Setting label to text",e),T.text(e))},state:function(e){e=e!==i?e:m.percent,100===e?!f.autoSuccess||m.is.warning()||m.is.error()?(m.verbose("Reached 100% removing active state"),m.remove.active()):(m.set.success(),m.debug("Automatically triggering success at 100%")):e>0?(m.verbose("Adjusting active progress bar label",e),m.set.active()):(m.remove.active(),m.set.label(f.text.active))},barLabel:function(e){e!==i?k.text(m.get.text(e)):"ratio"==f.label&&m.total?(m.debug("Adding ratio to bar label"),k.text(m.get.text(f.text.ratio))):"percent"==f.label&&(m.debug("Adding percentage to bar label"),k.text(m.get.text(f.text.percent)))},active:function(e){e=e||f.text.active,m.debug("Setting active state"),f.showActivity&&!m.is.active()&&w.addClass(g.active),m.remove.warning(),m.remove.error(),m.remove.success(),e&&m.set.label(e),f.onActive.call(S,m.value,m.total)},success:function(e){e=e||f.text.success,m.debug("Setting success state"),w.addClass(g.success),m.remove.active(),m.remove.warning(),m.remove.error(),m.complete(),e&&m.set.label(e),f.onSuccess.call(S,m.total)},warning:function(e){e=e||f.text.warning,m.debug("Setting warning state"),w.addClass(g.warning),m.remove.active(),m.remove.success(),m.remove.error(),m.complete(),e&&m.set.label(e),f.onWarning.call(S,m.value,m.total)},error:function(e){e=e||f.text.error,m.debug("Setting error state"),w.addClass(g.error),m.remove.active(),m.remove.success(),m.remove.warning(),m.complete(),e&&m.set.label(e),f.onError.call(S,m.value,m.total)},total:function(e){m.total=e},progress:function(e){var t,n="string"==typeof e?""!==e.replace(/[^\d.]/g,"")?+e.replace(/[^\d.]/g,""):!1:e;n===!1&&m.error(b.nonNumeric,e),m.total?(m.value=n,t=n/m.total*100,m.debug("Calculating percent complete from total",t),m.set.percent(t)):(t=n,m.debug("Setting value to exact percentage value",t),m.set.percent(t))}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){f.debug&&(f.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,f.name+":"),m.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),m.verbose.apply(console,arguments)))},error:function(){m.error=Function.prototype.bind.call(console.error,console,f.name+":"),m.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,100)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=A;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(m.error(b.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(A===i&&m.initialize(),m.invoke(l)):(A!==i&&A.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.progress.settings={name:"Progress",namespace:"progress",debug:!1,verbose:!0,performance:!0,random:{min:2,max:5},duration:300,autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:1,framerate:1e3/30,percent:!1,total:!1,value:!1,onChange:function(){},onSuccess:function(){},onActive:function(){},onError:function(){},onWarning:function(){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-progress"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.rating=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return o.each(function(){var d,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),f=m.namespace,g=m.className,p=m.metadata,v=m.selector,h=(m.error,"."+f),b="module-"+f,y=this,x=e(this).data(b),w=e(this),C=w.find(v.icon);d={initialize:function(){d.verbose("Initializing rating module",m),0===C.length&&d.setup.layout(),m.interactive?d.enable():d.disable(),m.initialRating&&(d.debug("Setting initial rating"),d.setRating(m.initialRating)),w.data(p.rating)&&(d.debug("Rating found in metadata"),d.setRating(w.data(p.rating))),d.instantiate()},instantiate:function(){d.verbose("Instantiating module",m),x=d,w.data(b,d)},destroy:function(){d.verbose("Destroying previous instance",x),w.removeData(b),C.off(h)},refresh:function(){C=w.find(v.icon)},setup:{layout:function(){var t=w.data(p.maxRating)||m.maxRating;d.debug("Generating icon html dynamically"),w.html(e.fn.rating.settings.templates.icon(t)),d.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(g.selected),w.addClass(g.selected),t.addClass(g.selected).prevAll().addClass(g.selected)},mouseleave:function(){w.removeClass(g.selected),C.removeClass(g.selected)},click:function(){var t=e(this),n=d.getRating(),i=C.index(t)+1,o="auto"==m.clearable?1===C.length:m.clearable;o&&n==i?d.clearRating():d.setRating(i)}},clearRating:function(){d.debug("Clearing current rating"),d.setRating(0)},getRating:function(){var e=C.filter("."+g.active).length;return d.verbose("Current rating retrieved",e),e},enable:function(){d.debug("Setting rating to interactive mode"),C.on("mouseenter"+h,d.event.mouseenter).on("mouseleave"+h,d.event.mouseleave).on("click"+h,d.event.click),w.removeClass(g.disabled)},disable:function(){d.debug("Setting rating to read-only mode"),C.off(h),w.addClass(g.disabled)},setRating:function(e){var t=e-1>=0?e-1:0,n=C.eq(t);w.removeClass(g.selected),C.removeClass(g.selected).removeClass(g.active),e>0&&(d.verbose("Setting current rating to",e),n.prevAll().andSelf().addClass(g.active)),m.onRate.call(y,e)},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(n===i)return d[t];d[t]=n}},debug:function(){m.debug&&(m.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,m.name+":"),d.debug.apply(console,arguments)))},verbose:function(){m.verbose&&m.debug&&(m.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,m.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;m.performance&&(t=(new Date).getTime(),i=r||t,n=t-i,r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,100)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,c,l=x;return o=o||u,a=y||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,o):s!==i&&(c=s),e.isArray(n)?n.push(c):n!==i?n=[n,c]:c!==i&&(n=c),s
}},l?(x===i&&d.initialize(),d.invoke(c)):(x!==i&&x.invoke("destroy"),d.initialize())}),n!==i?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",debug:!1,verbose:!0,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",onRate:function(){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";e>=t;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-rating"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.search=function(o){var a,r=e(this),s=r.selector||"",c=(new Date).getTime(),l=[],u=arguments[0],d="string"==typeof u,m=[].slice.call(arguments,1);return e(this).each(function(){var f,g=e.extend(!0,{},e.fn.search.settings,o),p=g.className,v=g.metadata,h=g.regExp,b=g.selector,y=g.error,x=g.namespace,w="."+x,C=x+"-module",k=e(this),T=k.find(b.prompt),S=k.find(b.searchButton),A=k.find(b.results),E=(k.find(b.result),k.find(b.category),this),P=k.data(C);f={initialize:function(){f.verbose("Initializing module");var e=T[0],t=e!==i&&e.oninput!==i?"input":e!==i&&e.onpropertychange!==i?"propertychange":"keyup";g.automatic&&T.on(t+w,f.throttle),T.on("focus"+w,f.event.focus).on("blur"+w,f.event.blur).on("keydown"+w,f.handleKeyboard),S.on("click"+w,f.query),A.on("mousedown"+w,f.event.result.mousedown).on("mouseup"+w,f.event.result.mouseup).on("click"+w,b.result,f.event.result.click),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),P=f,k.data(C,f)},destroy:function(){f.verbose("Destroying instance"),k.removeData(C),T.off(w),S.off(w),A.off(w)},event:{focus:function(){f.set.focus(),clearTimeout(f.timer),f.throttle(),f.has.minimumCharacters()&&f.showResults()},blur:function(){var e=n.activeElement===this;e||f.resultsClicked||(f.cancel.query(),f.remove.focus(),f.timer=setTimeout(f.hideResults,g.hideDelay))},result:{mousedown:function(){f.resultsClicked=!0},mouseup:function(){f.resultsClicked=!1},click:function(n){f.debug("Search result selected");var i=e(this),o=i.find(b.title).eq(0),a=i.find("a[href]").eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,c=(o.html(),o.length>0?o.text():!1),l=f.get.results(),u=f.get.result(c,l);return e.isFunction(g.onSelect)&&g.onSelect.call(E,u,l)===!1?void f.debug("Custom onSelect callback cancelled default select action"):(f.hideResults(),c&&f.set.value(c),void(r&&(f.verbose("Opening search link found in result",a),"_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)))}}},handleKeyboard:function(e){var t,n=k.find(b.result),i=k.find(b.category),o=n.index(n.filter("."+p.active)),a=n.length,r=e.which,s={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40};if(r==s.escape&&(f.verbose("Escape key pressed, blurring search field"),T.trigger("blur")),f.is.visible())if(r==s.enter){if(f.verbose("Enter key pressed, selecting active result"),n.filter("."+p.active).length>0)return f.event.result.click.call(n.filter("."+p.active),e),e.preventDefault(),!1}else r==s.upArrow?(f.verbose("Up key pressed, changing active result"),t=0>o-1?o:o-1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault()):r==s.downArrow&&(f.verbose("Down key pressed, changing active result"),t=o+1>=a?o:o+1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault());else r==s.enter&&(f.verbose("Enter key pressed, executing query"),f.query(),f.set.buttonPressed(),T.one("keyup",f.remove.buttonFocus))},setup:{api:function(){var e={on:!1,action:"search",onFailure:f.error};f.verbose("First request, initializing API"),k.api(e)}},can:{useAPI:function(){return e.fn.api!==i},transition:function(){return g.transition&&e.fn.transition!==i&&k.transition("is supported")}},is:{empty:function(){return""===A.html()},visible:function(){return A.filter(":visible").length>0},focused:function(){return T.filter(":focus").length>0}},get:{value:function(){return T.val()},results:function(){var e=k.data(v.results);return e},result:function(t,n){var i=!1;return t=t||f.get.value(),n=n||f.get.results(),"category"===g.type?(f.debug("Finding result that matches",t),e.each(n,function(n,o){return e.isArray(o.results)&&(i=f.search.object(t,o.results)[0],i.length>0)?!0:void 0})):(f.debug("Finding result in results object",t),i=f.search.object(t,n)[0]),i}},set:{focus:function(){k.addClass(p.focus)},loading:function(){k.addClass(p.loading)},value:function(e){f.verbose("Setting search input value",e),T.val(e),f.query()},buttonPressed:function(){S.addClass(p.pressed)}},remove:{loading:function(){k.removeClass(p.loading)},focus:function(){k.removeClass(p.focus)},buttonPressed:function(){S.removeClass(p.pressed)}},query:function(){var t=f.get.value(),n=f.read.cachedHTML(t);n?(f.debug("Reading result for "+t+" from cache"),f.addResults(n)):(f.debug("Querying for "+t),e.isPlainObject(g.source)||e.isArray(g.source)?f.search.local(t):f.can.useAPI()?g.apiSettings?(f.debug("Searching with specified API settings",g.apiSettings),f.search.remote(t)):e.api.settings.api.search!==i&&(f.debug("Searching with default search API endpoint"),f.search.remote(t)):f.error(y.source),g.onSearchQuery.call(E,t))},search:{local:function(e){var t,n=f.search.object(e,g.content);f.set.loading(),f.save.results(n),f.debug("Returned local search results",n),t=f.generateResults({results:n}),f.remove.loading(),f.write.cachedHTML(e,t),f.addResults(t)},remote:function(t){var n={onSuccess:function(e){f.parse.response.call(E,e,t)},urlData:{query:t}};k.api("get request")||f.setup.api(),e.extend(!0,n,g.apiSettings),f.debug("Executing search",n),f.cancel.query(),k.api("setting",n).api("query")},object:function(t,n){var o=[],a=[],r=e.isArray(g.searchFields)?g.searchFields:[g.searchFields],s=new RegExp(h.exact+t,"i"),c=new RegExp(t,"i");return n=n||g.source,n===i?(f.error(y.source),[]):(e.each(r,function(t,i){e.each(n,function(t,n){var r="string"==typeof n[i],l=-1==e.inArray(n,o)&&-1==e.inArray(n,a);r&&l&&(n[i].match(s)?o.push(n):g.searchFullText&&n[i].match(c)&&a.push(n))})}),e.merge(o,a))}},parse:{response:function(e,t){var n=f.generateResults(e);f.verbose("Parsing server response",e),e!==i&&(t&&(f.write.cachedHTML(t,n),e.results!==i&&f.save.results(e.results)),f.addResults(n))}},throttle:function(){clearTimeout(f.timer),f.has.minimumCharacters()?f.timer=setTimeout(f.query,g.searchDelay):f.hideResults()},cancel:{query:function(){f.can.useAPI()&&k.api("abort")}},has:{minimumCharacters:function(){var e=f.get.value(),t=e.length;return t>=g.minCharacters}},read:{cachedHTML:function(e){var t=k.data(v.cache);return g.cache?(f.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==i?t[e]:!1):!1}},save:{results:function(e){f.verbose("Saving current search results to metadata",e),k.data(v.results,e)}},write:{cachedHTML:function(e,t){var n=k.data(v.cache)!==i?k.data(v.cache):{};g.cache&&(f.verbose("Writing generated html to cache",e,t),n[e]=t,k.data(v.cache,n))}},addResults:function(t){return e.isFunction(g.onResultsAdd)&&g.onResultsAdd.call(A,t)===!1?(f.debug("onResultsAdd callback cancelled default action"),!1):(A.html(t),void f.showResults())},showResults:function(){f.is.visible()||!f.is.focused()||f.is.empty()||(f.can.transition()?(f.debug("Showing results with css animations"),A.transition({animation:g.transition+" in",duration:g.duration,queue:!0})):(f.debug("Showing results with javascript"),A.stop().fadeIn(g.duration,g.easing)),g.onResultsOpen.call(A))},hideResults:function(){f.is.visible()&&(f.can.transition()?(f.debug("Hiding results with css animations"),A.transition({animation:g.transition+" out",duration:g.duration,queue:!0})):(f.debug("Hiding results with javascript"),A.stop().fadeOut(g.duration,g.easing)),g.onResultsClose.call(A))},generateResults:function(t){f.debug("Generating html from response",t);var n=g.templates[g.type],i=e.isPlainObject(t.results)&&!e.isEmptyObject(t.results),o=e.isArray(t.results)&&t.results.length>0,a="";return i||o?(g.maxResults>0&&(i?"standard"==g.type&&f.error(y.maxResults):t.results=t.results.slice(0,g.maxResults)),e.isFunction(n)?a=n(t):f.error(y.noTemplate,!1)):a=f.displayMessage(y.noResults,"empty"),g.onResults.call(E,t),a},displayMessage:function(e,t){return t=t||"standard",f.debug("Displaying message",e,t),f.addResults(g.templates.message(e,t)),g.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=c||t,n=t-i,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,100)},display:function(){var t=g.name+":",n=0;c=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,c,l=P;return n=n||m,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},d?(P===i&&f.initialize(),f.invoke(u)):(P!==i&&P.invoke("destroy"),f.initialize())}),a!==i?a:this},e.fn.search.settings={name:"Search Module",namespace:"search",debug:!1,verbose:!0,performance:!0,type:"standard",minCharacters:1,apiSettings:!1,source:!1,searchFields:["title","description"],searchFullText:!0,automatic:"true",hideDelay:0,searchDelay:100,maxResults:7,cache:!0,transition:"scale",duration:300,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(){},onResults:function(){},onResultsOpen:function(){},onResultsClose:function(){},className:{active:"active",empty:"empty",focus:"focus",loading:"loading",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noTemplate:"A valid template name was not specified.",serverError:"There was an issue with querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results"},regExp:{exact:"(?:s|^)"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t=/[&<>"'`]/g,n=/[&<>"'`]/,i={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=function(e){return i[e]};return n.test(e)?e.replace(t,o):e},message:function(e,t){var n="";return e!==i&&t!==i&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t){var n="",o=e.fn.search.settings.templates.escape;return t.results!==i?(e.each(t.results,function(t,a){a.results!==i&&a.results.length>0&&(n+='<div class="category"><div class="name">'+a.name+"</div>",e.each(a.results,function(e,t){n+='<div class="result">',t.url&&(n+='<a href="'+t.url+'"></a>'),t.image!==i&&(t.image=o(t.image),n+='<div class="image"> <img src="'+t.image+'" alt=""></div>'),n+='<div class="content">',t.price!==i&&(t.price=o(t.price),n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(t.title=o(t.title),n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div></div>"}),n+="</div>")}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1},standard:function(t){var n="";return t.results!==i?(e.each(t.results,function(e,t){n+=t.url?'<a class="result" href="'+t.url+'">':'<a class="result">',t.image!==i&&(n+='<div class="image"> <img src="'+t.image+'"></div>'),n+='<div class="content">',t.price!==i&&(n+='<div class="price">'+t.price+"</div>"),t.title!==i&&(n+='<div class="title">'+t.title+"</div>"),t.description!==i&&(n+='<div class="description">'+t.description+"</div>"),n+="</div>",n+="</a>"}),t.action&&(n+='<a href="'+t.action.url+'" class="action">'+t.action.text+"</a>"),n):!1}}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-search"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.shape=function(o){var a,r=e(this),s=(e("body"),(new Date).getTime()),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1),m=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var t,f,g,p=r.selector||"",v=e.extend(!0,{},e.fn.shape.settings,o),h=v.namespace,b=v.selector,y=v.error,x=v.className,w="."+h,C="module-"+h,k=e(this),T=k.find(b.sides),S=k.find(b.side),A=!1,E=this,P=k.data(C);g={initialize:function(){g.verbose("Initializing module for",E),g.set.defaultSide(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),P=g,k.data(C,P)},destroy:function(){g.verbose("Destroying previous module for",E),k.removeData(C).off(w)},refresh:function(){g.verbose("Refreshing selector cache for",E),k=e(E),T=e(this).find(b.shape),S=e(this).find(b.side)},repaint:function(){g.verbose("Forcing repaint event");{var e=T.get(0)||n.createElement("div");e.offsetWidth}},animate:function(e,n){g.verbose("Animating box with properties",e),n=n||function(e){g.verbose("Executing animation callback"),e!==i&&e.stopPropagation(),g.reset(),g.set.active()},v.beforeChange.call(f.get()),g.get.transitionEvent()?(g.verbose("Starting CSS animation"),k.addClass(x.animating),T.css(e).one(g.get.transitionEvent(),n),g.set.duration(v.duration),m(function(){k.addClass(x.animating),t.addClass(x.hidden)})):n()},queue:function(e){g.debug("Queueing animation of",e),T.one(g.get.transitionEvent(),function(){g.debug("Executing queued animation"),setTimeout(function(){k.shape(e)},0)})},reset:function(){g.verbose("Animating states reset"),k.removeClass(x.animating).attr("style","").removeAttr("style"),T.attr("style","").removeAttr("style"),S.attr("style","").removeAttr("style").removeClass(x.hidden),f.removeClass(x.animating).attr("style","").removeAttr("style")},is:{complete:function(){return S.filter("."+x.active)[0]==f[0]},animating:function(){return k.hasClass(x.animating)}},set:{defaultSide:function(){t=k.find("."+v.className.active),f=t.next(b.side).length>0?t.next(b.side):k.find(b.side).first(),A=!1,g.verbose("Active side set to",t),g.verbose("Next side set to",f)},duration:function(e){e=e||v.duration,e="number"==typeof e?e+"ms":e,g.verbose("Setting animation duration",e),T.add(S).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},stageSize:function(){var e=k.clone().addClass(x.loading),t=e.find("."+v.className.active),n=A?e.find(b.side).eq(A):t.next(b.side).length>0?t.next(b.side):e.find(b.side).first(),i={};t.removeClass(x.active),n.addClass(x.active),e.insertAfter(k),i={width:n.outerWidth(),height:n.outerHeight()},e.remove(),k.css(i),g.verbose("Resizing stage to fit new content",i)},nextSide:function(e){A=e,f=S.filter(e),A=S.index(f),0===f.length&&(g.set.defaultSide(),g.error(y.side)),g.verbose("Next side manually set to",f)},active:function(){g.verbose("Setting new side to active",f),S.removeClass(x.active),f.addClass(x.active),v.onChange.call(f.get()),g.set.defaultSide()}},flip:{up:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip up"):(g.debug("Flipping up",f),g.set.stageSize(),g.stage.above(),g.animate(g.get.transform.up()))):void g.debug("Side already visible",f)},down:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip down"):(g.debug("Flipping down",f),g.set.stageSize(),g.stage.below(),g.animate(g.get.transform.down()))):void g.debug("Side already visible",f)},left:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip left"):(g.debug("Flipping left",f),g.set.stageSize(),g.stage.left(),g.animate(g.get.transform.left()))):void g.debug("Side already visible",f)},right:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip right"):(g.debug("Flipping right",f),g.set.stageSize(),g.stage.right(),g.animate(g.get.transform.right()))):void g.debug("Side already visible",f)},over:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip over"):(g.debug("Flipping over",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.over()))):void g.debug("Side already visible",f)},back:function(){return!g.is.complete()||g.is.animating()||v.allowRepeats?void(g.is.animating()?g.queue("flip back"):(g.debug("Flipping back",f),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.back()))):void g.debug("Side already visible",f)}},get:{transform:{up:function(){var e={y:-((t.outerHeight()-f.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(-90deg)"}},down:function(){var e={y:-((t.outerHeight()-f.outerHeight())/2),z:-(t.outerHeight()/2)};return{transform:"translateY("+e.y+"px) translateZ("+e.z+"px) rotateX(90deg)"}},left:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(90deg)"}},right:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2),z:-(t.outerWidth()/2)};return{transform:"translateX("+e.x+"px) translateZ("+e.z+"px) rotateY(-90deg)"}},over:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(180deg)"}},back:function(){var e={x:-((t.outerWidth()-f.outerWidth())/2)};return{transform:"translateX("+e.x+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},nextSide:function(){return t.next(b.side).length>0?t.next(b.side):k.find(b.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight()-f.outerHeight())/2,depth:{active:f.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as above",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight()-f.outerHeight())/2,depth:{active:f.outerHeight()/2,next:t.outerHeight()/2}};g.verbose("Setting the initial animation position as below",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-90deg) translateZ("+e.depth.next+"px)"})},right:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as left",f,e),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(90deg) translateZ("+e.depth.next+"px)"})},behind:function(){var e={origin:(t.outerWidth()-f.outerWidth())/2,depth:{active:f.outerWidth()/2,next:t.outerWidth()/2}};g.verbose("Setting the initial animation position as behind",f,e),t.css({transform:"rotateY(0deg)"}),f.addClass(x.animating).css({display:"block",left:e.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){v.debug&&(v.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,v.name+":"),g.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,v.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;v.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",p&&(t+=" '"+p+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,c,l=P;return n=n||d,o=E||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},u?(P===i&&g.initialize(),g.invoke(l)):(P!==i&&P.invoke("destroy"),g.initialize())}),a!==i?a:this},e.fn.shape.settings={name:"Shape",debug:!1,verbose:!0,performance:!0,namespace:"shape",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:700,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-shape"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.sidebar=function(o){var a,r=e(this),s=e(t),c=e(n),l=e("html"),u=e("head"),d=r.selector||"",m=(new Date).getTime(),f=[],g=arguments[0],p="string"==typeof g,v=[].slice.call(arguments,1),h=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,y,x,w,C,k=e.isPlainObject(o)?e.extend(!0,{},e.fn.sidebar.settings,o):e.extend({},e.fn.sidebar.settings),T=k.selector,S=k.className,A=k.namespace,E=k.regExp,P=k.error,F="."+A,R="module-"+A,D=e(this),O=e(k.context),z=D.children(T.sidebar),q=O.children(T.fixed),j=O.children(T.pusher),I=this,N=D.data(R);C={initialize:function(){C.debug("Initializing sidebar",o),C.create.id(),w=C.get.transitionEvent(),("auto"==k.useLegacy&&C.is.legacy()||k.useLegacy===!0)&&(k.transition="overlay",k.useLegacy=!0),C.is.ios()&&C.set.ios(),k.delaySetup?h(C.setup.layout):C.setup.layout(),C.instantiate()},instantiate:function(){C.verbose("Storing instance of module",C),N=C,D.data(R,C)},create:{id:function(){C.verbose("Creating unique id for element"),y=C.get.uniqueID(),b="."+y}},destroy:function(){C.verbose("Destroying previous module for",D),C.remove.direction(),D.off(F).removeData(R),O.off(b),s.off(b),c.off(b)},event:{clickaway:function(e){var t=j.find(e.target).length>0||j.is(e.target),n=O.is(e.target);t&&(C.verbose("User clicked on dimmed page"),C.hide()),n&&(C.verbose("User clicked on dimmable context (scaled out page)"),C.hide())},touch:function(){},containScroll:function(){I.scrollTop<=0&&(I.scrollTop=1),I.scrollTop+I.offsetHeight>=I.scrollHeight&&(I.scrollTop=I.scrollHeight-I.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(T.sidebar).length&&t.preventDefault()}},bind:{clickaway:function(){C.verbose("Adding clickaway events to context",O),k.closable&&O.on("click"+b,C.event.clickaway).on("touchend"+b,C.event.clickaway)},scrollLock:function(){k.scrollLock&&(C.debug("Disabling page scroll"),s.on("DOMMouseScroll"+b,C.event.scroll)),C.verbose("Adding events to contain sidebar scroll"),c.on("touchmove"+b,C.event.touch),D.on("scroll"+F,C.event.containScroll)}},unbind:{clickaway:function(){C.verbose("Removing clickaway events from context",O),O.off(b)},scrollLock:function(){C.verbose("Removing scroll lock from page"),c.off(b),s.off(b),D.off("scroll"+F)}},add:{bodyCSS:function(){var t,n=D.outerWidth(),i=D.outerHeight(),o=C.get.direction(),a={left:n,right:-n,top:i,bottom:-i};C.is.rtl()&&(C.verbose("RTL detected, flipping widths"),a.left=-n,a.right=n),t='<style title="'+A+'">',"left"===o||"right"===o?(C.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+o+".sidebar ~ .fixed, .ui.visible."+o+".sidebar ~ .pusher {   -webkit-transform: translate3d("+a[o]+"px, 0, 0);           transform: translate3d("+a[o]+"px, 0, 0); }"):("top"===o||"bottom"==o)&&(t+=" .ui.visible."+o+".sidebar ~ .fixed, .ui.visible."+o+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+a[o]+"px, 0);           transform: translate3d(0, "+a[o]+"px, 0); }"),C.is.ie()&&("left"===o||"right"===o?(C.debug("Adding CSS rules for animation distance",n),t+=" body.pushable > .ui.visible."+o+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+a[o]+"px, 0, 0);           transform: translate3d("+a[o]+"px, 0, 0); }"):("top"===o||"bottom"==o)&&(t+=" body.pushable > .ui.visible."+o+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+a[o]+"px, 0);           transform: translate3d(0, "+a[o]+"px, 0); }"),t+=" body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"),t+="</style>",u.append(t),r=e("style[title="+A+"]"),C.debug("Adding sizing css to head",r)}},refresh:function(){C.verbose("Refreshing selector cache"),O=e(k.context),z=O.children(T.sidebar),j=O.children(T.pusher),q=O.children(T.fixed)},refreshSidebars:function(){C.verbose("Refreshing other sidebars"),z=O.children(T.sidebar)},repaint:function(){C.verbose("Forcing repaint event"),I.style.display="none",I.offsetHeight,I.scrollTop=I.scrollTop,I.style.display=""},setup:{layout:function(){0===O.children(T.pusher).length&&(C.debug("Adding wrapper element for sidebar"),C.error(P.pusher),j=e('<div class="pusher" />'),O.children().not(T.omitted).not(z).wrapAll(j),C.refresh()),(0===D.nextAll(T.pusher).length||D.nextAll(T.pusher)[0]!==j[0])&&(C.debug("Moved sidebar to correct parent element"),C.error(P.movedSidebar,I),D.detach().prependTo(O),C.refresh()),C.set.pushable(),C.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(C[n])?C[n]:C.toggle,i.length>0?(C.debug("Attaching sidebar events to element",t,n),i.on("click"+F,n)):C.error(P.notFound,t)},show:function(t){var n=k.useLegacy===!0?C.legacyPushPage:C.pushPage;if(t=e.isFunction(t)?t:function(){},C.is.hidden()){if(C.refreshSidebars(),k.overlay&&(C.error(P.overlay),k.transition="overlay"),C.refresh(),C.othersActive())if(C.debug("Other sidebars currently visible"),k.exclusive){if("overlay"!=k.transition)return void C.hideOthers(C.show);C.hideOthers()}else k.transition="overlay";n(function(){t.call(I),k.onShow.call(I)}),k.onChange.call(I),k.onVisible.call(I)}else C.debug("Sidebar is already visible")},hide:function(t){var n=k.useLegacy===!0?C.legacyPullPage:C.pullPage;t=e.isFunction(t)?t:function(){},(C.is.visible()||C.is.animating())&&(C.debug("Hiding sidebar",t),C.refreshSidebars(),n(function(){t.call(I),k.onHidden.call(I)}),k.onChange.call(I),k.onHide.call(I))},othersAnimating:function(){return z.not(D).filter("."+S.animating).length>0},othersVisible:function(){return z.not(D).filter("."+S.visible).length>0},othersActive:function(){return C.othersVisible()||C.othersAnimating()},hideOthers:function(e){var t=z.not(D).filter("."+S.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){i++,i==n&&e()})},toggle:function(){C.verbose("Determining toggled direction"),C.is.hidden()?C.show():C.hide()},pushPage:function(t){var n,i,o=C.get.transition(),a="safe"==o?O:"overlay"===o||C.othersActive()?D:j;t=e.isFunction(t)?t:function(){},"scale down"==k.transition&&C.scrollToTop(),C.set.transition(o),C.repaint(),n=function(){C.bind.clickaway(),C.add.bodyCSS(),C.set.animating(),C.set.visible(),C.othersVisible()||k.dimPage&&j.addClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(w+b,i),C.remove.animating(),C.bind.scrollLock(),t.call(I))},a.off(w+b),a.on(w+b,i),h(n)},pullPage:function(t){var n,i,o=C.get.transition(),a="safe"==o?O:"overlay"==o||C.othersActive()?D:j;t=e.isFunction(t)?t:function(){},C.verbose("Removing context push state",C.get.direction()),C.set.transition(o),C.unbind.clickaway(),C.unbind.scrollLock(),n=function(){C.set.animating(),C.remove.visible(),k.dimPage&&!C.othersVisible()&&j.removeClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(w+b,i),C.remove.animating(),C.remove.transition(),C.remove.bodyCSS(),("scale down"==o||k.returnScroll&&C.is.mobile())&&C.scrollBack(),t.call(I))},a.off(w+b),a.on(w+b,i),h(n)},legacyPushPage:function(t){var n=D.width(),i=C.get.direction(),o={};n=n||D.width(),t=e.isFunction(t)?t:function(){},o[i]=n,C.debug("Using javascript to push context",o),C.set.visible(),C.set.transition(),C.set.animating(),k.dimPage&&j.addClass(S.dimmed),O.css("position","relative").animate(o,k.duration,k.easing,function(){C.remove.animating(),C.bind.clickaway(),t.call(I)})},legacyPullPage:function(t){var n=0,i=C.get.direction(),o={};n=n||D.width(),t=e.isFunction(t)?t:function(){},o[i]="0px",C.debug("Using javascript to pull context",o),C.unbind.clickaway(),C.set.animating(),C.remove.visible(),k.dimPage&&!C.othersActive()&&j.removeClass(S.dimmed),O.css("position","relative").animate(o,k.duration,k.easing,function(){C.remove.animating(),t.call(I)})},scrollToTop:function(){C.verbose("Scrolling to top of page to avoid animation issues"),x=e(t).scrollTop(),D.scrollTop(0),t.scrollTo(0,0)
},scrollBack:function(){C.verbose("Scrolling back to original page position"),t.scrollTo(0,x)},set:{ios:function(){l.addClass(S.ios)},pushed:function(){O.addClass(S.pushed)},pushable:function(){O.addClass(S.pushable)},active:function(){D.addClass(S.active)},animating:function(){D.addClass(S.animating)},transition:function(e){e=e||C.get.transition(),D.addClass(e)},direction:function(e){e=e||C.get.direction(),D.addClass(S[e])},visible:function(){D.addClass(S.visible)},overlay:function(){D.addClass(S.overlay)}},remove:{bodyCSS:function(){C.debug("Removing body css styles",r),r&&r.length>0&&r.remove()},pushed:function(){O.removeClass(S.pushed)},pushable:function(){O.removeClass(S.pushable)},active:function(){D.removeClass(S.active)},animating:function(){D.removeClass(S.animating)},transition:function(e){e=e||C.get.transition(),D.removeClass(e)},direction:function(e){e=e||C.get.direction(),D.removeClass(S[e])},visible:function(){D.removeClass(S.visible)},overlay:function(){D.removeClass(S.overlay)}},get:{direction:function(){return D.hasClass(S.top)?S.top:D.hasClass(S.right)?S.right:D.hasClass(S.bottom)?S.bottom:S.left},transition:function(){var e,t=C.get.direction();return e=C.is.mobile()?"auto"==k.mobileTransition?k.defaultTransition.mobile[t]:k.mobileTransition:"auto"==k.transition?k.defaultTransition.computer[t]:k.transition,C.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},uniqueID:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},is:{ie:function(){var e=!t.ActiveXObject&&"ActiveXObject"in t,n="ActiveXObject"in t;return e||n},legacy:function(){var e,o=n.createElement("div"),a={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};n.body.insertBefore(o,null);for(var r in a)o.style[r]!==i&&(o.style[r]="translate3d(1px,1px,1px)",e=t.getComputedStyle(o).getPropertyValue(a[r]));return n.body.removeChild(o),!(e!==i&&e.length>0&&"none"!==e)},ios:function(){var e=navigator.userAgent,t=e.match(E.ios);return t?(C.verbose("Browser was found to be iOS",e),!0):!1},mobile:function(){var e=navigator.userAgent,t=e.match(E.mobile);return t?(C.verbose("Browser was found to be mobile",e),!0):(C.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!C.is.visible()},visible:function(){return D.hasClass(S.visible)},open:function(){return C.is.visible()},closed:function(){return C.is.hidden()},vertical:function(){return D.hasClass(S.top)},animating:function(){return O.hasClass(S.animating)},rtl:function(){return"rtl"==D.css("direction")}},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){k.debug&&(k.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,k.name+":"),C.debug.apply(console,arguments)))},verbose:function(){k.verbose&&k.debug&&(k.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),C.verbose.apply(console,arguments)))},error:function(){C.error=Function.prototype.bind.call(console.error,console,k.name+":"),C.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;k.performance&&(t=(new Date).getTime(),i=m||t,n=t-i,m=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:I,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,100)},display:function(){var t=k.name+":",n=0;m=!1,clearTimeout(C.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",d&&(t+=" '"+d+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,c,l=N;return n=n||v,o=I||o,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):(C.error(P.method,t),!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,n):s!==i&&(c=s),e.isArray(a)?a.push(c):a!==i?a=[a,c]:c!==i&&(a=c),s}},p?(N===i&&C.initialize(),C.invoke(g)):(N!==i&&C.invoke("destroy"),C.initialize())}),a!==i?a:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",debug:!1,verbose:!0,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,useLegacy:"auto",duration:500,easing:"easeInOutQuint",onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}},e.extend(e.easing,{easeInOutQuint:function(e,t,n,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+n:i/2*((t-=2)*t*t*t*t+2)+n}})}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-sidebar"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.sticky=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,d=[].slice.call(arguments,1);return a.each(function(){var a,m,f,g=e.extend(!0,{},e.fn.sticky.settings,n),p=g.className,v=g.namespace,h=g.error,b="."+v,y="module-"+v,x=e(this),w=e(t),C=x.offsetParent(),k=e(g.scrollContext),T=(x.selector||"",x.data(y)),S=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},A=this;f={initialize:function(){return a=g.context?e(g.context):C,0===a.length?void f.error(h.invalidContext,g.context,x):(f.verbose("Initializing sticky",g,C),f.save.positions(),f.is.hidden()&&f.error(h.visible,x),f.cache.element.height>f.cache.context.height?(f.reset(),void f.error(h.elementSize,x)):(w.on("resize"+b,f.event.resize),k.on("scroll"+b,f.event.scroll),f.observeChanges(),void f.instantiate()))},instantiate:function(){f.verbose("Storing instance of module",f),T=f,x.data(y,f)},destroy:function(){f.verbose("Destroying previous module"),f.reset(),m&&m.disconnect(),w.off("resize"+b,f.event.resize),k.off("scroll"+b,f.event.scroll),x.removeData(y)},observeChanges:function(){var e=a[0];g.observeChanges&&"MutationObserver"in t&&(m=new MutationObserver(function(){clearTimeout(f.timer),f.timer=setTimeout(function(){f.verbose("DOM tree modified, updating sticky menu"),f.refresh()},200)}),m.observe(A,{childList:!0,subtree:!0}),m.observe(e,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",m))},event:{resize:function(){S(function(){f.refresh(),f.stick()})},scroll:function(){S(function(){f.stick(),g.onScroll.call(A)})}},refresh:function(e){f.reset(),e&&(C=x.offsetParent()),f.save.positions(),f.stick(),g.onReposition.call(A)},supports:{sticky:function(){{var t=e("<div/>");t.get()}return t.addClass(p.supported),t.css("position").match("sticky")}},save:{scroll:function(e){f.lastScroll=e},positions:function(){var e={height:w.height()},t={margin:{top:parseInt(x.css("margin-top"),10),bottom:parseInt(x.css("margin-bottom"),10)},offset:x.offset(),width:x.outerWidth(),height:x.outerHeight()},n={offset:a.offset(),height:a.outerHeight()};f.cache={fits:t.height<e.height,window:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},f.set.containerSize(),f.set.size(),f.stick(),f.debug("Caching element positions",f.cache)}},get:{direction:function(e){var t="down";return e=e||k.scrollTop(),f.lastScroll!==i&&(f.lastScroll<e?t="down":f.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||k.scrollTop(),f.lastScroll?e-f.lastScroll:0},currentElementScroll:function(){return f.is.top()?Math.abs(parseInt(x.css("top"),10))||0:Math.abs(parseInt(x.css("bottom"),10))||0},elementScroll:function(e){e=e||k.scrollTop();var t,n=f.cache.element,i=f.cache.window,o=f.get.scrollChange(e),a=n.height-i.height+g.offset,r=f.get.currentElementScroll(),s=r+o;return t=f.cache.fits||0>s?0:s>a?a:s}},remove:{offset:function(){x.css("margin-top","")}},set:{offset:function(){f.verbose("Setting offset on element",g.offset),x.css("margin-top",g.offset)},containerSize:function(){var e=C.get(0).tagName;"HTML"===e||"body"==e?C=x.offsetParent():(f.debug("Settings container size",f.cache.context.height),Math.abs(C.height()-f.cache.context.height)>5&&C.height(f.cache.context.height))},scroll:function(e){f.debug("Setting scroll on element",e),f.is.top()&&x.css("bottom","").css("top",-e),f.is.bottom()&&x.css("top","").css("bottom",e)},size:function(){0!==f.cache.element.height&&0!==f.cache.element.width&&x.css({width:f.cache.element.width,height:f.cache.element.height})}},is:{top:function(){return x.hasClass(p.top)},bottom:function(){return x.hasClass(p.bottom)},initialPosition:function(){return!f.is.fixed()&&!f.is.bound()},hidden:function(){return!x.is(":visible")},bound:function(){return x.hasClass(p.bound)},fixed:function(){return x.hasClass(p.fixed)}},stick:function(){var e=f.cache,t=e.fits,n=e.element,i=e.window,o=e.context,a=f.is.bottom()&&g.pushing?g.bottomOffset:g.offset,r={top:k.scrollTop()+a,bottom:k.scrollTop()+a+i.height},s=(f.get.direction(r.top),f.get.elementScroll(r.top)),c=!t,l=0!==n.height;f.save.scroll(r.top),l&&(f.is.initialPosition()?r.top>=n.top&&(f.debug("Element passed, fixing element to page"),f.fixTop()):f.is.fixed()?f.is.top()?r.top<n.top?(f.debug("Fixed element reached top of container"),f.setInitialPosition()):n.height+r.top-s>o.bottom?(f.debug("Fixed element reached bottom of container"),f.bindBottom()):c&&f.set.scroll(s):f.is.bottom()&&(r.bottom-n.height<n.top?(f.debug("Bottom fixed rail has reached top of container"),f.setInitialPosition()):r.bottom>o.bottom?(f.debug("Bottom fixed rail has reached bottom of container"),f.bindBottom()):c&&f.set.scroll(s)):f.is.bottom()&&(g.pushing?f.is.bound()&&r.bottom<o.bottom&&(f.debug("Fixing bottom attached element to bottom of browser."),f.fixBottom()):f.is.bound()&&r.top<o.bottom-n.height&&(f.debug("Fixing bottom attached element to top of browser."),f.fixTop())))},bindTop:function(){f.debug("Binding element to top of parent container"),f.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.bottom).addClass(p.bound).addClass(p.top),g.onTop.call(A),g.onUnstick.call(A)},bindBottom:function(){f.debug("Binding element to bottom of parent container"),f.remove.offset(),x.css("left","").css("top","").css("bottom","").removeClass(p.fixed).removeClass(p.top).addClass(p.bound).addClass(p.bottom),g.onBottom.call(A),g.onUnstick.call(A)},setInitialPosition:function(){f.unfix(),f.unbind()},fixTop:function(){f.debug("Fixing element to top of page"),f.set.offset(),x.css("left",f.cache.element.left).removeClass(p.bound).removeClass(p.bottom).addClass(p.fixed).addClass(p.top),g.onStick.call(A)},fixBottom:function(){f.debug("Sticking element to bottom of page"),f.set.offset(),x.css("left",f.cache.element.left).removeClass(p.bound).removeClass(p.top).addClass(p.fixed).addClass(p.bottom),g.onStick.call(A)},unbind:function(){f.debug("Removing absolute position on element"),f.remove.offset(),x.removeClass(p.bound).removeClass(p.top).removeClass(p.bottom)},unfix:function(){f.debug("Removing fixed position on element"),f.remove.offset(),x.removeClass(p.fixed).removeClass(p.top).removeClass(p.bottom),g.onUnstick.call(A)},reset:function(){f.debug("Reseting elements position"),f.unbind(),f.unfix(),f.resetCSS()},resetCSS:function(){x.css({top:"",bottom:"",width:"",height:""}),C.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){g.debug&&(g.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,g.name+":"),f.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),f.verbose.apply(console,arguments)))},error:function(){f.error=Function.prototype.bind.call(console.error,console,g.name+":"),f.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;g.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,0)},display:function(){var t=g.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=T;return n=n||d,a=A||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s}},u?(T===i&&f.initialize(),f.invoke(l)):(T!==i&&T.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!1,performance:!1,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,observeChanges:!0,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-sticky"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.tab=function(n){var o,a,r=e(e.isFunction(this)?t:this),s=e.isPlainObject(n)?e.extend(!0,{},e.fn.tab.settings,n):e.extend({},e.fn.tab.settings),c=r.selector||"",l=(new Date).getTime(),u=[],d=arguments[0],m="string"==typeof d,f=[].slice.call(arguments,1);return r.each(function(){var n,g,p,v,h,b=s.className,y=s.metadata,x=s.selector,w=s.error,C="."+s.namespace,k="module-"+s.namespace,T=e(this),S={},A=!0,E=0,P=this,F=T.data(k);o={initialize:function(){o.debug("Initializing tab menu item",T),o.determineTabs(),o.debug("Determining tabs",s.context,g),s.auto&&o.set.auto(),e.isWindow(P)||(o.debug("Attaching tab activation events to element",T),T.on("click"+C,o.event.click)),o.instantiate()},determineTabs:function(){var t;"parent"===s.context?(T.closest(x.ui).length>0?(t=T.closest(x.ui),o.verbose("Using closest UI element for determining parent",t)):t=T,n=t.parent(),o.verbose("Determined parent element for creating context",n)):s.context?(n=e(s.context),o.verbose("Using selector for tab context",s.context,n)):n=e("body"),s.childrenOnly?(g=n.children(x.tabs),o.debug("Searching tab context children for tabs",n,g)):(g=n.find(x.tabs),o.debug("Searching tab context for tabs",n,g))},initializeHistory:function(){if(s.history){if(o.debug("Initializing page state"),e.address===i)return o.error(w.state),!1;if("state"==s.historyType){if(o.debug("Using HTML5 to manage state"),s.path===!1)return o.error(w.path),!1;e.address.history(!0).state(s.path)}e.address.bind("change",o.event.history.change)}},instantiate:function(){o.verbose("Storing instance of module",o),F=o,T.data(k,o)},destroy:function(){o.debug("Destroying tabs",T),T.removeData(k).off(C)},event:{click:function(t){var n=e(this).data(y.tab);n!==i?(s.history?(o.verbose("Updating page state",t),e.address.value(n)):(o.verbose("Changing tab",t),o.changeTab(n)),t.preventDefault()):o.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||o.get.initialPath(),a=s.templates.determineTitle(n)||!1;o.performance.display(),o.debug("History change event",n,t),h=t,n!==i&&o.changeTab(n),a&&e.address.title(a)}}},refresh:function(){p&&(o.debug("Refreshing tab",p),o.changeTab(p))},cache:{read:function(e){return e!==i?S[e]:!1},add:function(e,t){e=e||p,o.debug("Adding cached content for",e),S[e]=t},remove:function(e){e=e||p,o.debug("Removing cached content for",e),delete S[e]}},set:{auto:function(){var t="string"==typeof s.path?s.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";o.verbose("Setting up automatic tab retrieval from server",t),e.isPlainObject(s.apiSettings)?s.apiSettings.url=t:s.apiSettings={url:t}},state:function(t){e.address.value(t)}},changeTab:function(i){var a=t.history&&t.history.pushState,r=a&&s.ignoreFirstLoad&&A,c=s.auto||e.isPlainObject(s.apiSettings),l=c&&!r?o.utilities.pathToArray(i):o.get.defaultPathArray(i);i=o.utilities.arrayToPath(l),e.each(l,function(t,a){var u,d,m,f,g=l.slice(0,t+1),b=o.utilities.arrayToPath(g),y=o.is.tab(b),x=t+1==l.length,C=o.get.tabElement(b);if(o.verbose("Looking for tab",a),y){if(o.verbose("Tab was found",a),p=b,v=o.utilities.filterArray(l,g),x?f=!0:(d=l.slice(0,t+2),m=o.utilities.arrayToPath(d),f=!o.is.tab(m),f&&o.verbose("Tab parameters found",d)),f&&c)return r?(o.debug("Ignoring remote content on first tab load",b),A=!1,o.cache.add(i,C.html()),o.activate.all(b),s.onTabInit.call(C,b,v,h),s.onTabLoad.call(C,b,v,h)):(o.activate.navigation(b),o.content.fetch(b,i)),!1;o.debug("Opened local tab",b),o.activate.all(b),o.cache.read(b)||(o.cache.add(b,!0),o.debug("First time tab loaded calling tab init"),s.onTabInit.call(C,b,v,h)),s.onTabLoad.call(C,b,v,h)}else{if(-1!=i.search("/")||""===i)return o.error(w.missingTab,T,n,b),!1;if(u=e("#"+i+', a[name="'+i+'"]'),b=u.closest("[data-tab]").data("tab"),C=o.get.tabElement(b),u&&u.length>0&&b)return o.debug("No tab found, but deep anchor link present, opening parent tab"),o.activate.all(b),o.cache.read(b)||(o.cache.add(b,!0),o.debug("First time tab loaded calling tab init"),s.onTabInit.call(C,b,v,h)),!1}})},content:{fetch:function(t,n){var a,r,c=o.get.tabElement(t),l={dataType:"html",on:"now",onSuccess:function(e){o.cache.add(n,e),o.content.update(t,e),t==p?(o.debug("Content loaded",t),o.activate.tab(t)):o.debug("Content loaded in background",t),s.onTabInit.call(c,t,v,h),s.onTabLoad.call(c,t,v,h)},urlData:{tab:n}},u=c.api("get request")||!1,d=u&&"pending"===u.state();n=n||t,r=o.cache.read(n),o.activate.tab(t),s.cache&&r?(o.debug("Showing existing content",n),o.content.update(t,r),s.onTabLoad.call(c,t,v,h)):d?(o.debug("Content is already loading",n),c.addClass(b.loading)):e.api!==i?(a=e.extend(!0,{headers:{"X-Remote":!0}},s.apiSettings,l),o.debug("Retrieving remote content",n,a),c.api(a)):o.error(w.api)},update:function(e,t){o.debug("Updating html for",e);var n=o.get.tabElement(e);n.html(t)}},activate:{all:function(e){o.activate.tab(e),o.activate.navigation(e)},tab:function(e){var t=o.get.tabElement(e);o.verbose("Showing tab content for",t),t.addClass(b.active).siblings(g).removeClass(b.active+" "+b.loading)},navigation:function(e){var t=o.get.navElement(e);o.verbose("Activating tab navigation for",t,e),t.addClass(b.active).siblings(r).removeClass(b.active+" "+b.loading)}},deactivate:{all:function(){o.deactivate.navigation(),o.deactivate.tabs()},navigation:function(){r.removeClass(b.active)},tabs:function(){g.removeClass(b.active+" "+b.loading)}},is:{tab:function(e){return e!==i?o.get.tabElement(e).length>0:!1}},get:{initialPath:function(){return r.eq(0).data(y.tab)||g.eq(0).data(y.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return o.utilities.pathToArray(o.get.defaultPath(e))},defaultPath:function(e){var t=r.filter("[data-"+y.tab+'^="'+e+'/"]').eq(0),n=t.data(y.tab)||!1;if(n){if(o.debug("Found default tab",n),E<s.maxDepth)return E++,o.get.defaultPath(n);o.error(w.recursion)}else o.debug("No default tabs found for",e,g);return E=0,e},navElement:function(e){return e=e||p,r.filter("[data-"+y.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,a;return e=e||p,i=o.utilities.pathToArray(e),a=o.utilities.last(i),t=g.filter("[data-"+y.tab+'="'+a+'"]'),n=g.filter("[data-"+y.tab+'="'+e+'"]'),t.length>0?t:n},tab:function(){return p}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return e.isArray(t)?t[t.length-1]:!1},pathToArray:function(e){return e===i&&(e=p),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return e.isArray(t)?t.join("/"):!1}},setting:function(t,n){if(o.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,s,t);else{if(n===i)return s[t];s[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,o,t);else{if(n===i)return o[t];o[t]=n}},debug:function(){s.debug&&(s.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,s.name+":"),o.debug.apply(console,arguments)))},verbose:function(){s.verbose&&s.debug&&(s.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),o.verbose.apply(console,arguments)))},error:function(){o.error=Function.prototype.bind.call(console.error,console,s.name+":"),o.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;s.performance&&(t=(new Date).getTime(),i=l||t,n=t-i,l=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,100)},display:function(){var t=s.name+":",n=0;l=!1,clearTimeout(o.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(console.group!==i||console.table!==i)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,r){var s,c,l,u=F;return n=n||f,r=P||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,a){var r=n!=s?a+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return c=u[r],!1;if(!e.isPlainObject(u[a])||n==s)return u[a]!==i?(c=u[a],!1):(o.error(w.method,t),!1);u=u[a]}})),e.isFunction(c)?l=c.apply(r,n):c!==i&&(l=c),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),c}},m?(F===i&&o.initialize(),o.invoke(d)):(F!==i&&F.invoke("destroy"),o.initialize())}),o&&!m&&o.initializeHistory(),a!==i?a:this},e.tab=function(){e(t).tab.apply(this,arguments)},e.fn.tab.settings={name:"Tab",namespace:"tab",debug:!1,verbose:!0,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,alwaysRefresh:!1,cache:!0,ignoreFirstLoad:!1,apiSettings:!1,onTabInit:function(){},onTabLoad:function(){},templates:{determineTitle:function(){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found for this context.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-tab"]={}}(),function(){(function(){!function(e,t,n,i){"use strict";e.fn.transition=function(){{var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),c=[],l=arguments,u=l[0],d=[].slice.call(arguments,1),m="string"==typeof u;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)}}return a.each(function(t){var f,g,p,v,h,b,y,x,w,C,k,T=e(this),S=this;k={initialize:function(){f=k.get.settings.apply(S,l),v=f.className,p=f.error,h=f.metadata,C="."+f.namespace,w="module-"+f.namespace,g=T.data(w)||k,y=k.get.animationEndEvent(),x=k.get.animationName(),b=k.get.animationStartEvent(),m&&(m=k.invoke(u)),m===!1&&(k.verbose("Converted arguments into settings object",f),f.interval?k.delay(f.animate):k.animate(),k.instantiate())},instantiate:function(){k.verbose("Storing instance of module",k),g=k,T.data(w,g)},destroy:function(){k.verbose("Destroying previous module for",S),T.removeData(w)},refresh:function(){k.verbose("Refreshing display type on next animation"),delete k.displayType},forceRepaint:function(){k.verbose("Forcing element repaint");var e=T.parent(),t=T.next();0===t.length?T.detach().appendTo(e):T.detach().insertBefore(t)},repaint:function(){k.verbose("Repainting element");S.offsetWidth},delay:function(e){var n,o=f.reverse===!0,r="auto"==f.reverse&&k.get.direction()==v.outward;e=typeof e!==i?e:f.interval,n=o||r?(a.length-t)*f.interval:t*f.interval,k.debug("Delaying animation by",n),setTimeout(k.animate,n)},animate:function(e){if(f=e||f,!k.is.supported())return k.error(p.support),!1;if(k.debug("Preparing animation",f.animation),k.is.animating()){if(f.queue)return!f.allowRepeats&&k.has.direction()&&k.is.occurring()&&k.queuing!==!0?k.debug("Animation is currently occurring, preventing queueing same animation",f.animation):k.queue(f.animation),!1;if(!f.allowRepeats&&k.is.occurring())return k.debug("Animation is already occurring, will not execute repeated animation",f.animation),!1}k.can.animate()?k.set.animating(f.animation):k.error(p.noAnimation,f.animation,S)},reset:function(){k.debug("Resetting animation to beginning conditions"),k.remove.animationEndCallback(),k.restore.conditions(),k.remove.animating()},queue:function(e){k.debug("Queueing animation of",e),k.queuing=!0,T.one(y+C,function(){k.queuing=!1,k.repaint(),k.animate.apply(this,f)})},complete:function(){k.verbose("CSS animation complete",f.animation),k.remove.animationEndCallback(),k.remove.failSafe(),k.is.looping()||(k.is.outward()?(k.verbose("Animation is outward, hiding element"),k.restore.conditions(),k.hide(),f.onHide.call(this)):k.is.inward()?(k.verbose("Animation is outward, showing element"),k.restore.conditions(),k.show(),k.set.display(),f.onShow.call(this)):k.restore.conditions(),k.remove.animation(),k.remove.animating()),f.onComplete.call(this)},has:{direction:function(t){var n=!1;return t=t||f.animation,"string"==typeof t&&(t=t.split(" "),e.each(t,function(e,t){(t===v.inward||t===v.outward)&&(n=!0)})),n},inlineDisplay:function(){var t=T.attr("style")||"";return e.isArray(t.match(/display.*?;/,""))}},set:{animating:function(e){e=e||f.animation,k.is.animating()||k.save.conditions(),k.remove.direction(),k.remove.animationEndCallback(),k.can.transition()&&!k.has.direction()&&k.set.direction(),k.remove.hidden(),k.set.display(),T.addClass(v.animating+" "+v.transition+" "+e).addClass(e).one(y+".complete"+C,k.complete),f.useFailSafe&&k.add.failSafe(),k.set.duration(f.duration),f.onStart.call(this),k.debug("Starting tween",e,T.attr("class"))},duration:function(e,t){t=t||f.duration,t="number"==typeof t?t+"ms":t,k.verbose("Setting animation duration",t),(t||0===t)&&T.css({"-webkit-animation-duration":t,"-moz-animation-duration":t,"-ms-animation-duration":t,"-o-animation-duration":t,"animation-duration":t})},display:function(){var e=k.get.style(),t=k.get.displayType(),n=e+"display: "+t+" !important;";T.css("display",""),k.refresh(),T.css("display")!==t&&(k.verbose("Setting inline visibility to",t),T.attr("style",n))},direction:function(){T.is(":visible")&&!k.is.hidden()?(k.debug("Automatically determining the direction of animation","Outward"),T.removeClass(v.inward).addClass(v.outward)):(k.debug("Automatically determining the direction of animation","Inward"),T.removeClass(v.outward).addClass(v.inward))},looping:function(){k.debug("Transition set to loop"),T.addClass(v.looping)},hidden:function(){k.is.hidden()||T.addClass(v.transition).addClass(v.hidden),"none"!==T.css("display")&&(k.verbose("Overriding default display to hide element"),T.css("display","none"))},visible:function(){T.addClass(v.transition).addClass(v.visible)}},save:{displayType:function(e){T.data(h.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,k.verbose("Saving existence of transition",t,n)},conditions:function(){T.attr("class")||!1,T.attr("style")||"";T.removeClass(f.animation),k.remove.direction(),k.cache={className:T.attr("class"),style:k.get.style()},k.verbose("Saving original attributes",k.cache)}},restore:{conditions:function(){return k.cache===i?!1:(k.cache.className?T.attr("class",k.cache.className):T.removeAttr("class"),k.cache.style&&(k.verbose("Restoring original style attribute",k.cache.style),console.log("restoring cache",k.cache.style),T.attr("style",k.cache.style)),k.is.looping()&&k.remove.looping(),void k.verbose("Restoring original attributes",k.cache))}},add:{failSafe:function(){var e=k.get.duration();k.timer=setTimeout(function(){T.trigger(y)},e+f.failSafeDelay),k.verbose("Adding fail safe timer",k.timer)}},remove:{animating:function(){T.removeClass(v.animating)},animation:function(){T.css({"-webkit-animation":"","-moz-animation":"","-ms-animation":"","-o-animation":"",animation:""})},animationEndCallback:function(){T.off(".complete")},display:function(){T.css("display","")},direction:function(){T.removeClass(v.inward).removeClass(v.outward)},failSafe:function(){k.verbose("Removing fail safe timer",k.timer),k.timer&&clearTimeout(k.timer)},hidden:function(){T.removeClass(v.hidden)},visible:function(){T.removeClass(v.visible)},looping:function(){k.debug("Transitions are no longer looping"),T.removeClass(v.looping),k.forceRepaint()},transition:function(){T.removeClass(v.visible).removeClass(v.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})
},direction:function(t){return t=t||f.animation,"string"==typeof t&&(t=t.split(" "),e.each(t,function(e,t){return t===v.inward?v.inward:t===v.outward?v.outward:void 0})),k.can.transition()?T.is(":visible")&&!k.is.hidden()?v.outward:v.inward:"static"},duration:function(e){return e=e||f.duration,e===!1&&(e=T.css("animation-duration")||0),"string"==typeof e?e.indexOf("ms")>-1?parseFloat(e):1e3*parseFloat(e):e},displayType:function(){return f.displayType?f.displayType:(T.data(h.displayType)===i&&k.can.transition(!0),T.data(h.displayType))},style:function(){var e=T.attr("style")||"";return e.replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationName:function(){var e,t=n.createElement("div"),o={animation:"animationName",OAnimation:"oAnimationName",MozAnimation:"mozAnimationName",WebkitAnimation:"webkitAnimationName"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationStartEvent:function(){var e,t=n.createElement("div"),o={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationEndEvent:function(){var e,t=n.createElement("div"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(t.style[e]!==i)return o[e];return!1}},can:{transition:function(t){var n,o,a,r,s,c=T.attr("class"),l=T.prop("tagName"),u=f.animation,d=k.get.transitionExists(u);if(d===i||t){if(k.verbose("Determining whether animation exists"),n=e("<"+l+" />").addClass(c).insertAfter(T),o=n.addClass(u).removeClass(v.inward).removeClass(v.outward).addClass(v.animating).addClass(v.transition).css(x),a=n.addClass(v.inward).css(x),s=n.attr("class",c).removeAttr("style").removeClass(v.hidden).removeClass(v.visible).show().css("display"),k.verbose("Determining final display state",s),n.remove(),o!=a)k.debug("Direction exists for animation",u),r=!0;else{if("none"==o||!o)return void k.debug("No animation defined in css",u);k.debug("Static animation found",u,s),r=!1}k.save.displayType(s),k.save.transitionExists(u,r)}return d!==i?d:r},animate:function(){return k.can.transition()!==i}},is:{animating:function(){return T.hasClass(v.animating)},inward:function(){return T.hasClass(v.inward)},outward:function(){return T.hasClass(v.outward)},looping:function(){return T.hasClass(v.looping)},occurring:function(e){return e=e||f.animation,e="."+e.replace(" ","."),T.filter(e).length>0},visible:function(){return T.is(":visible")},hidden:function(){return"hidden"===T.css("visibility")},supported:function(){return x!==!1&&y!==!1}},hide:function(){k.verbose("Hiding element"),k.is.animating()&&k.reset(),k.remove.display(),k.remove.visible(),k.set.hidden(),k.repaint()},show:function(e){k.verbose("Showing element",e),k.remove.hidden(),k.set.visible(),k.repaint()},start:function(){k.verbose("Starting animation"),T.removeClass(v.disabled)},stop:function(){k.debug("Stopping animation"),T.addClass(v.disabled)},toggle:function(){k.debug("Toggling play status"),T.toggleClass(v.disabled)},setting:function(t,n){if(k.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},debug:function(){f.debug&&(f.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,f.name+":"),k.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),k.verbose.apply(console,arguments)))},error:function(){k.error=Function.prototype.bind.call(console.error,console,f.name+":"),k.error.apply(console,arguments)},performance:{log:function(e){var t,n,i;f.performance&&(t=(new Date).getTime(),i=s||t,n=t-i,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,600)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(k.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,a){var r,s,c,l=g;return n=n||d,a=S||a,"string"==typeof t&&l!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[a])&&n!=r)l=l[a];else{if(l[a]!==i)return s=l[a],!1;if(!e.isPlainObject(l[o])||n==r)return l[o]!==i?(s=l[o],!1):!1;l=l[o]}})),e.isFunction(s)?c=s.apply(a,n):s!==i&&(c=s),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),s!==i?s:!1}},k.initialize()}),o!==i?o:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",debug:!1,verbose:!0,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"There is no css animation matching the one you specified.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document)}).call(this),"undefined"==typeof Package&&(Package={}),Package["semantic:ui-transition"]={}}();
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






