const express = require("express") 
const uuid = require("uuid")
const cors = require('cors');
const port =  3001;

 const app = express ()
 app.use(express.json());
 app.use(cors())

 const orders = []

 const checkOrderId = (request,response, next) =>{
    const{ id } = request.params
    
    const index = orders.findIndex(order => order.id === id )

    if(index < 0 ){
        return response.status(404).json({message:"Order not found"})
    }
    
    request.orderIndex = index
    request.orderId = id

    next()
 }

 app.get("/", (req, res) => {
    return res.json("hello world");
  });




    
app.get("/orders", (request, response) =>{
    
    return response.json(orders)
    
   
})

app.post("/orders", (request, response) =>{
    const {order,name} = request.body
   
    const pedidos = { id:uuid.v4(),order,name}

    orders.push(pedidos)

    return response.status(201).json(pedidos)
    

})

app.put("/orders/:id",checkOrderId, (request, response) =>{

    const {order,name} = request.body
    const index = request.orderIndex
    const id =  request.orderId
    const updadeOrder = {id,order,name}
    
    

    
    orders[index] = updadeOrder
    
    return response.json(updadeOrder)
    

})

app.delete("/orders/:id",checkOrderId, (request, response) =>{
    const index = request.orderIndex
   
    orders.splice(index,1)

    return response.status(204).json()
    

})


 app.listen(port,() =>{
    console.log(`✔👌Server started on port ${port}`)
 })