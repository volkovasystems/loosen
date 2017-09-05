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
              */var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var assert = require("should");



//: @client:
var loosen = require("./loosen.support.js");
//: @end-client







//: @client:
describe("loosen", function () {

	describe("`loosen with deep object as entity`", function () {
		it("should transform deep object into shallow object", function () {
			var data = {
				"hello": {
					"world": {
						"yeah": 1,
						"ugh": false,
						"hi": [
						{
							"weeeh": {
								"yehey": 123 } },


						{
							"weeeh": {
								"yehey": 1234 } },


						"hello world",
						123,
						{
							"weeeeeeh": 12345 }] } } };






			var result = loosen(data);

			assert.equal((0, _keys2.default)(result).length, 17);
		});
	});

	describe("`loosen with entity and compressed parameters`", function () {
		it("should transform deep object into shallow object", function () {
			var data = {
				"hello": {
					"world": {
						"yeah": 1,
						"ugh": false,
						"hi": [
						{
							"weeeh": {
								"yehey": 123 } },


						{
							"weeeh": {
								"yehey": 1234 } },


						"hello world",
						123,
						{
							"weeeeeeh": 12345 }] } } };






			var result = loosen(data, true);

			assert.equal((0, _keys2.default)(result).length, 7);
		});
	});

	describe("`loosen with entity, compressed, and depth parameters`", function () {
		it("should only contain first level of loosened object", function () {
			var result = loosen(window, true, 1);

			assert.equal((0, _keys2.default)(result).length, 120);
		});
	});

	describe("`loosen with entity, compressed and limiter parameters`", function () {
		it("should return loosened object containing function data only", function () {
			var result = loosen(window, true, function (element) {return typeof element == "function";});

			assert.equal((0, _keys2.default)(result).length, 45);
		}).timeout(15000);
	});

});
//: @end-client
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Quc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJhc3NlcnQiLCJyZXF1aXJlIiwibG9vc2VuIiwiZGVzY3JpYmUiLCJpdCIsImRhdGEiLCJyZXN1bHQiLCJlcXVhbCIsImxlbmd0aCIsIndpbmRvdyIsImVsZW1lbnQiLCJ0aW1lb3V0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURBLElBQU1BLFNBQVNDLFFBQVMsUUFBVCxDQUFmOzs7O0FBSUE7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLHFCQUFULENBQWY7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBRSxTQUFVLFFBQVYsRUFBb0IsWUFBTzs7QUFFMUJBLFVBQVUscUNBQVYsRUFBaUQsWUFBTztBQUN2REMsS0FBSSxrREFBSixFQUF3RCxZQUFPO0FBQzlELE9BQUlDLE9BQU87QUFDVixhQUFTO0FBQ1IsY0FBUztBQUNSLGNBQVEsQ0FEQTtBQUVSLGFBQU8sS0FGQztBQUdSLFlBQU07QUFDTDtBQUNDLGdCQUFTO0FBQ1IsaUJBQVMsR0FERCxFQURWLEVBREs7OztBQU1MO0FBQ0MsZ0JBQVM7QUFDUixpQkFBUyxJQURELEVBRFYsRUFOSzs7O0FBV0wsbUJBWEs7QUFZTCxTQVpLO0FBYUw7QUFDQyxtQkFBWSxLQURiLEVBYkssQ0FIRSxFQURELEVBREMsRUFBWDs7Ozs7OztBQTBCQSxPQUFJQyxTQUFTSixPQUFRRyxJQUFSLENBQWI7O0FBRUFMLFVBQU9PLEtBQVAsQ0FBYyxvQkFBYUQsTUFBYixFQUFzQkUsTUFBcEMsRUFBNEMsRUFBNUM7QUFDQSxHQTlCRDtBQStCQSxFQWhDRDs7QUFrQ0FMLFVBQVUsZ0RBQVYsRUFBNEQsWUFBTztBQUNsRUMsS0FBSSxrREFBSixFQUF3RCxZQUFPO0FBQzlELE9BQUlDLE9BQU87QUFDVixhQUFTO0FBQ1IsY0FBUztBQUNSLGNBQVEsQ0FEQTtBQUVSLGFBQU8sS0FGQztBQUdSLFlBQU07QUFDTDtBQUNDLGdCQUFTO0FBQ1IsaUJBQVMsR0FERCxFQURWLEVBREs7OztBQU1MO0FBQ0MsZ0JBQVM7QUFDUixpQkFBUyxJQURELEVBRFYsRUFOSzs7O0FBV0wsbUJBWEs7QUFZTCxTQVpLO0FBYUw7QUFDQyxtQkFBWSxLQURiLEVBYkssQ0FIRSxFQURELEVBREMsRUFBWDs7Ozs7OztBQTBCQSxPQUFJQyxTQUFTSixPQUFRRyxJQUFSLEVBQWMsSUFBZCxDQUFiOztBQUVBTCxVQUFPTyxLQUFQLENBQWMsb0JBQWFELE1BQWIsRUFBc0JFLE1BQXBDLEVBQTRDLENBQTVDO0FBQ0EsR0E5QkQ7QUErQkEsRUFoQ0Q7O0FBa0NBTCxVQUFVLHdEQUFWLEVBQW9FLFlBQU87QUFDMUVDLEtBQUksb0RBQUosRUFBMEQsWUFBTztBQUNoRSxPQUFJRSxTQUFTSixPQUFRTyxNQUFSLEVBQWdCLElBQWhCLEVBQXNCLENBQXRCLENBQWI7O0FBRUFULFVBQU9PLEtBQVAsQ0FBYyxvQkFBYUQsTUFBYixFQUFzQkUsTUFBcEMsRUFBNEMsR0FBNUM7QUFDQSxHQUpEO0FBS0EsRUFORDs7QUFRQUwsVUFBVSx5REFBVixFQUFxRSxZQUFPO0FBQzNFQyxLQUFJLDZEQUFKLEVBQW1FLFlBQU87QUFDekUsT0FBSUUsU0FBU0osT0FBUU8sTUFBUixFQUFnQixJQUFoQixFQUFzQixVQUFFQyxPQUFGLEVBQWUsQ0FBRSxPQUFPLE9BQU9BLE9BQVAsSUFBa0IsVUFBekIsQ0FBc0MsQ0FBN0UsQ0FBYjs7QUFFQVYsVUFBT08sS0FBUCxDQUFjLG9CQUFhRCxNQUFiLEVBQXNCRSxNQUFwQyxFQUE0QyxFQUE1QztBQUNBLEdBSkQsRUFJSUcsT0FKSixDQUlhLEtBSmI7QUFLQSxFQU5EOztBQVFBLENBdEZEO0FBdUZBIiwiZmlsZSI6InRlc3Quc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QHRlc3QtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLXRlc3QtbGljZW5zZVxuXG5cdEB0ZXN0LWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwibG9vc2VuXCIsXG5cdFx0XHRcInBhdGhcIjogXCJsb29zZW4vdGVzdC5tb2R1bGUuanNcIixcblx0XHRcdFwiZmlsZVwiOiBcInRlc3QubW9kdWxlLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcInRlc3RcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2xvb3Nlbi5naXRcIlxuXHRcdH1cblx0QGVuZC10ZXN0LWNvbmZpZ3VyYXRpb25cblxuXHRAdGVzdC1kb2N1bWVudGF0aW9uOlxuXG5cdEBlbmQtdGVzdC1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc3NlcnRcIjogXCJzaG91bGRcIixcblx0XHRcdFwibG9vc2VuXCI6IFwibG9vc2VuXCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSggXCJzaG91bGRcIiApO1xuXG5cblxuLy86IEBjbGllbnQ6XG5jb25zdCBsb29zZW4gPSByZXF1aXJlKCBcIi4vbG9vc2VuLnN1cHBvcnQuanNcIiApO1xuLy86IEBlbmQtY2xpZW50XG5cblxuXG5cblxuXG5cbi8vOiBAY2xpZW50OlxuZGVzY3JpYmUoIFwibG9vc2VuXCIsICggKSA9PiB7XG5cblx0ZGVzY3JpYmUoIFwiYGxvb3NlbiB3aXRoIGRlZXAgb2JqZWN0IGFzIGVudGl0eWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgdHJhbnNmb3JtIGRlZXAgb2JqZWN0IGludG8gc2hhbGxvdyBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRcImhlbGxvXCI6IHtcblx0XHRcdFx0XHRcIndvcmxkXCI6IHtcblx0XHRcdFx0XHRcdFwieWVhaFwiOiAxLFxuXHRcdFx0XHRcdFx0XCJ1Z2hcIjogZmFsc2UsXG5cdFx0XHRcdFx0XHRcImhpXCI6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFwid2VlZWhcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XCJ5ZWhleVwiOiAxMjNcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcIndlZWVoXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwieWVoZXlcIjogMTIzNFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJoZWxsbyB3b3JsZFwiLFxuXHRcdFx0XHRcdFx0XHQxMjMsXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcIndlZWVlZWVoXCI6IDEyMzQ1XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGxldCByZXN1bHQgPSBsb29zZW4oIGRhdGEgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBPYmplY3Qua2V5cyggcmVzdWx0ICkubGVuZ3RoLCAxNyApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBsb29zZW4gd2l0aCBlbnRpdHkgYW5kIGNvbXByZXNzZWQgcGFyYW1ldGVyc2BcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgdHJhbnNmb3JtIGRlZXAgb2JqZWN0IGludG8gc2hhbGxvdyBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRcImhlbGxvXCI6IHtcblx0XHRcdFx0XHRcIndvcmxkXCI6IHtcblx0XHRcdFx0XHRcdFwieWVhaFwiOiAxLFxuXHRcdFx0XHRcdFx0XCJ1Z2hcIjogZmFsc2UsXG5cdFx0XHRcdFx0XHRcImhpXCI6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFwid2VlZWhcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XCJ5ZWhleVwiOiAxMjNcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcIndlZWVoXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwieWVoZXlcIjogMTIzNFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJoZWxsbyB3b3JsZFwiLFxuXHRcdFx0XHRcdFx0XHQxMjMsXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcIndlZWVlZWVoXCI6IDEyMzQ1XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGxldCByZXN1bHQgPSBsb29zZW4oIGRhdGEsIHRydWUgKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBPYmplY3Qua2V5cyggcmVzdWx0ICkubGVuZ3RoLCA3ICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYGxvb3NlbiB3aXRoIGVudGl0eSwgY29tcHJlc3NlZCwgYW5kIGRlcHRoIHBhcmFtZXRlcnNgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIG9ubHkgY29udGFpbiBmaXJzdCBsZXZlbCBvZiBsb29zZW5lZCBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdGxldCByZXN1bHQgPSBsb29zZW4oIHdpbmRvdywgdHJ1ZSwgMSApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIE9iamVjdC5rZXlzKCByZXN1bHQgKS5sZW5ndGgsIDEyMCApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBsb29zZW4gd2l0aCBlbnRpdHksIGNvbXByZXNzZWQgYW5kIGxpbWl0ZXIgcGFyYW1ldGVyc2BcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgcmV0dXJuIGxvb3NlbmVkIG9iamVjdCBjb250YWluaW5nIGZ1bmN0aW9uIGRhdGEgb25seVwiLCAoICkgPT4ge1xuXHRcdFx0bGV0IHJlc3VsdCA9IGxvb3Nlbiggd2luZG93LCB0cnVlLCAoIGVsZW1lbnQgKSA9PiB7IHJldHVybiB0eXBlb2YgZWxlbWVudCA9PSBcImZ1bmN0aW9uXCI7IH0gKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBPYmplY3Qua2V5cyggcmVzdWx0ICkubGVuZ3RoLCA0NSApO1xuXHRcdH0gKS50aW1lb3V0KCAxNTAwMCApO1xuXHR9ICk7XG5cbn0gKTtcbi8vOiBAZW5kLWNsaWVudFxuXG5cblxuIl19
//# sourceMappingURL=test.support.js.map
