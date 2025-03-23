import React, { useState } from "react";
import "./App.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });
  //everything above staed the same

  //we need to add a way for people to become a member and a button that toggles between login and signup.
  //here we will declare a new state variable isLogin and set it to true. This will help us toggle between login and signup

  //we will also add a new state variable message to display a message to the user after login or signup.

  //I know the errors have been moved we will address them later on in the code. we need to declare it now so that we can use it later on.

  const [errors, setErrors] = useState({}); //error state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & signup
  const [message, setMessage] = useState(""); // Display message to user

  //we do not need to change the handleChange function as it is the same as before
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //last time we did this section a little differntly. We took each varriale that we needed to store data and declared them created a state variable for each of them and then set them to empty strings. This time we are going to declare them all, but rely on the formData state variable to store the data. This is a more efficient way of doing things. less code and less state variables to keep track of.

  const validate = () => {
    let isValid = true;
    let validationErrors = {};

    //if email and if password stay the same as before because they are required for both login and signup and should not need to be changed. maybe we should set some parameters here?

    if (!formData.email) {
      validationErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
      isValid = false;
    }

    //if the user is not logged in then we need to validate the name and address fields. we will do this by checking if the isLogin state variable is false. if it is false then we will validate the name and address fields. if it is true then we will not validate the name and address fields. we will also set the validation errors for the name and address fields if they are not filled out.

    //we need a new if statement to make this happen. but after this if statement the formData.name and formData.address will be the same as before. we will not need to change them.
    if (!isLogin) {
      if (!formData.name) {
        validationErrors.name = "Name is required";
        isValid = false;
      }
      if (!formData.address) {
        validationErrors.address = "Address is required";
        isValid = false;
      }
    }
    //we dont need to change the setErrors function as it is the same as before. we will set the errors to the validationErrors object that we created in the validate function.
    setErrors(validationErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); //we need to add this line of code to clear the message after the user logs in or signs up. this will make sure that the message is not displayed after the user logs out

    if (!validate()) return; //if the form is not valid then we will return and not submit the form. we will only submit the form if the form is valid.

    //we want to make sure that the user trying to log in exists in the local storage. we will do this by checking if the user exists in the local storage. if the user exists in the local storage then we will log the user in. if the user does not exist in the local storage then we will display an error message to the user. we will also display an error message if the user enters the wrong email or password.

    //starting with the login we say if isLogin (we just worked on this above) declare storedUser getItem "user" from localStorage and convert (parse) the user from local storage to a JSON object.
    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      //if the storedUser exists and the storedUser email and password match the formData email and password then we will display a message to the user that says "Login successful!".

      // === means equals to and && means and, & alone can be used as a bitwise operator so to avoid confusion we use &&. = is an assignment operator and == is a comparison operator so we use === to compare the two values?

      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        //if above is true display this:
        setMessage("Login successful!");
        // else display this:
      } else {
        setMessage("Invalid email or password.");
      }
      //instead of elif we just use else because we are not checking for anything else.

      //so if the login and password are not correct/true/stored we will check if the user is not logged in. if the user is not logged in then we will store the user in the local storage. we will do this by setting the item "user" in the local storage to the formData object. we will also display a message to the user that says "Registration successful! Please log in.".
    } else {
      // we register the user by storing the user in the local storage and setting formData to the item "user" in the local storage.
      localStorage.setItem("user", JSON.stringify(formData));
      // we display a message to the user that says "Registration successful! Please log in."
      setMessage("Registration successful! Please log in.");
      //this whole if section has been our handleSubmit so we dont need to add in the old handleSubmit code or the validation for it ecase we have already done that above.

      //if we made it this far then we need to set the isLogin state variable to true. this will make sure that the user is logged in after they sign up. we will do this by calling the setIsLogin function and passing in true as an argument.
      setIsLogin(true);
    }
  };
  //now we will finally return (render for the user) the form.

  //last time we had a form tag and then we had a div tag for each input field. We want this to be a dynamic as possible so we can reuse it any time we need a log in or sign up form.
  return (
    <div>
      {/*isLogin true display login if not display create account, ? is a ternary operator that is used to evaluate a condition. if the condition is true then the first value is returned. if the condition is false then the second value is returned, sort of short hand for an if else statement*/}

      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      {/*&& here is a logical operator that is used to evaluate a condition. so if the condition (message) is true then the element {message} is displayed. if the condition is false then the element is not displayed, the color is a style attribute that is used to set the color of the text to green or whatever you want
       */}
      {message && <div style={{ color: "green" }}>{message}</div>}

      {/* now we established if the user is loged in or not, we need to handle the submition of that form because as of now all we have done is check if the user is logged in or not and run it through the validation function
       */}

      {/*When the user clicks the "Submit" button, the handleSubmit function runs. we declare onSubmit=handleSUbmit to start our form*/}

      <form onSubmit={handleSubmit}>
        {/* now we need to add the input fields to the form. but we only display them if isLogin is not true
         */}
        {!isLogin && (
          <>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name} //we need to add this line of code to display the name in the input field after the user logs in or signs up. this will make sure that the name is displayed in the input field after the user logs out
                onChange={handleChange} //we need to add this line of code to update the name in the formData object when the user types in the input field. this will make sure that the name is updated in the formData object when the user types in the input field
              />
              {/*similar syntax to message but this time we are checking if the name is not filled out and if it is not filled out then we will display an error message to the user. we will also display an error message if the name is not filled out. it shows the error message if th ename is incorrect or empty in red, why use a div here? */}
              {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
            </div>

            {/*same as above but for address */}
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <div style={{ color: "red" }}>{errors.address}</div>
              )}
            </div>
          </>
        )}
        {/*same as above but for email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        {/*same as above but for password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </div>
        {/*this is our button that changes dynamically based on the isLogin state variable. if the isLogin state variable is true then the button text is "Login". if the isLogin state variable is false then the button text is "Sign Up". we will also add a type attribute to the button element and set it to "submit". this will make sure that the form is submitted when the user clicks the button.
         */}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>{" "}
        {/*its a submit button that says either login or sign up based on isLogin*/}
      </form>
      {/* onclick the button will toggle between login and sign up. we will do this by calling the setIsLogin function and passing in the opposite of the isLogin state variable as an argument. if the isLogin state variable is true then we will pass in false as an argument. if the isLogin state variable is false then we will pass in true as an argument. this will toggle between login and sign up.
       */}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
};

//we export the LoginForm component (the whole code we just worked on that we declared under the imports at the top of this page) so that we can use it in other files
export default LoginForm;
