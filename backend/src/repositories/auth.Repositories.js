import Session from "../database/models/session.js"
import User from "../database/models/user.js"

const findUserByAttribute = async (key, value) => {
    return await User.findOne({ [key]: value })
}

const saveSession = async (user) => {
    return await Session.create(user);
}

const findSessionByTwoAttributes = async (key1, value1, key2, value2) => {
    return await Session.findOne({ [key1]: value1, [key2]: value2 })
}

export default {
    findUserByAttribute,
    saveSession,
    findSessionByTwoAttributes
};