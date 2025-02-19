import express from "express"
import authRoute from "./auth.Route.js"
import propertyRoute from "./property.Route.js";

const indexRoute = express.Router()

indexRoute.use("/auth", authRoute);
indexRoute.use("/property", propertyRoute);

export default indexRoute