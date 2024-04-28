const express = require('express');
const router = express.Router();
const controller = require('../controllers/ControllersReservation');


router.post('/ajouter', controller.ajouterReservation);
router.get('/lister', controller.listerReservation);
router.get('/:id/listerbyid', controller.getReservationById);
router.delete('/:id/supprimer', controller.supprimerReservation);


module.exports = router;
