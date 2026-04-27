function middleware (req, res, next){
    
const oraDiEntrata = new Date().toLocaleString();

console.log("sei entrato in questo server alle ore :" , oraDiEntrata);

next();

}

module.exports = middleware;
