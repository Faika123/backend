const { db } = require('../database');

exports.listerPaiement = (req, res) => {
    db.query('SELECT * FROM paiement', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(200).json(result);
    });
};
exports.ajouterPaiement = (req, res) => {
    const { email, montant, nbr_carte, code, date_creation, evenement_id, utilisateur_id } = req.body;
    if (!email || !montant || !nbr_carte || !code  || !date_creation || !evenement_id || !utilisateur_id) {
        return res.status(400).json({ message: 'Le paiement est requis.' });
    }

    db.query('INSERT INTO paiement (email, montant, nbr_carte, code, date_creation, evenement_id, utilisateur_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [message, date_message, utilisateur_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(201).json({ message: 'Payment created successfully.' });
    });
};

exports.modifierPaiement = (req, res) => {
    const id = req.params.id;
    const { email, montant, nbr_carte, code, date_creation, evenement_id, utilisateur_id } = req.body;
    if (!email || !montant || !nbr_carte || !code  || !date_creation || !evenement_id || !utilisateur_id) {
        return res.status(400).json({ message: 'Le paiement est requis pour la modification.' });
    }

    db.query('UPDATE paiement SET email = ?, montant = ?, nbr_carte = ?, code = ?, date_creation = ?, evenement_id = ?, utilisateur_id = ? WHERE id = ?', [email, montant, nbr_carte, code, date_creation, evenement_id, utilisateur_id, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucune contact trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'Payment updated successfully' });
    });
};

exports.supprimerPaiement = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM paiement WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucune message trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'Payment deleted successfully' });
    });
};