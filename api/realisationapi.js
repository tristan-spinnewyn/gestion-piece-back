module.exports = (app,serviceUser,serviceRealisation,stock,jwt) => {
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

            await serviceRealisation.dao.insert(realisation)
            await stock.fabric(realisation.gamme_id,1)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}