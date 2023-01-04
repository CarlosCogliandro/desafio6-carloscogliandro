const SQLite3 = {
	client: 'sqlite3',
	connection: {
		filename: './DB/ecommerce.sqlite'
	},
	useNullAsDefault: true
}

const MariaDB = {
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'coderhouse'
	}
}

export default { SQLite3, MariaDB };