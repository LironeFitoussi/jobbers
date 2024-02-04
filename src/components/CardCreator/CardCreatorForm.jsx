import { useContext, useEffect, useState } from "react"
import UserProvider from "../../context/User";
import { UserContext } from "../../context/User";
//TODO ON create of card, take current user details (fullName,phone)

function CreatorForm(props){

    const { inputUpdater, timeUnit,setTimeUnit,submitForm} = props
    const {user} = useContext(UserContext)
    const [isProvider,setIsProvider] = useState(null)

    //? Info to put inside : user?.firstName, user?.lastName, user.Phone, user.Email, user.Age

    const validateType = (e) =>{
        if(e.target.value == "Freelancer"){
            setIsProvider(true)
        }
        else{
            setIsProvider(false)
        }
    }

//? FOR BOTH : Category,Description,IsActive,Uid,
//! Freelancer : type=freelancer, Experience (duration of y+m), 

    return (
     <div>
        <label htmlFor="selectType">Freelancer Or Client ? : </label><br />
        <select name="selectType"  onChange={validateType}>
            <option value={"Client"}>Client</option>
            <option value={"Freelancer"} >Freelancer</option>
        </select>
        {isProvider ? 
            <form action="" name="freelancerForm" onSubmit={submitForm}>
                <h1>This is the Client's form</h1>
                <div>
                    <label htmlFor="fullName">Full name : </label>
                    <input type="text" name="fullName" onChange={inputUpdater} disabled value={`${user?.firstName} ${user?.lastName}`}/>
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="text" name="email" onChange={inputUpdater} disabled value={user?.email}/>
                </div>
                <div>
                    <label htmlFor="phone">Phone number : </label>
                    <input type="text" name="phone" onChange={inputUpdater} disabled value={user?.phone}/>
                </div>
                <div>
                    <label htmlFor="age">Age : </label>
                    <input type="text" name="age" onChange={inputUpdater} disabled value={user?.age}/>
                </div>
                <div>
                    {/* TODO : Change to select */}
                    <label htmlFor="category">Category : </label>
                    <input type="text" name="category" onChange={inputUpdater} />
                </div>
                <div>
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" onChange={inputUpdater} id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label htmlFor="experience">Experience : </label>
                    <input type="number" onChange={inputUpdater} name="experience" />
                    <select name="time" onChange={inputUpdater} >
                        <option value=" years">Years</option>
                        <option value=" months">Months</option>
                    </select>
                </div>
                <button type="submit" name="submitBtn">Submit Form</button>
            </form>
        :
        <form action="" name="clientForm" onSubmit={submitForm}>
            <h1>This is the Client's form</h1>
            <div>
                <label htmlFor="fullName">Full name : </label>
                <input type="text" name="fullName" onChange={inputUpdater} disabled value={user?.firstName +" "+ user?.lastName}/>
            </div>
            <div>
                <label htmlFor="email">Email : </label>
                <input type="text" name="email" onChange={inputUpdater} disabled value={user?.email}/>
            </div>
            <div>
                <label htmlFor="phone">Phone number : </label>
                <input type="text" name="phone" onChange={inputUpdater} disabled value={user?.phone}/>
            </div>
            <div>
                <label htmlFor="age">Age : </label>
                <input type="text" name="age" onChange={inputUpdater} disabled value={user?.age}/>
            </div>
            <div>
                {/* TODO : Change to select (when we know the options.) */}
                <label htmlFor="category">Category : </label>
                <input type="text" name="category" onChange={inputUpdater} />
            </div>
            <div>
                <label htmlFor="description">Description : </label>
                <textarea name="description" onChange={inputUpdater} id="" cols="30" rows="10"></textarea>
            </div>
            <button type="submit">Submit Form</button>
        </form>
        }
    </div>
    )
}

export default CreatorForm