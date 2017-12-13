alert('aaxasxa');
var Router = require('routes');
var router = Router();
var noop = function(){
    return "hello world!";
};

router.addRoute("/", noop);
