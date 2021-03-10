import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Joi from 'joi-browser'
import Button from '../Button/Button'
import Input from '../Input/input'

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }
    
    validation = ()=>{
        let { error } = Joi.validate(this.state.data,this.schema,{abortEarly:false})
        const errors = {}
        if (!error) {
            return null
        }
        error.details.map(item=>{
            errors[item.path[0]] = item.message
        })
        return errors
    }
    validateProperty = ({ name,value })=>{
        const obj = {[name]: value}
        let smallSchema = {
            [name]: this.schema[name]
        }
        const {error} = Joi.validate(obj,smallSchema)
        return !error ? null : error.details[0].message
    }

    ChangeHandler = ({ currentTarget: input }) => {
        const errorsCopy = {...this.state.errors}
        const errorMessage = this.validateProperty(input)
        if (errorMessage) {
            errorsCopy[input.name] = errorMessage
        }else{
            delete errorsCopy[input.name]
        }
    
        let dataCopy = {... this.state.data}
        dataCopy[input.name] = input.value
        this.setState({data: dataCopy, errors: errorsCopy})
    }

  nextPath(path) {
    <Link to={path} ></Link>
  }

    submitHandler = e =>{
		e.preventDefault()
        const errs = this.validation()
       this.setState({errors: errs || {}})
       if (errs) {
           return 
       }
       this.doSubmit()
	}
    
    renderButton = label =>{
        return <Button disable={this.validation} value={label}/>
    }
    renderInput = (name,type,placeholder)=>{
        const {data,errors} = this.state
        return <Input value={data[name]} error={errors[name]} name={name} onChang={this.ChangeHandler} type={type} placeholder={placeholder}/>
    }
}
 
export default Form;