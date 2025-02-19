import express from 'express';
import { isUserExistsByEmail } from '../middlewares/auth.Middleware.js';
import authControllers from '../controllers/auth.Controllers.js';
import bodyValidation from '../validations/validation.Middleware.js';
import { loginSchema } from '../validations/auth.Validation.js';
import { isUserAuthorized } from '../validations/user.authorization.js';

const authRoute = express.Router();

authRoute.post('/login', bodyValidation(loginSchema), isUserExistsByEmail, authControllers.userLogin);
authRoute.get("/view-profile", isUserAuthorized(["All"]), authControllers.getProfile);

export default authRoute;