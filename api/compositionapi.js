module.exports = (app,serviceUser,serviceComposition,jwt) => {
    app.get("/piece/:id/composition", jwt.validateJWT, async (req, res) => {
        try {
            const composition = await serviceComposition.dao.getAll(req.params.id)
            return res.json(composition)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/composition", jwt.validateJWT, async (req, res) => {
        try {
            const composition = req.body

            await serviceComposition.dao.insert(composition)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/composition/:id", jwt.validateJWT, async (req, res) => {
        try {
            const composition = await serviceComposition.dao.getById(req.params.id)
            if (composition === undefined || composition === null) {
                return res.status(404).end()
            }
            return res.json(composition)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/composition", jwt.validateJWT, async (req, res) => {
        try {
            const composition = req.body
            const oldComposition = await serviceComposition.dao.getById(composition.id)
            if (oldComposition === null || oldComposition === undefined) {
                return res.status(404).end()
            }
            serviceComposition.dao.update(composition)
            res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.delete("/composition/:id",jwt.validateJWT,async(req,res)=>{
        try{
            await serviceComposition.dao.delete(req.params.id)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}