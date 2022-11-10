const { Op } = require('sequelize')
const Info = require('../models/Info')

module.exports = {
    async listar(req, res) {
        try {
            const infos = await Info.findAll()

            return res.json(infos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                descricao,
                missao,
                visao
            } = req.body

            const info = await Info.create({ 
                descricao,
                missao,
                visao
            })

            return res.json(info)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { 
                descricao,
                missao,
                visao 
            } = req.body
    
            let info = await Info.findByPk(id)
    
            if(!info) {
                return res.status(400).json({ error: 'Informaçao não encontrada' })
            }
            
            info.descricao = descricao ? descricao : info.descricao
            info.missao = missao ? missao : info.missao
            info.visao = visao ? visao : info.visao
    
            return res.json(info)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Info.findByPk(id)) {
                return res.status(400).json({ error: 'Informação não encontrada' })
            }

            await Info.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { id } = req.body

            const infos = await Info.findAll({
                where: { id }
            })

            if(!infos) {
                return res.status(400).json({ error: 'Informação não encontrada' })
            }

            return res.json(infos)

        } catch (error) {
            console.log(error)
        }
    }
}