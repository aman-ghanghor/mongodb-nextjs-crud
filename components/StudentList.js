import { useGlobalContext } from "../context";
const endpoint = "http://localhost:3000/api/student" ;


const StudentList = () => {

  const {students, isLoading, deleteStudent, setUpdatingStudent} = useGlobalContext() ;

  if(isLoading) {
     return <h2>
        loading...
     </h2>
  }


  const handleDelete = async (roll) => {
     const res = await fetch(`${endpoint}/delete?roll=${roll}`, {
       method: 'DELETE',
       headers: {
         'Accept': 'application/json'
       }
     }) ;
     const data = await res.json();
     
     if(res.ok) {
        if(res.status==='failed') {
           alert(data.message) ;
        }
        else {
           alert("Student deleted successfully") ;
           deleteStudent(roll) ;
        }
     }
  }


  return (
    <div className="col-6 py-5 px-2">
      <h2 className="h2 mb-4"> Students </h2>
      <table className="table table-light table-hover border border-1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Roll</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index)=> {
             const {roll, name, email} = student ;
             return (
              <tr key={index}>
                <td> {index + 1} </td>
                <td> {roll} </td>
                <td> {name} </td>
                <td> {email} </td>
                <td>
                  <span className="icon p-1" onClick={()=> setUpdatingStudent(student)} >
                    <i className="bi bi-pencil"></i>
                  </span>
                  <span className="icon p-1" onClick={() => handleDelete(roll)}>
                    <i className="bi bi-trash3"></i>
                  </span>
                </td>
              </tr>
             )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
