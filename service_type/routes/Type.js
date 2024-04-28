const express = require('express');
const router = express.Router();
const controller = require('../controllers/TypeControllers');

router.get('/lister', controller.listerTypes);
router.post('/ajouter', controller.ajouterTypes);
router.put('/:id/modifier', controller.modifierTypes);
router.get('/:id/listerbyid', controller.getTypeById);
router.delete('/:id/supprimer', controller.supprimerTypes);
router.get('/rechercher', controller.rechercherTypes);

module.exports = router;
