import { Request, Response } from 'express'
import { Op } from 'sequelize'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')

import { User } from '../models/User'

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

type UserType = {
    nome1: string
    nome2: string
    email: string
    password: string 
    cpf: string 
    foto_perfil: Buffer
    permissao: string
    ativo: string
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const users: User = await User.findAll({ 
                attributes: ['nome1', 'nome2', 'email', 'foto_perfil']
            })

            return res.json(users)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { 
                nome1, 
                nome2, 
                email, 
                password, 
                cpf, 
                foto_perfil 
            } = req.body

            const hash: string = await bcrypt.hash(password, 10);

            const user: UserType = await User.create({ 
                nome1,
                nome2, 
                email, 
                password: hash, 
                cpf, 
                foto_perfil,
                permissao: "false",
                ativo: "true"
            })

            return res.json(user)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const {
                nome1,
                nome2, 
                email, 
                password, 
                cpf, 
                foto_perfil,
                permissao,
                ativo
            } = req.body
    
            let user: User = await User.findByPk(id)
    
            if(!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }
            
            user.nome1 = nome1 ? nome1 : user.nome1
            user.nome2 = nome2 ? nome2 : user.nome2
            user.email = email ? email : user.email
            user.password = password ? password : user.password
            user.cpf = cpf ? cpf : user.cpf
            user.foto_perfil = foto_perfil ? foto_perfil : user.foto_perfil
            user.permissao = permissao ? permissao : user.permissao
            user.ativo = ativo ? ativo : user.ativo

            await user.save()

            return res.json(user)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params

            if(!await User.findByPk(id)) {
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }

            await User.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req: Request, res: Response) {
        try {
            const { nome1 } = req.body

            const users: User = await User.findAll({
                where: { 
                    nome: {
                        [Op.like]: `${nome1}%`
                    }
                }
            })

            if(!users) {
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }

            return res.json(users)

        } catch (error) {
            console.log(error)
        }
    },

    async autenticar(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user: User = await User.findOne({ 
                where: { email }
            })

            if(!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }

            if(await bcrypt.compare(password, user.password)) {
                user.password = undefined

                return res.json({
                    user,
                    token: generateToken({ id: user.id })
                })

                // retornar somente o token e no caso de qualquer função get, retornar tudo menos a senha

            } else {
                return res.status(400).json({ error: 'Senha incorreta' })
            }

        } catch (error) {
            console.log(error)
        }
    }
}