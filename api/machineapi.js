module.exports = (app,serviceUser,serviceMachine,servicePlanMachine,servicePoste,jwt) =>{

    app.get("/machine",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const machines = await serviceMachine.dao.getAll()
            return res.json(machines)
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/machine",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const machine = req.body
            if(machine.label_machine === '' || machine.label_machine === undefined){
                return res.status(400).end()
            }
            await serviceMachine.dao.insert(machine)
            return res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/machine/:id",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }

            const machine = await serviceMachine.dao.getById(req.params.id)
            if(machine === undefined || machine === null){
                return res.status(404).end()
            }
            return res.json(machine)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/machine",jwt.validateJWT, async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const machine = req.body
            const oldMachine = await serviceMachine.dao.getById(machine.id)
            if(oldMachine === null || oldMachine === undefined){
                return res.status(404).end()
            }
            serviceMachine.dao.update(machine)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/machine/:id/poste",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const machine = await serviceMachine.dao.getById(req.params.id)
            if(machine === undefined || machine === null){
                return res.status(404).end()
            }
            const machine_poste = await servicePlanMachine.dao.getAll(req.params.id)
            return res.json(machine_poste)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/post_machine",jwt.validateJWT, async (req,res)=>{
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const machine_poste = req.body
            const exitMachinePost = await servicePlanMachine.dao.get(machine_poste)
            console.log(exitMachinePost)
            if(exitMachinePost !== undefined && exitMachinePost !==null){
                return res.status(400).end()
            }
            const machine = await serviceMachine.dao.getById(machine_poste.machine_id)
            const poste = await servicePoste.dao.getById(machine_poste.plan_de_travail_id)
            if(machine === undefined || machine === null || poste ===undefined || poste === null){
                return res.status(404).end()
            }
            await servicePlanMachine.dao.insert(machine_poste)
            return res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.delete("/machine/:id/poste/:id_poste",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const poste_machine = {machine_id:req.params.id, plan_de_travail_id:req.params.id_poste}

            servicePlanMachine.dao.delete(poste_machine)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

}