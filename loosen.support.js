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
              			"budge": "budge",
              			"depher": "depher",
              			"doubt": "doubt",
              			"harden": "harden",
              			"kein": "kein",
              			"protype": "protype",
              			"truly": "truly",
              			"U200b": "u200b"
              		}
              	@end-include
              */var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var budge = require("budge");
var depher = require("depher");
var doubt = require("doubt");
var harden = require("harden");
var kein = require("kein");
var plough = require("plough");
var protype = require("protype");
var truly = require("truly");
var U200b = require("u200b");

var LOOSENED = "loosened";
var REFERENCE_PATTERN = /^\./;
var ACCUMULATOR_PATTERN = /\.{3}/;

/*;
                                   	@internal-method-documentation:
                                   		We separate the push function because this will manage if the key
                                   			is an accumulator path and should accumulate values.
                                   	@end-internal-method-documentation
                                   */
var push = function push(cache, key, element) {
	/*;
                                               	@meta-configuration:
                                               		{
                                               			"cache:required": "object",
                                               			"key:required": "string",
                                               			"element:required": "*"
                                               		}
                                               	@end-meta-configuration
                                               */

	if (!protype(cache, OBJECT)) {
		throw new Error("invalid cache");
	}

	if (!protype(key, STRING)) {
		throw new Error("invalid key");
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

var loosen = function loosen(entity, path, cache, compressed) {
	/*;
                                                               	@meta-configuration:
                                                               		{
                                                               			"entity:required": [
                                                               				Array,
                                                               				"object"
                                                               			],
                                                               			"path": "string",
                                                               			"cache": "object",
                                                               			"compressed": "boolean"
                                                               		}
                                                               	@end-meta-configuration
                                                               */

	if (!protype(entity, OBJECT)) {
		throw new Error("invalid entity");
	}

	entity = entity || {};

	if (entity.LOOSENED === LOOSENED) {
		return entity;
	}

	var parameter = budge(arguments);

	path = depher(parameter, STRING, "");

	cache = depher(parameter, OBJECT, {});

	compressed = depher(parameter, BOOLEAN, false);

	var element = null;
	if (doubt(entity, ARRAY)) {
		var key = "";

		for (var index = 0, length = entity.length; index < length; index++) {
			key = U200b(path, index).join(".").replace(REFERENCE_PATTERN, "");

			element = entity[index];

			if (protype(element, OBJECT)) {
				if (!compressed) {
					push(cache, key, element);
				}

				loosen(element, key, cache, compressed);

				/*;
                                             	@note:
                                             		This is the accumulator logic.
                                             			This will try to accumulate values of the same path.
                                             	@end-note
                                             */

				if (!compressed) {
					for (var property in element) {
						var _key = U200b(path, property).join("...").replace(REFERENCE_PATTERN, "");

						var data = element[property];

						var list = cache[_key] = cache[_key] || [];
						list.push(data);

						if (protype(data, OBJECT)) {
							loosen(data, _key, cache, compressed);
						}
					}
				}

			} else {
				push(cache, key, element);
			}
		}

	} else if (protype(entity, OBJECT)) {
		(0, _keys2.default)(entity).
		forEach(function onEachKey(key) {
			element = entity[key];

			key = U200b(path, key).join(".").replace(REFERENCE_PATTERN, "");

			if (protype(element, OBJECT)) {
				if (!compressed) {
					push(cache, key, element);
				}

				loosen(element, key, cache, compressed);

			} else {
				push(cache, key, element);
			}
		});
	}

	harden("LOOSENED", LOOSENED, cache);

	return cache;
};

module.exports = loosen;

//# sourceMappingURL=loosen.support.js.map