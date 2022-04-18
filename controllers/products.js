import fs from 'fs'

export default class Container {
  constructor(file) {
    this.save = (obj) => {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        if (content === '') {
          const newId = 1
          const newObj = { ...obj, id: newId }
          const newFile = []
          newFile.push(newObj)
          fs.appendFileSync(file, JSON.stringify(newFile))
          return newId
        } else {
          const contentParsed = JSON.parse(content)
          const newId = contentParsed[contentParsed.length - 1].id + 1
          const newObj = { ...obj, id: newId }
          contentParsed.push(newObj)
          fs.writeFileSync(file, JSON.stringify(contentParsed))
          return newId
        }
      } catch {
        throw new Error('No se pudo guardar')
      }
    }
    this.getAll = async () => {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        return JSON.parse(content)
      } catch {
        // throw new Error('Error pidiendo los datos')
      }
    }
    this.getById = async (id) => {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        const parsed = JSON.parse(content)
        const el = parsed.filter((e) => e.id === id)
        return el
      } catch {
        throw new Error('Error pidiendo los datos')
      }
    }

    this.modifyById = async (newValues, id) => {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        const parsed = JSON.parse(content)
        const item = parsed.find((e) => e.id == id)
        if (item) {
          item.nombre = newValues.nombre
          item.precio = newValues.precio
          item.thumbnail = newValues.thumbnail
          fs.writeFileSync(file, JSON.stringify(parsed))
          return true
        } else {
          // console.log('No se encontró el producto solicitado')
          return false
        }
      } catch {
        throw new Error('Error pidiendo los datos')
      }
    }

    this.deleteById = async (id) => {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        const parsed = JSON.parse(content)
        const item = parsed.findIndex((e) => e.id == id)
        if (item >= 0) {
          parsed.splice(item, 1)
          fs.writeFileSync(file, JSON.stringify(parsed))
          return 'Producto eliminado'
        } else {
          return 'Producto inexistente'
        }
      } catch {
        throw new Error('Error al borrar un producto')
      }
    }
  }
}
