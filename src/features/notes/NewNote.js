import NewNoteForm from './NewNoteForm'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from '../users/usersApiSlice'

const NewNote = () => {
    useTitle('techNotes: New Note')
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} />
	
	const content = <NewNoteForm users={users} />
	
	return content

}

export default NewNote
