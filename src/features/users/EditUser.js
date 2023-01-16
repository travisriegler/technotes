import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'

const EditUser = () => {
    const { id } = useParams()
	useTitle('techNotes: Edit User')
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })
	
	if (!user) return <PulseLoader color={"#FFF"} />
	
    const content = <EditUserForm user={user} />
	
    return content

}

export default EditUser
