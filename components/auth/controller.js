const store = require('./store');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = (name, user, pass, token) => {
    return new Promise( async (resolve, reject) => {
        try {
            const dataUser = await store.get(user.toLowerCase());

            if(dataUser) throw 'El usuario ya existe'; 
            
            const decoded = await jwt.verify(token, 'secret');
            if(decoded.data.level != 1) throw 'No tiene Permisos';

            user = user.toLowerCase();

            await store.save({name, user, pass});
            resolve({name});
            
        } catch (error) {
            reject(error);
        }
    });
}

const login = (user, pass) => {
    return new Promise( async (resolve, reject) => {
        try {
            const userDB = await store.get(user.toLowerCase());

            if(!userDB) throw 'El usuario no existe';  

            if(pass != userDB.pass) throw 'Contraseña Invalida'; 
            
            const crypPass = await bcrypt.hash(pass, 10);

            const data = {
                id: userDB._id, 
                name: userDB.user, 
                level: userDB.level,
                pass: crypPass,
                saldo: userDB.saldo
            }

            //crear token 
            const dataUser = jwt.sign({
                data
            }, 'secret', { expiresIn: '24h' });

            resolve({
                token: dataUser,
                level: userDB.level,
                saldo: userDB.saldo
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
                resolve({
                id: user.id,
                level: user.level,
                saldo: user.saldo
                });
            }else{
                resolve(false);
            }            

        } catch (error) {
            reject(error);
        }
    });
}

const deleteUser = (id, token) => {
    return new Promise( async (resolve, reject) => {
        try {

            const decoded = await jwt.verify(token, 'secret');
            if(decoded.data.level != 1) throw 'No tiene Permisos';  

            await store.deleteUser(id);

            resolve("Usuario Eliminado");
            
        } catch (error) {
            reject(error);
        }
    });
}

const getUsers = (token) => {
    return new Promise( async (resolve, reject) => {
        try {
            const decoded = jwt.verify(token, 'secret');

            if(decoded.data.level != 1) throw 'No tiene permisos';  
        
            const dataUser = await store.getUsers();
            resolve(dataUser);
            
        } catch (error) {
            reject(error);
        }
    });
}

const updateSaldo = (token, userId, saldo) => {
    return new Promise( async (resolve, reject) => {
        try {
            const decoded = jwt.verify(token, 'secret');

            if(decoded.data.level != 1) throw 'No tiene permisos';  
            if(saldo <= 0) throw 'El nuevo saldo debe ser mayor a 0'; 
        
            await store.userUpdate(userId, saldo);
            resolve("Modificado!!");
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    auth,
    login,
    verify,
    deleteUser,
    getUsers,
    updateSaldo
}