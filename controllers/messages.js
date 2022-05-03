const fs = require('fs')

class Messages {
	constructor(db, table) {
		this.save = (message) => {
			db.schema.hasTable(table).then((exist) => {
				if (!exist) {
					return db.schema.createTable(table, (t) => {
						t.increments('id').primary()
						t.string('user', 100)
						t.integer('fyh')
						t.text('message')
					})
				}
			})

			db(table)
				.insert(message)
				.then(() => console.log('mensaje agregado'))
				.catch((err) => {
					console.log(err)
					throw err
				})
		}
		this.getAll = async() => {
      const messages = await db.from(table)
      .select('*')
      .then((rows) => rows)
      
      return messages
		}
	}
}

module.exports=Messages