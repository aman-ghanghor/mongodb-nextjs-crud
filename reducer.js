const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === "FETCH_STUDENTS") {
    return { ...state, students: action.payload, isLoading: false };
  }

  if (type === "ADD_STUDENT") {
    const newStudents = [...state.students, payload];
    return { ...state, students: newStudents };
  }

  if (type === "UPDATE_STUDENT") {
    const newStudents = [...state.students].map((student) => {
      if (student.roll === payload.roll) {
        return payload;
      }
      return student;
    });
    return {
      ...state,
      students: newStudents,
      isUpdating: false,
      updateStudent: null,
    };
  }

  if (type === "DELETE_STUDENT") {
    const newStudents = state.students.filter(
      (student) => student.roll !== payload
    );
    return { ...state, students: newStudents };
  }

  if (type === "SET_UPDATING_STU") {
    console.log("payload", payload);
    return { ...state, isUpdating: true, updatingStudent: payload };
  }

  if (type === "CANCEL_UPDATE") {
    return { ...state, isUpdating: false, updatingStudent: null };
  }
};

export default reducer;
