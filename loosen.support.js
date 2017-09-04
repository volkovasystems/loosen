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
              */var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);var _typeof2 = require("babel-runtime/helpers/typeof");var _typeof3 = _interopRequireDefault(_typeof2);var _symbol = require("babel-runtime/core-js/symbol");var _symbol2 = _interopRequireDefault(_symbol);var _for = require("babel-runtime/core-js/symbol/for");var _for2 = _interopRequireDefault(_for);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var burne = require("burne");
var depher = require("depher");
var doubt = require("doubt");
var harden = require("harden");
var impel = require("impel");
var karv = require("karv");
var kein = require("kein");
var kount = require("kount");
var mrkd = require("mrkd");
var mtch = require("mtch");
var petrifi = require("petrifi");
var plough = require("plough");
var shft = require("shft");
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
var LOOSENED = (0, _symbol2.default)("loosened");
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

	if ((typeof cache === "undefined" ? "undefined" : (0, _typeof3.default)(cache)) != "object") {
		throw new Error("invalid cache");
	}

	if (typeof key != "string") {
		throw new Error("invalid key");
	}

	if (limiter(element, key)) {
		return cache;
	}

	if (ACCUMULATOR_PATTERN.test(key) && kein(key, cache) && !doubt(element, ARRAY)) {
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

	if ((typeof entity === "undefined" ? "undefined" : (0, _typeof3.default)(entity)) != "object") {
		throw new Error("invalid entity");
	}

	entity = wichis(entity, {});

	if (mrkd(LOOSENED, entity, true)) {
		return entity;
	}

	var parameter = shft(arguments);

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
	if (truly(depth) && isFinite(depth) &&
	truly(path) && mtch(path, DOT_PATTERN).length == depth)
	{
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

	var reference = cache.reference;
	var index = kount(reference);

	if (kein(index, reference) ||
	kein(MARK, entity) && kein(entity[MARK], reference))
	{
		return cache;
	}

	entity[MARK] = index;
	petrifi(index, true, reference);

	var element = null;
	if (doubt(entity, ARRAY)) {
		impel(FORMAT, ARRAY_FORMAT, cache);

		entity.forEach(function onEachElement(element, index) {
			var key = U200b(path, index).join(".").replace(REFERENCE_PATTERN, "");

			if ((typeof element === "undefined" ? "undefined" : (0, _typeof3.default)(element)) == "object") {
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
					(0, _keys2.default)(element).forEach(function onEachKey(property) {
						var key = U200b(path, property).
						join("...").replace(REFERENCE_PATTERN, "");

						var data = element[property];

						var list = cache[key] = wichevr(cache[key], []);
						list.push(data);

						if ((typeof data === "undefined" ? "undefined" : (0, _typeof3.default)(data)) == "object") {
							loosen(data, key, cache, compressed, depth, limiter);
						}
					});
				}

			} else {
				push(cache, key, element, limiter);
			}
		});

	} else if ((typeof entity === "undefined" ? "undefined" : (0, _typeof3.default)(entity)) == "object") {
		impel(FORMAT, OBJECT_FORMAT, cache);

		(0, _keys2.default)(entity).
		forEach(function onEachKey(key) {
			element = entity[key];

			key = U200b(path, key).join(".").replace(REFERENCE_PATTERN, "");

			if ((typeof element === "undefined" ? "undefined" : (0, _typeof3.default)(element)) == "object") {
				if (!compressed) {
					push(cache, key, element, limiter);
				}

				loosen(element, key, cache, compressed, depth, limiter);

			} else {
				push(cache, key, element, limiter);
			}
		});
	}

	burne(LOOSENED, cache);

	return cache;
};

module.exports = loosen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvb3Nlbi5zdXBwb3J0LmpzIl0sIm5hbWVzIjpbImJ1cm5lIiwicmVxdWlyZSIsImRlcGhlciIsImRvdWJ0IiwiaGFyZGVuIiwiaW1wZWwiLCJrYXJ2Iiwia2VpbiIsImtvdW50IiwibXJrZCIsIm10Y2giLCJwZXRyaWZpIiwicGxvdWdoIiwic2hmdCIsInRydWx5IiwiVTIwMGIiLCJ3aWNoZXZyIiwid2ljaGlzIiwiRE9UX1BBVFRFUk4iLCJGT1JNQVQiLCJMT09TRU5FRCIsIk1BUksiLCJSRUZFUkVOQ0VfUEFUVEVSTiIsIkFDQ1VNVUxBVE9SX1BBVFRFUk4iLCJwdXNoIiwiY2FjaGUiLCJrZXkiLCJlbGVtZW50IiwibGltaXRlciIsIkVycm9yIiwidGVzdCIsIkFSUkFZIiwibG9vc2VuIiwiZW50aXR5IiwicGF0aCIsImNvbXByZXNzZWQiLCJkZXB0aCIsInBhcmFtZXRlciIsImFyZ3VtZW50cyIsIlNUUklORyIsIk9CSkVDVCIsIkJPT0xFQU4iLCJOVU1CRVIiLCJJbmZpbml0eSIsIkZVTkNUSU9OIiwiaXNGaW5pdGUiLCJsZW5ndGgiLCJyZWZlcmVuY2UiLCJpbmRleCIsIkFSUkFZX0ZPUk1BVCIsImZvckVhY2giLCJvbkVhY2hFbGVtZW50Iiwiam9pbiIsInJlcGxhY2UiLCJvbkVhY2hLZXkiLCJwcm9wZXJ0eSIsImRhdGEiLCJsaXN0IiwiT0JKRUNUX0ZPUk1BVCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3RUEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLFFBQVFGLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUcsU0FBU0gsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNSSxRQUFRSixRQUFTLE9BQVQs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Qks7QUFDSkosU0FBTUMsS0FBTixFQUFhQyxHQUFiLEVBQWtCQyxPQUFsQixFQUEyQkMsT0FBM0I7QUFDQTtBQUNELEdBcENEOztBQXNDQSxFQXpDRCxNQXlDTSxJQUFJLFFBQU9LLE1BQVAsdURBQU9BLE1BQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDcEM1QixRQUFPYyxNQUFQLEVBQWV1QyxhQUFmLEVBQThCakMsS0FBOUI7O0FBRUEsc0JBQWFRLE1BQWI7QUFDRWlCLFNBREYsQ0FDVyxTQUFTSSxTQUFULENBQW9CNUIsR0FBcEIsRUFBeUI7QUFDbENDLGFBQVVNLE9BQVFQLEdBQVIsQ0FBVjs7QUFFQUEsU0FBTVgsTUFBT21CLElBQVAsRUFBYVIsR0FBYixFQUFtQjBCLElBQW5CLENBQXlCLEdBQXpCLEVBQStCQyxPQUEvQixDQUF3Qy9CLGlCQUF4QyxFQUEyRCxFQUEzRCxDQUFOOztBQUVBLE9BQUksUUFBT0ssT0FBUCx1REFBT0EsT0FBUCxNQUFrQixRQUF0QixFQUFnQztBQUMvQixRQUFJLENBQUNRLFVBQUwsRUFBaUI7QUFDaEJYLFVBQU1DLEtBQU4sRUFBYUMsR0FBYixFQUFrQkMsT0FBbEIsRUFBMkJDLE9BQTNCO0FBQ0E7O0FBRURJLFdBQVFMLE9BQVIsRUFBaUJELEdBQWpCLEVBQXNCRCxLQUF0QixFQUE2QlUsVUFBN0IsRUFBeUNDLEtBQXpDLEVBQWdEUixPQUFoRDs7QUFFQSxJQVBELE1BT0s7QUFDSkosU0FBTUMsS0FBTixFQUFhQyxHQUFiLEVBQWtCQyxPQUFsQixFQUEyQkMsT0FBM0I7QUFDQTtBQUNELEdBaEJGO0FBaUJBOztBQUVENUIsT0FBT29CLFFBQVAsRUFBaUJLLEtBQWpCOztBQUVBLFFBQU9BLEtBQVA7QUFDQSxDQTVJRDs7QUE4SUFrQyxPQUFPQyxPQUFQLEdBQWlCNUIsTUFBakIiLCJmaWxlIjoibG9vc2VuLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qO1xyXG5cdEBtb2R1bGUtbGljZW5zZTpcclxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxyXG5cdFx0QG1pdC1saWNlbnNlXHJcblxyXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxyXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXHJcblxyXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblx0XHRTT0ZUV0FSRS5cclxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXHJcblxyXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcclxuXHRcdHtcclxuXHRcdFx0XCJwYWNrYWdlXCI6IFwibG9vc2VuXCIsXHJcblx0XHRcdFwicGF0aFwiOiBcImxvb3Nlbi9sb29zZW4uanNcIixcclxuXHRcdFx0XCJmaWxlXCI6IFwibG9vc2VuLmpzXCIsXHJcblx0XHRcdFwibW9kdWxlXCI6IFwibG9vc2VuXCIsXHJcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXHJcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXHJcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcclxuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcclxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcclxuXHRcdFx0XSxcclxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2xvb3Nlbi5naXRcIixcclxuXHRcdFx0XCJ0ZXN0XCI6IFwibG9vc2VuLXRlc3QuanNcIixcclxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxyXG5cdFx0fVxyXG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cclxuXHJcblx0QG1vZHVsZS1kb2N1bWVudGF0aW9uOlxyXG5cdFx0VHJhbnNmb3JtIGRlZXAgb2JqZWN0IGludG8gc2hhbGxvdyBvYmplY3QuXHJcblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxyXG5cclxuXHRAaW5jbHVkZTpcclxuXHRcdHtcclxuXHRcdFx0XCJidXJuZVwiOiBcImJ1cm5lXCIsXHJcblx0XHRcdFwiZGVwaGVyXCI6IFwiZGVwaGVyXCIsXHJcblx0XHRcdFwiZG91YnRcIjogXCJkb3VidFwiLFxyXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxyXG5cdFx0XHRcImltcGVsXCI6IFwiaW1wZWxcIixcclxuXHRcdFx0XCJrYXJ2XCI6IFwia2FydlwiLFxyXG5cdFx0XHRcImtlaW5cIjogXCJrZWluXCIsXHJcblx0XHRcdFwia291bnRcIjogXCJrb3VudFwiLFxyXG5cdFx0XHRcIm1ya2RcIjogXCJtcmtkXCIsXHJcblx0XHRcdFwibXRjaFwiOiBcIm10Y2hcIixcclxuXHRcdFx0XCJwZXRyaWZpXCI6IFwicGV0cmlmaVwiLFxyXG5cdFx0XHRcInBsb3VnaFwiOiBcInBsb3VnaFwiLFxyXG5cdFx0XHRcInNoZnRcIjogXCJzaGZ0XCIsXHJcblx0XHRcdFwidHJ1bHlcIjogXCJ0cnVseVwiLFxyXG5cdFx0XHRcIlUyMDBiXCI6IFwidTIwMGJcIixcclxuXHRcdFx0XCJ3aWNoZXZyXCI6IFwid2ljaGV2clwiLFxyXG5cdFx0XHRcIndpY2hpc1wiOiBcIndpY2hpc1wiXHJcblx0XHR9XHJcblx0QGVuZC1pbmNsdWRlXHJcbiovXHJcblxyXG5jb25zdCBidXJuZSA9IHJlcXVpcmUoIFwiYnVybmVcIiApO1xyXG5jb25zdCBkZXBoZXIgPSByZXF1aXJlKCBcImRlcGhlclwiICk7XHJcbmNvbnN0IGRvdWJ0ID0gcmVxdWlyZSggXCJkb3VidFwiICk7XHJcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcclxuY29uc3QgaW1wZWwgPSByZXF1aXJlKCBcImltcGVsXCIgKTtcclxuY29uc3Qga2FydiA9IHJlcXVpcmUoIFwia2FydlwiICk7XHJcbmNvbnN0IGtlaW4gPSByZXF1aXJlKCBcImtlaW5cIiApO1xyXG5jb25zdCBrb3VudCA9IHJlcXVpcmUoIFwia291bnRcIiApO1xyXG5jb25zdCBtcmtkID0gcmVxdWlyZSggXCJtcmtkXCIgKTtcclxuY29uc3QgbXRjaCA9IHJlcXVpcmUoIFwibXRjaFwiICk7XHJcbmNvbnN0IHBldHJpZmkgPSByZXF1aXJlKCBcInBldHJpZmlcIiApO1xyXG5jb25zdCBwbG91Z2ggPSByZXF1aXJlKCBcInBsb3VnaFwiICk7XHJcbmNvbnN0IHNoZnQgPSByZXF1aXJlKCBcInNoZnRcIiApO1xyXG5jb25zdCB0cnVseSA9IHJlcXVpcmUoIFwidHJ1bHlcIiApO1xyXG5jb25zdCBVMjAwYiA9IHJlcXVpcmUoIFwidTIwMGJcIiApO1xyXG5jb25zdCB3aWNoZXZyID0gcmVxdWlyZSggXCJ3aWNoZXZyXCIgKTtcclxuY29uc3Qgd2ljaGlzID0gcmVxdWlyZSggXCJ3aWNoaXNcIiApO1xyXG5cclxuLyo7XHJcblx0QG5vdGU6XHJcblx0XHRUaGUgZG90IHBhdHRlcm4gc2hvdWxkIGp1c3QgY2hlY2sgbm9uLWFjY3VtdWxhdG9yIHN5bWJvbHMuXHJcblx0QGVuZC1ub3RlXHJcbiovXHJcbmNvbnN0IERPVF9QQVRURVJOID0gL1xcLnsxfS9nO1xyXG5jb25zdCBGT1JNQVQgPSBTeW1ib2wuZm9yKCBcImZvcm1hdFwiICk7XHJcbmNvbnN0IExPT1NFTkVEID0gU3ltYm9sKCBcImxvb3NlbmVkXCIgKTtcclxuY29uc3QgTUFSSyA9IFN5bWJvbCggXCJtYXJrXCIgKTtcclxuY29uc3QgUkVGRVJFTkNFX1BBVFRFUk4gPSAvXlxcLi87XHJcbmNvbnN0IEFDQ1VNVUxBVE9SX1BBVFRFUk4gPSAvXFwuezN9LztcclxuXHJcbmhhcmRlbiggXCJBUlJBWV9GT1JNQVRcIiwgXCJhcnJheS1mb3JtYXRcIiApO1xyXG5oYXJkZW4oIFwiT0JKRUNUX0ZPUk1BVFwiLCBcIm9iamVjdC1mb3JtYXRcIiApO1xyXG5cclxuLyo7XHJcblx0QGludGVybmFsLW1ldGhvZC1kb2N1bWVudGF0aW9uOlxyXG5cdFx0V2Ugc2VwYXJhdGUgdGhlIHB1c2ggZnVuY3Rpb24gYmVjYXVzZSB0aGlzIHdpbGwgbWFuYWdlIGlmIHRoZSBrZXlcclxuXHRcdFx0aXMgYW4gYWNjdW11bGF0b3IgcGF0aCBhbmQgc2hvdWxkIGFjY3VtdWxhdGUgdmFsdWVzLlxyXG5cdEBlbmQtaW50ZXJuYWwtbWV0aG9kLWRvY3VtZW50YXRpb25cclxuKi9cclxuY29uc3QgcHVzaCA9IGZ1bmN0aW9uIHB1c2goIGNhY2hlLCBrZXksIGVsZW1lbnQsIGxpbWl0ZXIgKXtcclxuXHQvKjtcclxuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XHJcblx0XHRcdHtcclxuXHRcdFx0XHRcImNhY2hlOnJlcXVpcmVkXCI6IFwib2JqZWN0XCIsXHJcblx0XHRcdFx0XCJrZXk6cmVxdWlyZWRcIjogXCJzdHJpbmdcIixcclxuXHRcdFx0XHRcImVsZW1lbnQ6cmVxdWlyZWRcIjogXCIqXCIsXHJcblx0XHRcdFx0XCJsaW1pdGVyXCI6IFwiZnVuY3Rpb25cIlxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGlmKCB0eXBlb2YgY2FjaGUgIT0gXCJvYmplY3RcIiApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY2FjaGVcIiApO1xyXG5cdH1cclxuXHJcblx0aWYoIHR5cGVvZiBrZXkgIT0gXCJzdHJpbmdcIiApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQga2V5XCIgKTtcclxuXHR9XHJcblxyXG5cdGlmKCBsaW1pdGVyKCBlbGVtZW50LCBrZXkgKSApe1xyXG5cdFx0cmV0dXJuIGNhY2hlO1xyXG5cdH1cclxuXHJcblx0aWYoIEFDQ1VNVUxBVE9SX1BBVFRFUk4udGVzdCgga2V5ICkgJiYga2Vpbigga2V5LCBjYWNoZSApICYmICFkb3VidCggZWxlbWVudCwgQVJSQVkgKSApe1xyXG5cdFx0Y2FjaGVbIGtleSBdID0gcGxvdWdoKCBjYWNoZVsga2V5IF0sIGVsZW1lbnQgKTtcclxuXHJcblx0fWVsc2V7XHJcblx0XHRjYWNoZVsga2V5IF0gPSBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNhY2hlO1xyXG59O1xyXG5cclxuY29uc3QgbG9vc2VuID0gZnVuY3Rpb24gbG9vc2VuKCBlbnRpdHksIHBhdGgsIGNhY2hlLCBjb21wcmVzc2VkLCBkZXB0aCwgbGltaXRlciApe1xyXG5cdC8qO1xyXG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwiZW50aXR5OnJlcXVpcmVkXCI6IFtcclxuXHRcdFx0XHRcdEFycmF5LFxyXG5cdFx0XHRcdFx0XCJvYmplY3RcIlxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0XCJwYXRoXCI6IFwic3RyaW5nXCIsXHJcblx0XHRcdFx0XCJjYWNoZVwiOiBcIm9iamVjdFwiLFxyXG5cdFx0XHRcdFwiY29tcHJlc3NlZFwiOiBcImJvb2xlYW5cIixcclxuXHRcdFx0XHRcImRlcHRoXCI6IFwibnVtYmVyXCIsXHJcblx0XHRcdFx0XCJsaW1pdGVyXCI6IFwiZnVuY3Rpb25cIlxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGlmKCB0eXBlb2YgZW50aXR5ICE9IFwib2JqZWN0XCIgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGVudGl0eVwiICk7XHJcblx0fVxyXG5cclxuXHRlbnRpdHkgPSB3aWNoaXMoIGVudGl0eSwgeyB9ICk7XHJcblxyXG5cdGlmKCBtcmtkKCBMT09TRU5FRCwgZW50aXR5LCB0cnVlICkgKXtcclxuXHRcdHJldHVybiBlbnRpdHk7XHJcblx0fVxyXG5cclxuXHRsZXQgcGFyYW1ldGVyID0gc2hmdCggYXJndW1lbnRzICk7XHJcblxyXG5cdHBhdGggPSBkZXBoZXIoIHBhcmFtZXRlciwgU1RSSU5HLCBcIlwiICk7XHJcblxyXG5cdGNhY2hlID0gZGVwaGVyKCBwYXJhbWV0ZXIsIE9CSkVDVCwgeyB9ICk7XHJcblxyXG5cdGNvbXByZXNzZWQgPSBkZXBoZXIoIHBhcmFtZXRlciwgQk9PTEVBTiwgZmFsc2UgKTtcclxuXHJcblx0ZGVwdGggPSBkZXBoZXIoIHBhcmFtZXRlciwgTlVNQkVSLCBJbmZpbml0eSApO1xyXG5cclxuXHRsaW1pdGVyID0gZGVwaGVyKCBwYXJhbWV0ZXIsIEZVTkNUSU9OLCBmdW5jdGlvbiBsaW1pdGVyKCBlbGVtZW50LCBrZXkgKXsgcmV0dXJuIGZhbHNlOyB9ICk7XHJcblxyXG5cdC8qO1xyXG5cdFx0QG5vdGU6XHJcblx0XHRcdElmIGRlcHRoIGlzIG5vdCBpbmZpbml0ZSBvciBmYWxzeSwgdGhlbiBpdCB3aWxsIHByb2Nlc3Mgb25seSBvbiB0aGF0IGxldmVsXHJcblx0XHRcdFx0YW5kIHdlIGNhbiBkaXNyZWdhcmQgb3RoZXIgZGF0YS5cclxuXHRcdEBlbmQtbm90ZVxyXG5cdCovXHJcblx0aWYoIHRydWx5KCBkZXB0aCApICYmIGlzRmluaXRlKCBkZXB0aCApICYmXHJcblx0XHR0cnVseSggcGF0aCApICYmIG10Y2goIHBhdGgsIERPVF9QQVRURVJOICkubGVuZ3RoID09IGRlcHRoIClcclxuXHR7XHJcblx0XHRyZXR1cm4gY2FjaGU7XHJcblx0fVxyXG5cclxuXHQvKjtcclxuXHRcdEBub3RlOlxyXG5cdFx0XHRUaGUgZm9sbG93aW5nIGxpbmVzIG9mIGNvZGUgd2lsbCByZXNvbHZlIHBvc3NpYmxlIGlzc3Vlc1xyXG5cdFx0XHRcdHdpdGggY2lyY3VsYXIgZGVwZW5kZW5jeSwgZnJvemVuLCBzZWFsZWQgYW5kIG5vbi1leHRlbnNpYmxlIG9iamVjdHMuXHJcblx0XHRAZW5kLW5vdGVcclxuXHQqL1xyXG5cdGVudGl0eSA9IGthcnYoIGVudGl0eSApO1xyXG5cclxuXHRoYXJkZW4oIFwicmVmZXJlbmNlXCIsIHdpY2hpcyggY2FjaGUucmVmZXJlbmNlLCB7IH0gKSwgY2FjaGUgKTtcclxuXHJcblx0bGV0IHJlZmVyZW5jZSA9IGNhY2hlLnJlZmVyZW5jZTtcclxuXHRsZXQgaW5kZXggPSBrb3VudCggcmVmZXJlbmNlICk7XHJcblxyXG5cdGlmKCBrZWluKCBpbmRleCwgcmVmZXJlbmNlICkgfHxcclxuXHRcdCgga2VpbiggTUFSSywgZW50aXR5ICkgJiYga2VpbiggZW50aXR5WyBNQVJLIF0sIHJlZmVyZW5jZSApICkgKVxyXG5cdHtcclxuXHRcdHJldHVybiBjYWNoZTtcclxuXHR9XHJcblxyXG5cdGVudGl0eVsgTUFSSyBdID0gaW5kZXg7XHJcblx0cGV0cmlmaSggaW5kZXgsIHRydWUsIHJlZmVyZW5jZSApO1xyXG5cclxuXHRsZXQgZWxlbWVudCA9IG51bGw7XHJcblx0aWYoIGRvdWJ0KCBlbnRpdHksIEFSUkFZICkgKXtcclxuXHRcdGltcGVsKCBGT1JNQVQsIEFSUkFZX0ZPUk1BVCwgY2FjaGUgKTtcclxuXHJcblx0XHRlbnRpdHkuZm9yRWFjaCggZnVuY3Rpb24gb25FYWNoRWxlbWVudCggZWxlbWVudCwgaW5kZXggKXtcclxuXHRcdFx0bGV0IGtleSA9IFUyMDBiKCBwYXRoLCBpbmRleCApLmpvaW4oIFwiLlwiICkucmVwbGFjZSggUkVGRVJFTkNFX1BBVFRFUk4sIFwiXCIgKTtcclxuXHJcblx0XHRcdGlmKCB0eXBlb2YgZWxlbWVudCA9PSBcIm9iamVjdFwiICl7XHJcblx0XHRcdFx0aWYoICFjb21wcmVzc2VkICl7XHJcblx0XHRcdFx0XHRwdXNoKCBjYWNoZSwga2V5LCBlbGVtZW50LCBsaW1pdGVyICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRsb29zZW4oIGVsZW1lbnQsIGtleSwgY2FjaGUsIGNvbXByZXNzZWQsIGRlcHRoLCBsaW1pdGVyICk7XHJcblxyXG5cdFx0XHRcdC8qO1xyXG5cdFx0XHRcdFx0QG5vdGU6XHJcblx0XHRcdFx0XHRcdFRoaXMgaXMgdGhlIGFjY3VtdWxhdG9yIGxvZ2ljLlxyXG5cclxuXHRcdFx0XHRcdFx0VGhpcyB3aWxsIHRyeSB0byBhY2N1bXVsYXRlIHZhbHVlcyBvZiB0aGUgc2FtZSBwYXRoLlxyXG5cdFx0XHRcdFx0QGVuZC1ub3RlXHJcblx0XHRcdFx0Ki9cclxuXHRcdFx0XHRpZiggIWNvbXByZXNzZWQgKXtcclxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKCBlbGVtZW50ICkuZm9yRWFjaCggZnVuY3Rpb24gb25FYWNoS2V5KCBwcm9wZXJ0eSApe1xyXG5cdFx0XHRcdFx0XHRsZXQga2V5ID0gVTIwMGIoIHBhdGgsIHByb3BlcnR5IClcclxuXHRcdFx0XHRcdFx0XHQuam9pbiggXCIuLi5cIiApLnJlcGxhY2UoIFJFRkVSRU5DRV9QQVRURVJOLCBcIlwiICk7XHJcblxyXG5cdFx0XHRcdFx0XHRsZXQgZGF0YSA9IGVsZW1lbnRbIHByb3BlcnR5IF07XHJcblxyXG5cdFx0XHRcdFx0XHRsZXQgbGlzdCA9IGNhY2hlWyBrZXkgXSA9IHdpY2hldnIoIGNhY2hlWyBrZXkgXSwgWyBdICk7XHJcblx0XHRcdFx0XHRcdGxpc3QucHVzaCggZGF0YSApO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIgKXtcclxuXHRcdFx0XHRcdFx0XHRsb29zZW4oIGRhdGEsIGtleSwgY2FjaGUsIGNvbXByZXNzZWQsIGRlcHRoLCBsaW1pdGVyICk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRwdXNoKCBjYWNoZSwga2V5LCBlbGVtZW50LCBsaW1pdGVyICk7XHJcblx0XHRcdH1cclxuXHRcdH0gKTtcclxuXHJcblx0fWVsc2UgaWYoIHR5cGVvZiBlbnRpdHkgPT0gXCJvYmplY3RcIiApe1xyXG5cdFx0aW1wZWwoIEZPUk1BVCwgT0JKRUNUX0ZPUk1BVCwgY2FjaGUgKTtcclxuXHJcblx0XHRPYmplY3Qua2V5cyggZW50aXR5IClcclxuXHRcdFx0LmZvckVhY2goIGZ1bmN0aW9uIG9uRWFjaEtleSgga2V5ICl7XHJcblx0XHRcdFx0ZWxlbWVudCA9IGVudGl0eVsga2V5IF07XHJcblxyXG5cdFx0XHRcdGtleSA9IFUyMDBiKCBwYXRoLCBrZXkgKS5qb2luKCBcIi5cIiApLnJlcGxhY2UoIFJFRkVSRU5DRV9QQVRURVJOLCBcIlwiICk7XHJcblxyXG5cdFx0XHRcdGlmKCB0eXBlb2YgZWxlbWVudCA9PSBcIm9iamVjdFwiICl7XHJcblx0XHRcdFx0XHRpZiggIWNvbXByZXNzZWQgKXtcclxuXHRcdFx0XHRcdFx0cHVzaCggY2FjaGUsIGtleSwgZWxlbWVudCwgbGltaXRlciApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGxvb3NlbiggZWxlbWVudCwga2V5LCBjYWNoZSwgY29tcHJlc3NlZCwgZGVwdGgsIGxpbWl0ZXIgKTtcclxuXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRwdXNoKCBjYWNoZSwga2V5LCBlbGVtZW50LCBsaW1pdGVyICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ICk7XHJcblx0fVxyXG5cclxuXHRidXJuZSggTE9PU0VORUQsIGNhY2hlICk7XHJcblxyXG5cdHJldHVybiBjYWNoZTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbG9vc2VuO1xyXG4iXX0=
//# sourceMappingURL=loosen.support.js.map
