module.exports = class LigneAchat {
    constructor(piece_id,achat_id,mat_prem_id,quantite,prix) {
        this.piece_id = piece_id
        this.achat_id = achat_id
        this.mat_prem_id = mat_prem_id
        this.quantite = quantite
        this.prix = prix
    }
}