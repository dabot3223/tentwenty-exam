import React from 'react'
import LoginFormComponent from './LoginFormComponent'
import styles from './left.module.css'

const LeftScreenComponent = () => {
    return (
        <div className={styles['left-box']} >
            <LoginFormComponent />
        </div>
    )
}

export default LeftScreenComponent
