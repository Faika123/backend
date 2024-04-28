const { db } = require('../database');

exports.listerContact = (req, res) => {
    db.query('SELECT * FROM contact', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(200).wjson(result);
    });
};
exports.ajouterContact = (req, res) => {
    const { message, date_message, utilisateur_id } = req.body;
    if (!message || !date_message || !utilisateur_id) {
        return res.status(400).json({ message: 'Le message est requis.' });
    }

    db.query('INSERT INTO contact (message, date_message, utilisateur_id) VALUES (?, ?, ?)', [message, date_message, utilisateur_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(201).json({ message: 'message ajoutée avec succès.' });
    });
};

exports.modifierContact = (req, res) => {
    const id = req.params.id;
    const { message, date_message, utilisateur_id } = req.body;
    if (!message || !date_message || !utilisateur_id) {
        return res.status(400).json({ message: 'Le message est requis pour la modification.' });
    }

    db.query('UPDATE contact SET message = ?, date_message = ?, utilisateur_id = ? WHERE id = ?', [message, date_message, utilisateur_id, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucune contact trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'message modifiée avec succès.' });
    });
};

exports.supprimerContact = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM contact WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucune message trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'message supprimée avec succès.' });
    });
};