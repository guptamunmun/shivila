const express = require('express');
const route =require("./routes/routes")
const app = express();
const mongoose = require("mongoose")

app.use(express.json());

mongoose.connect('mongodb+srv://funupdb-first:VxaFh8Uez4zyv95l@cluster0.kizeuyb.mongodb.net/shivila?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
app.use("/", route) 

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
