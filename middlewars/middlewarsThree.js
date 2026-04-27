function middlewarsThree (req, res, next){
    res.status(404);
    res.json({
        Error:"not Found",
        message : "pagina non trovata"});
}

module.exports = middlewarsThree;