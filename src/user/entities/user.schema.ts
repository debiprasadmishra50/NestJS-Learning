import * as Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
});
