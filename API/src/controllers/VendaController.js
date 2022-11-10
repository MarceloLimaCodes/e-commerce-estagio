const Venda = require('../models/Venda')

module.exports = {
    async listar(req, res) {
        try {
            const vendas = await Venda.findAll({
                include: [{ association: 'cliente' }, { association: 'representante' }]
            })

            return res.json(vendas)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req, res) {
        try {
            const { 
                cliente_id, 
                representante_id, 
                valor, 
                comissao, 
                status 
            } = req.body

            const venda = await Venda.create({ 
                cliente_id, 
                representante_id, 
                valor, 
                comissao, 
                status
            })

            return res.json(venda)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req, res) {
        try {
            const { id } = req.params
            const { 
                cliente_id, 
                representante_id, 
                valor, 
                comissao, 
                status 
            } = req.body
    
            let venda = await Venda.findByPk(id)
    
            if(!venda) {
                return res.status(400).json({ error: 'Link não encontrado' })
            }
            
            venda.cliente_id = cliente_id ? cliente_id : venda.cliente_id
            venda.representante_id = representante_id ? representante_id : venda.representante_id
            venda.valor = valor ? valor : venda.valor
            venda.comissao = comissao ? comissao : venda.comissao
            venda.status = status ? status : venda.status
    
            return res.json(venda)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params

            if(!await Venda.findByPk(id)) {
                return res.status(400).json({ error: 'Link não encontrado' })
            }

            await Venda.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req, res) {
        try {
            const { cliente_id } = req.body

            const vendas = await Venda.findAll({ 
                where: { cliente_id }
            })

            if(!vendas) {
                return res.status(400).json({ error: 'Venda não encontrada' })
            }

            return res.json(vendas)

        } catch (error) {
            console.log(error)
        }
    }
}