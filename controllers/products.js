const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "aaa";

  //const products = await Product.find({name:'vase table', })
  //const products = await Product.find({
  //  name:{ $regex: search, $options: 'i'}
  //})

  const products = await Product.find({}).sort("-name price");

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, next) => {
  try {
    const { featured, company, search } = req.query;
    const queryObject = {};

    if (featured) {
      queryObject.featured = featured === true ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    queryObject.name = {$or: {}}
    //if(name){
    //
    //   queryObject.name = {$regex:name, $options: 'i'}
    // }
    //console.log(queryObject);

    let result = await Product.find(queryObject);
    // throw "custom error"

    //const products = await Product.find(req.query);
    res.status(200).json({ result, nbHits: result.length });
  } catch (err) {
    console.log(err)
    next(err + "");
  }
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
