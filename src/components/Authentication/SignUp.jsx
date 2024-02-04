

function SignUp(props){

    const {inputInfo,submitSignUp} = props

        return(
            <>
                <h1>SignUp</h1>
                <form name="signUpForm" onSubmit={submitSignUp}>
                    <label htmlFor="firstName">First name : </label><br />
                    <input type="text" name="firstName" onChange={inputInfo}/><br />
                    <label htmlFor="lastName">Last name : </label><br />
                    <input type="text" name="lastName" onChange={inputInfo}/><br />
                    <label htmlFor="Email">Email Address : </label><br />
                    <input type="text" name="Email" onChange={inputInfo} /><br></br>
                    <label htmlFor="Password" >Password : </label><br />
                    <input type="password" name="Password" onChange={inputInfo} /><br></br><br />
                    <label htmlFor="Age">Age : </label>
                    <input type="text" name="Age" onChange={inputInfo}/>
                    <label htmlFor="Phone">Phone number : </label>
                    <input type="number" name="Phone" onChange={inputInfo}/>
                    <button type="submit" className="submitAuth">Submit</button>
                </form>
            </>
        )
    }

export default SignUp