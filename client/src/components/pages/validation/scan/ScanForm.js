import { useState, useEffect } from "react";
import validateScan from "./validateScan";

const ScanForm = (Submit) => {
  const [userAnswers, setUsersAnswers] = useState({
    A1: "0",
    A2: "0",
    A3: "0",
    A4: "0",
    A5: "0",
    A6: "0",
    A7: "0",
    A8: "0",
    A9: "0",
    A10: "0",
    A11: "0",
    B1: "0",
    B2: "0",
    B3: "0",
    B4: "0",
    B5: "0",
    B6: "0",
    B7: "0",
    B8: "0",
    B9: "0",
    B10: "0",
    B11: "0",
    C1: "0",
    C2: "0",
    C3: "0",
    C4: "0",
    C5: "0",
    C6: "0",
    C7: "0",
    C8: "0",
    C9: "0",
    C10: "0",
    C11: "0",
    D1: "0",
    D2: "0",
    D3: "0",
    D4: "0",
    D5: "0",
    D6: "0",
    D7: "0",
    D8: "0",
    D9: "0",
    E1: "0",
    E2: "0",
    E3: "0",
    E4: "0",
    E5: "0",
    E6: "0",
    E7: "0",
    E8: "0",
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUsersAnswers({ ...userAnswers, [fieldName]: fieldValue });
  };

  const handleUserChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({ ...user, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateScan(user, userAnswers));
    setIsSubmitting(true);
  };

  useEffect(() => {
    console.log(errors);
    console.log(isSubmitting);
    if (/*Object.keys(errors).length === 0* && */ isSubmitting) {
      Submit();
    }
  }, [errors]);

  return {
    handleChange,
    handleUserChange,
    handleSubmit,
    user,
    userAnswers,
    errors,
  };
};

export default ScanForm;
