import React from "react";
import regex from "../Pages/Regexconstant";

// var validateobj = {
//   isValid: true,
//   message: "",
// };

export function ValidateEmail(email) {
  var validateobj = {
    isValid: true,
    message: "hello",
  };
  if (!regex.Emailregex.test(email)) {
    console.log("*");
    validateobj.isValid = false;
    validateobj.message = "Invalid Email";
  }
  console.log(validateobj.isValid);
  console.log(validateobj.message);
  console.log(email);
  return validateobj;
}

export function ValidatePassword(password) {
  var validateobj = {
    isValid: true,
    message: "hello",
  };
  
  // Check if regex.Passwordregex is defined and valid
  // if (!regex.Passwordregex) {
  //   validateobj.isValid = false;
  //   validateobj.message = "Regex is not defined";
  //   return validateobj;
  // }
  
  // Test the password against the regex pattern
  if (!regex.Passwordregex.test(password)) {
    validateobj.isValid = false;
    validateobj.message = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }
  
  console.log(validateobj.isValid);
  console.log(validateobj.message);
  console.log(password);
  
  return validateobj;
}


export function ValidateName(name) {
  var validateobj = {
    isValid: true,
    message: "",
  };
  if (!regex.Nameregex.test(name)) {
    validateobj.isValid = false;
    validateobj.message = "Invalid Name";
  }
  return validateobj;
}
export function ValidateAddhar(addhar) {
  var validateobj = {
    isValid: true,
    message: "",
  };
  if (!regex.Addharregex.test(addhar)) {
    validateobj.isValid = false;
    validateobj.message = "Invalid Aadhaar Number";
  }
  return validateobj;
}
