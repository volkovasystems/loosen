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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvb3Nlbi5zdXBwb3J0LmpzIl0sIm5hbWVzIjpbImJ1cm5lIiwicmVxdWlyZSIsImRlcGhlciIsImRvdWJ0IiwiaGFyZGVuIiwiaW1wZWwiLCJrYXJ2Iiwia2VpbiIsImtvdW50IiwibXJrZCIsIm10Y2giLCJwZXRyaWZpIiwicGxvdWdoIiwic2hmdCIsInRydWx5IiwiVTIwMGIiLCJ3aWNoZXZyIiwid2ljaGlzIiwiRE9UX1BBVFRFUk4iLCJGT1JNQVQiLCJMT09TRU5FRCIsIk1BUksiLCJSRUZFUkVOQ0VfUEFUVEVSTiIsIkFDQ1VNVUxBVE9SX1BBVFRFUk4iLCJwdXNoIiwiY2FjaGUiLCJrZXkiLCJlbGVtZW50IiwibGltaXRlciIsIkVycm9yIiwidGVzdCIsIkFSUkFZIiwibG9vc2VuIiwiZW50aXR5IiwicGF0aCIsImNvbXByZXNzZWQiLCJkZXB0aCIsInBhcmFtZXRlciIsImFyZ3VtZW50cyIsIlNUUklORyIsIk9CSkVDVCIsIkJPT0xFQU4iLCJOVU1CRVIiLCJJbmZpbml0eSIsIkZVTkNUSU9OIiwiaXNGaW5pdGUiLCJsZW5ndGgiLCJyZWZlcmVuY2UiLCJpbmRleCIsIkFSUkFZX0ZPUk1BVCIsImZvckVhY2giLCJvbkVhY2hFbGVtZW50Iiwiam9pbiIsInJlcGxhY2UiLCJvbkVhY2hLZXkiLCJwcm9wZXJ0eSIsImRhdGEiLCJsaXN0IiwiT0JKRUNUX0ZPUk1BVCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3RUEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLFFBQVFGLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUcsU0FBU0gsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNSSxRQUFRSixRQUFTLE9BQVQs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Qks7QUFDSkosU0FBTUMsS0FBTixFQUFhQyxHQUFiLEVBQWtCQyxPQUFsQixFQUEyQkMsT0FBM0I7QUFDQTtBQUNELEdBcENEOztBQXNDQSxFQXpDRCxNQXlDTSxJQUFJLFFBQU9LLE1BQVAsdURBQU9BLE1BQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDcEM1QixRQUFPYyxNQUFQLEVBQWV1QyxhQUFmLEVBQThCakMsS0FBOUI7O0FBRUEsc0JBQWFRLE1BQWI7QUFDRWlCLFNBREYsQ0FDVyxTQUFTSSxTQUFULENBQW9CNUIsR0FBcEIsRUFBeUI7QUFDbENDLGFBQVVNLE9BQVFQLEdBQVIsQ0FBVjs7QUFFQUEsU0FBTVgsTUFBT21CLElBQVAsRUFBYVIsR0FBYixFQUFtQjBCLElBQW5CLENBQXlCLEdBQXpCLEVBQStCQyxPQUEvQixDQUF3Qy9CLGlCQUF4QyxFQUEyRCxFQUEzRCxDQUFOOztBQUVBLE9BQUksUUFBT0ssT0FBUCx1REFBT0EsT0FBUCxNQUFrQixRQUF0QixFQUFnQztBQUMvQixRQUFJLENBQUNRLFVBQUwsRUFBaUI7QUFDaEJYLFVBQU1DLEtBQU4sRUFBYUMsR0FBYixFQUFrQkMsT0FBbEIsRUFBMkJDLE9BQTNCO0FBQ0E7O0FBRURJLFdBQVFMLE9BQVIsRUFBaUJELEdBQWpCLEVBQXNCRCxLQUF0QixFQUE2QlUsVUFBN0IsRUFBeUNDLEtBQXpDLEVBQWdEUixPQUFoRDs7QUFFQSxJQVBELE1BT0s7QUFDSkosU0FBTUMsS0FBTixFQUFhQyxHQUFiLEVBQWtCQyxPQUFsQixFQUEyQkMsT0FBM0I7QUFDQTtBQUNELEdBaEJGO0FBaUJBOztBQUVENUIsT0FBT29CLFFBQVAsRUFBaUJLLEtBQWpCOztBQUVBLFFBQU9BLEtBQVA7QUFDQSxDQTVJRDs7QUE4SUFrQyxPQUFPQyxPQUFQLEdBQWlCNUIsTUFBakIiLCJmaWxlIjoibG9vc2VuLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImxvb3NlblwiLFxuXHRcdFx0XCJwYXRoXCI6IFwibG9vc2VuL2xvb3Nlbi5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwibG9vc2VuLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcImxvb3NlblwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiLFxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvbG9vc2VuLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwibG9vc2VuLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0VHJhbnNmb3JtIGRlZXAgb2JqZWN0IGludG8gc2hhbGxvdyBvYmplY3QuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImJ1cm5lXCI6IFwiYnVybmVcIixcblx0XHRcdFwiZGVwaGVyXCI6IFwiZGVwaGVyXCIsXG5cdFx0XHRcImRvdWJ0XCI6IFwiZG91YnRcIixcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXG5cdFx0XHRcImltcGVsXCI6IFwiaW1wZWxcIixcblx0XHRcdFwia2FydlwiOiBcImthcnZcIixcblx0XHRcdFwia2VpblwiOiBcImtlaW5cIixcblx0XHRcdFwia291bnRcIjogXCJrb3VudFwiLFxuXHRcdFx0XCJtcmtkXCI6IFwibXJrZFwiLFxuXHRcdFx0XCJtdGNoXCI6IFwibXRjaFwiLFxuXHRcdFx0XCJwZXRyaWZpXCI6IFwicGV0cmlmaVwiLFxuXHRcdFx0XCJwbG91Z2hcIjogXCJwbG91Z2hcIixcblx0XHRcdFwic2hmdFwiOiBcInNoZnRcIixcblx0XHRcdFwidHJ1bHlcIjogXCJ0cnVseVwiLFxuXHRcdFx0XCJVMjAwYlwiOiBcInUyMDBiXCIsXG5cdFx0XHRcIndpY2hldnJcIjogXCJ3aWNoZXZyXCIsXG5cdFx0XHRcIndpY2hpc1wiOiBcIndpY2hpc1wiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGJ1cm5lID0gcmVxdWlyZSggXCJidXJuZVwiICk7XG5jb25zdCBkZXBoZXIgPSByZXF1aXJlKCBcImRlcGhlclwiICk7XG5jb25zdCBkb3VidCA9IHJlcXVpcmUoIFwiZG91YnRcIiApO1xuY29uc3QgaGFyZGVuID0gcmVxdWlyZSggXCJoYXJkZW5cIiApO1xuY29uc3QgaW1wZWwgPSByZXF1aXJlKCBcImltcGVsXCIgKTtcbmNvbnN0IGthcnYgPSByZXF1aXJlKCBcImthcnZcIiApO1xuY29uc3Qga2VpbiA9IHJlcXVpcmUoIFwia2VpblwiICk7XG5jb25zdCBrb3VudCA9IHJlcXVpcmUoIFwia291bnRcIiApO1xuY29uc3QgbXJrZCA9IHJlcXVpcmUoIFwibXJrZFwiICk7XG5jb25zdCBtdGNoID0gcmVxdWlyZSggXCJtdGNoXCIgKTtcbmNvbnN0IHBldHJpZmkgPSByZXF1aXJlKCBcInBldHJpZmlcIiApO1xuY29uc3QgcGxvdWdoID0gcmVxdWlyZSggXCJwbG91Z2hcIiApO1xuY29uc3Qgc2hmdCA9IHJlcXVpcmUoIFwic2hmdFwiICk7XG5jb25zdCB0cnVseSA9IHJlcXVpcmUoIFwidHJ1bHlcIiApO1xuY29uc3QgVTIwMGIgPSByZXF1aXJlKCBcInUyMDBiXCIgKTtcbmNvbnN0IHdpY2hldnIgPSByZXF1aXJlKCBcIndpY2hldnJcIiApO1xuY29uc3Qgd2ljaGlzID0gcmVxdWlyZSggXCJ3aWNoaXNcIiApO1xuXG4vKjtcblx0QG5vdGU6XG5cdFx0VGhlIGRvdCBwYXR0ZXJuIHNob3VsZCBqdXN0IGNoZWNrIG5vbi1hY2N1bXVsYXRvciBzeW1ib2xzLlxuXHRAZW5kLW5vdGVcbiovXG5jb25zdCBET1RfUEFUVEVSTiA9IC9cXC57MX0vZztcbmNvbnN0IEZPUk1BVCA9IFN5bWJvbC5mb3IoIFwiZm9ybWF0XCIgKTtcbmNvbnN0IExPT1NFTkVEID0gU3ltYm9sKCBcImxvb3NlbmVkXCIgKTtcbmNvbnN0IE1BUksgPSBTeW1ib2woIFwibWFya1wiICk7XG5jb25zdCBSRUZFUkVOQ0VfUEFUVEVSTiA9IC9eXFwuLztcbmNvbnN0IEFDQ1VNVUxBVE9SX1BBVFRFUk4gPSAvXFwuezN9LztcblxuaGFyZGVuKCBcIkFSUkFZX0ZPUk1BVFwiLCBcImFycmF5LWZvcm1hdFwiICk7XG5oYXJkZW4oIFwiT0JKRUNUX0ZPUk1BVFwiLCBcIm9iamVjdC1mb3JtYXRcIiApO1xuXG4vKjtcblx0QGludGVybmFsLW1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFdlIHNlcGFyYXRlIHRoZSBwdXNoIGZ1bmN0aW9uIGJlY2F1c2UgdGhpcyB3aWxsIG1hbmFnZSBpZiB0aGUga2V5XG5cdFx0XHRpcyBhbiBhY2N1bXVsYXRvciBwYXRoIGFuZCBzaG91bGQgYWNjdW11bGF0ZSB2YWx1ZXMuXG5cdEBlbmQtaW50ZXJuYWwtbWV0aG9kLWRvY3VtZW50YXRpb25cbiovXG5jb25zdCBwdXNoID0gZnVuY3Rpb24gcHVzaCggY2FjaGUsIGtleSwgZWxlbWVudCwgbGltaXRlciApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImNhY2hlOnJlcXVpcmVkXCI6IFwib2JqZWN0XCIsXG5cdFx0XHRcdFwia2V5OnJlcXVpcmVkXCI6IFwic3RyaW5nXCIsXG5cdFx0XHRcdFwiZWxlbWVudDpyZXF1aXJlZFwiOiBcIipcIixcblx0XHRcdFx0XCJsaW1pdGVyXCI6IFwiZnVuY3Rpb25cIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoIHR5cGVvZiBjYWNoZSAhPSBcIm9iamVjdFwiICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY2FjaGVcIiApO1xuXHR9XG5cblx0aWYoIHR5cGVvZiBrZXkgIT0gXCJzdHJpbmdcIiApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGtleVwiICk7XG5cdH1cblxuXHRpZiggbGltaXRlciggZWxlbWVudCwga2V5ICkgKXtcblx0XHRyZXR1cm4gY2FjaGU7XG5cdH1cblxuXHRpZiggQUNDVU1VTEFUT1JfUEFUVEVSTi50ZXN0KCBrZXkgKSAmJiBrZWluKCBrZXksIGNhY2hlICkgJiYgIWRvdWJ0KCBlbGVtZW50LCBBUlJBWSApICl7XG5cdFx0Y2FjaGVbIGtleSBdID0gcGxvdWdoKCBjYWNoZVsga2V5IF0sIGVsZW1lbnQgKTtcblxuXHR9ZWxzZXtcblx0XHRjYWNoZVsga2V5IF0gPSBlbGVtZW50O1xuXHR9XG5cblx0cmV0dXJuIGNhY2hlO1xufTtcblxuY29uc3QgbG9vc2VuID0gZnVuY3Rpb24gbG9vc2VuKCBlbnRpdHksIHBhdGgsIGNhY2hlLCBjb21wcmVzc2VkLCBkZXB0aCwgbGltaXRlciApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImVudGl0eTpyZXF1aXJlZFwiOiBbXG5cdFx0XHRcdFx0QXJyYXksXG5cdFx0XHRcdFx0XCJvYmplY3RcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRcInBhdGhcIjogXCJzdHJpbmdcIixcblx0XHRcdFx0XCJjYWNoZVwiOiBcIm9iamVjdFwiLFxuXHRcdFx0XHRcImNvbXByZXNzZWRcIjogXCJib29sZWFuXCIsXG5cdFx0XHRcdFwiZGVwdGhcIjogXCJudW1iZXJcIixcblx0XHRcdFx0XCJsaW1pdGVyXCI6IFwiZnVuY3Rpb25cIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoIHR5cGVvZiBlbnRpdHkgIT0gXCJvYmplY3RcIiApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGVudGl0eVwiICk7XG5cdH1cblxuXHRlbnRpdHkgPSB3aWNoaXMoIGVudGl0eSwgeyB9ICk7XG5cblx0aWYoIG1ya2QoIExPT1NFTkVELCBlbnRpdHksIHRydWUgKSApe1xuXHRcdHJldHVybiBlbnRpdHk7XG5cdH1cblxuXHRsZXQgcGFyYW1ldGVyID0gc2hmdCggYXJndW1lbnRzICk7XG5cblx0cGF0aCA9IGRlcGhlciggcGFyYW1ldGVyLCBTVFJJTkcsIFwiXCIgKTtcblxuXHRjYWNoZSA9IGRlcGhlciggcGFyYW1ldGVyLCBPQkpFQ1QsIHsgfSApO1xuXG5cdGNvbXByZXNzZWQgPSBkZXBoZXIoIHBhcmFtZXRlciwgQk9PTEVBTiwgZmFsc2UgKTtcblxuXHRkZXB0aCA9IGRlcGhlciggcGFyYW1ldGVyLCBOVU1CRVIsIEluZmluaXR5ICk7XG5cblx0bGltaXRlciA9IGRlcGhlciggcGFyYW1ldGVyLCBGVU5DVElPTiwgZnVuY3Rpb24gbGltaXRlciggZWxlbWVudCwga2V5ICl7IHJldHVybiBmYWxzZTsgfSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0SWYgZGVwdGggaXMgbm90IGluZmluaXRlIG9yIGZhbHN5LCB0aGVuIGl0IHdpbGwgcHJvY2VzcyBvbmx5IG9uIHRoYXQgbGV2ZWxcblx0XHRcdFx0YW5kIHdlIGNhbiBkaXNyZWdhcmQgb3RoZXIgZGF0YS5cblx0XHRAZW5kLW5vdGVcblx0Ki9cblx0aWYoIHRydWx5KCBkZXB0aCApICYmIGlzRmluaXRlKCBkZXB0aCApICYmXG5cdFx0dHJ1bHkoIHBhdGggKSAmJiBtdGNoKCBwYXRoLCBET1RfUEFUVEVSTiApLmxlbmd0aCA9PSBkZXB0aCApXG5cdHtcblx0XHRyZXR1cm4gY2FjaGU7XG5cdH1cblxuXHQvKjtcblx0XHRAbm90ZTpcblx0XHRcdFRoZSBmb2xsb3dpbmcgbGluZXMgb2YgY29kZSB3aWxsIHJlc29sdmUgcG9zc2libGUgaXNzdWVzXG5cdFx0XHRcdHdpdGggY2lyY3VsYXIgZGVwZW5kZW5jeSwgZnJvemVuLCBzZWFsZWQgYW5kIG5vbi1leHRlbnNpYmxlIG9iamVjdHMuXG5cdFx0QGVuZC1ub3RlXG5cdCovXG5cdGVudGl0eSA9IGthcnYoIGVudGl0eSApO1xuXG5cdGhhcmRlbiggXCJyZWZlcmVuY2VcIiwgd2ljaGlzKCBjYWNoZS5yZWZlcmVuY2UsIHsgfSApLCBjYWNoZSApO1xuXG5cdGxldCByZWZlcmVuY2UgPSBjYWNoZS5yZWZlcmVuY2U7XG5cdGxldCBpbmRleCA9IGtvdW50KCByZWZlcmVuY2UgKTtcblxuXHRpZigga2VpbiggaW5kZXgsIHJlZmVyZW5jZSApIHx8XG5cdFx0KCBrZWluKCBNQVJLLCBlbnRpdHkgKSAmJiBrZWluKCBlbnRpdHlbIE1BUksgXSwgcmVmZXJlbmNlICkgKSApXG5cdHtcblx0XHRyZXR1cm4gY2FjaGU7XG5cdH1cblxuXHRlbnRpdHlbIE1BUksgXSA9IGluZGV4O1xuXHRwZXRyaWZpKCBpbmRleCwgdHJ1ZSwgcmVmZXJlbmNlICk7XG5cblx0bGV0IGVsZW1lbnQgPSBudWxsO1xuXHRpZiggZG91YnQoIGVudGl0eSwgQVJSQVkgKSApe1xuXHRcdGltcGVsKCBGT1JNQVQsIEFSUkFZX0ZPUk1BVCwgY2FjaGUgKTtcblxuXHRcdGVudGl0eS5mb3JFYWNoKCBmdW5jdGlvbiBvbkVhY2hFbGVtZW50KCBlbGVtZW50LCBpbmRleCApe1xuXHRcdFx0bGV0IGtleSA9IFUyMDBiKCBwYXRoLCBpbmRleCApLmpvaW4oIFwiLlwiICkucmVwbGFjZSggUkVGRVJFTkNFX1BBVFRFUk4sIFwiXCIgKTtcblxuXHRcdFx0aWYoIHR5cGVvZiBlbGVtZW50ID09IFwib2JqZWN0XCIgKXtcblx0XHRcdFx0aWYoICFjb21wcmVzc2VkICl7XG5cdFx0XHRcdFx0cHVzaCggY2FjaGUsIGtleSwgZWxlbWVudCwgbGltaXRlciApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bG9vc2VuKCBlbGVtZW50LCBrZXksIGNhY2hlLCBjb21wcmVzc2VkLCBkZXB0aCwgbGltaXRlciApO1xuXG5cdFx0XHRcdC8qO1xuXHRcdFx0XHRcdEBub3RlOlxuXHRcdFx0XHRcdFx0VGhpcyBpcyB0aGUgYWNjdW11bGF0b3IgbG9naWMuXG5cblx0XHRcdFx0XHRcdFRoaXMgd2lsbCB0cnkgdG8gYWNjdW11bGF0ZSB2YWx1ZXMgb2YgdGhlIHNhbWUgcGF0aC5cblx0XHRcdFx0XHRAZW5kLW5vdGVcblx0XHRcdFx0Ki9cblx0XHRcdFx0aWYoICFjb21wcmVzc2VkICl7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoIGVsZW1lbnQgKS5mb3JFYWNoKCBmdW5jdGlvbiBvbkVhY2hLZXkoIHByb3BlcnR5ICl7XG5cdFx0XHRcdFx0XHRsZXQga2V5ID0gVTIwMGIoIHBhdGgsIHByb3BlcnR5IClcblx0XHRcdFx0XHRcdFx0LmpvaW4oIFwiLi4uXCIgKS5yZXBsYWNlKCBSRUZFUkVOQ0VfUEFUVEVSTiwgXCJcIiApO1xuXG5cdFx0XHRcdFx0XHRsZXQgZGF0YSA9IGVsZW1lbnRbIHByb3BlcnR5IF07XG5cblx0XHRcdFx0XHRcdGxldCBsaXN0ID0gY2FjaGVbIGtleSBdID0gd2ljaGV2ciggY2FjaGVbIGtleSBdLCBbIF0gKTtcblx0XHRcdFx0XHRcdGxpc3QucHVzaCggZGF0YSApO1xuXG5cdFx0XHRcdFx0XHRpZiggdHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIiApe1xuXHRcdFx0XHRcdFx0XHRsb29zZW4oIGRhdGEsIGtleSwgY2FjaGUsIGNvbXByZXNzZWQsIGRlcHRoLCBsaW1pdGVyICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRwdXNoKCBjYWNoZSwga2V5LCBlbGVtZW50LCBsaW1pdGVyICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH1lbHNlIGlmKCB0eXBlb2YgZW50aXR5ID09IFwib2JqZWN0XCIgKXtcblx0XHRpbXBlbCggRk9STUFULCBPQkpFQ1RfRk9STUFULCBjYWNoZSApO1xuXG5cdFx0T2JqZWN0LmtleXMoIGVudGl0eSApXG5cdFx0XHQuZm9yRWFjaCggZnVuY3Rpb24gb25FYWNoS2V5KCBrZXkgKXtcblx0XHRcdFx0ZWxlbWVudCA9IGVudGl0eVsga2V5IF07XG5cblx0XHRcdFx0a2V5ID0gVTIwMGIoIHBhdGgsIGtleSApLmpvaW4oIFwiLlwiICkucmVwbGFjZSggUkVGRVJFTkNFX1BBVFRFUk4sIFwiXCIgKTtcblxuXHRcdFx0XHRpZiggdHlwZW9mIGVsZW1lbnQgPT0gXCJvYmplY3RcIiApe1xuXHRcdFx0XHRcdGlmKCAhY29tcHJlc3NlZCApe1xuXHRcdFx0XHRcdFx0cHVzaCggY2FjaGUsIGtleSwgZWxlbWVudCwgbGltaXRlciApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxvb3NlbiggZWxlbWVudCwga2V5LCBjYWNoZSwgY29tcHJlc3NlZCwgZGVwdGgsIGxpbWl0ZXIgKTtcblxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRwdXNoKCBjYWNoZSwga2V5LCBlbGVtZW50LCBsaW1pdGVyICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0fVxuXG5cdGJ1cm5lKCBMT09TRU5FRCwgY2FjaGUgKTtcblxuXHRyZXR1cm4gY2FjaGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvb3NlbjtcbiJdfQ==
//# sourceMappingURL=loosen.support.js.map
