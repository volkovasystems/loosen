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

assert.equal( typeof loosen( test ), "object", "should be object data type" );

assert.ok( loosen( global, true, 1 ), "should only contain first level of loosened object" );

assert.ok( loosen( global, true, ( element ) => { return protype( element, FUNCTION ); } ),
	"should be equal to loosened object containing function data only" );

console.log( "ok" );
