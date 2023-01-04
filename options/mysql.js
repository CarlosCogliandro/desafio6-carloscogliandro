const SQLite3 = {
	client: 'sqlite3',
	connection: {
		filename: '../DB/ecommerce.sqlite'
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

module.exports = { SQLite3, MariaDB };

// module.exports = {
// 	SQLite3: {
// 		client: 'sqlite3',
// 		connection: {
// 			filename: `../DB/ecommerce.sqlite`
// 		},
// 		useNullAsDefault: true
// 	},

// 	MariaDB: {
// 		client: 'mysql',
// 		connection: {
// 			host: 'localhost',
// 			user: 'root',
// 			password: '',
// 			database: 'coderhouse'
// 		}
// 	}
// }