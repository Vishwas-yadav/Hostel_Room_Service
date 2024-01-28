/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication and registration
 */
const { Router } = require("express");
const loginRouter = Router();
const { middleware: bodyParser } = require("bodymen");
const authenticate = require('../../utilities/authentication/passport')().authenticate;
const { registerUserCtrl, authUserCtrl, toggleAccessCtrl } = require('./controller');
/**
 * @swagger
 * /api/user/register-user:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided data
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: 'user@example.com', password: 'password123' }
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example: { message: 'User registered successfully' }
 */
loginRouter.post('/register-user', registerUserCtrl);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user with the provided credentials
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: 'user@example.com', password: 'password123' }
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             example: { message: 'Authentication successful', token: 'jwt-token-here' }
 */
loginRouter.post('/login', bodyParser({
  email: {
    type: String,
  },
  password: {
    type: String,
  }
}), authUserCtrl);

/**
 * @swagger
 * /api/user/toggle-access/{id}:
 *   get:
 *     summary: Toggle user access
 *     description: Toggle access for a user by ID
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Access toggled successfully
 *         content:
 *           application/json:
 *             example: { message: 'Access toggled successfully' }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
loginRouter.get('/toggle-access/:id', authenticate(), toggleAccessCtrl);

module.exports = loginRouter;

