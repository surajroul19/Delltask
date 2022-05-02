const express = require('express')
const app = express()
var cors = require('cors');
var bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");

const port = 3000
app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.post('/saveData', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/Multiplication', (err, client) => {
        if (err) throw err
        else{
            const tempClient=client.db('Multiplication').collection('history')
            tempClient.insertOne({
                'first':req?.body?.first,
                'second':req?.body?.second,
                'result':req?.body?.result,
                'time':new Date()},function(error,result){
                if (error) throw error;
                res.send({'message':"Data updated successfully"})
            })
        }
    })
})

app.get('/getData', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/Multiplication', (err, client) => {
        if (err) throw err
        else{
            client.db('Multiplication').collection('history')
            .find({}).toArray((error,result)=>{
                if (error) throw error;
                res.json(result)
            })
        }
    })
  })

app.listen(port)