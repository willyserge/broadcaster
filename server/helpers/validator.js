import Joi from '@hapi/joi';
class Validate {
    static register(userInfo) {
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

    static signIn(credentials){
        const schema = Joi.object({
           email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })

        return schema.validate(credentials);
    }

    static createRedFlag(data){
        const schema = Joi.object({
            title: Joi.string().min(6).required(),
             type: Joi.string().valid('red-flag','intervention').required(),
            comment: Joi.string().min(6).max(150).required(),
            location:Joi.string().required()
         })
         return schema.validate(data);
    }
    static updateLocation(location){
        const schema = Joi.object({
            location: Joi.string().min(6).required(),
         })
         return schema.validate(location);
    }
    static updateComment(comment){
        const schema = Joi.object({
            comment: Joi.string().min(10).max(150).required(),
         })
         return schema.validate(comment);
    }
    static changeStatus(status){
        const schema = Joi.object({
            status: Joi.string().valid('resolved','rejected','under investigation').required(),
         })
         return schema.validate(status);
    }


}
export default Validate;
