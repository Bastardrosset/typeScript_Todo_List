import React from 'react'

const Button = (props:any) => {

    const btnCss = `btn ${props.typeBtn} ${props.css}` 

  return (
    <button className={btnCss} onClick={props.clic}>{props.children}</button>
  )
}

export default Button
