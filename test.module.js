"use strict";

/*;
	@test-license:
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
	@end-test-license

	@test-configuration:
		{
			"package": "loosen",
			"path": "loosen/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/loosen.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"loosen": "loosen"
		}
	@end-include
*/

const assert = require( "should" );

//: @server:
const loosen = require( "./loosen.js" );
//: @end-server

//: @client:
const loosen = require( "./loosen.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:
describe( "loosen", ( ) => {

	describe( "`loosen with deep object as entity`", ( ) => {
		it( "should transform deep object into shallow object", ( ) => {
			let data = {
				"hello": {
					"world": {
						"yeah": 1,
						"ugh": false,
						"hi": [
							{
								"weeeh": {
									"yehey": 123
								}
							},
							{
								"weeeh": {
									"yehey": 1234
								}
							},
							"hello world",
							123,
							{
								"weeeeeeh": 12345
							}
						]
					}
				}
			};

			let result = loosen( data );

			assert.equal( Object.keys( result ).length, 17 );
		} );
	} );

	describe( "`loosen with entity and compressed parameters`", ( ) => {
		it( "should transform deep object into shallow object", ( ) => {
			let data = {
				"hello": {
					"world": {
						"yeah": 1,
						"ugh": false,
						"hi": [
							{
								"weeeh": {
									"yehey": 123
								}
							},
							{
								"weeeh": {
									"yehey": 1234
								}
							},
							"hello world",
							123,
							{
								"weeeeeeh": 12345
							}
						]
					}
				}
			};

			let result = loosen( data, true );

			assert.equal( Object.keys( result ).length, 7 );
		} );
	} );

	describe( "`loosen with entity, compressed, and depth parameters`", ( ) => {
		it( "should only contain first level of loosened object", ( ) => {
			let result = loosen( global, true, 1 );

			assert.equal( Object.keys( result ).length, 85 );
		} );
	} );

	describe( "`loosen with entity, compressed and limiter parameters`", ( ) => {
		it( "should return loosened object containing function data only", ( ) => {
			let result = loosen( global, true, ( element ) => { return typeof element == "function"; } );

			assert.equal( Object.keys( result ).length, 3226 );
		} ).timeout( 15000 );
	} );

} );
//: @end-server


//: @client:
describe( "loosen", ( ) => {

	describe( "`loosen with deep object as entity`", ( ) => {
		it( "should transform deep object into shallow object", ( ) => {
			let data = {
				"hello": {
					"world": {
						"yeah": 1,
						"ugh": false,
						"hi": [
							{
								"weeeh": {
									"yehey": 123
								}
							},
							{
								"weeeh": {
									"yehey": 1234
								}
							},
							"hello world",
							123,
							{
								"weeeeeeh": 12345
							}
						]
					}
				}
			};

			let result = loosen( data );

			assert.equal( Object.keys( result ).length, 17 );
		} );
	} );

	describe( "`loosen with entity and compressed parameters`", ( ) => {
		it( "should transform deep object into shallow object", ( ) => {
			let data = {
				"hello": {
					"world": {
						"yeah": 1,
						"ugh": false,
						"hi": [
							{
								"weeeh": {
									"yehey": 123
								}
							},
							{
								"weeeh": {
									"yehey": 1234
								}
							},
							"hello world",
							123,
							{
								"weeeeeeh": 12345
							}
						]
					}
				}
			};

			let result = loosen( data, true );

			assert.equal( Object.keys( result ).length, 7 );
		} );
	} );

	describe( "`loosen with entity, compressed, and depth parameters`", ( ) => {
		it( "should only contain first level of loosened object", ( ) => {
			let result = loosen( window, true, 1 );

			assert.equal( Object.keys( result ).length, 120 );
		} );
	} );

	describe( "`loosen with entity, compressed and limiter parameters`", ( ) => {
		it( "should return loosened object containing function data only", ( ) => {
			let result = loosen( window, true, ( element ) => { return typeof element == "function"; } );

			assert.equal( Object.keys( result ).length, 45 );
		} ).timeout( 15000 );
	} );

} );
//: @end-client


//: @bridge:
describe( "loosen", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`loosen with deep object as entity`", ( ) => {
		it( "should transform deep object into shallow object", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					let data = {
						"hello": {
							"world": {
								"yeah": 1,
								"ugh": false,
								"hi": [
									{
										"weeeh": {
											"yehey": 123
										}
									},
									{
										"weeeh": {
											"yehey": 1234
										}
									},
									"hello world",
									123,
									{
										"weeeeeeh": 12345
									}
								]
							}
						}
					};

					let test = loosen( data );

					return Object.keys( test ).length;
				}

			).value;
			//: @end-ignore
			assert.equal( result, 17 );
		} );
	} );

	describe( "`loosen with entity and compressed parameters`", ( ) => {
		it( "should transform deep object into shallow object", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					let data = {
						"hello": {
							"world": {
								"yeah": 1,
								"ugh": false,
								"hi": [
									{
										"weeeh": {
											"yehey": 123
										}
									},
									{
										"weeeh": {
											"yehey": 1234
										}
									},
									"hello world",
									123,
									{
										"weeeeeeh": 12345
									}
								]
							}
						}
					};

					let test = loosen( data, true );
					return Object.keys( test ).length;
				}

			).value;
			//: @end-ignore
			assert.equal( result, 7 );
		} );
	} );

	describe( "`loosen with entity, compressed, and depth parameters`", ( ) => {
		it( "should only contain first level of loosened object", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					let test = loosen( window, true, 1 );
					return Object.keys( test ).length;
				}

			).value;
			//: @end-ignore
			assert.equal( result, 98 );
		} );
	} );

	describe( "`loosen with entity, compressed and limiter parameters`", ( ) => {
		it( "should return loosened object containing function data only", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					let test = loosen( window, true, ( element ) => { return typeof element == "function"; } );
					return Object.keys( test ).length;
				}

			).value;
			//: @end-ignore
			assert.equal( result, 47 );
		} ).timeout( 15000 );
	} );

} );
//: @end-bridge
