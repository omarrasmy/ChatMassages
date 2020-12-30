const express = require('express');
const { disconnect } = require('process');
require('dotenv').config({ path: './configurations/dev.env' })
require('./db-con/mongoose')


let ON_MESSAGE_RECEIVED = 'receive_message';
let  SUB_EVENT_MESSAGE_SENT = 'message_sent_to_user';
let IS_USER_CONNECTED_EVENT = 'is_user_connected';
let IS_USER_ONLINE_EVENT = 'check_online';
let SUB_EVENT_MESSAGE_FROM_SERVER = 'message_from_server';
let status_massage_not_sent=10001;
let status_massage_sent=10002;
let on_connet='connection';
let on_disconet='disconnect';
const userMap=new Map();

const app = express()
app.use((req, res, next) => {
    var allowedOrigins = ['https://realquizly.web.app', 'http://localhost:6000' , "https://youthful-boyd-4eb098.netlify.app" ];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Headers', 'Authorization');
    next();
});
var http = require('http').createServer(app);
//app.use(express.static(path.join(__dirname, "JavaScript")));
const port = process.env.PORT;
const io = require('socket.io')(http);

// const CompanyRoute= require('./Routes/Company')
// const SectionRoute=require('./Routes/Sections')
// const MapRoute = require('./Routes/Map')
// const PartationRoute=require('./Routes/Partations')


app.use(express.json())
// app.use(CompanyRoute)
// app.use(SectionRoute)
// app.use(MapRoute)
// app.use(PartationRoute)


http.listen(port, function () {
    console.log("Listening on ", port);
});


io.on(on_connet, function (socket) {
    // socket.on('Error', () => {
    //     console.log('Error In Uploaded')
    //     io.emit('Error-uploaded');
    // });
    // socket.on('Success',()=>{
    //     console.log('Uploaded Successfully')
    //     io.emit('uploaded')
    // });
    // socket.on('Delete',()=>{
    //     console.log("Can't Deleted");
    //     io.emit("Error-Deleted")
    // });

    OneachUserConnect(socket);
});

function OneachUserConnect(socket){
    console.log('a user is Connect',socket.id);
    let user_id=socket.handshake.user_id;
    
    disconnection(socket);

}
function disconnection(socket){
    socket.on(on_disconet,()=>{
        socket.removeAllListeners(on_disconet);
    })
}
