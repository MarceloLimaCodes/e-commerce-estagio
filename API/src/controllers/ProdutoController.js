const { Op } = require('sequelize')
const Produto = require('../models/Produto')

module.exports = {
    async listar(req, res) {
        try {
            const produtos = await Produto.findAll({
                include: { association: 'categoria' }
            })

            return res.json(produtos)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                nome,
                /* ativo, */
                categoria_id,
                sabor, 
                quantidade, 
                valor, 
                desconto, 
                valor_final,
                
                imagem1,
                imagem2,
                imagem3,
                imagem4,
                imagem5,

                descricao_curta,
                descricao_longa
            } = req.body

            const produto = await Produto.create({ 
                nome,
                ativo: "true",
                categoria_id,
                sabor, 
                quantidade, 
                valor, 
                desconto, 
                valor_final,
                
                imagem1,
                imagem2,
                imagem3,
                imagem4,
                imagem5,

                descricao_curta,
                descricao_longa
            })

            return res.json(produto)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const {                 
                nome,
                ativo,
                categoria_id,
                sabor, 
                quantidade, 
                valor, 
                desconto, 
                valor_final,
                
                imagem1,
                imagem2,
                imagem3,
                imagem4,
                imagem5,

                descricao_curta,
                descricao_longa 
            } = req.body
    
            let produto = await Produto.findByPk(id)
    
            if(!produto) {
                return res.status(400).json({ error: 'produto não encontrado' })
            }
            
            produto.nome = nome ? nome : produto.nome

            produto.ativo = ativo ? ativo : produto.ativo         /* <- para que o valor seja editado, é necessário passar o false/true como string  */

            produto.categoria_id = categoria_id ? categoria_id : produto.categoria_id
            produto.sabor = sabor ? sabor : produto.sabor
            produto.quantidade = quantidade ? quantidade : produto.quantidade
            produto.valor = valor ? valor : produto.valor
            produto.desconto = desconto ? desconto : produto.desconto
            produto.valor_final = valor_final ? valor_final : produto.valor_final

            produto.imagem1 = imagem1 ? imagem1 : produto.imagem1
            produto.imagem2 = imagem2 ? imagem2 : produto.imagem2
            produto.imagem3 = imagem3 ? imagem3 : produto.imagem3
            produto.imagem4 = imagem4 ? imagem4 : produto.imagem4
            produto.imagem5 = imagem5 ? imagem5 : produto.imagem5

            produto.descricao_curta = descricao_curta ? descricao_curta : produto.descricao_curta
            produto.descricao_longa = descricao_longa ? descricao_longa : produto.descricao_longa
            
            await produto.save()
    
            return res.json(produto)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Produto.findByPk(id)) {
                return res.status(400).json({ error: 'Produto não encontrado' })
            }

            await Produto.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { nome } = req.body

            const produtos = await Produto.findAll({ 
                where: { 
                    nome: {
                        [Op.like]: `${nome}%`
                    } 
                }})

            if(!produtos) {
                return res.status(400).json({ error: 'Produto não encontrado' })
            }

            return res.json(produtos)

        } catch (error) {
            console.log(error)
        }
    }
}