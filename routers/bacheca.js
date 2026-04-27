const express= require('express');
const router= express.Router();
// Importa il controller della bacheca
const bachecaController = require('../controllers/bachecaController');

// Definisci le rotte per la bacheca

router.get('/', bachecaController.index);
router.get('/:id', bachecaController.show);
router.post('/', bachecaController.store);
router.put('/:id', bachecaController.update);
router.patch('/:id', bachecaController.modify);
router.delete('/:id', bachecaController.destroy);

// Esporta il router

module.exports = router;