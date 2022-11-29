import { Request, Response } from 'express'
import { Link } from '../models/Link'

type LinkType = {
    cliente_id: number
    produto_id: number
    valor_total: number 
    comissao: number
    quantidade: number
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const links: Link = await Link.findAll({
                include: [{ association: 'cliente' }, { association: 'produto' }]
            })

            return res.json(links)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { 
                cliente_id, 
                produto_id, 
                valor_total, 
                comissao, 
                quantidade 
            } = req.body

            const link: LinkType = await Link.create({ 
                cliente_id, 
                produto_id, 
                valor_total, 
                comissao, 
                quantidade 
            })

            return res.json(link)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { 
                cliente_id, 
                produto_id, 
                valor_total, 
                comissao, 
                quantidade 
            } = req.body
    
            let link: Link = await Link.findByPk(id)
    
            if(!link) {
                return res.status(400).json({ error: 'Link não encontrado' })
            }
            
            link.cliente_id = cliente_id ? cliente_id : link.cliente_id
            link.produto_id = produto_id ? produto_id : link.produto_id
            link.valor_total = valor_total ? valor_total : link.valor_total
            link.comissao = comissao ? comissao : link.comissao
            link.quantidade = quantidade ? quantidade : link.quantidade
            
            await link.save()

            return res.json(link)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
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