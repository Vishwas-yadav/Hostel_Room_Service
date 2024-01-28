// requests/index.js

const { Router } = require("express");
const requestRouter = Router();
const authenticate = require('../../utilities/authentication/passport')().authenticate;
const {
  serviceRequestCtrl,
  getServiceResquestByRqIdCtrl,
  deleteReqByIdCtrl,
  getStaffTasksByIdCtrl,
  setPendingStatusToFalseByRequestIdCTRL
} = require('./controller');

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: API for managing service requests and tasks
 */
/**
 * @swagger
 * /api/request/service-request:
 *   post:
 *     summary: Create a service request
 *     description: Create a new service request
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { description: 'Service request description' }
 *     responses:
 *       '200':
 *         description: Service request created successfully
 *         content:
 *           application/json:
 *             example: { message: 'Service request created successfully' }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
requestRouter.post('/service-request', authenticate(), serviceRequestCtrl);

/**
 * @swagger
 * /api/request/requester-id/{id}:
 *   get:
 *     summary: Get service requests by requester ID
 *     description: Retrieve service requests based on the requester's ID
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the requester
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Success', requests: [...] }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
requestRouter.get('/requester-id/:id', authenticate(), getServiceResquestByRqIdCtrl);

/**
 * @swagger
 * /api/request/delete-by-id/{id}:
 *   delete:
 *     summary: Delete a service request by ID
 *     description: Delete a service request based on its ID
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service request
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Service request deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'Service request deleted successfully' }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
requestRouter.delete('/delete-by-id/:id', authenticate(), deleteReqByIdCtrl);

/**
 * @swagger
 * /api/request/tasks-list/{id}:
 *   get:
 *     summary: Get tasks for a staff member by ID
 *     description: Retrieve tasks for a staff member based on their ID
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the staff member
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Success', tasks: [...] }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
requestRouter.get('/tasks-list/:id', authenticate(), getStaffTasksByIdCtrl);

/**
 * @swagger
 * /api/request/setRequestDone/{id}:
 *   get:
 *     summary: Set the pending status to false for a service request by ID
 *     description: Set the pending status to false for a service request based on its ID
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service request
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pending status set to false successfully
 *         content:
 *           application/json:
 *             example: { message: 'Pending status set to false successfully' }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
requestRouter.get('/setRequestDone/:id', authenticate(), setPendingStatusToFalseByRequestIdCTRL);

module.exports = requestRouter;
