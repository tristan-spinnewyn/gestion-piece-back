module.exports = class Devis {
    constructor(date_devis,date_limite,client_id,date_validation,montant_tot) {
        this.date_devis = date_devis
        this.date_limite = date_limite
        this.client_id = client_id
        this.date_validation = date_validation
        this.montant_tot = montant_tot
    }
}