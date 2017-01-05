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
			"U200b": "u200b"
		}
	@end-include
*/

const doubt = require( "doubt" );
const harden = require( "harden" );
const protype = require( "protype" );
const U200b = require( "u200b" );

harden( "LOOSENED", "loosened" );

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

	entity = entity || { };

	if( entity.LOOSENED === LOOSENED ){
		return entity;
	}

	cache = cache || { };

	path = path || "";

	let element = null;
	if( doubt( entity ).ARRAY ){
		let key = "";

		for( let index = 0,
				entityLength = entity.length;
			index < entityLength;
			index++ )
		{
			key = U200b( path, index ).join( "." ).replace( loosen.REFERENCE_PATTERN, "" );

			element = entity[ index ];

			cache[ key ] = element;

			loosen( element, key, cache );

			if( protype( element, OBJECT ) ){
				for( let property in element ){
					let key = U200b( path, property ).join( "..." )
						.replace( loosen.ACCUMULATOR_PATTERN, "" );

					let list = cache[ key ] = cache[ key ] || [ ];

					let data = element[ property ];
					list.push( data );

					loosen( data, key, cache );
				}
			}
		}

	}else if( protype( entity, OBJECT ) ){
		Object.keys( entity )
			.forEach( function onEachKey( key ){
				element = entity[ key ];

				key = U200b( path, key ).join( "." ).replace( loosen.REFERENCE_PATTERN, "" );

				cache[ key ] = element;

				loosen( element, key, cache );
			} );
	}

	harden.bind( cache )( "LOOSENED", LOOSENED );

	return cache;
};

harden.bind( loosen )( "REFERENCE_PATTERN", /^\./ );

harden.bind( loosen )( "ACCUMULATOR_PATTERN", /^\./ );

module.exports = loosen;
