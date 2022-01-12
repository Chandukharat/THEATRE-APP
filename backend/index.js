const cors=require('cors')
const express=require('express')
const app=express()
app.use(express.json())
const Regi = require('./Register')
require('./conn')
app.use(cors())
const port=2000

let database=[]

app.get('/access',(req,res)=>{
    res.send({database:database})
})

app.post('/update',(req,res)=>{
    database=req.body.seats
    console.log(database)
    res.send("Done")
})
app.put('/movieNames/:id', async(req,res)=>{

    console.log(req.params.id)
    console.log(req.body)
 const updatedData = await Regi.findByIdAndUpdate(req.params.id, req.body);

 res.send(updatedData)
 })

app.get('/poster', async(req,res)=>{
    const datas = await Regi.find();

    res.send(datas)
})


app.listen(port,()=>{
    console.log(`Server is up and running at Port ${port}`)
})