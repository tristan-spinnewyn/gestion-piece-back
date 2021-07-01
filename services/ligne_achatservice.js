const LigneAchatDAO = require("../datamodel/dao/ligne_achatdao")
const PieceDAO = require("../datamodel/dao/piecedao")
const MatPremDAO = require("../datamodel/dao/mat_premdao")

module.exports = class LigneAchatService {
    constructor(db) {
        this.dao = new LigneAchatDAO(db)
        this.pieceDAO = new PieceDAO(db)
        this.matPremDAO = new MatPremDAO(db)
    }

    async setPrix(ligne){
        console.log(ligne)
        if(ligne.piece_id != null){
            const piece = await this.pieceDAO.getById(ligne.piece_id)
            ligne.prix = piece.prix_achat
        }else if(ligne.mat_prem_id != null){
            const matPrem = await this.matPremDAO.getById(ligne.mat_prem_id)
            ligne.prix = matPrem.prix_achat
        }
        return ligne
    }
}