const bodyValidation =
    (schema) =>
        async (req, res, next) => {
            try {
                const { error } = schema.validate(req.body, { abortEarly: false });

                if (error) {
                    throw new Error(
                        error.details
                            .map((detail) => detail.message.replace(/"/g, ""))
                            .join(", ")
                    );
                }
                return next();
            } catch (error) {
                res
                    .status(400)
                    .json({ status: 400, message: error.message });
            }
        };

export default bodyValidation
