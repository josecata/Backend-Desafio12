const sqlite3 = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './db/ecommerce.sqlite',
	},
	useNullAsDefault: true,
})
const mysql = require('knex')({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'mibase',
	},
})

module.exports = {
	sqlite3,
	mysql,
}
