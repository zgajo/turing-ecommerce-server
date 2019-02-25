module.exports = {
	Category: { department: async category => await category.getDepartment() },
	Department: {
		categories: async department => {
			return await department.getCategories();
		},
	},
};
