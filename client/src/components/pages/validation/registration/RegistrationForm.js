import { useState, useEffect } from "react";

const RegistrationForm = (Submit, validateRegistration) => {
  const [user, setUser] = useState({
    organizationName: "",
    universityWebsite: "",
    firstName: "",
    lastName: "",
    position: "Teacher",
    profile: "",
    email: "",
    password: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({ ...user, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateRegistration(user));
    setIsSubmitting(true);
  };

  useEffect(() => {
    console.log(errors);
    console.log(isSubmitting);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      Submit();
    }
  }, [errors]);

  return { handleChange, handleSubmit, user, errors };
};

export default RegistrationForm;
