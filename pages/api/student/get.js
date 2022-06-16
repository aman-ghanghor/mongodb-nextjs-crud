
import studentModel from "../../../models/studentModel";
import connectMongodb from "../../../utils/connectMondodb";


export default async function getStudent(req, res) {

   if(req.method==='GET') {
      try {
         // connect to mongodb
         await connectMongodb();
         // get documents
         const result = await studentModel.find({}) ;
         if(result) {
            res.json({status: 'success', content: result})
         }
      }
      catch(error) {
         res.json({status: 'failed', message: 'unable to get students'}) ;
         console.log(error);
      }
   }

}
