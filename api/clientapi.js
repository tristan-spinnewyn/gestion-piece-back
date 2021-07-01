module.exports = (app,serviceUser,serviceClient,jwt) => {

    app.get("/client", jwt.validateJWT, async (req, res) => {
        try {
            const client = await serviceClient.dao.getAll()
            return res.json(client)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/client", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const client = req.body
            await serviceClient.dao.insert(client)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/client/:id", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }

            const client = await serviceClient.dao.getById(req.params.id)
            if (client === undefined || client === null) {
                return res.status(404).end()
            }
            return res.json(client)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/client", jwt.validateJWT, async (req, res) => {
        try {
            if (!await serviceUser.isAdmin(req.user.id) && !await serviceUser.isCompta(req.user.id)) {
                return res.status(401).end()
            }
            const client = req.body
            const oldClient = await serviceClient.dao.getById(client.id)
            if (oldClient === null || oldClient === undefined) {
                return res.status(404).end()
            }
            serviceClient.dao.update(client)
            res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}