module.exports = (app,serviceUser,jwt) =>{
    app.post("/user/authenticate", (req,res)=>{
        const {login, password} = req.body
        if((login === undefined) || (password === undefined)){
            console.log(req.body)
            res.status(400).end()
            return
        }

        console.log(req.body)

        serviceUser.validatePassword(login,password)
            .then(async autheticated =>{
                if(!autheticated){
                    res.status(401).end()
                    return
                }
                const user = await serviceUser.dao.getByLogin(login)
                res.json({'token': jwt.generateJWT(login), 'rights' : await serviceUser.dao.getRights(user.id)})
            })
            .catch(e=>{
                console.log(e)
                res.status(500).end()
            })
    })
    app.get("/users",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const users = await serviceUser.dao.getAll()
            return res.json(users)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
    app.get("/user/:id/right",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const rights = await serviceUser.userRightDao.getAll(req.params.id)
            return res.json(rights)
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })
    app.post("/user",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const user = req.body
            serviceUser.insert(user.firstname, user.lastname,user.email,user.pwd)

            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
    app.put("/user",jwt.validateJWT,async (req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const user = req.body
            if((user.id === undefined) || (user.id == null)) return res.status(400).end()
            const prevUser = serviceUser.dao.getById(user.id)
            if(prevUser === undefined || prevUser == null) return res.status(404).end()
            serviceUser.update(user)
            res.status(200).end()
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/user/:id/right",jwt.validateJWT, async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const prevUser = serviceUser.dao.getById(req.params.id)
            if(prevUser === undefined || prevUser == null) return res.status(404).end()
            const user_right = req.body
            serviceUser.userRightDao.insert(user_right)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }

    })

    app.delete("/user/:id_user/right/:id_right",jwt.validateJWT, async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const prevUser = serviceUser.dao.getById(req.params.id)
            if(prevUser === undefined || prevUser == null) return res.status(404).end()
            const user_right = {user_id:req.params.id_user, right_id:req.params.id_right}
            serviceUser.userRightDao.delete(user_right)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
    app.get("/rights",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const rights = await serviceUser.RightDao.getAll()
            return res.json(rights)
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })
    app.get("/user/:id",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id)) {
                return res.status(401).end()
            }
            const user = await serviceUser.dao.getById(req.params.id)
            if(user === undefined || user === null){
                return res.status(404).end()
            }
            return res.json(user)
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/users/ouvrier",jwt.validateJWT,async(req,res)=>{
        try{
            const users = await serviceUser.dao.getOuvrier()
            return res.json(users)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}
