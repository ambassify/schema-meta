/*
 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
 MIT license
*/

/*;(function( global, undefined) {


var Meta = {
	name : 'hello'
};*/

/*var Meta = function() {
	console.log('Hello world');
	return 'hello world';
};*/

/*Meta.prototype.standardize = function( data ) {
	data.custom = "blabla";
	return data;
}*/



// Export to global object
/*if( global.hasOwnProperty('document') && global.hasOwnProperty('location') ) // Instance is a window
{
	global.SchemaMeta = Meta;
} else {
	global = Meta;
}

}( exports || window || null ));*/

;(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
  else if (typeof define === 'function' && define.amd) { define(definition); }
  else if (typeof exports === 'object' ) { exports = definition(); }
  else { context[name] = definition(); }
})('SchemaMeta', this, function () {
	'use strict';
  
	var keyMapper = {
		'givenName': ['firstname', 'first_name', 'fname'],
		'familyName': ['lastname', 'last_name', 'lname'],
		'email': ['e-mail','emailadres', 'e-mailaddress', 'mail', 'mailadres', 'emailadres'],
		'name': ['naam']
	};

	var SchemaMeta = function ( meta ) {
		this.meta = meta;
		this.map = this.getKeyMap( keyMapper );
		console.log(this.map);
	};

	SchemaMeta.prototype.getNormalized = function() {

		// Do a normalization of the data
		var normalizedMeta = this.normalize( this.meta );

		return normalizedMeta;
	};

	/**
	 * To make it easier to handle the data we should normalize the key
	 * so that caps in keys don't break our code for example
	 *
	 * @param {string} key
	 * @return {string} 
	 */
	SchemaMeta.prototype.normalizeKey = function( key ) {
		var cleanKey = key.toLowerCase();

		if( this.map.hasOwnProperty( cleanKey ) )
			cleanKey = this.map[ cleanKey ];

		return cleanKey;
	};

	/**
	 * Normalize the value of a meta field
	 *
	 * @param {string} value 
	 * @return {string} 
	 */
	SchemaMeta.prototype.normalizeValue = function( value ) {
		return value;
	};

	SchemaMeta.prototype.normalize = function() {
		var normalizedMeta = {}, 
			key, 
			normalizedKey, 
			normalizedValue;

		for( key in this.meta ) {

			// Get normalized values
			normalizedKey = this.normalizeKey( key );
			normalizedValue = this.normalizeValue( this.meta[ key ] );

			normalizedMeta[ normalizedKey ] = normalizedValue;

		}

		return normalizedMeta;
	};

	/** 
	 * Generate a key replace map based on the key mapper data
	 *
	 * @return {object} 
	 */
	SchemaMeta.prototype.getKeyMap = function( mapper ) 
	{
		var map = {};
		for( var key in keyMapper ) 
		{
			var searchArray = keyMapper[ key ];
			for( var idx in searchArray ) 
			{
				var search = searchArray[ idx ];
				map[ search ] = key;
			}
		}
		return map;
	}

	return SchemaMeta;

});