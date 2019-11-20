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

    static async signIn(credentials){
        const schema = Joi.object({
           email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })

        return schema.validate(credentials);
    }

    static async createRedFlag(data){
        const schema = Joi.object({
            title: Joi.string().min(6).required(),
            comment: Joi.string().min(6).max(150).required(),
            location:Joi.string().required()
         })
         return schema.validate(data);
    }
    static async updateLocation(location){
        const schema = Joi.object({
            location: Joi.string().min(6).required(),
         })
         return schema.validate(location);
    }
    static async updateComment(comment){
        const schema = Joi.object({
            comment: Joi.string().min(10).max(150).required(),
         })
         return schema.validate(comment);
    }


}
export default Validate;
