
// let fs = require('fs');

// // Le agregue este try...catch para solucionar el problema de creacion del archivo productos.txt y que lo inicie con los []
// // try{
// // 	let ArrayProd = `[]`;
// // 	let archivo = fs.writeFileSync('./productos.txt', ArrayProd);
// // } catch(error){
// // 	console.log(error);
// // }

// class Contenedor {
// 	constructor(url) {
// 		this.url = url;
// 		console.log("Probando---->", this.url)
// 	};

// 	async getAll() {
// 		try {
// 			const prod = await fs.promises.readFile(this.url, 'utf-8') || [];
// 			return JSON.parse(prod)
// 		} catch (error) {
// 			console.log('Tenemos un error al traer los productos ----->', error);
// 		}
// 	};

// 	async getRandom() {
// 		const products = await this.getAll();
// 		const randomID = (Math.floor(Math.random() * products.length) + 1);
// 		console.log(`Numero random ${randomID}`)
// 		return this.getById(randomID)
// 	}

// 	async save(prod) {
// 		const data = await this.getAll();
// 		let newId = data;
// 		if (data.length == 0) {
// 			newId = 1;
// 		} else {
// 			newId = data[data.length - 1].id + 1;
// 		}
// 		const newProd = { ...prod, id: newId }
// 		data.push(newProd);
// 		try {
// 			await fs.promises.writeFile(this.url, JSON.stringify(data, null, 2), (e, contenido) => { });
// 			return newProd;
// 		} catch (error) {
// 			console.log('Error al guardar un nuevo producto ----->', error);
// 		}
// 	};

// 	async getById(id) {
// 		const data = await this.getAll()
// 		try {
// 			const prod = data.find(prod => prod.id == id);
// 			if (prod == undefined) {
// 				console.log(`No existe el producto con id ${id}`);
// 			} else {
// 				console.log(`El producto con id ${id} es:`, prod);
// 				return prod;
// 			}
// 		} catch (error) {
// 			console.log('Error al mostrar producto ----->', error);
// 		}
// 	};

// 	async deleteById(id) {
// 		const data = await this.getAll()
// 		try {
// 			const prod = data.find(obj => obj.id == id)
// 			if (prod == undefined) {
// 				console.log(`No existe el objeto con id ${id}`)
// 			} else {
// 				const newProd = data.filter(obj => obj.id != id)
// 				await fs.promises.writeFile(this.url, JSON.stringify(newProd, null, 2), (e, contenido) => { })
// 				console.log(`Se elimino el producto con id ${id}`, prod);
// 				return prod;
// 			}
// 		} catch (error) {
// 			console.log(`Error al borrar un producto por ID ${id} ----->`, error)
// 		}
// 	};

// 	async deleteAll() {
// 		const data = await this.getAll()
// 		try {
// 			const newProd = []
// 			await fs.promises.writeFile(this.url, JSON.stringify(newProd, null, 2), (e, contenido) => { })
// 			console.log('Se borraron todos los productos')
// 			return data;
// 		} catch (error) {
// 			console.log('Error al vaciar ----->', error);
// 		}
// 	};

// 	async update(obj) {
// 		try {
// 			let productos = await this.getAll();
// 			productos.map(function (item) {
// 				if (item.id == obj.id) {
// 					item.title = obj.title,
// 					item.price = obj.price,
// 					item.thumbnail = obj.thumbnail
// 				};
// 			});
// 			await fs.promises.writeFile(this.url, JSON.stringify(productos, null, '\t'));
// 			return productos;
// 		} catch (error) {
// 			console.log('Error al actualizar ----->', error);
// 		}
// 	};
// };


// const productos = new Contenedor('../data/productos.json');


// // function actions(){
// // 	setTimeout(()=>{
// // 		productos.save({ title: 'Heladera', price: 15975, thumbnail: 'www.foto.com/foto' });
// // 	}, 500)

// // 	setTimeout(()=>{
// // 		productos.save({ title: 'Lavarropas', price: 3215, thumbnail: 'www.foto.com/foto' });
// // 	}, 1000)

// // 	setTimeout(()=>{
// // 		productos.save({ title: 'Cocina', price: 98560, thumbnail: 'www.foto.com/foto'});
// // 	}, 1500)

// // 	setTimeout(()=>{
// // 		productos.save({ title: 'Pava Electrica', price: 5690, thumbnail: 'www.foto.com/foto'});
// // 	}, 2000)

// // 	setTimeout(()=>{
// // 		productos.save({ title: 'Tostadora', price: 690, thumbnail: 'www.foto.com/foto'});
// // 	}, 2000)

// // 	setTimeout(()=>{
// // 		productos.getAll();
// // 	}, 2500)

// // 	setTimeout(()=>{
// // 		productos.getById(2);
// // 	}, 3000)

// // 	setTimeout(()=>{
// // 		productos.deleteById(1);
// // 	}, 3500)

// // 	setTimeout(()=>{
// // 		productos.deleteAll();
// // 	}, 4000)

// // 	setTimeout(()=>{
// // 		productos.save({ nombre: 'ULTIMO PRODUCTO AGREGADO', precio: 32165, thumbnail: 'www.foto.com/foto'});
// // 	}, 4500)
// // }

// // actions();

// module.exports = Contenedor;

/* Importamos las dependencias */


const knex = require('knex');

class Container {
    constructor(config, tableName) {
        this.config = config;
        this.tableName = tableName;
        this.knex = knex(this.config);
    }
    save = obj => {
        this.knex(this.tableName).insert(obj)
            .then(() => console.log('Saved'))
            .catch(err => { console.log(err); throw err })
            .finally(() => this.knex.destroy())
    }
    getById = async id => {
        try {
            let obj = await this.knex.from(this.tableName).select().table(this.tableName).where('id', id).first();
            if (obj) {
                return obj;
            } else {
                return { message: 'ERROR' };
            }
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
    getAll = async () => {
        try {
            let objs = await this.knex.from(this.tableName).select('*')
            return objs;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    deleteById = async id => {
        try {
            this.knex.from(this.tableName).where('id', '=', id).del()
            return { message: 'DONE!' };
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
    deleteAll = async () => {
        try {
            this.knex.from(this.tableName).del()
            return { message: 'DONE!' }
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
    update = async obj => {
        try {
            this.knex.from(this.tableName).update(obj).update()
            return { message: 'DONE!' };
        } catch (err) {
            return { message: 'ERROR' };
        }
    }
}

module.exports = Container;
