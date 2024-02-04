import styles from './SignUp.module.css'

function SignUp(props) {
    const { inputInfo, submitSignUp } = props

    return (
        <div className={styles.container}>
            <h1>SignUp</h1>
            <form className={styles.SignUpForm} name="signUpForm" onSubmit={submitSignUp}>
                <label htmlFor="firstName">First name : </label>
                <input type="text" name="fName" onChange={inputInfo} />
                <label htmlFor="lastName">Last name : </label>
                <input type="text" name="lName" onChange={inputInfo} />
                <label htmlFor="email">Email Address : </label>
                <input type="text" name="email" onChange={inputInfo} />
                <label htmlFor="password" >Password : </label>
                <input type="password" name="password" onChange={inputInfo} />
                <label htmlFor="age">Age : </label>
                <input type="text" name="age" onChange={inputInfo} />
                <label htmlFor="phone">Phone number : </label>
                <input type="number" name="phone" onChange={inputInfo} />
                <button type="submit" className="submitAuth">Submit</button>
            </form>
        </div>
    )
}

export default SignUp