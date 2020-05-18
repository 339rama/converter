const config = require("../config");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const responseFn = require('./responseFn');

exports.loginGet = async function(request, response){
    const STATE = {admin: true, text: {}}
    const URL = '/auth/login';
    responseFn(URL, STATE, response);

}

exports.login = async function(request, response){
    let {email, password} = request.body;
    console.log(email, password);
    
    const user = await User.findOne({ email: email });

    if (!user) {
        return response.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return response.status(400).json({ message: "Неверные данные!" });
    }

    const token = jwt.sign({ userId: user.id }, config.jwt_secret, { expiresIn: '1d' });

    return response.json({ token, userId: user.id });

}

