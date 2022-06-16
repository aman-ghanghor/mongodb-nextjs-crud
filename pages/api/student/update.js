import studentModel from "../../../models/studentModel";
import connectMongodb from "../../../utils/connectMondodb";

export default async function updateStudent(req, res) {
  const { name, email, roll } = req.body;
  console.log(req.body)

  if (req.method === "PUT") {
    if (roll && name && email) {
      try {
        // connect to mongodb
        await connectMongodb();
        // updated document
        await studentModel.updateOne({roll}, {name, email});
        res.json({ status: 'success', message: "student updated successfully" });
      } 
      catch (error) {
        res.json({ status: 'failed', message: "unable to update student" });
        console.log(error);
      }
    } 
    else {
      res.json({ status: 'failed', message: "All fields are required" });
    }
  }


}
