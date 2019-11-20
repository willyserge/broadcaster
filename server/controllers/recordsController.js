import incidents from '../data/incidents'
import Validate from '../helpers/validator'

class Records{

    //get all redfrag record
    static async getAllRedFrags(req,res){
      const id=req.user.id;
      let redflags=incidents.filter((incident) => incident.createdBy == id)
         res.status(200).send({
             status:200,
             data: redflags
             
         })
      }
    // get red-flag record by id
      static async getRedFlagById(req,res){
         const id =parseInt(req.params.id);
         const redFlag=incidents.find((incident) => incident.id == id);
         if (!redFlag) return res.status(404).send({
          status:404,
          error: 'a red-flag with the given ID was not found.'
          
         })
         res.status(200).send({
          status:200,
          data: [redFlag]
          
      })

      }
      //create a red flag record 

      static async createRedFlag(req,res){
       
          const {error}= await Validate.createRedFlag(req.body);
          if(error) return res.status(400).send({
            status:400,
            error:error.details[0].message
          });

          const redFlag={
              id:incidents.length+1,
              createdOn: new Date().toISOString(),
              createdBy: req.user.id,
              type: 'red-flag',
              location:req.body.location,
              status: 'draft',
              images: [],
              videos: [],
              comment: req.body.comment

          }
          incidents.push(redFlag);
          res.header('x-auth-token',req.token).status(201).send({
            status: 201,
            data: [{
              id:redFlag.id,
              "message":"Created red-flag record"
              
            }],
          });

      }
}
export default Records;