import { Request, Response } from 'express'
import { Contato } from '../models/Contato'

type ContatoType = {
    endereco: string
    email: string
    celular: string
    observacao: string
    site: string
    whatsapp: string
    geo_localizacao: string
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const contatos: Contato = await Contato.findAll()

            return res.json(contatos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
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

            const contato: ContatoType = await Contato.create({ 
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

    async editar(req: Request, res: Response) {
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
    
            let contato: Contato = await Contato.findByPk(id)
    
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

            await contato.save()

            return res.json(contato)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
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

    async buscar(req: Request, res: Response) {
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