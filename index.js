const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://funupdb-first:VxaFh8Uez4zyv95l@cluster0.kizeuyb.mongodb.net/shivila-2?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
})