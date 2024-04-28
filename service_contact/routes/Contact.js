const express = require('express');
const router = express.Router();
const controller = require('../controllers/ContactControllers');

router.get('/lister', controller.listerContact);
router.post('/ajouter', controller.ajouterContact);
router.put('/:id/modifier', controller.modifierContact);
router.delete('/:id/supprimer', controller.supprimerContact);


module.exports = router;
