module.exports = class Piece {
    constructor(type_id,prix_vente,prix_achat,lib_piece,fournisseur_id,quantite) {
        this.type_id = type_id
        this.prix_achat = prix_achat
        this.prix_vente = prix_vente
        this.lib_piece = lib_piece
        this.fournisseur_id = fournisseur_id
        this.quantite = quantite
    }
}