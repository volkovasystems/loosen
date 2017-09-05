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

var assert = require("should");





//: @bridge:
var path = require("path");
//: @end-bridge








//: @bridge:
describe("loosen", function () {

	var bridgeURL = "file://" + path.resolve(__dirname, "bridge.html");

	describe("`loosen with deep object as entity`", function () {
		it("should transform deep object into shallow object", function () {
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
			assert.equal(result, 17);
		});
	});

	describe("`loosen with entity and compressed parameters`", function () {
		it("should transform deep object into shallow object", function () {
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
			assert.equal(result, 7);
		});
	});

	describe("`loosen with entity, compressed, and depth parameters`", function () {
		it("should only contain first level of loosened object", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					let test = loosen( window, true, 1 );
   					return Object.keys( test ).length;
   				}
   
   			).value;
   			//: @end-ignore
			assert.equal(result, 98);
		});
	});

	describe("`loosen with entity, compressed and limiter parameters`", function () {
		it("should return loosened object containing function data only", function () {
			//: @ignore:
   			let result = browser.url( bridgeURL ).execute(
   
   				function( ){
   					let test = loosen( window, true, ( element ) => { return typeof element == "function"; } );
   					return Object.keys( test ).length;
   				}
   
   			).value;
   			//: @end-ignore
			assert.equal(result, 47);
		}).timeout(15000);
	});

});
//: @end-bridge
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuYnJpZGdlLmpzIl0sIm5hbWVzIjpbImFzc2VydCIsInJlcXVpcmUiLCJwYXRoIiwiZGVzY3JpYmUiLCJicmlkZ2VVUkwiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiaXQiLCJlcXVhbCIsInJlc3VsdCIsInRpbWVvdXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtREEsSUFBTUEsU0FBU0MsUUFBUyxRQUFULENBQWY7Ozs7OztBQU1BO0FBQ0EsSUFBTUMsT0FBT0QsUUFBUyxNQUFULENBQWI7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFDQUUsU0FBVSxRQUFWLEVBQW9CLFlBQU87O0FBRTFCLEtBQUlDLHdCQUF1QkYsS0FBS0csT0FBTCxDQUFjQyxTQUFkLEVBQXlCLGFBQXpCLENBQTNCOztBQUVBSCxVQUFVLHFDQUFWLEVBQWlELFlBQU87QUFDdkRJLEtBQUksa0RBQUosRUFBd0QsWUFBTztBQUM5RDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNBO0FBQ0dQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixFQUF0QjtBQUNBLEdBekNEO0FBMENBLEVBM0NEOztBQTZDQU4sVUFBVSxnREFBVixFQUE0RCxZQUFPO0FBQ2xFSSxLQUFJLGtEQUFKLEVBQXdELFlBQU87QUFDOUQ7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBO0FBQ0dQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixDQUF0QjtBQUNBLEdBeENEO0FBeUNBLEVBMUNEOztBQTRDQU4sVUFBVSx3REFBVixFQUFvRSxZQUFPO0FBQzFFSSxLQUFJLG9EQUFKLEVBQTBELFlBQU87QUFDaEU7QUFDSDs7Ozs7Ozs7OztBQVVBO0FBQ0dQLFVBQU9RLEtBQVAsQ0FBY0MsTUFBZCxFQUFzQixFQUF0QjtBQUNBLEdBZEQ7QUFlQSxFQWhCRDs7QUFrQkFOLFVBQVUseURBQVYsRUFBcUUsWUFBTztBQUMzRUksS0FBSSw2REFBSixFQUFtRSxZQUFPO0FBQ3pFO0FBQ0g7Ozs7Ozs7Ozs7QUFVQTtBQUNHUCxVQUFPUSxLQUFQLENBQWNDLE1BQWQsRUFBc0IsRUFBdEI7QUFDQSxHQWRELEVBY0lDLE9BZEosQ0FjYSxLQWRiO0FBZUEsRUFoQkQ7O0FBa0JBLENBaklEO0FBa0lBIiwiZmlsZSI6InRlc3QuYnJpZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAdGVzdC1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtdGVzdC1saWNlbnNlXG5cblx0QHRlc3QtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJsb29zZW5cIixcblx0XHRcdFwicGF0aFwiOiBcImxvb3Nlbi90ZXN0Lm1vZHVsZS5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwidGVzdC5tb2R1bGUuanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwidGVzdFwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvbG9vc2VuLmdpdFwiXG5cdFx0fVxuXHRAZW5kLXRlc3QtY29uZmlndXJhdGlvblxuXG5cdEB0ZXN0LWRvY3VtZW50YXRpb246XG5cblx0QGVuZC10ZXN0LWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFzc2VydFwiOiBcInNob3VsZFwiLFxuXHRcdFx0XCJsb29zZW5cIjogXCJsb29zZW5cIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCBcInNob3VsZFwiICk7XG5cblxuXG5cblxuLy86IEBicmlkZ2U6XG5jb25zdCBwYXRoID0gcmVxdWlyZSggXCJwYXRoXCIgKTtcbi8vOiBAZW5kLWJyaWRnZVxuXG5cblxuXG5cblxuXG5cbi8vOiBAYnJpZGdlOlxuZGVzY3JpYmUoIFwibG9vc2VuXCIsICggKSA9PiB7XG5cblx0bGV0IGJyaWRnZVVSTCA9IGBmaWxlOi8vJHsgcGF0aC5yZXNvbHZlKCBfX2Rpcm5hbWUsIFwiYnJpZGdlLmh0bWxcIiApIH1gO1xuXG5cdGRlc2NyaWJlKCBcImBsb29zZW4gd2l0aCBkZWVwIG9iamVjdCBhcyBlbnRpdHlgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIHRyYW5zZm9ybSBkZWVwIG9iamVjdCBpbnRvIHNoYWxsb3cgb2JqZWN0XCIsICggKSA9PiB7XG5cdFx0XHQvLzogQGlnbm9yZTpcbi8qXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXG5cblx0XHRcdFx0ZnVuY3Rpb24oICl7XG5cdFx0XHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdFx0XHRcImhlbGxvXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJ3b3JsZFwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XCJ5ZWFoXCI6IDEsXG5cdFx0XHRcdFx0XHRcdFx0XCJ1Z2hcIjogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XCJoaVwiOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwid2VlZWhcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwieWVoZXlcIjogMTIzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwid2VlZWhcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwieWVoZXlcIjogMTIzNFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJoZWxsbyB3b3JsZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0MTIzLFxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcIndlZWVlZWVoXCI6IDEyMzQ1XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGxldCB0ZXN0ID0gbG9vc2VuKCBkYXRhICk7XG5cblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoIHRlc3QgKS5sZW5ndGg7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCAxNyApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBsb29zZW4gd2l0aCBlbnRpdHkgYW5kIGNvbXByZXNzZWQgcGFyYW1ldGVyc2BcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgdHJhbnNmb3JtIGRlZXAgb2JqZWN0IGludG8gc2hhbGxvdyBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0XHRcdFwiaGVsbG9cIjoge1xuXHRcdFx0XHRcdFx0XHRcIndvcmxkXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcInllYWhcIjogMSxcblx0XHRcdFx0XHRcdFx0XHRcInVnaFwiOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRcImhpXCI6IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJ3ZWVlaFwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJ5ZWhleVwiOiAxMjNcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJ3ZWVlaFwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJ5ZWhleVwiOiAxMjM0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcImhlbGxvIHdvcmxkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHQxMjMsXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwid2VlZWVlZWhcIjogMTIzNDVcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0bGV0IHRlc3QgPSBsb29zZW4oIGRhdGEsIHRydWUgKTtcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoIHRlc3QgKS5sZW5ndGg7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCA3ICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYGxvb3NlbiB3aXRoIGVudGl0eSwgY29tcHJlc3NlZCwgYW5kIGRlcHRoIHBhcmFtZXRlcnNgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIG9ubHkgY29udGFpbiBmaXJzdCBsZXZlbCBvZiBsb29zZW5lZCBvYmplY3RcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRsZXQgdGVzdCA9IGxvb3Nlbiggd2luZG93LCB0cnVlLCAxICk7XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKCB0ZXN0ICkubGVuZ3RoO1xuXHRcdFx0XHR9XG5cblx0XHRcdCkudmFsdWU7XG5cdFx0XHQqL1xuLy86IEBlbmQtaWdub3JlXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgOTggKTtcblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgbG9vc2VuIHdpdGggZW50aXR5LCBjb21wcmVzc2VkIGFuZCBsaW1pdGVyIHBhcmFtZXRlcnNgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIHJldHVybiBsb29zZW5lZCBvYmplY3QgY29udGFpbmluZyBmdW5jdGlvbiBkYXRhIG9ubHlcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRsZXQgdGVzdCA9IGxvb3Nlbiggd2luZG93LCB0cnVlLCAoIGVsZW1lbnQgKSA9PiB7IHJldHVybiB0eXBlb2YgZWxlbWVudCA9PSBcImZ1bmN0aW9uXCI7IH0gKTtcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoIHRlc3QgKS5sZW5ndGg7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCA0NyApO1xuXHRcdH0gKS50aW1lb3V0KCAxNTAwMCApO1xuXHR9ICk7XG5cbn0gKTtcbi8vOiBAZW5kLWJyaWRnZVxuIl19
//# sourceMappingURL=test.bridge.js.map
