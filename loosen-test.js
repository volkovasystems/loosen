"use strict";

const loosen = require( "./loosen.js" );

let item_array = [
	"ballpen-item",
	"Ballpen Item"
];

let merchant_array = [
	"biyaheroes-team",
	"pure-gold",
	{
		"logo": {
			"reference": "ref1",
			"path": "path1"
		}
	}
];

let segregate1 = loosen( item_array );
let segregate2 = loosen( merchant_array );

console.log( "segregate array", segregate1 );
console.log( "segregate object", segregate2 );
