const { SQLite3 } = require("./options/mysql.js");
const knex = require('knex')(SQLite3);

knex.schema.createTable("productos", table => {
    table.increments("id")
    table.string("title")
    table.integer("price")
    table.string('thumbnail')
})
    .then(() => console.log("Table creada con exito"))
    .catch((error) => { console.log(error); throw error })
    .finally(() => {
        knex.destroy();
    })