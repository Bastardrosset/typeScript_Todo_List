const mongoose = require('mongoose');
const { isEmail } = require('validator'); // Bibliotheque nodeModule, fonction pour sécuriser les emails
const bcrypt = require('bcrypt'); // bibliothèque pour hacher les mots de passes
const uniqueValidator = require("mongoose-unique-validator");

// Schema mongo db utilisateur
const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Veuillez saisir un pseudo'],
            minlength: 2,
            maxlength: 55,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Veuillez saisir un email'],
            unique : true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Veuillez saisir un mot de passe'],
            max: 50,
            minlength: 6
        },
        isAdmin: {
            type: String,
            enum: ['User', 'Admin'], // Les rôles valides
            default: 'User' // Rôle par défaut
          },
    },
    {
        timestamps: true,
    }
)

// function crypte le password avant le save
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(); // bcrypt genere une serie de cryptes aléatoires pour saler le password
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Function décrypte le password selon l'utilisateur quand login
userSchema.statics.login = async function(email, password) { //Static.login controle quand login email & password, bcrypt compare
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        //Bcrypt compare avec static.login l'email avec le password qui lui a ete passé
        if (auth) {
            return user;
        }
        throw Error('Password incorrect') //L'instruction throw permet de lever une exception définie par l'utilisateur
    }
    throw Error('email incorrect')
};

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;