import styles from './Login.module.css'

function Login(props) {
    const { inputInfo, submitLogin } = props
    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <form name="loginForm" onSubmit={submitLogin} className={styles.loginForm}>
                <label htmlFor="email">Email Address : </label> <br />
                <input type="text" name="email" onChange={inputInfo} /><br></br>
                <label htmlFor="password">Password : </label><br />
                <input type="password" name="password" onChange={inputInfo} /><br></br><br />
                <button type="submit" className="submitAuth" >Submit</button><br />
            </form>
        </div>
    )
}

export default Login