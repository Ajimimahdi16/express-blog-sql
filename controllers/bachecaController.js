
const posts = require('../dataPost/post');
// Funzione per gestire la visualizzazione di tutti i post
function index (req, res) {
    res.json(posts);
}

// Funzione per gestire la visualizzazione di un singolo post
function show (req, res) {
    const id = req.params.id;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) 
    return res.status(404).send('Post not found');
    res.json(post);
}

// Funzione per gestire la creazione di un nuovo post
function store (req, res) {
    const newPost = posts [posts.length -1].id + 1;
    const post = {
        id: newPost,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        immagine : req.body.immagine,
        tags : req.body.tags
    };
    posts.push(post);

    console.log(post);
    res.status(201);
    res.json(post);
}

// Funzione per gestire l'aggiornamento di un post esistente
function update (req, res) {
    const id = parseInt(req.params.id); // Ottieni l'ID del post da aggiornare
     const post = posts.find(p => p.id === parseInt(id));
    if (!post){
        res.status(404);
        return res.json({
        error: 'Post not found',
        message: 'Post not found'
    });
}
    post.titolo=req.body.titolo;
    post.contenuto=req.body.contenuto;
    post.immagine=req.body.immagine;
    post.tags=req.body.tags;
    console.log(post);
    res.json(post);
}

// Funzione per gestire la modifica parziale di un post esistente
function modify (req, res) {
    res.send('Modify a post');
}


// Funzione per gestire la cancellazione di un post esistente
function destroy (req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post){
        res.status(404);
       
        return res.json({
        status: 404,
        error: 'Post not found',
        message: 'Post not found'
    });
    } 
    // Rimuovi il post dall'array
    const index = posts.indexOf(post);
    posts.splice(index, 1);
    // Restituisci una risposta di successo
    res.json({
        status: 200,
        message: 'Post deleted successfully'
    });
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
    

}
