import { Request, Response } from 'express'
import { Carrinho } from '../models/Carrinho'

type CarrinhoType = {
    user_id: number
    produto_id: number
    quantidade: number
    valor_total: number
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const carrinhos = await Carrinho.findAll({
                include: [{ association: 'user' }, { association: 'produto' }]
            })

            return res.json(carrinhos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { 
                user_id, 
                produto_id, 
                quantidade, 
                valor_total 
            } = req.body

            const carrinho: CarrinhoType = await Carrinho.create({ 
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

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { 
                quantidade, 
                valor_total 
            } = req.body
    
            let carrinho: Carrinho = await Carrinho.findByPk(id)
    
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

    async deletar(req: Request, res: Response) {
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

    async buscarUm(req: Request, res: Response) {
        try {
            const { user_id } = req.body
            
            const carrinho: Carrinho = await Carrinho.findAll({
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