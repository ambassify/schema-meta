Schema Meta
===========

Convert objects of random meta data into a schema.org standardized data objects

Test
----

>npm test

How to use in NodeJS
--------------------

	SchemaMeta = require('bbbx-schema-meta');
	var schema = new SchemaMeta({ FirstName: 'John', last_name: 'Doe'});
	var cleanMeta = schema.getNormalized();

How to use in regular JavaScript
--------------------------------

	var schema = new SchemaMeta({ FirstName: 'John', last_name: 'Doe'});
	var cleanMeta = schema.getNormalized();