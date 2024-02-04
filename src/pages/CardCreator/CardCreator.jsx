import CreatorForm from "../../components/CardCreator/CardCreatorForm"
import { useContext, useEffect, useState } from "react"
import UserProvider from "../../context/User";
import { UserContext } from "../../context/User";

function CardCreator(){

    const [currData,setCurrData] = useState({time:"years"})
    const [timeUnit,setTimeUnit] = useState(null)

    const inputUpdater = (e) =>{
        currData[e.target.name] = e.target.value
        console.log({...currData});
    }

    // const handleSelectChange = (e) => {
    //     setTimeUnit(e.target.value);
    //   };

    const submitForm = (e) =>{
        e.preventDefault()
        console.log({...currData});
        setCurrData({...currData})
    }

    //TODO : Create clean Matches template doc (Empty lists, but add the lists and uid + sid)
    // const transferThose = {handleSelectChange , inputUpdater, timeUnit ,setTimeUnit}
    
    return (
        <>
            <CreatorForm inputUpdater={inputUpdater} timeUnit={timeUnit} 
            setTimeUnit={setTimeUnit} submitForm={submitForm}/>
        </>
    )
}


export default CardCreator