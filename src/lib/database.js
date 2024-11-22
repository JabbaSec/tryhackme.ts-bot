const { container } = require('@sapphire/framework');

async function fetchUsers() {
	try {
		const users = await container.prisma.user.findMany();
		return users;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
}

module.exports = {
	fetchUsers
};
