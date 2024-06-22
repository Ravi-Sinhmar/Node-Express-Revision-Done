const express = require('express');
const userControllers = require('./../Controllers/userControllers');
const router = express.Router();

router.param('id',userControllers.checkId);

// USING APP.ROUTE AND CHAIN THE REQUESTS (SAME API ONE ROUTE)
// for /api/v1/users
router.route('/')   // we have to remove /api/v1/users and put only one / and also replace app with router name (userRouter)
.get(userControllers.getUsers)
.post(userControllers.validateBody,userControllers.addUser)

// for /api/v1/users/:id 
router.route('/:id')   // we have to remove /api/v1/users and put only /:id and also replace app with router name (userRouter)
.get(userControllers.getUser)
.patch(userControllers.patchUser)
.put(userControllers.putUser)
.delete(userControllers.deleteUser)


// Exporting modules
module.exports = router;
