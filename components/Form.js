import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const endpoint = "http://localhost:3000/api/student";

const Form = () => {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { addStudent, updateStudent, isUpdating, updatingStudent, cancelUpdate } = useGlobalContext();

  useEffect(() => {
    if (isUpdating) {
      setRoll(updatingStudent.roll);
      setName(updatingStudent.name);
      setEmail(updatingStudent.email);
    } 
    else {
      setRoll("");
      setName("");
      setEmail("");
    }
  }, [updatingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roll && name && email) {
      const stuData = { roll, name, email };

      const res = await fetch(`${endpoint}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(stuData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "failed") {
          alert(data.message);
        } else {
          alert(data.message);
          addStudent(stuData);
          setEmail("");
          setName("");
          setRoll("");
        }
      }
    } else {
      alert("All fields are required!!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (name && email) {
      const stuData = { roll, name, email };

      const res = await fetch(`${endpoint}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(stuData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "failed") {
          alert(data.message);
        } 
        else {
          alert(data.message);
          updateStudent(stuData);
          setEmail("");
          setName("");
          setRoll("");
        }
      }
    } else {
      alert("All fields are required!!");
    }
  };

  return (
    <form
      className="col-6 py-5 px-4"
      onSubmit={isUpdating ? handleUpdate : handleSubmit}
    >
      <h2 className="h2 mb-4">
        {isUpdating ? "Update Student" : "Add Student"}
      </h2>
      <div className="mb-3">
        <label htmlFor="roll" className="form-label">
          Roll Number
        </label>
        <input
          type="text"
          className="form-control"
          id="roll"
          placeholder="Roll number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          disabled={isUpdating ? true : false}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control form-control"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button className="btn btn-primary">
          {isUpdating ? "Update" : "Submit"}
        </button>
        {isUpdating ? (
          <button className="btn btn-light border border-1 mx-3" onClick={cancelUpdate}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default Form;
