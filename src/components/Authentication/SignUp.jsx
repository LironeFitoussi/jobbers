

function SignUp(props){

    const {inputInfo,submitSignUp} = props

        return(
            <>
                <h1>SignUp</h1>
                <form name="signUpForm" onSubmit={submitSignUp}>
                    <label htmlFor="firstName">First name : </label><br />
                    <input type="text" name="fName" onChange={inputInfo}/><br />
                    <label htmlFor="lastName">Last name : </label><br />
                    <input type="text" name="lName" onChange={inputInfo}/><br />
                    <label htmlFor="email">Email Address : </label><br />
                    <input type="text" name="email" onChange={inputInfo} /><br></br>
                    <label htmlFor="password" >Password : </label><br />
                    <input type="password" name="password" onChange={inputInfo} /><br></br><br />
                    <label htmlFor="age">Age : </label>
                    <input type="text" name="age" onChange={inputInfo}/>
                    <label htmlFor="phone">Phone number : </label>
                    <input type="number" name="phone" onChange={inputInfo}/>
                    <button type="submit" className="submitAuth">Submit</button>
                </form>
            </>
        )
    }

export default SignUp