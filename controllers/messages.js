import fs from 'fs'

export default class Messages {
  constructor(file) {
    this.save = (msj) => {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        if (content === '') {
          const newMsj = { ...msj }
          const newFile = []
          newFile.push(newMsj)
          fs.appendFileSync(file, JSON.stringify(newFile))
        } else {
          const contentParsed = JSON.parse(content)
          const newMsj = { ...msj }
          contentParsed.push(newMsj)
          fs.writeFileSync(file, JSON.stringify(contentParsed))
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
  }
}
