const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')

const User = require('../models/User')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

module.exports = {
    async listar(req, res) {
        try {
            const users = await User.findAll({ 
                attributes: ['nome1', 'nome2', 'email', 'foto_perfil']
            })

            return res.json(users)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                nome1, 
                nome2, 
                email, 
                password, 
                cpf, 
                foto_perfil 
            } = req.body

            const hash = await bcrypt.hash(password, 10);

            const user = await User.create({ 
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

    async editar(req, res) {
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
    
            let user = await User.findByPk(id)
    
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

            return res.json(user)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
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

    async buscar(req, res) {
        try {
            const { nome1 } = req.body

            const users = await Representante.findAll({
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

    async autenticar(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ 
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