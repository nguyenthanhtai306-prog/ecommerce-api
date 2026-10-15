require("dotenv").config();

const contractJson = require("../prisma/contract.json");

const prismaPromise =
    import ("@prisma/orm-postgres/runtime").then(
        ({ default: postgres }) => {
            return postgres({
                contractJson,
                url: process.env.DATABASE_URL,
            });
        }
    );

module.exports = prismaPromise;