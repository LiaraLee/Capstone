import React, { useState } from "react";
import "./App.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // To toggle password visibility, like when you want to see the text you are typing in the password field 
  //this is how you add a new state variable to your component. We set the initial value of isPasswordVisible to false because we want the password to be hidden by default.

  //handle and validate stay the same

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    let validationErrors = {};

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; //this looks wild but it's a simple regex to validate email addresses, regex means regular expression and we use it to match patterns in strings. here we have an array of characters that are allowed in an email address, followed by an @ symbol (email@___), followed by another array of characters that are allowed in an email address(emai@gmail__), followed by a dot (email@gmail._), followed by 2 to 6 characters that are allowed in an email address(email@gmail.com). The ^ and $ at the beginning and end of the regex mean that the regex should match the entire string, not just a part of it.

    //now that we set our parameters lets check if the email and password are valid or not and set the error messages accordingly

    //if formData.email is empty, set validationErrors.email to "Email is required" and isValid to false
    if (!formData.email) {
      validationErrors.email = "Email is required";
      isValid = false;
      //if formData.email is not empty and it doesn't match the emailRegex, set validationErrors.email to "Please enter a valid email address" and isValid to false
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
      isValid = false;
    }
//if formData.password is empty, set validationErrors.password to "Password is required" and isValid to false
    if (!formData.password) {
      validationErrors.password = "Password is required";
      isValid = false;
    }
//if isLogin is false (meaning the user is trying to sign up) and formData.name is empty, set validationErrors.name to "Name is required" and isValid to false
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

    setErrors(validationErrors);
    return isValid;
  };
//first cybersecurity!!! hash the password before storing it in the local storage. hash means to convert the password into a random string of characters that can't be converted back to the original password. this is done to protect the password from being stolen.

//we set it up the same way we usually do. we create a function called hashPassword that takes a password (the one the user is typing in our form) as an argument and returns the password split into an array of characters, reversed, and joined back into a string. this is a simple way to hash a password but it's not actually secure. in a real-world application, you would use a more secure hashing algorithm like bcrypt. but its fun to try!
  const hashPassword = (password) => {
    return password.split("").reverse().join("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === hashPassword(formData.password)
      ) {
        setMessage("Login successful!");
      } else {
        setMessage("Invalid email or password.");
      }
    } else {
      const hashedPassword = hashPassword(formData.password); //we hash the password before storing it in the local storage to keep it safe
      localStorage.setItem("user", JSON.stringify({ ...formData, password: hashedPassword })); //we store the user data in the local storage as a JSON string. we spread the formData object and replace the password with the hashedPassword, spread means to copy all the properties of an object into a new object. this is done to keep the original formData object unchanged.
      setMessage("Registration successful! Please log in.");
      setIsLogin(true);
    }
  };
//last thing before we return is to add a function that toggles the password visibility. we want to be able to see the password we are typing in the password field, so we add a button that toggles the password visibility when clicked. we create a function called togglePasswordVisibility that toggles the isPasswordVisible state variable between true and false. we set the type of the password input field to "text" if isPasswordVisible is true and "password" if it's false. this way, the password is visible when the button is clicked and hidden when it's not.
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Create Account"}</h2>
{/*beacause we want to keep things as clear as possible we set the class of the div to "success-message" if the message includes the word "successful" and "error" if it doesn't. 
*/}

{/* message is a state variable that holds the message we want to display to the user. we set the message to an empty string by default. we display the message in a div element if it's not an empty string. we set the class of the div to "success-message" if the message includes the word "successful" and "error" if it doesn't. this way, we can style the message differently based on whether it's a success message or an error message.
*/}
      {message && (
        <div className={message.includes("successful") ? "success-message" : "error"}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
              {/*here we insert the class instead of style to make it easier to style the error message individually in the css file*/}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
          </>
        )}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          {/*passowrd visibility toggle button is now added to the form so users can see it. we add a button element that calls the togglePasswordVisibility function when clicked. we set the type of the button to "button" to prevent the form from submitting when the button is clicked. we display the text "Hide Password" if isPasswordVisible is true and "Show Password" if it's false. this way, the button text changes based on whether the password is visible or not.
          */}
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? "Hide" : "Show"} Password
          </button>
        </div>
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
};

export default LoginForm;
