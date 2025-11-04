import jwt from 'jsonwebtoken'
import config from '../config/config.js'

// Generate JWT token for user

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId}, //  payload - data we store in toekn
        config.jwt.secret, //secret key
        {expiresIn: config.jwt.expire}
    )
}

export default generateToken;