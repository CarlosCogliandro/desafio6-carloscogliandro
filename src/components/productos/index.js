
let { Router } = require('express');
let router = new Router();
let path = require("path")

const Contenedor = require('../../contenedor/contenedor.js');
const productos = new Contenedor(path.join(__dirname, "../../data/productos.json"));


module.exports = app => {

    app.use('/', router);

    router.get('/', (req, res, next) => {
        res.render('inicio', {})
    });

    router.get('/productos', async (req, res, next) => {
        const prod = await productos.getAll();
        res.render('productos', {prod})
    });

    router.post('/productos', async (req, res, next) => {
        let prod = req.body
        await productos.save(prod)
        res.redirect('/')
    });

    router.get('/chat', async(req, res, next)=>{
        res.render('chat', {})
    })
};