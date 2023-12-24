import fs from 'fs'
import path from 'path'

const fileRemover = (filename) => {
    fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
        if(err && err.code == "ENOENT") {
            //The file doesn't exists
            console.log(`File ${filename} does not exist, won't be able to remove it.`)
        } else if (err) {
            console.log(`Error occured while trying to remove file ${filename}`)
        } else {
            console.log(`Successfully removed ${filename}`)
        }
    })
}

export { fileRemover }