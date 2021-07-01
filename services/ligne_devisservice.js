const LigneDevisDAO = require("../datamodel/dao/ligne_devisdao")
const PieceDAO = require("../datamodel/dao/piecedao")

module.exports = class LigneDevisService {
    constructor(db) {
        this.dao = new LigneDevisDAO(db)
        this.pieceDAO = new PieceDAO(db)
    }

    async setPrix(ligne){
        console.log(ligne)
        if(ligne.piece_id != null){
            const piece = await this.pieceDAO.getById(ligne.piece_id)
            ligne.prix = piece.prix_vente
        }
        return ligne
    }
}