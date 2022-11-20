const { Op } = require('sequelize')
const Banner = require('../models/Banner')

module.exports = {
    async listar(req, res) {
        try {
            const banners = await Banner.findAll()

            return res.json(banners)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { imagem, observacao } = req.body

            const banner = await Banner.create({ imagem, observacao })

            return res.json(banner)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { imagem, observacao } = req.body
    
            let banner = await Banner.findByPk(id)
    
            if(!banner) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }
            
            banner.imagem = imagem ? imagem : banner.imagem
            banner.observacao = observacao ? observacao : banner.observacao

            await banner.save()

            return res.json(banner)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Banner.findByPk(id)) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }

            await Banner.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { observacao } = req.body

            const banners = await Banner.findAll({
                where: { 
                    nome: {
                        [Op.like]: `${observacao}%`
                    }
                }
            })

            if(!banners) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }

            return res.json(banners)

        } catch (error) {
            console.log(error)
        }
    }
}