import React from 'react'

const Button = (props) => {
    return ( 
        <div>
            <button disabled={props.disable()} >{props.value}</button>
        </div>
     );
}
 
export default Button;