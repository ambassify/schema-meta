;(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
  else if (typeof define === 'function' && define.amd) { define(definition); }
  else if (typeof exports === 'object' ) { exports = definition(); }
  else { context[name] = definition(); }
})('SchemaMeta', this, function () {
	'use strict';
  
	var keyMapper = {
		'givenName': ['firstname', 'fname'],
		'familyName': ['lastname', 'lname'],
		'email': ['emailaddress', 'mail', 'mailadres', 'emailadres'],
		'name': ['naam'],
		'birthDate': ['birth'],
		'gender': ['sex']
	};

	var SchemaMeta = function ( meta ) {
		this.meta = meta;
		this.map = this.getKeyMap( keyMapper );
	};

	/**
	 * Return the normalized data
	 * 
	 * @return {object}
	 */
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
		var cleanKey = key.toLowerCase().replace(/[-_]/g, '');

		if( this.map.hasOwnProperty( cleanKey ) ) {
			return this.map[ cleanKey ];
		} else {
			// if no matchin key replace is found try do a search for specific parts in the key string
			// for example searching firstname in fieldfirstname would be a match
			// make sure to first search for firstname/lastname and if they don't match finally do a search for name
		}

		return key;
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

			switch( normalizedKey ) 
			{
				case 'givenName':
					normalizedValue = normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1); // givenName should always start with a capital letter
					break;
				case 'birthDate':
					normalizedValue = this.normalizeTypeDate( normalizedValue );
					break;
				case 'gender':
					normalizedValue = this.normalizeTypeGender( normalizedValue );
					break;
			}

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
	};

	/**
	 * Normalize date input
	 *
	 * @param {string} date 
	 * @return {string} ISO-8601 format YYY-MM-DD conform schema.org
	 */
	SchemaMeta.prototype.normalizeTypeDate = function( date )
	{
		var originalDate = date;

		// Check if date contains separators
		var regex = /[\/-\s]/;
		if( date.match(regex) ) {
			var parts = date.split( regex );

			// Reverse order if notation is using d/m/y
			if( parts[2] > 31 ) {
				date = parts.reverse().join('-');
			}

		}

		var dateObject = new Date( date );
		var year = dateObject.getFullYear();
		var month = (dateObject.getMonth() + 1); // 0 is januari
		var day = dateObject.getDate();

		if( !isNaN(year) && !isNaN(year) && !isNaN(year) ) {
			return dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
		}

		return originalDate;
	};

	SchemaMeta.prototype.normalizeTypeGender = function( gender )
	{

		// Already normalized
		if( gender === 'female' && gender === 'male' ) 
			return gender;

		if( gender === 'f' ) 
		{
			return 'female';
		} else {
			return 'male';
		}

	}

	return SchemaMeta;

});