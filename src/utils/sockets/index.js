let { Server: SocketIO } = require("socket.io");
const Container = require('../../contenedor/contenedor.js')
const { MariaDB, SQLite3 } = require('../../../options/mysql.js');

const products = new Container(SQLite3, 'productos');
const messages = new Container(MariaDB, 'mensajes');

class Socket {
  static instancia;
  constructor(http) {
    if (Socket.instancia) {
      return Socket.instancia;
    }

    Socket.instancia = this;
    this.io = new SocketIO(http);
    this.mensajes = [];
    this.usuarios = [];
  }

  init() {
    try {
      this.io.on('connection', socket => {
        console.log("Usuario conectado!");
        const dbProducts = products.getAll();
        this.io.sockets.emit("init", dbProducts);
        const dbMessages = messages.getAll();
        this.io.sockets.emit('init', dbMessages);

        socket.on('product', async product => {
          products.save(product);
          const dbProducts = await products.getAll();
          io.sockets.emit('products', dbProducts);
        })

        socket.on('message', async message => {
          messages.save(message);
          const dbMessages = await messages.getAll();
          io.sockets.emit('messages', dbMessages);
        })

        // Escuchamos el mensaje de un usuario y lo emitimos a todos los conectados
        socket.on("mensaje", data => {
          this.mensajes.push(data);
          this.io.sockets.emit("listenserver", this.mensajes);
        });

        socket.on("addUser", data => {
          console.log(data);
          if (this.usuarios.length) {
            let verificacion_user = false;
            this.usuarios = this.usuarios.map(usuario => {
              if (usuario.email == data.email) {
                verificacion_user = true;
                return {
                  id: socket.id,
                  ...data,
                  active: true
                }
              } else {
                return usuario;
              }
            })
            if (!verificacion_user) {
              this.usuarios.push({
                id: socket.id,
                ...data,
                active: true
              })
            }
          } else {
            this.usuarios.push({
              id: socket.id,
              ...data,
              active: true
            })
          }
          this.io.sockets.emit("loadUsers", this.usuarios);
        });

        socket.on("disconnect", () => {
          console.log("Se desconectó ", socket.id);
          this.usuarios = this.usuarios.map(usuario => {
            if (usuario.id == socket.id) {
              delete usuario.active;
              return {
                ...usuario,
                active: false
              }
            } else {
              return usuario;
            }
          });
          this.io.sockets.emit("loadUsers", this.usuarios);
        })

      })
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Socket;