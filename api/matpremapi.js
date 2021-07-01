module.exports = (app,serviceUser,serviceMat,jwt) => {
    app.get("/mat_prem", jwt.validateJWT, async (req, res) => {
        try {
            const mat_prem = await serviceMat.dao.getAll()
            return res.json(mat_prem)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/mat_prem", jwt.validateJWT, async (req, res) => {
        try {
            const mat_prem = req.body

            await serviceMat.dao.insert(mat_prem)
            return res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/mat_prem/:id", jwt.validateJWT, async (req, res) => {
        try {
            const mat_prem = await serviceMat.dao.getById(req.params.id)
            if (mat_prem === undefined || mat_prem === null) {
                return res.status(404).end()
            }
            return res.json(mat_prem)
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/mat_prem", jwt.validateJWT, async (req, res) => {
        try {
            const mat_prem = req.body
            const oldMapPrem = await serviceMat.dao.getById(mat_prem.id)
            if (oldMapPrem === null || oldMapPrem === undefined) {
                return res.status(404).end()
            }
            serviceMat.dao.update(mat_prem)
            res.status(200).end()
        } catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/mat_prem/fournisseur/:id",jwt.validateJWT,async(req,res)=>{
        try{
            const piece = await serviceMat.dao.getMatPremFournisseur(req.params.id)
            res.json(piece)
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })
}