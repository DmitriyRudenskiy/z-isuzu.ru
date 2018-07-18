import carModel from '../../models/model.model'
import Category from '../../models/category.model'
import Image from '../../models/image.model'
import Product from '../../models/product.model'

const CatalogController = {}
module.exports = CatalogController

CatalogController.index = async (ctx, next) => {
    const models = await carModel.findAll()
    ctx.body = await ctx.render('catalog/index', { models })
}

CatalogController.view = async (ctx, next) => {
    const model = await carModel.findById(ctx.params.id)
    const list = await Category.findAll({ where: { parent_number: null } })

    ctx.body = await ctx.render('catalog/view', { model, list })
}

CatalogController.category = async (ctx, next) => {
    const model = await carModel.findById(ctx.params.id)
    const sparePart = await Category.findById(ctx.params.sparePartId)
    const list = await Category.findAll({
        where: { parent_number: ctx.params.sparePartId },
    })

    console.log(ctx.params.sparePartId)

    ctx.body = await ctx.render('catalog/category', {
        model,
        spare_part: sparePart,
        list,
    })
}

CatalogController.product = async (ctx, next) => {
    const model = await carModel.findById(ctx.params.id)
    const sparePart = await Category.findById(ctx.params.sparePartId)
    const images = await Image.findAll({
        attributes: ['id', 'hash'],
        where: {
            parent_number: sparePart.parent_number,
            number: sparePart.number,
            model_id: model.id,
        },
        include: { model: Product, as: 'products' },
    })

    ctx.body = await ctx.render('catalog/product', {
        model,
        spare_part: sparePart,
        images,
    })
}
