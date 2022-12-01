import { Request, Response } from 'express'
import { Representante } from '../models/Representante'
import { Op } from 'sequelize'

type RepresentanteType = {
    nome: string 
    qnt_clientes: number 
    comissao: number
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const representantes: Representante = await Representante.findAll()

            return res.json(representantes)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { nome, qnt_clientes, comissao } = req.body

            const representante: RepresentanteType = await Representante.create({ nome, qnt_clientes, comissao })

            return res.json(representante)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome, qnt_clientes, comissao } = req.body
    
            let representante: Representante = await Representante.findByPk(id)
    
            if(!representante) {
                return res.status(400).json({ error: 'Representante não encontrado' })
            }
            
            representante.nome = nome ? nome : representante.nome
            representante.qnt_clientes = qnt_clientes ? qnt_clientes : representante.qnt_clientes
            representante.comissao = comissao ? comissao : representante.comissao
            
            await representante.save()

            return res.json(representante)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
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

    async buscar(req: Request, res: Response) {
        try {
            const { nome } = req.body

            const representantes: Representante = await Representante.findAll({
                where: { 
                    nome: {
                        [Op.like]: `${nome}%`
                    }
                }
            })

            if(!representantes) {
                return res.status(400).json({ error: 'Representante não encontrado' })
            }

            return res.json(representantes)

        } catch (error) {
            console.log(error)
        }
    },

    async buscarUm(req: Request, res: Response) {
        try {
            const { id } = req.params

            const representante: Representante = await Representante.findByPk(id)

            if(!representante) {
                return res.status(400).json({ error: 'Representante não encontrado' })
            }

            return res.json(representante)

        } catch(error) {
            console.log(error)
        }
    }
}