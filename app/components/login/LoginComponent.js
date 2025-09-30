import React from 'react'
import LeftScreenComponent from './leftScreen/LeftScreenComponent'
import RightScreenComponent from './rightScreen/RightScreenComponent'
import styles from './login.module.css'

const LoginComponent = () => {
    return (
        <section className={styles.loginSection}>
            <div >
                <RightScreenComponent />
                <LeftScreenComponent />
            </div>
        </section>
    )
}

export default LoginComponent
