import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

const UsersList = () => {
    useTitle('techNotes: Users List')
    const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetUsersQuery('usersList', {
		pollingInterval: 60000, //60 seconds, it will requery the data.
		refetchOnFocus: true, //if we put focus to different browser window then come back, it will refetch
		refetchOnMountOrArgChange: true
    })

	let content
	
    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

		//ids should be due to the data normalization?
        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default UsersList