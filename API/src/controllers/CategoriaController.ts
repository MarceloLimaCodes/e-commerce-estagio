import { Request, Response } from 'express'
import { Categoria }  from '../models/Categoria'
import { Op } from 'sequelize'

type CategoriaType = {
    nome: string
    observacao: string
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const categorias: Categoria = await Categoria.findAll()

            return res.json(categorias)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { nome, observacao } = req.body

            const categoria: CategoriaType = await Categoria.create({ nome, observacao })

            return res.json(categoria)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome, observacao } = req.body
    
            let categoria: Categoria = await Categoria.findByPk(id)
    
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

    async deletar(req: Request, res: Response) {
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

    async buscar(req: Request, res: Response) {
        try {
            const { nome } = req.body

            const categorias: Categoria = await Categoria.findAll({
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