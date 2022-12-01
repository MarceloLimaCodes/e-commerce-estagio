import { Request, Response } from 'express'
import { Cliente } from '../models/Cliente'
import { Op } from 'sequelize'

type ClienteType = {
    nome: string
    email: string
    celular: string
    rua: string
    bairro: string
    estado: string
    cpf: string
    whatsapp: string
    cep: string
    numero: string
    cidade: string
    observacao: string
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const clientes: Cliente = await Cliente.findAll()

            return res.json(clientes)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { 
                nome, 
                email, 
                celular, 
                rua, 
                bairro, 
                estado, 
                cpf, 
                whatsapp, 
                cep, 
                numero, 
                cidade, 
                observacao
            } = req.body

            const cliente: ClienteType = await Cliente.create({ 
                nome, 
                email, 
                celular, 
                rua, 
                bairro, 
                estado, 
                cpf, 
                whatsapp, 
                cep, 
                numero, 
                cidade, 
                observacao 
            })

            return res.json(cliente)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { 
                nome, 
                email, 
                celular, 
                rua, 
                bairro, 
                estado, 
                cpf,
                whatsapp, 
                cep, 
                numero, 
                cidade, 
                observacao 
            } = req.body
    
            let cliente: Cliente = await Cliente.findByPk(id)
    
            if(!cliente) {
                return res.status(400).json({ error: 'cliente não encontrado' })
            }
            
            cliente.nome = nome ? nome : cliente.nome
            cliente.email = email ? email : cliente.email
            cliente.celular = celular ? celular : cliente.celular
            cliente.rua = rua ? rua : cliente.rua
            cliente.bairro = bairro ? bairro : cliente.bairro
            cliente.estado = estado ? estado : cliente.estado
            cliente.cpf = cpf ? cpf : cliente.cpf
            cliente.whatsapp = whatsapp ? whatsapp : cliente.whatsapp
            cliente.cep = cep ? cep : cliente.cep
            cliente.numero = numero ? numero : cliente.numero
            cliente.cidade = cidade ? cidade : cliente.cidade
            cliente.observacao = observacao ? observacao : cliente.observacao

            await cliente.save()
    
            return res.json(cliente)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params

            if(!await Cliente.findByPk(id)) {
                return res.status(400).json({ error: 'cliente não encontrado' })
            }

            await Cliente.destroy({ where: { id }})
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req: Request, res: Response) {
        try {
            const { nome } = req.body

            const clientes: Cliente = await Cliente.findAll({
                where: { 
                    nome: {
                        [Op.like]: `${nome}%`
                    }
                }})

            if(!clientes) {
                return res.status(400).json({ error: 'cliente não encontrado' })
            }

            return res.json(clientes)

        } catch (error) {
            console.log(error)
        }
    },

    async buscarUm(req: Request, res: Response) {
        try {
            const { id } = req.params

            const cliente: Cliente = await Cliente.findByPk(id)

            if(!cliente) {
                return res.status(400).json({ error: 'Cliente não encontrado' })
            }

            return res.json(cliente)

        } catch(error) {
            console.log(error)
        }
    }
}
