import dotenv from 'dotenv'
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    nodeENV: process.env.NODE_ENV || 'development',
    mongoUri:  process.env.MONGODB_URI,
    jwt: {
        secret: process.env.JWT_SECRET,
        expire: process.env.JWT_EXPIRE || '30d'
    },
};

if(!config.mongoUri) {
    throw new Error(`Mongodb URI is not defined in environment Variables`);
}

if(!config.jwt.secret) {
    throw new Error('JWT Secret is not defened in environment Variables');
}

export default config