const express = require("express")
const app = express()
const cors = require("cors")

const { Server } = require("socket.io")

app.use(cors({
    origin:"http://localhost:3000"
}))

const server = app.listen(3001, ()=>{
    console.log("Server is running")
})

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connect", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room",(room)=>{
        socket.join(room)
        console.log(`User ${socket.id} has joined to the room ${room}`)
    })

    socket.on("send_message",(messageData)=>{
        socket.to(messageData.room).emit("receive_message", messageData)
    })

    socket.on("disconnect", ()=>{
        console.log(`User Disconnected: ${socket.id}`)
    })
})
