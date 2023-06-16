import React from 'react'

const ValidationErrorMessage = (props) => {
  return (
    <>
    {
        props.touched && <p style={{color:'red',marginTop:"5px"}}>{props.message}</p>
    }
    </>
  )
}

export default ValidationErrorMessage