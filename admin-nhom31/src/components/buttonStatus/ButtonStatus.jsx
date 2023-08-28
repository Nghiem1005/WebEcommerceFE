import React from 'react'
import './ButtonStatus.css'

const ButtonStatus = ({status}) => {
    return (
        <button className={"widgetLgBtn " + status}>{status}</button>
    )
}

export default ButtonStatus