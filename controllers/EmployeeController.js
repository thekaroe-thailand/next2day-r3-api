const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    list: async (req, res) => {
        const rows = await prisma.employee.findMany();
        res.json(rows);
    },
    info: async (req, res) => {
        const id = parseInt(req.params.id);
        const row = await prisma.employee.findFirst({
            where: {
                id: id
            }
        })
        if (!row) return res.status(404).json({ error: 'Employee not found' });
        res.json(row);
    },
    create: async (req, res) => {
        await prisma.employee.create({
            data: req.body
        });
        res.json({ message: 'success' });
    },
    update: async (req, res) => {
        const id = parseInt(req.params.id);
        await prisma.employee.update({
            where: {
                id: id
            },
            data: req.body
        })
        res.json({ message: 'success' });
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        await prisma.employee.delete({
            where: {
                id: id
            }
        })
        res.json({ message: 'success' });
    },
    listWithRelations: async (req, res) => {
        const rows = await prisma.employee.findMany({
            select: {
                id: true,
                name: true,
                orders: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                price: true
                            }
                        }
                    }
                }
            }
        })
        res.json(rows);
    }
}
