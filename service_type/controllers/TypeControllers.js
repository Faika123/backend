const { db } = require('../database');

exports.listerTypes = (req, res) => {
    db.query('SELECT * FROM type', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(200).json(result);
    });
};
exports.ajouterTypes = (req, res) => {
    const { nom, description} = req.body;
    if (!nom || !description ) {
        return res.status(400).json({ message: 'Le nom de type est requis.' });
    }

    db.query('INSERT INTO type (nom, description) VALUES (?, ?)', [nom, description], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(201).json({ message: 'type ajoutée avec succès.' });
    });
};

exports.getTypeById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM type WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aucune type trouvée avec cet ID.' });
        }

        return res.status(200).json(result[0]);
    });
};

exports.modifierTypes = (req, res) => {
    const id = req.params.id;
    const { nom, description } = req.body;
    if (!nom || !description ) {
        return res.status(400).json({ message: 'Le nom de type est requis pour la modification.' });
    }

    db.query('UPDATE type SET nom = ?, description = ?  WHERE id = ?', [nom,  description, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucun type trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'type modifiée avec succès.' });
    });
};

exports.supprimerTypes = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM type WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucun type trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'type supprimée avec succès.' });
    });
};
exports.rechercherTypes = (req, res) => {
  const { nom } = req.query;
  let conditions = [];
  let params = [];

  if (nom) {
      conditions.push('nom LIKE ?');
      params.push(`%${nom}%`);
  }

  if (conditions.length === 0) {
      return res.status(400).json({ message: 'Au moins un critère de recherche est requis.' });
  }

  const whereClause = conditions.join(' AND ');

  db.query(`SELECT * FROM type WHERE ${whereClause}`, params, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: 'Aucune type trouvée avec ce nom.' });
      }

      return res.status(200).json(result);
  });
};
