import axios from "axios"
import { createContext, useEffect, useState } from "react"



const MainContext = createContext()

function ContextMain(props) {
    const [auth, SetAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [markdowns, setMarkDowns] = useState([])

    const BackendBaseUrl = import.meta.env.VITE_API_BACKEND_URL



    useEffect(() => {


        axios.get(BackendBaseUrl + "/auth/profile", {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data.user || res.data)

            })
            .catch(err => {
                console.log(err)
            })

    }, [auth])




    return (
        <MainContext.Provider value={{ SetAuth, auth, user, BackendBaseUrl, markdowns, setMarkDowns }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default ContextMain
export { MainContext }
