import React, { useContext, useReducer, useEffect } from "react";
const endpoint = "http://localhost:3000/api/student";

import reducer from "./reducer";
const AppContext = React.createContext();

const initialState = {
  isLoading: true,
  students: [],
  isUpdating: false,
  updatingStudent: null,
};

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, students, isUpdating, updatingStudent } = state;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch(`${endpoint}/get`);
    const data = await res.json();
    if (res.ok) {
      if (data.status === "failed") {
        alert("Unable to fetch students");
      } else {
        dispatch({ type: "FETCH_STUDENTS", payload: data.content });
      }
    }
  };

  const addStudent = (data) => {
    dispatch({ type: "ADD_STUDENT", payload: data });
  };

  const updateStudent = (data) => {
    dispatch({type: "UPDATE_STUDENT", payload: data});
  }

  const deleteStudent = (roll) => {
    dispatch({ type: "DELETE_STUDENT", payload: roll });
  };

  const setUpdatingStudent = (student) => {
    console.log(roll) ;
    dispatch({ type: "SET_UPDATING_STU", payload: student });
  };

  const cancelUpdate = () => {
     dispatch({type: "CANCEL_UPDATE"}) ;
  }



  return (
    <AppContext.Provider
      value={{
        isLoading,
        students,
        isUpdating,
        updatingStudent,
        cancelUpdate,
        addStudent,
        updateStudent,
        deleteStudent,
        setUpdatingStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
