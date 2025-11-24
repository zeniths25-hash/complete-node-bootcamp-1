const EventEmitter = require("events");
const http = require("http");

// const myEmitter = new EventEmitter();
class Sales extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new Sales();
myEmitter.on("message", () => {
  console.log("test message");
});
myEmitter.on("message", () => {
  console.log("test message2");
});
myEmitter.on("message", count => {
  console.log("test message"+count);
});

myEmitter.emit('message',5)




////////////////////////////////////////////////////////////////

const Server = http.createServer()

Server.on("connection",()=>{
    console.log('connection established');
})

Server.on("disconnection",()=>{
    console.log('disconnected');
});

Server.on("request",(req,res)=>{
    console.log('req received')
    res.end('response')
})
Server.on("request",()=>{
    console.log('req received2')
})

Server.on('close',()=>{
    console.log('closed')
})


Server.listen(8000,'127.0.0.1',(e)=>{
    console.log('waiting for reqests'+e)
})