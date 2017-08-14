"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "loosen",
			"path": "loosen/loosen.js",
			"file": "loosen.js",
			"module": "loosen",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
				"Vinse Vinalon <vinsevinalon@gmail.com>"
			],
			"repository": "https://github.com/volkovasystems/loosen.git",
			"test": "loosen-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Transform deep object into shallow object.
	@end-module-documentation

	@include:
		{
			"burne": "burne",
			"depher": "depher",
			"doubt": "doubt",
			"harden": "harden",
			"impel": "impel",
			"karv": "karv",
			"kein": "kein",
			"kount": "kount",
			"mrkd": "mrkd",
			"mtch": "mtch",
			"petrifi": "petrifi",
			"plough": "plough",
			"shft": "shft",
			"truly": "truly",
			"U200b": "u200b",
			"wichevr": "wichevr",
			"wichis": "wichis"
		}
	@end-include
*/

const burne = require( "burne" );
const depher = require( "depher" );
const doubt = require( "doubt" );
const harden = require( "harden" );
const impel = require( "impel" );
const karv = require( "karv" );
const kein = require( "kein" );
const kount = require( "kount" );
const mrkd = require( "mrkd" );
const mtch = require( "mtch" );
const petrifi = require( "petrifi" );
const plough = require( "plough" );
const shft = require( "shft" );
const truly = require( "truly" );
const U200b = require( "u200b" );
const wichevr = require( "wichevr" );
const wichis = require( "wichis" );

/*;
	@note:
		The dot pattern should just check non-accumulator symbols.
	@end-note
*/
const DOT_PATTERN = /\.{1}/g;
const FORMAT = Symbol.for( "format" );
const LOOSENED = Symbol( "loosened" );
const MARK = Symbol( "mark" );
const REFERENCE_PATTERN = /^\./;
const ACCUMULATOR_PATTERN = /\.{3}/;

harden( "ARRAY_FORMAT", "array-format" );
harden( "OBJECT_FORMAT", "object-format" );

/*;
	@internal-method-documentation:
		We separate the push function because this will manage if the key
			is an accumulator path and should accumulate values.
	@end-internal-method-documentation
*/
const push = function push( cache, key, element, limiter ){
	/*;
		@meta-configuration:
			{
				"cache:required": "object",
				"key:required": "string",
				"element:required": "*",
				"limiter": "function"
			}
		@end-meta-configuration
	*/

	if( typeof cache != "object" ){
		throw new Error( "invalid cache" );
	}

	if( typeof key != "string" ){
		throw new Error( "invalid key" );
	}

	if( limiter( element, key ) ){
		return cache;
	}

	if( ACCUMULATOR_PATTERN.test( key ) && kein( key, cache ) && !doubt( element, ARRAY ) ){
		cache[ key ] = plough( cache[ key ], element );

	}else{
		cache[ key ] = element;
	}

	return cache;
};

const loosen = function loosen( entity, path, cache, compressed, depth, limiter ){
	/*;
		@meta-configuration:
			{
				"entity:required": [
					Array,
					"object"
				],
				"path": "string",
				"cache": "object",
				"compressed": "boolean",
				"depth": "number",
				"limiter": "function"
			}
		@end-meta-configuration
	*/

	if( typeof entity != "object" ){
		throw new Error( "invalid entity" );
	}

	entity = wichis( entity, { } );

	if( mrkd( LOOSENED, entity, true ) ){
		return entity;
	}

	let parameter = shft( arguments );

	path = depher( parameter, STRING, "" );

	cache = depher( parameter, OBJECT, { } );

	compressed = depher( parameter, BOOLEAN, false );

	depth = depher( parameter, NUMBER, Infinity );

	limiter = depher( parameter, FUNCTION, function limiter( element, key ){ return false; } );

	/*;
		@note:
			If depth is not infinite or falsy, then it will process only on that level
				and we can disregard other data.
		@end-note
	*/
	if( truly( depth ) && isFinite( depth ) &&
		truly( path ) && mtch( path, DOT_PATTERN ).length == depth )
	{
		return cache;
	}

	/*;
		@note:
			The following lines of code will resolve possible issues
				with circular dependency, frozen, sealed and non-extensible objects.
		@end-note
	*/
	entity = karv( entity );

	harden( "reference", wichis( cache.reference, { } ), cache );

	let reference = cache.reference;
	let index = kount( reference );

	if( kein( index, reference ) ||
		( kein( MARK, entity ) && kein( entity[ MARK ], reference ) ) )
	{
		return cache;
	}

	entity[ MARK ] = index;
	petrifi( index, true, reference );

	let element = null;
	if( doubt( entity, ARRAY ) ){
		impel( FORMAT, ARRAY_FORMAT, cache );

		entity.forEach( function onEachElement( element, index ){
			let key = U200b( path, index ).join( "." ).replace( REFERENCE_PATTERN, "" );

			if( typeof element == "object" ){
				if( !compressed ){
					push( cache, key, element, limiter );
				}

				loosen( element, key, cache, compressed, depth, limiter );

				/*;
					@note:
						This is the accumulator logic.

						This will try to accumulate values of the same path.
					@end-note
				*/
				if( !compressed ){
					Object.keys( element ).forEach( function onEachKey( property ){
						let key = U200b( path, property )
							.join( "..." ).replace( REFERENCE_PATTERN, "" );

						let data = element[ property ];

						let list = cache[ key ] = wichevr( cache[ key ], [ ] );
						list.push( data );

						if( typeof data == "object" ){
							loosen( data, key, cache, compressed, depth, limiter );
						}
					} );
				}

			}else{
				push( cache, key, element, limiter );
			}
		} );

	}else if( typeof entity == "object" ){
		impel( FORMAT, OBJECT_FORMAT, cache );

		Object.keys( entity )
			.forEach( function onEachKey( key ){
				element = entity[ key ];

				key = U200b( path, key ).join( "." ).replace( REFERENCE_PATTERN, "" );

				if( typeof element == "object" ){
					if( !compressed ){
						push( cache, key, element, limiter );
					}

					loosen( element, key, cache, compressed, depth, limiter );

				}else{
					push( cache, key, element, limiter );
				}
			} );
	}

	burne( LOOSENED, cache );

	return cache;
};

module.exports = loosen;
