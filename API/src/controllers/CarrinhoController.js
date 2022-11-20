const { Op } = require('sequelize')
const Carrinho = require('../models/Carrinho')

module.exports = {
    async listar(req, res) {
        try {
            const carrinhos = await Carrinho.findAll({
                include: [{ association: 'user' }, { association: 'produto' }]
            })

            return res.json(carrinhos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                user_id, 
                produto_id, 
                quantidade, 
                valor_total 
            } = req.body

            const carrinho = await Carrinho.create({ 
                user_id, 
                produto_id, 
                quantidade, 
                valor_total 
            })

            return res.json(carrinho)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { 
                quantidade, 
                valor_total 
            } = req.body
    
            let carrinho = await Carrinho.findByPk(id)
    
            if(!carrinho) {
                return res.status(400).json({ error: 'Carrinho não encontrado' })
            }
            
            carrinho.quantidade = quantidade ? quantidade : carrinho.quantidade
            carrinho.valor_total = valor_total ? valor_total : carrinho.valor_total

            await carrinho.save()
    
            return res.json(carrinho)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Carrinho.findByPk(id)) {
                return res.status(400).json({ error: 'Carrinho não encontrado' })
            }

            await Carrinho.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscarUm(req, res) {
        try {
            const { user_id } = req.body
            
            const carrinho = await Carrinho.findAll({
                where: { user_id }, 
                include: [{ association: 'user' }, { association: 'produto' }]
            })
            
            if(!carrinho) {
                return res.status(400).json({ error: 'Carrinho não encontrado' })
            }
            
            return res.json(carrinho)
            
        } catch (error) {
            console.log(error)
        }
    }
}