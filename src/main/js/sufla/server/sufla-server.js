/**
 * sufla-server.js
 * 
 * @author e-freak
 */

import ws from 'websocket';
import http from 'http';



export default class SuflaServer {
    
    constructor() {
        this._closed = true;
        this._core = http.createServer();
        this._socket = new ws.server({
            httpServer: this._core,
            autoAcceptConnections: false,
        });
    }
    
    close() {
        if (!this._closed) {
            try {
                this._socket.shutDown();
                this._core.close();
            }
            finally {
                this._closed = true;
            }
        }
    }
    
    start(port) {
        if (this._closed) {
            this._socket.on('request', this.onRequestReceived.bind(this));
            this._core.listen(port);
            this._closed = false;
        }
    }
    
    onRequestReceived(request) {
        const connection = request.accept('echo-protocol', request.origin);
        connection.on('message', (received) => {
            switch (received.type) {
            case 'UTF-8':
                // echo
                connection.sendUTF(received.utf8Data);
                break;
            case 'binary':
                // echo
                connection.sendBytes(received.binaryData);
                break;
            default:
                // 何もしない
                break;
            }
        });
    }
    
    get closed() {
        return this._closed;
    }
    
}
