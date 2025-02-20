import dotenv from "dotenv";
dotenv.config();

export default {
    development: {
        database: process.env.MONGO_URI
    },
    production: {
        database: process.env.MONGO_URI
    },
    test: {
        database: process.env.MONGO_URI
    },
};
