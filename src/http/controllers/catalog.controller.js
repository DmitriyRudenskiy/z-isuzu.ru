import carModel from '../../models/model.model';

const CatalogController = {};
module.exports = CatalogController;

CatalogController.index = async (ctx, next) => {

    const models = await carModel.findAll();
    ctx.body = await ctx.render('catalog/index', {models})
}