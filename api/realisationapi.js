module.exports = (app,serviceUser,serviceRealisation,serviceOperationRealisation,stock,jwt) => {
    app.get("/realisation", jwt.validateJWT, async (req, res) => {
        try {
            const composition = await serviceRealisation.dao.getAll()
            return res.json(composition)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/realisation", jwt.validateJWT, async (req, res) => {
        try {
            const realisation = req.body

            const realisation_id = await serviceRealisation.dao.insert(realisation)
            await stock.fabric(realisation.gamme_id,1)
            await stock.setOperation(realisation.gamme_id,realisation_id)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/realisation/:id", jwt.validateJWT, async (req, res) => {
        try {
            const composition = await serviceRealisation.dao.getById(req.params.id)
            if(composition === null || composition === undefined){
                return res.status(404)
            }

            return res.json(composition)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/realisation/:id/operation",jwt.validateJWT,async(req,res)=>{
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const operation = await serviceOperationRealisation.dao.getAll(req.params.id)
            res.json(operation)
        }catch (e) {
            console.log(e)
            req.status(400).end()
        }
    })

    app.post("/realisation_operation",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }

            const realisation_operation = req.body
            await serviceOperationRealisation.dao.insert(realisation_operation)
            return res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.delete("/realisation/:id/operation/:id_operation",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const realisation_operation = {realisation_id:req.params.id, operation_id:req.params.id_operation}
            serviceOperationRealisation.dao.delete(realisation_operation)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}