import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false) //for react 18 due to strict mode.

    const [trueSuccess, setTrueSuccess] = useState(false) //

    const [refresh, {
        isUninitialized, //refresh function has not yet been called
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

		//react strictmode only happens in development
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
				  //he was having issue where isSuccess was true before refresh finished updating state
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

			//function was defined above, now we determine when to call it. if you refresh, there is no token and if user selected persist, then call the function
            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

		//to prevent warnings about empty dependencies array below, he just wants this to run once
        // eslint-disable-next-line
    }, [])


	//could be condensed down but its longer to properly explain
    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {error.data?.message}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />

	//i dont quite understand this part
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}
export default PersistLogin
