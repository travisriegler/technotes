import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
		// i dont really understand these changes. old method would fetch data in put it in initial state and we would use selectors later to grab it. New method is using RTK query and then later we use the data from the query to grab it? rather than using selectors?
		//(endpoint, add a name to the query, will force a refetch even if it already has the data)
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
