// we want to manage the data entered by the user, validate that the fields are filled out correctly, and then handle what happens when they submit the form.

//useState is a hook that allows us to create state variables. We will use it to store our form data and any validation errors.

import React, { useState } from 'react';
import './App.css'

//LoginForm is a function that represents our login form. In React, we create components as functions like this one.

const LoginForm = () => {

//now we need variables to store the form data and any validation errors. We will use the useState hook to create these variables.

//formData is where we store the data entered by the user. It is an object with properties for each field in the form.

//setFormData is a function that we can use to update the formData variable. We will use it to update the form data when the user types in the form fields.

const [formData, setFormData] = useState({
    name: '', //initially empty ''
    address: '',
    email: '',
    password: '',
})

// now that we have our form data, we need to create variables to store any validation errors. We will use the useState hook to create these variables just like before.

//note the syntax we are seeing here, const to declare a variable, and then [] to show an array, then errors which is where we store data, then setErrors wich is our function wich , then we use the hook useState to store our data in the errors. This is called array destructuring, and it is a feature of JavaScript that allows us to unpack values from arrays or properties from objects into distinct variables.

const [errors, setErrors] = useState({
    name: '',
    address: '',
    email: '',
    password: '',
})

//now we need a function to handle the input fields changes. 

//handleChange is the function that will be called every time the user types something into one of the input fields. When the user types something, this function updates the formData state.

//e is the event object that is passed to the function when it is called. It contains information about the (e)vent that occurred, such as the value of the input field that was changed.

//e.target is a reference to the element (input field) where the event (like a keypress) happened.

//name is the name attribute of the input field that was changed. We use it to determine which field was changed and update the corresponding property in the formData object.

//value is the new value of the input field that was changed. We use it to update the corresponding property in the formData object.

//Basically, we use the name to figure out which field the user is typing into, and value is what the user typed.

// All of this is happening in the handleChange function, which is called every time the user types something into the form.

//we declare handleChange as a function that takes an event object as an argument. Then we use the setFormData function to update the formData object with the new value of the input field that was changed. (remember we just declared formData as an empy object above that gets stores the data inputed by the user which is updated by the setFormData function)

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
};

//now we need a function to check and make sure the user filled in all the fields correctly before the form is submitted. 

// this means we need to define what is correct and what is not as well as what happens when the user submits the form.

//to do that we to create a function that will hold our if statements to check if the user filled in the fields correctly.

//start by declaring your function name, keep it empty for now(later on we will take the data that was inputed by the user and pass it through this function to check it), and then add the if statements to check if the fields are filled in correctly.

const validate = () => {

    //now we define our varibales to store the errors that will be displayed to the user if they did not fill in the fields correctly.

    let isValid = true;
    //this is an object that will store the errors for each field in the form. our if statements will give us what we need to store in this object.
    let validationErrors = { 
        name: '',
        address: '',
        email: '',
        password: '',
    };

    //now we add our if statements to check if the fields are filled in correctly.

    //dont forget ! means not, so if the name field is empty, we set the error message for the field in the validationErrors object.

    //if the name field is empty, we set the error message for the name field in the validationErrors object and set isValid to false.
    if (!formData.name) {
        validationErrors.name = 'Name is required';
        isValid = false;

    }

    //if the address field is empty, we set the error message for the address field in the validationErrors object and set isValid to false.

    if (!formData.address) {
        validationErrors.address = 'Address is required';
        isValid = false;
       }

    //if the email field is empty, we set the error message for the email field in the validationErrors object and set isValid to false.

    if (!formData.email) {
        validationErrors.email = 'Email is required';
        isValid= false;
    }

    //if the password field is empty, we set the error message for the password field in the validationErrors object and set isValid to false.

    if (!formData.password) {
        validationErrors.password = 'Password is required';
        isValid = false;
    }

    //now we set the errors object to the validationErrors object we just created and return the isValid variable.

    setErrors(validationErrors);
    return isValid;

//as a recap: the validate function checks whether all the required fields have been filled out and whether the email and password meet certain criteria (like the email being a valid email address and the password being at least 6 characters long, we will work on that later). If something is wrong, it will set an error message for that field.

// now we are finally ready to submit, we need to create a function that will handle the submit action

//once again we see a similar syntax. we declare a function called handleSubmit that takes an (e)vent object as an argument

//this time we need to prevent the default action of the form, which is to submit the data to the server and reload the page. We do this by calling e.preventDefault().

//this function is called when the user clicks the submit button. It will check if the form data is valid by calling the validate function we just created. If the form data is valid, it will alert the user that the form was submitted.

const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
        alert('Form submitted!');
    }
}

//ok now we need to make sure the user can actually see all of this work. This is hwere jsx comes in.

//JSX is a syntax extension for JavaScript that looks similar to HTML. It allows us to write HTML-like code in our JavaScript files.

//we will use JSX to create the form fields, display any validation errors we just created, and handle the form submission and alert.

//remeber that react only returns one element, so we need to wrap everything in a div.

//each input field has a name attribute that corresponds to the property in the formData object. This is how we know which field the user is typing into.

//onSubmit we call the handleSubmit function we just created then we map over the errors object to display any validation errors that occurred. if there is an error, we display it in a div below the input field. if not, we display nothing. The user will type into the input fields, and the handleChange function will update the formData object with the new value of the input field.

//finally, we add a submit button that the user can click to submit the form. When the user clicks the button, the handleSubmit function will be called, and the form will be submitted.
return (
    <form onSubmit={handleSubmit}>
        <div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div style={{color: 'red'}}>{errors.name}</div>} {/*if there is an error, we display it in a div below the input field. if not, we display nothing.*/}
        </div>
        <div>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <div style={{color: 'red'}}>{errors.address}</div>}
        </div>
        <div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
        </div>
        <div>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <div style={{color: 'red'}}>{errors.password}</div>}
        </div>
        <button type="submit">Submit</button>
    </form>
 );
}}
export default LoginForm;
