import { useEffect } from "react"

const useTitle = (title) => {

    useEffect(() => {
        const prevTitle = document.title
        document.title = title

		//when the component unmounts, it sets it back to the previous title
        return () => document.title = prevTitle
    }, [title])

}

export default useTitle
