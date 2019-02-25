module.exports = {
	categories: async (_, __, { models }) => await models.Category.findAll(),
	departments: async (_, __, { models }) => await models.Department.findAll(),
};
