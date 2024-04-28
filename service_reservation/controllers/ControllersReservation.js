const { db } = require('../database');


exports.listerReservation = (req, res) => {
  db.query('SELECT * FROM reservation', (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
      }

      return res.status(200).json(result);
  });
};

exports.getReservationById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM reservation WHERE id = ?', [id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: 'Aucune reservation trouvée avec cet ID.' });
      }

      return res.status(200).json(result[0]);
  });
};


exports.ajouterReservation = async (req, res) => {
  const { nom, prenom, nbr_place, date_reservation, evenement_id, utilisateur_id } = req.body;

  try {
    const evenement = await db.query('SELECT places_disponibles FROM evenement WHERE evenement_id = ?', [evenement_id]);
    if (!evenement || evenement.length === 0 || evenement[0].places_disponibles < nbr_place) {
      throw new Error('Places insuffisantes pour l\'événement spécifié');
    }

    const reservation = await db.query('INSERT INTO reservation (nom, prenom, nbr_place, date_reservation, evenement_id, utilisateur_id) VALUES (?, ?, ?, ?, ?, ?)'
    ,[nom, prenom, nbr_place, date_reservation, evenement_id, utilisateur_id]);

    await db.query('UPDATE evenement SET places_disponibles = places_disponibles - ? WHERE evenement_id = ?', [nbr_place, evenement_id]);

    res.status(200).json({ message: 'Réservation créée avec succès' });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la création de la réservation : ${error.message}` });
  }
};

exports.supprimerReservation = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM reservation WHERE id = ?', [id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Aucun reservation trouvé avec cet ID.' });
      }

      return res.status(200).json({ message: 'reservation supprimé avec succès.' });
  });
};
