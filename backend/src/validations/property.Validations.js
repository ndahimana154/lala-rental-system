import Joi from "joi";

export const newPropertySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    pricePerNight: Joi.number().required(),
    location: Joi.string().required()
})