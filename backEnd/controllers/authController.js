const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 60 * 60 * 1000; // expire au bout de 3h.
require('dotenv').config({ path: '../config/.env' });


// Function creation du token utilisateur
const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.RANDOM_KEY_SECRET,
        { expiresIn: maxAge }
    );
};

// Function de création de compte
module.exports.signUp = async (req, res) => {
    // console.log(req.body)
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.create({ name, email, password });
        return res.status(201).send({ user: user._id });
    } catch (error) {
        return res.status(400).send({ error });
    };
};

// Function d'identification a un compte
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
// console.log(email)
    try {
        const user = await UserModel.login(email, password);
console.log(user)

        const token = createToken(user._id);
        console.log('user signIn createtoken', token)

        return res.status(200).json({ user: user, token: token, stat: "ok" });
        
    } catch (error) {
        console.log('error')
        return res.status(401).send({ error });
        console.log('error signIn', res.status)

    };
};

// Function déconnection
module.exports.logout = (req, res) => {
    return res.redirect('/');
};