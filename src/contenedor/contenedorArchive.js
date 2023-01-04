
import { promises as fs } from 'fs'

class containerArchive {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async get(id) {
        const elems = await this.getAll()
        const buscado = elems.find(e => e.id == id)
        return buscado
    }

    async getAll() {
        try {
            const elems = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(elems)
        } catch (error) {
            return []
        }
    }

    async save(elem) {
        const elems = await this.getAll()

        let newId
        if (elems.length == 0) {
            newId = 1
        } else {
            newId = elems[elems.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        elems.push(newElem)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(elem, id) {
        const elems = await this.getAll()
        const index = elems.findIndex(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            elems[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        }
    }

    async deleteById(id) {
        const elems = await this.getAll()
        const index = elems.findIndex(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        elems.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

module.exports = containerArchive;