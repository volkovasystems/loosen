"use strict";

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

console.log( require( "util" ).inspect( loosen( test ), { "showHidden": true } ) );

console.log( require( "util" ).inspect( loosen( test, true ), { "showHidden": true } ) );

console.log( require( "util" ).inspect( loosen( global, true ), { "showHidden": true } ) );

console.log( loosen( global ) );

console.log( require( "util" ).inspect( loosen( global ), { "showHidden": true } ) );
