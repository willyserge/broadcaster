import incidents from '../data/incidents'
import Validate from '../helpers/validator'
import RedFlag from '../helpers/recordsHelpers';

class Records{

    //get all redfrag record
    static async getAllRedFrags(req,res){
      const id=req.user.id;
     
      const redflags= incidents.filter((incident) => incident.createdBy == id)
      
      if(!redflags[0]){res.status(204).send({
            status:204,
            error: 'no red-flag records.'
           })
          }
          else{
         res.status(200).send({
             status:200,
             data: redflags   
         })
        }
        
      }
      
    // get red-flag record by id
      static async getRedFlagById(req,res){
         const id =req.params.id;
         const redFlag=await RedFlag.findById(id,req.user.id,incidents);
  
         if(!redFlag){ res.status(404).send({
                status:404,
                error: 'a red-flag with the given ID was not found.'
               })
              }
        else{
         res.status(200).send({
          status:200,
          data: [redFlag]
          
          })
        }
      }
      //create a red flag record 

      static async createRedFlag(req,res){
       
          const {error}=Validate.createRedFlag(req.body);
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
          res.status(201).send({
            status: 201,
            data: [{
              id:redFlag.id,
              "message":"Created red-flag record"
              
            }],
          });

      }
   // update red-flag location
      static async updateLocation(req,res){
         const id =req.params.id;
         const redFlag=await RedFlag.findById(id,req.user.id,incidents);
         if(!redFlag){
           res.status(404).send({
          status:404,
          error: 'a red-flag with the given ID was not found.'
         })
        }
         else if(redFlag.status !=='draft'){ res.status(405).send({
          status:405,
          error: 'you can no longer edit the location of this red-flag.'
         })
        }
        else{
         const {error}= Validate.updateLocation(req.body);
          if(error) return res.status(400).send({
            status:400,
            error:error.details[0].message
          });
          redFlag.location = req.body.location;
          res.status(200).send({
            status:200,
            data: [
              {
                id:redFlag.id,
                message: "Updated red-flag record's location"
              }
            ]
            
        })
      }

      }

      //udate redflag comment

      static async updateComment(req,res){
        const id =req.params.id;
        const redFlag=await RedFlag.findById(id,req.user.id,incidents);
        if(!redFlag){ res.status(404).send({
         status:404,
         error: 'a red-flag with the given ID was not found.'
        })
      }
      else{
       
        const {error}= Validate.updateComment(req.body);
         if(error) return res.status(400).send({
           status:400,
           error:error.details[0].message
         });
         redFlag.location = req.body.comment;
         res.status(200).send({
           status:200,
           data: [
             {
               id:redFlag.id,
               message: "Updated red-flag record's comment"
             }
           ]
           
       })
      }

     }
     //delete redflag record
     static async deleteRedflag(req,res){

      const id =req.params.id;
      const redFlag=await RedFlag.findById(id,req.user.id,incidents);
      if(!redFlag){ res.status(404).send({
             status:404,
             error: 'a red-flag with the given ID was not found.'
            })
           }
     else{
      const index = incidents.indexOf(redFlag);
      incidents.splice(index, 1);
    
      res.status(200).send({
        status:200,
        data:[
          {
            id:redFlag.id,
            message:"red-flag record has been deleted"
          }
        ]
        
      });
     }

     }

     static async changeStatus(req,res){
      const id =req.params.id;
      const redFlag=incidents.find((incident)=>incident.id==id);
      if(!redFlag){ res.status(404).send({
        status:404,
        error: 'a red-flag with the given ID was not found.'
       })
      }
      else{
         const {error}= Validate.changeStatus(req.body);
         if(error) return res.status(400).send({
           status:400,
           error:error.details[0].message
         });
         redFlag.status = req.body.status;
         res.status(200).send({
           status:200,
           data: [
             {
               id:redFlag.id,
               message: "Changed red-flag record's status"
             }
           ]
           
       })

      }

     }

   }
     


export default Records;