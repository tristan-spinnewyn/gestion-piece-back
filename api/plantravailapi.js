module.exports = (app,serviceUser,servicePlanDeTravail,serviceQualification,jwt) =>{
    app.get("/plan_travail",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const plans = await servicePlanDeTravail.dao.getAll()
            return res.json(plans)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/plan_travail",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const plan = req.body
            servicePlanDeTravail.dao.insert(plan)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            req.status(400).end()
        }
    })

    app.put("/plan_travail",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const plan = req.body
            const oldPlan = await servicePlanDeTravail.dao.getById(plan.id)
            if(oldPlan === null || oldPlan === undefined){
                return res.status(400).end()
            }
            servicePlanDeTravail.dao.update(plan)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            req.status(400).end()
        }
    })

    app.get("/plan_travail/:id",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const plan = await servicePlanDeTravail.dao.getById(req.params.id)
            if(plan === undefined || plan === null){
                return res.status(404).end()
            }
            return res.json(plan)
        }catch (e){
            console.log(e)
            req.status(400).end()
        }
    })

    app.get("/plan_travail/:id/users",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const plan = await servicePlanDeTravail.dao.getById(req.params.id)
            if(plan === undefined || plan === null){
                return res.status(404).end()
            }
            const qualification = await serviceQualification.dao.getAll(req.params.id)
            return res.json(qualification)
        }catch (e){
            console.log(e)
            req.status(400).end()
        }
    })

    app.post("/user_qualification",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const qualification = req.body
            const plan = await servicePlanDeTravail.dao.getById(qualification.plan_de_travail_id)
            const user = await serviceUser.dao.getById(qualification.user_id)
            if(plan === undefined || plan === null || user=== undefined || user === null){
                return res.status(404).end()
            }
            await serviceQualification.dao.insert(qualification)
            res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.delete("/plan_travail/:id/user/:id_user",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isOuvrier(req.user.id)) {
                return res.status(401).end()
            }
            const qualification = {user_id:req.params.id_user, plan_de_travail_id:req.params.id}
            serviceQualification.dao.delete(qualification)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}