module.exports = class LigneDevis {
    constructor(piece_id,devis_id,commande_id,qte,prix) {
        this.piece_id = piece_id
        this.devis_id = devis_id
        this.commande_id = commande_id
        this.qte = qte
        this.prix = prix
    }
}