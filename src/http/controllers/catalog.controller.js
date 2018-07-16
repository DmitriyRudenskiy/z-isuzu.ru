console.log(__dirname);

import Model from '../../models/model.model';

const CatalogController = {};
module.exports = CatalogController;

CatalogController.index = async (ctx, next) => {

    const models = await Model.findAll();

    console.log(models);

    ctx.body = await ctx.render('catalog/index', {models})
}