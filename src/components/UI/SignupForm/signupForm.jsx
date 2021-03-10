import React from 'react';
import Joi from 'joi-browser'
import Form from '../Form/form'
import * as userServices from '../../../Services/signUpService'
import { Redirect } from "react-router-dom"

class SignupForm extends Form {
    state = { 
        data: {username: "",email: "", password: ""},
        errors: {}
     }
    schema = {
        username: Joi.string().required().label("Username"),
        email:Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password")
    }
    
    
    doSubmit = async () => {
        console.log("submitted");     
        try {
            const response = await userServices.signup(this.state.data)
            const res = {
                "name": response.data.name,
                "email": response.data.email,
                "id": response.data._id
            }
            console.log(res);
            
        } catch (error) {
            if(error.response && error.response.status === 400){
                const errors = {... this.state.errors}
                errors.email = error.response.data
                this.setState({errors: errors})
            }
        }
       
    }
    
    render() {
        return ( 
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput("username","username","Username")}
                    {this.renderInput("email","email","Email")}
                    {this.renderInput("password","password","Password")}
                    {this.renderButton("Signup")}
                </form>
            </div>
         );
    }
}
 

export default SignupForm;