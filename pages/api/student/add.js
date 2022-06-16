import studentModel from "../../../models/studentModel";
import connectMongodb from "../../../utils/connectMondodb";

export default async function addStudent(req, res) {
  console.log(req.method);
  const { name, email, roll } = req.body;
  console.log(req.body);

  if (req.method === "POST") {
    if (roll && name && email) {
      try {
        // connect to mongodb
        await connectMongodb();
        // find if already exists
        const isExists = await studentModel.exists({roll: roll}) ;
        if(isExists) {
           console.log('already exists')
           res.json({status: 'failed', message: 'roll already registered'}) ;
        }
        else {
           // create new document
           const doc = await studentModel({ name, email, roll });
           // save new document
           await doc.save();
           console.log(doc)
           res.status(200).json({ status: 'success', message: "student added" });
        }
      } 
      catch (error) {
        console.log(error);
      }
    } 
    else {
      res.json({ status: 'failed', message: "All fields are required" });
    }
  }


}
