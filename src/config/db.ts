import mongoose from "mongoose";
import colors from 'colors'

export const conncectDB = async (con) => {
    try {
        const db = await mongoose.connect(con);
        const url = `${db.connection.host}:${db.connection.port}`

        console.log(colors.cyan(`conectado en ${url}`))
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}