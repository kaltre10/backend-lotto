const store = require('./store');

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

            resolve({id: user._id, name: user.name, level: user.level});
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    auth,
    login
}