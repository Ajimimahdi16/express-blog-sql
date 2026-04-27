const connection = require ('../dataPost/db');
const posts = require('../dataPost/post');


// Funzione per gestire la visualizzazione di tutti i post index
function index (req, res) {
    const sql = 'SELECT * FROM posts';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
}
// Funzione per gestire la visualizzazione di un singolo post show
function show(req, res) {
    const id = req.params.id;

    // 1. Query per ottenere il post
    const postSql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(postSql, [id], (err, postResults) => {
        if (err) return res.status(500).json({ error: 'Database query error' });
        if (postResults.length === 0) return res.status(404).json({ error: 'Post not found' });

        const post = postResults[0];

        // 2. Query per ottenere i tag associati a questo post
        // Usiamo una JOIN tra la tabella tags e la tabella pivot post_tag
        const tagsSql = `
            SELECT tags.* FROM tags
            JOIN post_tag ON tags.id = post_tag.tag_id
            WHERE post_tag.post_id = ?
        `;

        connection.query(tagsSql, [id], (err, tagsResults) => {
            if (err) return res.status(500).json({ error: 'Database query error while fetching tags' });

            // Aggiungiamo l'array dei tag all'oggetto post
            post.tags = tagsResults;

            // Restituiamo il post completo
            res.json(post);
        });
    });
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

    const {id} = req.params;

    connection.query('DELETE FROM posts WHERE id = ?',[id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete post' });
            res.sendStatus(204);
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
