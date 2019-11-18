import Joi from '@hapi/joi';
class Validate {
    static async register(userInfo) {
        const schema = Joi.object({
            firstname: Joi.string().min(3).required(),
            lastname: Joi.string().min(3).required(),
            username: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.number().min(10).required(),
            password: Joi.string().min(6).required()
        })

        return schema.validate(userInfo);
    }

}
export default Validate;
