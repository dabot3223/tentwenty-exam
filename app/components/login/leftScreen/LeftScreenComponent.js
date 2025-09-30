import React from 'react'
import LoginFormComponent from './LoginFormComponent'

const LeftScreenComponent = () => {
    return (
        <div className='order-2 md:order-1 h-1/2 md:h-screen' >
            <LoginFormComponent />
        </div>
    )
}

export default LeftScreenComponent
