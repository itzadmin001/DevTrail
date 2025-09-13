import axios from "axios"
import { createContext, useEffect, useState } from "react"



const MainContext = createContext()

function ContextMain(props) {
    const [auth, SetAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [markdowns, setMarkDowns] = useState([])

    // new menu toggle state for mobile side menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const BackendBaseUrl = import.meta.env.VITE_API_BACKEND_URL



    useEffect(() => {
        fetchUserProfile()

    }, [auth])


    const fetchMarkDownsData = () => {
        axios.get(BackendBaseUrl + "/markdowns", {
            withCredentials: true
        })
            .then((success) => {
                setMarkDowns(success.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const fetchUserProfile = () => {
        axios.get(BackendBaseUrl + "/auth/profile", {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data.user || res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }






    return (
        <MainContext.Provider value={{
            SetAuth,
            auth,
            user,
            fetchMarkDownsData,
            fetchUserProfile,
            BackendBaseUrl,
            markdowns,
            setMarkDowns,
            // expose menu state to app
            isMenuOpen,
            setUser,
            setIsMenuOpen
        }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default ContextMain
export { MainContext }
