import React from 'react'
import LeftScreenComponent from './leftScreen/LeftScreenComponent'
import RightScreenComponent from './rightScreen/RightScreenComponent'

const LoginComponent = () => {
    return (
        <section className="w-full h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <LeftScreenComponent />
                <RightScreenComponent />
            </div>
        </section>
    )
}

export default LoginComponent
