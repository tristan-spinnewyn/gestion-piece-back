module.exports = (app,serviceUser,serviceFournisseur,jwt) => {

    app.get("/fournisseur", jwt.validateJWT, async (req, res) => {
        try {
            const fournisseur = await serviceFournisseur.dao.getAll()
            return res.json(fournisseur)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/fournisseur", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const fournisseur = req.body
            console.log(fournisseur)
            if (fournisseur.name_fournisseur === '' || fournisseur.name_fournisseur === undefined || fournisseur.email === '' || fournisseur.email === undefined) {
                return res.status(400).end()
            }
            await serviceFournisseur.dao.insert(fournisseur)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/fournisseur/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }

            const fournisseur = await serviceFournisseur.dao.getById(req.params.id)
            if (fournisseur === undefined || fournisseur === null) {
                return res.status(404).end()
            }
            return res.json(fournisseur)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/fournisseur", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const fournisseur = req.body
            const oldFournisseur = await serviceFournisseur.dao.getById(fournisseur.id)
            if (oldFournisseur === null || oldFournisseur === undefined) {
                return res.status(404).end()
            }
            serviceFournisseur.dao.update(fournisseur)
            res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}