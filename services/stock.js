const CompositionDAO = require("../datamodel/dao/compositiondao")
const PieceDAO = require("../datamodel/dao/piecedao")
const GammeDAO = require("../datamodel/dao/gammedao")
const MatPrem = require("../datamodel/dao/mat_premdao")

module.exports = class StockService {
    constructor(db) {
        this.compositionDao = new CompositionDAO(db)
        this.pieceDAO = new PieceDAO(db)
        this.gammeDAO = new GammeDAO(db)
        this.matPremDAO = new MatPrem(db)
    }

    async fabric(gamme_id,qteFabric){
        const gamme = await this.gammeDAO.getById(gamme_id)
        const piece = await this.pieceDAO.getById(gamme.piece_id)
        await this.pieceDAO.addStock(piece.id,qteFabric)
        const compositions = await this.compositionDao.getAll(piece.id)
        compositions.map(async (data)=>{
            if(data.piece_composite != null){
                await this.pieceDAO.sousStock(data.piece_composite,data.compoqte)
            }
            if(data.mat_composite != null){
                await this.matPremDAO.sousStock(data.mat_composite,data.compoqte)
            }
        })

    }
}