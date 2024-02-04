import { useContext, useEffect, useState } from "react"
import UserProvider from "../../context/User";
import { UserContext } from "../../context/User";


//TODO ON create of card, take current user details (fullName,phone)

function CreatorForm(){

    const {user} = useContext(UserContext)
    const [isProvider,setIsProvider] = useState(null)
    const [formData,setFormData] = useState({})

    
    console.log(user);

    //? Info to put inside : user?.firstName, user?.lastName, user.Phone, user.Email, user.Age

    const validateType = (e) =>{
        if(e.target.value == "Freelancer"){
            console.log(e.target.value);
            console.log("If = Freelancer");
            setIsProvider(true)
        }
        else{
            console.log("Else = Client");
            setIsProvider(false)
        }
    }

//? FOR BOTH : Category,Description,IsActive,Uid,
//! Freelancer : type=freelancer, Experience (duration of y+m), 

    return (
     <div>
        <label htmlFor="selectType">ASDASDASD</label><br />
        <select name="selectType" onChange={validateType}>
            <option value={"Freelancer"} >Freelancer</option>
            <option value={"Client"}>Client</option>
        </select>
        {isProvider ? 
            <form action="" name="freelancerForm">
                <h1>This is the Client's form</h1>
                <div>
                    <label htmlFor="userFullName">Full name : </label>
                    <input type="text" name="userFullName" disabled value={user?.firstName +" "+ user?.lastName}/>
                </div>
                <div>
                    <label htmlFor="userEmail">Email : </label>
                    <input type="text" name="userEmail" disabled value={user?.Email}/>
                </div>
                <div>
                    <label htmlFor="userPhone">Phone number : </label>
                    <input type="number" name="userPhone" disabled value={user?.Phone}/>
                </div>
                <div>
                    <label htmlFor="userAge">Age : </label>
                    <input type="text" name="userAge" disabled value={user?.Age}/>
                </div>
                <div>
                    {/* TODO : Change to select */}
                    <label htmlFor="Category">Category : </label>
                    <input type="text" name="Category" />
                </div>
                <div>
                    <label htmlFor="Description">Description : </label>
                    <textarea name="Description" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label htmlFor="Experience">Experience : </label>
                    <input type="text" />
                    <select name="" id="">
                        <option value="Years" >Years</option>
                        <option value="Months" >Months</option>
                    </select>
                </div>
            </form>
        :
        <form action="" name="clientForm">
            <h1>This is the Client's form</h1>
            <div>
                <label htmlFor="userFullName">Full name : </label>
                <input type="text" name="userFullName" disabled value={user?.firstName +" "+ user?.lastName}/>
            </div>
            <div>
                <label htmlFor="userEmail">Email : </label>
                <input type="text" name="userEmail" disabled value={user?.Email}/>
            </div>
            <div>
                <label htmlFor="userPhone">Phone number : </label>
                <input type="number" name="userPhone" disabled value={user?.phoneNumber}/>
            </div>
            <div>
                <label htmlFor="userAge">Age : </label>
                <input type="text" name="userAge" disabled value={user?.Age}/>
            </div>
            <div>
                {/* TODO : Change to select (when we know the options.) */}
                <label htmlFor="Category">Category : </label>
                <input type="text" name="Category" />
            </div>
            <div>
                <label htmlFor="Description">Description : </label>
                <textarea name="Description" id="" cols="30" rows="10"></textarea>
            </div>
        </form>
        }
    </div>
    )
}

export default CreatorForm