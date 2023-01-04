
const { SQLite3 } = require("./options/mysql.js");
const knex = require('knex')(SQLite3);

// knex.schema.createTable("productos", table => {
//     table.increments("id")
//     table.string("title")
//     table.integer("price")
//     table.string('thumbnail')
// })
//     .then(() => console.log("Table creada con exito"))
//     .catch((error) => { console.log(error); throw error })
//     .finally(() => {
//         knex.destroy();
//     })

try {
    await knex.schema.dropTableIfExists('mensajes')

    await knex.schema.createTable('mensajes', table => {
        table.increments('id').primary()
        table.string('email', 30)
        table.string('message', 128)
        table.string('date', 50)
    })

    await knex.destroy()

    console.log('tabla mensajes en sqlite3 creada con éxito')
} catch (error) {
    console.log('error al crear tabla mensajes en sqlite3')
    console.log(error)
}