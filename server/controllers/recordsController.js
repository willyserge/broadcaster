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
}
export default Records;