import { Request, Response } from 'express'
import { Info } from '../models/Info'

type InfoType = {
    descricao: string
    missao: string
    visao: string
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const infos: Info = await Info.findAll()

            return res.json(infos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { 
                descricao,
                missao,
                visao
            } = req.body

            const info: InfoType = await Info.create({ 
                descricao,
                missao,
                visao
            })

            return res.json(info)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { 
                descricao,
                missao,
                visao 
            } = req.body
    
            let info: Info = await Info.findByPk(id)
    
            if(!info) {
                return res.status(400).json({ error: 'Informaçao não encontrada' })
            }
            
            info.descricao = descricao ? descricao : info.descricao
            info.missao = missao ? missao : info.missao
            info.visao = visao ? visao : info.visao

            await info.save()
    
            return res.json(info)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
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

    async buscar(req: Request, res: Response) {
        try {
            const { id } = req.body

            const infos: Info = await Info.findAll({
                where: { id }
            })

            if(!infos) {
                return res.status(400).json({ error: 'Informação não encontrada' })
            }

            return res.json(infos)

        } catch (error) {
            console.log(error)
        }
    },

    async buscarUm(req: Request, res: Response) {
        try {
            const { id } = req.params

            const info: Info = await Info.findByPk(id)

            if(!info) {
                return res.status(400).json({ error: 'Info não encontrada' })
            }

            return res.json(info)

        } catch(error) {
            console.log(error)
        }
    }
}