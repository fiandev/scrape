const device = require('express-device');
const Router = require('./Router');
const Express = require("express");
const app = new Express();

class Server {
    /*
     * @param {String} PORT
     * @return {void}
     */
    constructor ({ PORT = 3000 }) {
        this.PORT = PORT;
        
        app.use(Express.static(__dirname + "/public"));
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            next();
        });
        app.use(Express.json());
        app.use(device.capture());
        
        // register router
        app.use('/', Router.init());
        
        // not found routes
        app.use('*', (req ,res) =>{
            res.send({
                code: 404,
                success: false,
                status: "failed"
            });
        });
        
        app.use(Express.urlencoded({ extended: true }));
    }
    
    /*
     * @return {void}
     */
    start () {
        app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}


module.exports = Server;