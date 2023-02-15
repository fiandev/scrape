const Express = require("express");
const log = require("../middlewares/log");

/*
 * example require controller
 */
const LamudiSearchController = require("../controllers/LamudiSearchController");

const router = Express.Router();
class Router {
    static init() {
        return [
            this.get("/lamudi/search", (req, res, next) => new LamudiSearchController(res, req, next).all()),
            this.get("/lamudi/detail/:slug", (req, res, next) => new LamudiSearchController(res, req, next).all())
        ];
    }
    
    static get(...args) {
        // add middleware log
        args.push(log);
        return router.get(...args);
    }
    
}

module.exports = Router;
