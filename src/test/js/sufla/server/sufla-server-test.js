/**
 * sufla-server-test.js
 * 
 * @author e-freak
 */

import assert from 'assert';
import ws from 'websocket';

import SuflaServer from './sufla-server';



describe('SuflaServerTest', () => {
    
    describe('start', () => {
        
        it ('Listen on target port.', () => {
            const port = 55151;
            const message = "Test message.";
            const client = new ws.client();
            client.on('connect', (connection) => {
                connection.on('message', (received) => {
                    switch (received.type) {
                    case 'UTF-8':
                        assert.strictEqual(received.utf8Data, message);
                        break;
                    default:
                        assert.fail(`Unknown message: ${received.utf8Data}`);
                        break;
                    }
                });
                connection.on('error', (error) => {
                    assert.fail(`Connection error: ${error.toString()}`);
                });
                connection.sendUTF(message);
            });
            
            const server = createSuflaServer();
            try {
                server.start(port);
                client.connect(`ws://localhost:${port}`, 'echo-protocol');
            }
            finally {
                server.close();
            }
        });
        
    });
    
    
    
    function createSuflaServer() {
        return new SuflaServer();
    }
    
});
