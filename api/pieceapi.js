module.exports = (app,serviceUser,servicePiece,serviceTypePiece,serviceGamme,jwt) => {
    app.get("/type_piece",jwt.validateJWT,async(req,res)=>{
        try{
            const types = await serviceTypePiece.dao.getAll()
            res.json(types)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/piece",jwt.validateJWT,async(req,res)=>{
        try{
            const piece = await servicePiece.dao.getAll()
            res.json(piece)
        }catch (e){
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/piece/:id",jwt.validateJWT, async(req,res)=>{
        try{
            const piece = await servicePiece.dao.getById(req.params.id)
            if(piece === undefined || piece === null){
                return res.status(404).end()
            }
            res.json(piece)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.post("/piece",jwt.validateJWT,async(req,res)=>{
        try{
            const body = req.body
            const piece = {quantite:body.quantite,prix_vente: body.prix_vente,lib_piece:body.lib_piece,type_id:body.type_id,prix_achat:body.prix_achat,fournisseur_id:body.fournisseur_id}
            const id = await servicePiece.dao.insert(piece)
            if(piece.type_id != 1) {
                const gamme = {lib_gamme: body.lib_gamme, user_id: body.user_id, piece_id: id}
                await serviceGamme.dao.insert(gamme)
            }
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/piece",jwt.validateJWT,async(req,res)=>{
        try{
            const body = req.body
            const oldPiece = await servicePiece.dao.getById(body.id)
            if(oldPiece === null || oldPiece === undefined){
                return res.status(404).end()
            }
            await servicePiece.dao.update(body)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.get("/piece/:id/gamme",jwt.validateJWT,async(req,res)=>{
        try{
            const gamme = await serviceGamme.dao.getByPiece(req.params.id)
            if(gamme === undefined || gamme === null){
                return res.status(404).end()
            }
            res.json(gamme)
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })

    app.put("/gamme",jwt.validateJWT,async(req,res)=>{
        try{
            const gamme = req.body
            const oldGamme = await serviceGamme.dao.getById(gamme.id)
            if(oldGamme === null || oldGamme === undefined){
                return res.status(404).end()
            }
            await serviceGamme.dao.update(gamme)
            res.status(200).end()
        }catch (e) {
            console.log(e)
            res.status(400).end()
        }
    })
}