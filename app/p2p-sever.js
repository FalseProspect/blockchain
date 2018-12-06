const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
  constructor(blockchain){
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen(){
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectionSocket(socket));

    this.connectionToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
  }

  connectionToPeers(){
    peers.forEach(peer => {
      const socket = new Websocket(peer);

      socket.on('open', ()=> this.connectionSocket(socket));
    });
  }

  connectionSocket(socket){
    this.sockets.push(socket);
    console.log ('Socket connected');
  }

}

module.exports = P2pServer;

// $ PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev