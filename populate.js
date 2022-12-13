require('dotenv').config()

const connectDB= require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)

        //when we start from scratch agian we have frist clear the old data
        await Product.deleteMany()
        // and start again
        await Product.create(jsonProducts)
        console.log('Connected to database')
        process.exit(0)  //that is everthing goes well no error message
    }catch(err){
        console.log(err)
    }
}

start()