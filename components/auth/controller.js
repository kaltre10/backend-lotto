const store = require('./store');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = (name, user, pass) => {
    return new Promise( async (resolve, reject) => {
        try {
            const dataUser = await store.get(user.toLowerCase());

            if(dataUser) throw 'El usuario ya existe';  
            user = user.toLowerCase();
            await store.save({name, user, pass});
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

            resolve({
                token: dataUser,
                level: user.level
            });
            
        } catch (error) {
            reject(error);
        }
    });
}

const verify = (token) => {
    return new Promise( async (resolve, reject) => {
        try {

            const decoded = await jwt.verify(token, 'secret');
            const user = await store.get(decoded.data.name.toLowerCase());

            if(!user) throw 'El usuario no existe';  

            const passCompare = await bcrypt.compare(user.pass, decoded.data.pass);

            if(passCompare){
                resolve(true);
            }else{
                resolve(false);
            }            

        } catch (error) {
            reject(error);
        }
    });
}

const deleteUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try {

            await store.deleteUser(id);

            resolve("Usuario Eliminado");
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    auth,
    login,
    verify,
    deleteUser
}