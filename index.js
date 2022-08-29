const fs = require("fs")



class Contenedor {
    constructor(name) {
        this.name = name
    }

    async Save(informacion) {

        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8")
            let contenidoJson = JSON.parse(contenido)
            let ultimoIndice = contenidoJson.length - 1
            let ultimoID = contenidoJson[ultimoIndice].id
            informacion.id = ultimoID + 1
            let id = informacion.id
            contenidoJson.push(informacion)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson))
            return id
            // console.log(contenidoJson)

        } catch (error) {
            console.log(error.message)
        }

    }

    async GetById(id) {

        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, "utf-8")
            let contenidoJson = JSON.parse(contenido)
            let contenidoExtraidoDelArray

            contenidoJson.forEach(element => {
                if (element.id == id) {
                    contenidoExtraidoDelArray = element
                }
            });

            return contenidoExtraidoDelArray
        } catch (error) {
            console.log(error.message)
        }
    }

    async GetAll() {

        try {
            let contenido = await fs.promises.readFile(`${this.name}`, "utf-8")
            let contenidoJson = JSON.parse(contenido)
            return contenidoJson

        } catch (error) {
            console.log(error.message)
        }



    }

    async DeleteById(id) {
        try {
            let arr = await this.GetAll()

            let found = arr.find(item => item.id === id)
            if (found == undefined) {
                return console.log("No se encontro el producto")
            } else {
                let toDelete = arr.indexOf(found)
                arr.splice(toDelete, 1)
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(arr))
                return console.log("Producto eliminado")
            }



        } catch (error) {
            console.log(error.message)
        }

    }

    async DeleteAll() {
        try {
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify([]))
            return console.log("Todos los productos fuero eliminados")
        } catch (error) {
            console.log(error.message)
        }

    }
}

let contenedor = new Contenedor("productos.json")

let informacionNueva = {
    "id": 1,
    "title": "Sillon",
    "thumbnail": "https://m.media-amazon.com/images/I/8194lw21y8L._AC_SL1500_.jpg"
}

contenedor.Save(informacionNueva).then(res => {
    console.log(res)
})


contenedor.GetById(2).then(res => {
    console.log(res)

})


contenedor.GetAll().then(res => {
    console.log(res)
})


contenedor.DeleteById(4).then(res => {
    console.log(res)
})


contenedor.DeleteAll().then(res => {
    console.log(res)
})
