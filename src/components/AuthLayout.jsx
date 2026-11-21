import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    //useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false
//But I recommend using replace: true to prevent users from 
//navigating back to a restricted page using the browser's back button.


useEffect(() => {
    if (authentication && authStatus !== authentication) {
        navigate("/login", { replace: true });
    } else if (!authentication && authStatus !== authentication) {
        navigate("/", { replace: true });
    }

    setLoader(false);
}, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>
}