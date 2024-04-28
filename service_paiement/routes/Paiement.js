const express = require('express');
const router = express.Router();
const controller = require('../controllers/PaiementControllers');

router.get('/lister', controller.listerPaiement);
router.post('/ajouter', controller.ajouterPaiement);
router.put('/:id/modifier', controller.modifierPaiement);
router.delete('/:id/supprimer', controller.supprimerPaiement);


module.exports = router;
