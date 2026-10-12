import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState()



    const getAuthState = async() => {
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/is-auth`)
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    const getUserData = async() => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/data`)
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
     getAuthState()
    },[])


    const value = {
     
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}