const fs = require('fs')

class Container {
	constructor(db, table) {
		this.save = (obj) => {
			db.schema.hasTable(table).then((exist) => {
				if (!exist) {
					return db.schema.createTable(table, (t) => {
						t.increments('id').primary()
						t.string('nombre', 50)
						t.integer('precio')
						t.string('url', 500)
					})
				}
			})

			db(table)
				.insert(obj)
				.then(() => console.log('producto agregado'))
				.catch((err) => {
					console.log(err)
					throw err
				})
		}
		this.getAll = async () => {
			const products = await db
				.from(table)
				.select('*')
				.then((rows) => rows)
				.catch((err) => {
					console.log(err)
					throw err
				})
			return products
		}
		this.getById = async (id) => {
			const product = await db
				.from(table)
				.select('*')
				.where('id', '=', id)
				.then((row) => row)
				.catch((err) => {
					console.log(err)
					throw err
				})
			return product
		}

		this.modifyById = async (newValues, id) => {
			if (typeof newValues.precio === String) {
				Number(newValues.precio)
			}
			const product = await db(table)
				.where({ id: id })
				.update({ nombre: newValues.nombre, precio: newValues.precio, url: newValues.url })
				.then(() => {
					return true
				})
				.catch((err) => {
					console.log(err)
					return false
				})
		}

		this.deleteById = async (id) => {
			const deleted = db(table)
				.where({ id: id })
				.del()
        .then(()=>{return 'Producto eliminado'})
				.catch((err) => {
					console.log(err)
					throw err
				})
        if(deleted){
          return 'Producto eliminado'
        }else{
          return 'Error'
        }
		}
	}
}

module.exports = Container
