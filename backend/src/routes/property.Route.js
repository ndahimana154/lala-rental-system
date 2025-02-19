import express from "express";
import { isPropertyAlreadyExists } from "../middlewares/property.Middlewares.js";
import { isUserAuthorized } from "../validations/user.authorization.js";
import propertyControllers from "../controllers/property.Controllers.js";
import bodyValidation from "../validations/validation.Middleware.js";
import { newPropertySchema } from "../validations/property.Validations.js";

const propertyRoute = express.Router();



propertyRoute.post("/create", isUserAuthorized(["host"]), bodyValidation(newPropertySchema), isPropertyAlreadyExists, propertyControllers.createProperty);
propertyRoute.get("/get-active-properties", propertyControllers.getActiveProperites)
propertyRoute.get("/single/:id", propertyControllers.getSingleProperty);
propertyRoute.post("/book", propertyControllers.userBookProperty)
// propertyRoute.put("/:id", (req, res) => {
//     res.json({ message: `Property with id: ${req.params.id} updated successfully` });
// });
export default propertyRoute