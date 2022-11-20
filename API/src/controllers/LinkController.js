const { Op } = require('sequelize')
const Link = require('../models/Link')

module.exports = {
    async listar(req, res) {
        try {
            const links = await Link.findAll({
                include: [{ association: 'cliente' }, { association: 'produto' }]
            })

            return res.json(links)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                cliente_id, 
                produto_id, 
                valor_total, 
                comissao, 
                quantidade 
            } = req.body

            const link = await Link.create({ 
                cliente_id, 
                produto_id, 
                valor_total, 
                comissao, 
                quantidade 
            })

            await link.save()
            
            return res.json(link)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { 
                cliente_id, 
                produto_id, 
                valor_total, 
                comissao, 
                quantidade 
            } = req.body
    
            let link = await Link.findByPk(id)
    
            if(!link) {
                return res.status(400).json({ error: 'Link não encontrado' })
            }
            
            link.cliente_id = cliente_id ? cliente_id : link.cliente_id
            link.produto_id = produto_id ? produto_id : link.produto_id
            link.valor_total = valor_total ? valor_total : link.valor_total
            link.comissao = comissao ? comissao : link.comissao
            link.quantidade = quantidade ? quantidade : link.quantidade
    
            return res.json(link)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Link.findByPk(id)) {
                return res.status(400).json({ error: 'Link não encontrado' })
            }

            await Link.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },
}