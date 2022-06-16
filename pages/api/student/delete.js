
import studentModel from "../../../models/studentModel";
import connectMongodb from "../../../utils/connectMondodb";


export default async function deleteStudent(req, res) {
   const {roll} = req.query;
   console.log(roll)

   if(req.method==='DELETE') {
      try {
         // connect to mongodb
         await connectMongodb();
         // get documents
        await studentModel.deleteOne({roll: roll}) ;
        res.json({status: 'success', message: "student deleted successfully"});
      }
      catch(error) {
         res.json({status: 'failed', message: "unable to delete student"});
         console.log(error);
      }
   }

}
