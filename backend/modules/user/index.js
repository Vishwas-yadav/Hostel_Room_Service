
const { Router } = require("express");
const userRouter = Router();
const authenticate = require('../../utilities/authentication/passport')().authenticate;
const { getAllStudentsCtrl, getAllStaffCtrl, updateStaffCtrl } = require('./controller');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user-related operations
 */

/**
 * @swagger
 * /api/details/all-student:
 *   get:
 *     summary: Get all students
 *     description: Retrieve a list of all students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Success', students: [...] }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
userRouter.get('/all-student', authenticate(), getAllStudentsCtrl);

/**
 * @swagger
 * /api/details/all-staff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieve a list of all staff members
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example: { message: 'Success', staff: [...] }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
userRouter.get('/all-staff', authenticate(), getAllStaffCtrl);

/**
 * @swagger
 * /api/details/update-staff-by-id:
 *   post:
 *     summary: Update staff member by ID
 *     description: Update a staff member's details by ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { id: 123, name: 'Updated Staff', role: 'Updated Role' }
 *     responses:
 *       '200':
 *         description: Staff member updated successfully
 *         content:
 *           application/json:
 *             example: { message: 'Staff member updated successfully' }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized' }
 */
userRouter.post('/update-staff-by-id', authenticate(), updateStaffCtrl);

module.exports = userRouter;
