module.exports = class Achat {
    constructor(date_achat,date_livraison_prev,date_livraison_reel,montant_tot,fournisseur_id) {
        this.date_achat = date_achat
        this.date_livraison_prev = date_livraison_prev
        this.date_livraison_reel = date_livraison_reel
        this.montant_tot = montant_tot
        this.fournisseur_id = fournisseur_id
    }
}