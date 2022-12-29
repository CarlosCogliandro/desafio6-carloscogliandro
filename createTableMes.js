const { MariaDB } = require("./options/mysql.js");
const knex = require('knex')(MariaDB);

knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('email')
    table.string('message')
    table.string('date')
})
    .then(() => console.log("Table creada con exito"))
    .catch((error) => { console.log(error); throw error })
    .finally(() => {
        knex.destroy();
    })