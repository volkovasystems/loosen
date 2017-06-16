const assert = require( "assert" );
const protype = require( "protype" );
const loosen = require( "./loosen.js" );

let test = {
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

console.log( require( "util" ).inspect( loosen( test, true ), { "showHidden": true } ) );

assert.equal( typeof loosen( test ), "object", "should return 'object'" );

assert.ok( loosen( global, true, 1 ), "should return only first level of loosened object" );

assert.ok( loosen( global, true, ( element ) => { return protype( element, FUNCTION ); } ),
				"should return loosened object with function data type" );

console.log( "ok" );
