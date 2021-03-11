import React from 'react';
import Joi from 'joi-browser'
import Form from '../Form/form'
import * as userServices from '../../../Services/postQuestionServices'
import { Redirect } from "react-router-dom"

import './PostQuestion.css'

class PostQuestion extends Form {
    state = { 
        data: { questtion: ""},
        errors: {}
     }
    schema = {
        question: Joi.string().required().label("question"),
    }
    
    
    doSubmit = async () => {
        console.log("submitted");     
        try {
            const response = await userServices.postQuestion(this.state.data)
            const res = {
                "question": response.data.question,
                "id": response.data._id
            }
            console.log(res);
            
        } catch (error) {
            if(error.response && error.response.status === 400){
                const errors = {... this.state.errors}
                errors.question = error.response.data
                this.setState({errors: errors})
            }
        }
       
    }
    
    render() {
        return ( 
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderTextarea("question","question","Question")}
                    {this.renderButton("Post Question")}
                </form>
            </div>
         );
    }
}
 

export default PostQuestion;