/*
 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
 MIT license
*/

;(function(window, undefined) {


var Meta = {
	test: function() {
		console.log('Hello world');
		return 'hello world';
	}
};

Meta.prototype.standardize = function( data ) {
	data.custom = "blabla";
	return data;
}



// Export to global object
window.SchemaMeta = Meta;

if( typeof "exports" !== "undefined" )
	exports = Meta;

}(window));