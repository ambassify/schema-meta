var assert = require('assert'),
	SchemaMeta = require('../src/schemameta.js');

describe('SchemaMeta',function(){

	it( 'Should normalize dates', function() {
		var schema = new SchemaMeta();

		assert.equal(schema.normalizeTypeDate('1986-04-11'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('1986/04/11'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('11/04/1986'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('1986 04 11'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('11 04 1986'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('11/04/86'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('86 04 11'), '1986-04-11');
		assert.equal(schema.normalizeTypeDate('86 11 4'), '1986-11-04');
	});

	it( 'Should not keep original value if not normalizable', function() {
		var schema = new SchemaMeta();
		assert.equal(schema.normalizeTypeDate('860411'), '860411');
		console.log(SchemaMeta.test);
	});

	it( 'Should normalize different key formats', function() {
		var schema = new SchemaMeta();

		assert.equal(schema.normalizeKey('FirstName'), 'givenName');
		assert.equal(schema.normalizeKey('fname'), 'givenName');
		assert.equal(schema.normalizeKey('firstName'), 'givenName');
		assert.equal(schema.normalizeKey('first_name'), 'givenName');
		assert.equal(schema.normalizeKey('first-name'), 'givenName');
		assert.equal(schema.normalizeKey('LastName'), 'familyName');
		assert.equal(schema.normalizeKey('e_mail-address'), 'email');
	});

	it( 'Should auto normalize birthDate meta value', function() {
		var schema = new SchemaMeta({ birth: '1986/4/11' });
		var result = schema.getNormalized();

		assert.equal(result.hasOwnProperty('birthDate'), true);
		assert.equal(result.birthDate, '1986-04-11');
	});

	it( 'Should not touch/modify unkown data', function() {
		var schema = new SchemaMeta({ firstname: 'joe', lastName: 'Doe', birth: '1986/4/11', randomData: 'bla' });
		var result = schema.getNormalized();

		assert.equal(result.hasOwnProperty('randomData'), true);
		assert.equal(result.randomData, 'bla');
	});

});