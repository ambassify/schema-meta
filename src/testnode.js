var SchemaMeta = require('./index');

console.log('Hello world');
var schema = new SchemaMeta({
	firstname: 'John',
	lastname: 'Doe',
	Age: 47,
	DateBirth: '6/2/86'
});

console.log(schema.getNormalized());