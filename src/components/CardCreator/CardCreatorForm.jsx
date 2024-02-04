import { useContext, useEffect, useState } from "react"
import UserProvider from "../../context/User";
import { UserContext } from "../../context/User";
import { collection, addDoc, onSnapshot, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'

//TODO ON create of card, take current user details (fullName,phone)

function CreatorForm(props){

    const { inputUpdater, currData ,submitForm,setCurrData} = props
    const {user} = useContext(UserContext)
    const [isProvider,setIsProvider] = useState(null)
    const [formStage,setFormStage]=useState(1)

    console.log(user);
    //? Info to put inside : user?.firstName, user?.lastName, user.Phone, user.Email, user.Age

    const validateType = (e) =>{

        if(e.target.value == "Freelancer"){
            console.log("Valid type");
            setFormStage(2)
            setCurrData({...currData , time:"years",type:"Freelancer"})
            setIsProvider(true)
        }

        else{
            console.log("Validate else");
            setFormStage(2)
            setCurrData({...currData , type:"Client"})
            setIsProvider(false)
        }
    }

// TODO : add backwards button to offer to change form between freelancer and client.
//? FOR BOTH : Category,Description,IsActive,Uid,
//! Freelancer : type=freelancer, Experience (duration of y+m), 

    return (
     <div>
        {formStage==1?<div>
        <label htmlFor="selectType">Freelancer Or Client ? : </label><br />
        <button name="FreelancerBtn" value={"Freelancer"} onClick={validateType}>Freelancer</button>
        <button name="ClientBtn" value={"Client"} onClick={validateType} >Client</button>
        </div>:null}
        
        {formStage == 2 ?
            <div>
            {isProvider ? 
            <form action="" name="freelancerForm" onSubmit={submitForm}>
                <h1>This is the Freelancer's form</h1>
                <div>
                    <label htmlFor="fullName">Full name : </label>
                    <input type="text" name="fullName" disabled value={`${user?.fName} ${user?.lName}`}/>
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="text" name="email" disabled value={user?.email}/>
                </div>
                <div>
                    <label htmlFor="phone">Phone number : </label>
                    <input type="text" name="phone" disabled value={user?.phone}/>
                </div>
                <div>
                    <label htmlFor="age">Age : </label>
                    <input type="text" name="age" disabled value={user?.age}/>
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
        </form>}
        </div> : null}
    </div>
    )
}

export default CreatorForm