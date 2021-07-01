module.exports = (app,serviceUser,serviceDevis,serviceLigneDevis,servicePiece,serviceCommande,jwt) => {
    //parts devis
    app.get("/devis", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const devis = await serviceDevis.dao.getAll()
            return res.json(devis)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/devis", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const devis = req.body
            const id = await serviceDevis.dao.insert(devis)
            return res.json({id:id})
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/devis/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }

            const devis = await serviceDevis.dao.getById(req.params.id)
            if (devis === undefined || devis === null) {
                return res.status(404).end()
            }
            return res.json(devis)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/devis/:id/terminate", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const devis = await serviceDevis.dao.getById(req.params.id)
            if (devis === null || devis === undefined) {
                return res.status(404).end()
            }
            await serviceDevis.dao.terminate(req.params.id)
            res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })


    //parts ligne devis

    app.get("/devis/:id/ligne_devis", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const lignes = await serviceLigneDevis.dao.getAll(req.params.id)
            return res.json(lignes)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/ligne_devis", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const ligne = await serviceLigneDevis.setPrix(req.body)
            if(ligne.prix === null){
                return res.status(400).end()
            }
            const devis = await serviceDevis.dao.getById(ligne.devis_id)
            if(devis.status !== 1){
                return res.status(401).end()
            }
            await serviceLigneDevis.dao.insert(ligne)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    //parts commande

    app.get("/commande", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const commande = await serviceCommande.dao.getAll()
            return res.json(commande)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/commande", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const commande = req.body
            const id = await serviceCommande.dao.insert(commande)
            return res.json({id:id})
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/commande/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }

            const commande = await serviceCommande.dao.getById(req.params.id)
            if (commande === undefined || commande === null) {
                return res.status(404).end()
            }
            return res.json(commande)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/commande/:id/terminate", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const commande = await serviceDevis.dao.getById(req.params.id)
            if (commande === null || commande === undefined) {
                return res.status(404).end()
            }
            await serviceCommande.dao.terminate(req.params.id)
            const ligne = await serviceLigneDevis.dao.getAllInCommande(req.params.id)
            for(let i = 0;i < ligne.length;i++ ){
                await servicePiece.dao.sousStock(ligne[i].piece_id,ligne[i].qte)
            }
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    //parts ligne devis in commmande

    app.get("/commande/:id/ligne_devis", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const lignes = await serviceLigneDevis.dao.getAllInCommande(req.params.id)
            return res.json(lignes)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/ligne_commande/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const lignes = await serviceLigneDevis.dao.getAllForSetCommande(req.params.id)
            return res.json(lignes)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/ligne_commande", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const ligne = req.body
            console.log(ligne)
            const commande = await serviceCommande.dao.getById(ligne.commande_id)
            if(commande.status !== 1){
                return res.status(401).end()
            }
            const existLigne = await serviceLigneDevis.dao.getPieceInCommande(ligne.commande_id,ligne.piece_id)
            if(existLigne !== null && existLigne !== undefined){
                return res.status(401).end()
            }
            await serviceLigneDevis.dao.setCommande(ligne.piece_id,ligne.devis_id,ligne.commande_id)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

}