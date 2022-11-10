const { Op } = require('sequelize')
const Contato = require('../models/Contato')

module.exports = {
    async listar(req, res) {
        try {
            const contatos = await Contato.findAll()

            return res.json(contatos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                endereco, 
                email, 
                celular,
                observacao,
                site,
                whatsapp,
                geo_localizacao 
            } = req.body

            const contato = await Contato.create({ 
                endereco, 
                email, 
                celular,
                observacao,
                site,
                whatsapp,
                geo_localizacao 
            })

            return res.json(contato)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { 
                endereco, 
                email, 
                celular,
                observacao,
                site,
                whatsapp,
                geo_localizacao 
            } = req.body
    
            let contato = await Contato.findByPk(id)
    
            if(!contato) {
                return res.status(400).json({ error: 'Contato não encontrado' })
            }
            
            contato.endereco = endereco ? endereco : contato.endereco
            contato.email = email ? email : contato.email
            contato.celular = celular ? celular : contato.celular
            contato.observacao = observacao ? observacao : contato.observacao
            contato.site = site ? site : contato.site
            contato.whatsapp = whatsapp ? whatsapp : contato.whatsapp
            contato.geo_localizacao = geo_localizacao ? geo_localizacao : contato.geo_localizacao
    
            return res.json(contato)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Contato.findByPk(id)) {
                return res.status(400).json({ error: 'Contato não encontrado' })
            }

            await Contato.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { email } = req.body

            const contatos = await Contato.findAll({
                where: { email }
            })

            if(!contatos) {
                return res.status(400).json({ error: 'Contato não encontrado' })
            }

            return res.json(contatos)

        } catch (error) {
            console.log(error)
        }
    }
}