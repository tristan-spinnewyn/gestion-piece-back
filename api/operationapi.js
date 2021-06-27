module.exports = (app,serviceUser,serviceGamme,serviceOperation,serviceOperationGamme,servicePlanMachine,jwt) => {
    app.get("/gamme",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const gamme = await serviceGamme.dao.getAll()
            res.json(gamme)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/gamme/:id",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const gamme = await serviceGamme.dao.getById(req.params.id)
            if(gamme === null || gamme === undefined){
                return res.status(404).end()
            }
            res.json(gamme)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/operation",jwt.validateJWT,async(req,res)=>{
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const operation = await serviceOperation.dao.getAll()
            res.json(operation)
        }catch (e) {
            console.log(e)
            req.status(400).end()
        }
    })

    app.get("/operation/:id",jwt.validateJWT,async(req,res)=>{
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const operation = await serviceOperation.dao.getById(req.params.id)
            if(operation === undefined || operation === null){
                return res.status(404).end()
            }
            res.json(operation)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/operation",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }

            const operation = req.body
            await serviceOperation.dao.insert(operation)
            return res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/operation",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }

            const operation = req.body
            const oldOperation = await serviceOperation.dao.getById(operation.id)
            if(oldOperation === null || oldOperation === undefined){
                return res.status(404).end()
            }
            await serviceOperation.dao.update(operation)
            return res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/gamme/:id/operation",jwt.validateJWT,async(req,res)=>{
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const operation = await serviceOperationGamme.dao.getAll(req.params.id)
            res.json(operation)
        }catch (e) {
            console.log(e)
            req.status(400).end()
        }
    })

    app.post("/gamme_operation",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }

            const gamme_operation = req.body
            await serviceOperationGamme.dao.insert(gamme_operation)
            return res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.delete("/gamme/:id/operation/:id_operation",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const gamme_operation = {gamme_id:req.params.id, operation_id:req.params.id_operation}
            serviceOperationGamme.dao.delete(gamme_operation)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/plan_machine",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const poste_machine = await servicePlanMachine.dao.getAllOp()
            res.json(poste_machine)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}