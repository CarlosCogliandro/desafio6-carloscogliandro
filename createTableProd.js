
const { MariaDB } = require("./options/mysql.js");
const knex = require('knex')(MariaDB);

// knex.schema.createTable('mensajes', table => {
//     table.increments('id')
//     table.string('email')
//     table.string('message')
//     table.string('date')
// })
//     .then(() => console.log("Table creada con exito"))
//     .catch((error) => { console.log(error); throw error })
//     .finally(() => {
//         knex.destroy();
//     })

try {
    await knex.schema.dropTableIfExists('productos')

    await knex.schema.createTable('productos', table => {
        table.increments('id').primary()
        table.string('title', 30).notNullable()
        table.float('price').notNullable()
        table.string('thumbnail', 1024)
    })

    await knex.destroy()

    console.log('tabla productos en mariaDb creada con éxito')
} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}