const store = require('./store');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = (name, pass, level) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await store.get(name.toLowerCase());

            if(user) throw 'El usuario ya existe';  
            name = name.toLowerCase();
            await store.save({name, pass, level});
            resolve({name});
            
        } catch (error) {
            reject(error);
        }
    });
}

const login = (name, pass) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await store.get(name.toLowerCase());

            if(!user) throw 'El usuario no existe';  

            if(pass != user.pass) throw 'Contraseña Invalida'; 
            
            const crypPass = await bcrypt.hash(pass, 10);

            const data = {
                id: user._id, 
                name: user.name, 
                level: user.level,
                pass: crypPass
            }

            //crear token 
            const dataUser = jwt.sign({
                data
            }, 'secret', { expiresIn: '24h' });

            resolve(dataUser);
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    auth,
    login
}