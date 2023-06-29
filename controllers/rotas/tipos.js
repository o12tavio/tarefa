
module.exports = (app)=>{
    let rota = 'tipos'
    app.get(`/consultar/${rota}/:id?`, async (req, res)=>{
        res.send(`get ${rota}`)
    })
    app.post(`/cadastrar/${rota}/:id?`, async (req, res)=>{
        res.send(`post ${rota}`)
    })
    app.post(`/atualizar/${rota}/:id?`, async (req, res)=>{
        res.send(`put ${rota}`)
    })
    app.post(`/excluir/${rota}/:id?`, async (req, res)=>{
        res.send(`delete ${rota}`)
    })

}
