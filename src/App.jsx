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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.email) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
      isValid = false;
    }

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
      const hashedPassword = hashPassword(formData.password);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...formData, password: hashedPassword })
      );
      setMessage("Registration successful! Please log in.");
      setIsLogin(true);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      {message && (
        <div
          className={
            message.includes("successful") ? "success-message" : "error"
          }
        >
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
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
};

export default LoginForm;
