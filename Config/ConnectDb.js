const mongoose = require('mongoose')
const connectdb=()=>{
    mongoose.connect('mongodb+srv://vjdvnt:Il8nX0pctU6EURGp@cluster0.ocr5u.mongodb.net/super?retryWrites=true&w=majority&appName=Cluster0')
    // mongodb+srv://vjsavi123:ltQT72e3aPj4ZjTI@cluster0.9hlc8fs.mongodb.net/superlabs?retryWrites=true&w=majority&appName=Cluster0
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}
module.exports=connectdb;