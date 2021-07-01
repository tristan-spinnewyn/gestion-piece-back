module.exports = class Devis {
    constructor(date_devis,date_limite,client_id,status) {
        this.date_devis = date_devis
        this.date_limite = date_limite
        this.client_id = client_id
        this.status = status
    }
}