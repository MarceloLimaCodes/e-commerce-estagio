const { Op } = require('sequelize')
const Representante = require('../models/Representante')

module.exports = {
    async listar(req, res) {
        try {
            const representantes = await Representante.findAll()

            return res.json(representantes)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { nome, qnt_clientes, comissao } = req.body

            const representante = await Representante.create({ nome, qnt_clientes, comissao })

            return res.json(representante)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { nome, qnt_clientes, comissao } = req.body
    
            let representante = await Representante.findByPk(id)
    
            if(!representante) {
                return res.status(400).json({ error: 'Representante não encontrado' })
            }
            
            representante.nome = nome ? nome : representante.nome
            representante.qnt_clientes = qnt_clientes ? qnt_clientes : representante.qt_clientes
            representante.comissao = comissao ? comissao : representante.comissao
    
            return res.json(representante)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Representante.findByPk(id)) {
                return res.status(400).json({ error: 'Representante não encontrado' })
            }

            await Representante.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { nome } = req.body

            const representantes = await Representante.findAll({
                where: { 
                    nome: {
                        [Op.like]: `${nome}%`
                    }
                }})

            if(!representantes) {
                return res.status(400).json({ error: 'Representante não encontrado' })
            }

            return res.json(representantes)

        } catch (error) {
            console.log(error)
        }
    }
}