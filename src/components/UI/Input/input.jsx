import React from 'react'

const Input = ({ value, name, onChang, error, type,placeholder }) => {
    return ( 
        <div>
            <input value={value} name={name} onChange={onChang} type={type} placeholder={placeholder}/>
            {error && <small>{ error }</small>}
        </div>
     );
}
 
export default Input;