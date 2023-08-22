const {Router}=require("express");
const loginRouter = Router();
const { middleware: bodyParser } = require("bodymen");
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {registerUserCtrl,authUserCtrl,toggleAccessCtrl}=require('./controller');

loginRouter.post('/register-user',registerUserCtrl);

loginRouter.post('/login',bodyParser({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}),authUserCtrl)

loginRouter.get('/toggle-access/:id',authenticate(),toggleAccessCtrl);



module.exports=loginRouter;
