const { Op } = require('sequelize')
const Categoria = require('../models/Categoria')

module.exports = {
    async listar(req, res) {
        try {
            const categorias = await Categoria.findAll()

            return res.json(categorias)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { nome, observacao } = req.body

            const categoria = await Categoria.create({ nome, observacao })

            return res.json(categoria)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { nome, observacao } = req.body
    
            let categoria = await Categoria.findByPk(id)
    
            if(!categoria) {
                return res.status(400).json({ error: 'categoria não encontrada' })
            }
            
            categoria.nome = nome ? nome : categoria.nome
            categoria.observacao = observacao ? observacao : categoria.observacao

            await categoria.save()
    
            return res.json(categoria)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Categoria.findByPk(id)) {
                return res.status(400).json({ error: 'Categoria não encontrada' })
            }

            await Categoria.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { nome } = req.body

            const categorias = await Categoria.findAll({
                where: { 
                    nome: {
                        [Op.like]: `${nome}%`
                    }
                }})

            if(!categorias) {
                return res.status(400).json({ error: 'Categoria não encontrada' })
            }

            return res.json(categorias)
        } catch (error) {
            console.log(error)
        }
    }
}