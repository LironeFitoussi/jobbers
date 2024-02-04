

function Login(props){

    const {inputInfo,submitLogin} = props


    //! 
        return(
            <>
                <h1>Login</h1>
                <form name="loginForm" onSubmit={submitLogin}>
                    <label htmlFor="email">Email Address : </label> <br />
                    <input type="text" name="email" onChange={inputInfo}/><br></br>
                    <label htmlFor="password">Password : </label><br />
                    <input type="password" name="password" onChange={inputInfo} /><br></br><br />
                    <button type="submit" className="submitAuth" >Submit</button><br />
                </form>
            </>
        )
    }
    
export default Login