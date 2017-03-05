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
              			"arkount": "arkount",
              			"budge": "budge",
              			"depher": "depher",
              			"doubt": "doubt",
              			"harden": "harden",
              			"karv": "karv",
              			"kein": "kein",
              			"kount": "kount",
              			"petrifi": "petrifi",
              			"plough": "plough",
              			"protype": "protype",
              			"truly": "truly",
              			"U200b": "u200b",
              			"wichevr": "wichevr",
              			"wichis": "wichis"
              		}
              	@end-include
              */var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);var _symbol = require("babel-runtime/core-js/symbol");var _symbol2 = _interopRequireDefault(_symbol);var _for = require("babel-runtime/core-js/symbol/for");var _for2 = _interopRequireDefault(_for);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var arkount = require("arkount");
var budge = require("budge");
var depher = require("depher");
var doubt = require("doubt");
var harden = require("harden");
var impel = require("impel");
var karv = require("karv");
var kein = require("kein");
var kount = require("kount");
var petrifi = require("petrifi");
var plough = require("plough");
var protype = require("protype");
var truly = require("truly");
var U200b = require("u200b");
var wichevr = require("wichevr");
var wichis = require("wichis");

/*;
                                	@note:
                                		The dot pattern should just check non-accumulator symbols.
                                	@end-note
                                */
var DOT_PATTERN = /\.{1}/g;
var FORMAT = (0, _for2.default)("format");
var LOOSENED = "loosened";
var MARK = (0, _symbol2.default)("mark");
var REFERENCE_PATTERN = /^\./;
var ACCUMULATOR_PATTERN = /\.{3}/;

harden("ARRAY_FORMAT", "array-format");
harden("OBJECT_FORMAT", "object-format");

/*;
                                          	@internal-method-documentation:
                                          		We separate the push function because this will manage if the key
                                          			is an accumulator path and should accumulate values.
                                          	@end-internal-method-documentation
                                          */
var push = function push(cache, key, element, limiter) {
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

	if (!protype(cache, OBJECT)) {
		throw new Error("invalid cache");
	}

	if (!protype(key, STRING)) {
		throw new Error("invalid key");
	}

	if (limiter(element, key)) {
		return cache;
	}

	if (ACCUMULATOR_PATTERN.test(key) &&
	kein(cache, key) &&
	!doubt(element, ARRAY))
	{
		cache[key] = plough(cache[key], element);

	} else {
		cache[key] = element;
	}

	return cache;
};

var loosen = function loosen(entity, path, cache, compressed, depth, limiter) {
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

	if (!protype(entity, OBJECT)) {
		throw new Error("invalid entity");
	}

	entity = wichis(entity, {});

	if (entity.LOOSENED === LOOSENED) {
		return entity;
	}

	var parameter = budge(arguments);

	path = depher(parameter, STRING, "");

	cache = depher(parameter, OBJECT, {});

	compressed = depher(parameter, BOOLEAN, false);

	depth = depher(parameter, NUMBER, Infinity);

	limiter = depher(parameter, FUNCTION, function limiter(element, key) {return false;});

	/*;
                                                                                        	@note:
                                                                                        		If depth is not infinite or falsy, then it will process only on that level
                                                                                        			and we can disregard other data.
                                                                                        	@end-note
                                                                                        */
	if (truly(depth) && truly(path) && arkount(path.match(DOT_PATTERN)) == depth) {
		return cache;
	}

	/*;
   	@note:
   		The following lines of code will resolve possible issues
   			with circular dependency, frozen, sealed and non-extensible objects.
   	@end-note
   */
	entity = karv(entity);

	harden("reference", wichis(cache.reference, {}), cache);

	var index = kount(cache.reference);

	if (kein(cache.reference, index) ||
	kein(entity, MARK) && kein(cache.reference, entity[MARK]))
	{
		return cache;
	}

	entity[MARK] = index;
	petrifi(index, true, cache.reference);

	var element = null;
	if (doubt(entity, ARRAY)) {
		impel(FORMAT, ARRAY_FORMAT, cache);

		var key = "";

		for (var _index = 0, length = arkount(entity); _index < length; _index++) {
			key = U200b(path, _index).join(".").replace(REFERENCE_PATTERN, "");

			element = entity[_index];

			if (protype(element, OBJECT)) {
				if (!compressed) {
					push(cache, key, element, limiter);
				}

				loosen(element, key, cache, compressed, depth, limiter);

				/*;
                                                             	@note:
                                                             		This is the accumulator logic.
                                                             			This will try to accumulate values of the same path.
                                                             	@end-note
                                                             */

				if (!compressed) {
					for (var property in element) {
						var _key = U200b(path, property).
						join("...").replace(REFERENCE_PATTERN, "");

						var data = element[property];

						var list = cache[_key] = wichevr(cache[_key], []);
						list.push(data);

						if (protype(data, OBJECT)) {
							loosen(data, _key, cache, compressed, depth, limiter);
						}
					}
				}

			} else {
				push(cache, key, element, limiter);
			}
		}

	} else if (protype(entity, OBJECT)) {
		impel(FORMAT, OBJECT_FORMAT, cache);

		(0, _keys2.default)(entity).
		forEach(function onEachKey(key) {
			element = entity[key];

			key = U200b(path, key).join(".").replace(REFERENCE_PATTERN, "");

			if (protype(element, OBJECT)) {
				if (!compressed) {
					push(cache, key, element, limiter);
				}

				loosen(element, key, cache, compressed, depth, limiter);

			} else {
				push(cache, key, element, limiter);
			}
		});
	}

	harden("LOOSENED", LOOSENED, cache);

	return cache;
};

module.exports = loosen;

//# sourceMappingURL=loosen.support.js.map