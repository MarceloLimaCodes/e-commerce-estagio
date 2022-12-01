import { Request, Response } from 'express'
import { Banner } from '../models/Banner'
import { Op } from 'sequelize'

type BannerType = {
    imagem: Buffer
    observacao: string
}

module.exports = {
    async listar(req: Request, res: Response) {
        try {
            const banners: Banner = await Banner.findAll()

            // pegar buffer do banco e transformar em base64 novamente
            for(let i = 0; i < banners.length; i++) {
                banners[i].imagem = banners[i].imagem ? banners[i].imagem.toString('base64') : banners[i].imagem   
            }

            return res.json(banners)

        } catch (error) {
            console.log(error)
        }
        
    },
    
    async criar(req: Request, res: Response) {
        try {
            const { imagem, observacao } = req.body

            const banner: BannerType = await Banner.create({ 
                imagem: Buffer.from(imagem, "base64"), 
                observacao
            })

            return res.json(banner)

        } catch (error) {
            console.log(error)
        }
       
    },

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { imagem, observacao } = req.body
    
            let banner: Banner = await Banner.findByPk(id)
    
            if(!banner) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }
            
            banner.imagem = imagem ? Buffer.from(imagem, "base64") : banner.imagem
            banner.observacao = observacao ? observacao : banner.observacao

            await banner.save()

            return res.json(banner)
            
        } catch (error) {
            console.log(error)
        }
    },

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params

            if(!await Banner.findByPk(id)) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }

            await Banner.destroy({ where: { id } })
            
            return res.status(204).end()
            
        } catch (error) {
            console.log(error)
        }
    },

    async buscar(req: Request, res: Response) {
        try {
            const { observacao } = req.body

            const banners: Banner = await Banner.findAll({
                where: {
                    observacao: {
                        [Op.like]: `${observacao}%`
                    }
                }
            })

            if(!banners) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }

            return res.json(banners)

        } catch (error) {
            console.log(error)
        }
    },

    async buscarUm(req: Request, res: Response) {
        try {
            const { id } = req.params

            const banner: Banner = await Banner.findByPk(id)

            // pegar buffer do banco e transformar em base64 novamente
            banner.imagem = banner.imagem ? banner.imagem.toString('base64') : banner.imagem   

            if(!banner) {
                return res.status(400).json({ error: 'Banner não encontrado' })
            }

            return res.json(banner)
            
        } catch (error) {
            console.log(error)
        }
    },
}