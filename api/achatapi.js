module.exports = (app,serviceUser,serviceAchat,serviceLigneAchat,servicePiece,serviceMatPrem,jwt) => {
    //parts achat
    app.get("/achat", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const achats = await serviceAchat.dao.getAll()
            return res.json(achats)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/achat", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const achat = req.body
            const id = await serviceAchat.dao.insert(achat)
            return res.json({id:id})
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/achat/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }

            const achat = await serviceAchat.dao.getById(req.params.id)
            if (achat === undefined || achat === null) {
                return res.status(404).end()
            }
            return res.json(achat)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/achat", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const achat = req.body
            const oldAchat = await serviceAchat.dao.getById(achat.id)
            if (oldAchat === null || oldAchat === undefined) {
                return res.status(404).end()
            }
            serviceAchat.dao.update(achat)
            res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
    //parts ligne

    app.get("/achat/:id/ligne_achat", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const lignes = await serviceLigneAchat.dao.getAll(req.params.id)
            return res.json(lignes)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/ligne_achat", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const ligne = await serviceLigneAchat.setPrix(req.body)
            if(ligne.prix === null){
                return res.status(400).end()
            }
            await serviceLigneAchat.dao.insert(ligne)
            if(ligne.piece_id != null){
                await servicePiece.dao.addStock(ligne.piece_id,ligne.quantite)
            }else if(ligne.mat_prem_id != null){
                await serviceMatPrem.dao.addStock(ligne.mat_prem_id,ligne.quantite)
            }
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/ligne_achat/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const ligne = await serviceLigneAchat.dao.getById(req.params.id)
            if (ligne === undefined || ligne === null) {
                return res.status(404).end()
            }
            return res.json(ligne)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.delete("/ligne_achat/:id",jwt.validateJWT,async(req,res)=>{
        try{
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            await serviceLigneAchat.dao.delete(req.params.id)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}