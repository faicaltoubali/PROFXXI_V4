export default function validateRegistration(user) {
  let errors = {};

  if (user.firstName === "") {
    errors.firstName = "Username is Required";
  }

  if (user.organizationName === "") {
    errors.organizationName = "Official name of organization is Required";
  }

  if (user.email === "") {
    errors.email = "Email is Required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Email Address is Invalid";
  }

  if (user.password === "") {
    errors.password = "Password is Required";
  }
  return errors;
}
