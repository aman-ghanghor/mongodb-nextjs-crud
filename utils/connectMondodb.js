import mongoose from "mongoose"

const connectMongodb = async () => {
    const OPTIONS = {
        dbname: process.env.DB_NAME 
    }
    try {
       mongoose.connect(process.env.DB_URL , OPTIONS) 
    } 
    catch(error) {
       console.log(error)
    }
}

export default connectMongodb ;



