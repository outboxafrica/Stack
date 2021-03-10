import React from 'react';
import Joi from 'joi-browser'
import Form from '../Form/form'
import * as loginService from '../../../Services/loginservices'

class LoginForm extends Form {
    state = { 
        data: {email: "", password: ""},
        errors: {}
     }
    schema = {
        email:Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
    }
    
    
    doSubmit = async() => {
        console.log("submitted");
        try{
            const {data} = this.state.data

            const { data: jwt } = await loginService.login(this.state.data)
            localStorage.setItem("token", jwt)
            console.log(jwt);
            console.log(this.props)
            this.props.history.push('/')
        }catch(error){
            if(error.response && error.response.status === 400){
                const errors = {... this.state.errors}
                errors.email = error.response.data
                this.setState({errors: errors})
            }
            console.log(error);
        }
    }
    
    render() {
        return ( 
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput("email","email","Email")}
                    {this.renderInput("password","password","Password")}
                    {this.renderButton("Login")}
                </form>
            </div>
         );
    }
}
 

export default LoginForm;