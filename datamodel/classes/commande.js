module.exports = class Commande {
    constructor(date_commande,client_id,status) {
        this.date_commande = date_commande
        this.client_id = client_id
        this.status = status
    }
}