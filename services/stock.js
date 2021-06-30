const CompositionDAO = require("../datamodel/dao/compositiondao")
const PieceDAO = require("../datamodel/dao/piecedao")
const GammeDAO = require("../datamodel/dao/gammedao")
const MatPrem = require("../datamodel/dao/mat_premdao")
const OperationGamme = require("../datamodel/dao/gamme_operationdao")
const RealisationOperation = require("../datamodel/dao/operation_realisationdao")

const OperationRealisation = require("../datamodel/classes/operation_realisation")

module.exports = class StockService {
    constructor(db) {
        this.compositionDao = new CompositionDAO(db)
        this.pieceDAO = new PieceDAO(db)
        this.gammeDAO = new GammeDAO(db)
        this.matPremDAO = new MatPrem(db)
        this.operationGammeDAO = new OperationGamme(db)
        this.realisationOperationDAO = new RealisationOperation(db)
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

    async setOperation(gamme_id,realisation_id){
        const gammeOperation = await this.operationGammeDAO.getAll(gamme_id)
        gammeOperation.map(async (data,index)=>{
            const realisationOperation = new OperationRealisation(data.operation_id,realisation_id)
            await this.realisationOperationDAO.insert(realisationOperation)
        })
    }
}