const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/users-db', {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false
})
.then(db => console.log('Base de Datos conectada.'))
.catch(err => console.error(err));