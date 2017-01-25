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
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
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
			"doubt": "doubt",
			"harden": "harden",
			"protype": "protype",
			"truly": "truly",
			"U200b": "u200b"
		}
	@end-include
*/

const doubt = require( "doubt" );
const harden = require( "harden" );
const protype = require( "protype" );
const truly = require( "truly" );
const truu = require( "truu" );
const U200b = require( "u200b" );

const LOOSENED = "loosened";
const REFERENCE_PATTERN = /^\./;
const ACCUMULATOR_PATTERN = /^\./;

const loosen = function loosen( entity, path, cache ){
	/*;
		@meta-configuration:
			{
				"entity:required": [
					Array,
					"object"
				],
				"path": "string",
				"cache": "object"
			}
		@end-meta-configuration
	*/

	if( !protype( entity, OBJECT ) ){
		throw new Error( "invalid entity" );
	}

	if( truly( path ) && !protype( path, STRING ) ){
		throw new Error( "invalid path" );
	}

	if( truu( cache ) && !protype( cache, OBJECT ) ){
		throw new Error( "invalid cache" );
	}

	entity = entity || { };

	if( entity.LOOSENED === LOOSENED ){
		return entity;
	}

	cache = cache || { };

	path = path || "";

	let element = null;
	if( doubt( entity, ARRAY ) ){
		let key = "";

		for( let index = 0, length = entity.length; index < length; index++ ){
			key = U200b( path, index ).join( "." ).replace( REFERENCE_PATTERN, "" );

			element = entity[ index ];

			cache[ key ] = element;

			if( protype( element, OBJECT ) ){
				loosen( element, key, cache );

				for( let property in element ){
					let key = U200b( path, property ).join( "..." ).replace( ACCUMULATOR_PATTERN, "" );

					let list = cache[ key ] = cache[ key ] || [ ];

					let data = element[ property ];
					list.push( data );

					if( protype( data, OBJECT ) ){
						loosen( data, key, cache );
					}
				}
			}
		}

	}else if( protype( entity, OBJECT ) ){
		Object.keys( entity )
			.forEach( function onEachKey( key ){
				element = entity[ key ];

				key = U200b( path, key ).join( "." ).replace( REFERENCE_PATTERN, "" );

				cache[ key ] = element;

				if( protype( element, OBJECT ) ){
					loosen( element, key, cache );
				}
			} );
	}

	harden( "LOOSENED", LOOSENED, cache );

	return cache;
};

module.exports = loosen;
