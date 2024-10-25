import { useReducer, useState, useEffect } from 'react';
import { Button } from 'antd';
import { useFetch } from './hook/useFetch';
import UserItem from './components/UserItem';
import './App.css'

const initialState = {
	liked: [],
	saved: []
}

function reducer(state, action) {
	switch (action.type) {
		case "liked": {
			action.payload.isLiked = true
			if (!state.liked.includes(action.payload)) {
				return {
					liked: [...state.liked, action.payload],
					saved: state.saved
				}
			} else {
				return {
					liked: state.liked,
					saved: state.saved
				}
			}
		}
		case "saved": {
			action.payload.isSaved = true
			if (!state.saved.includes(action.payload)) {
				return {
					liked: state.liked,
					saved: [...state.saved, action.payload]
				}
			} else {
				return {
					liked: state.liked,
					saved: state.saved
				}
			}
		}
		default: {
			return {
				liked: state.liked,
				saved: state.saved
			}
		}
	}
}

function App() {
	const { users } = useFetch("/users")
	const [usersData, setUsersData] = useState([])
	const [products, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		setUsersData(users)
	}, [users])

	return (
		<>
			<div className="flex items-center justify-center gap-[30px] p-5">
				<Button onClick={() => setUsersData(products.liked)} size="large">Liked {products.liked.length}</Button>
				<Button onClick={() => setUsersData(products.saved)} size="large">Saved {products.saved.length}</Button>
			</div>
			<div className="p-5 flex justify-between flex-wrap gap-[20px]">
				{usersData ? usersData.map(item => <UserItem handleLikedBtnClick={() => dispatch({ type: "liked", payload: item })} handleSavedBtnClick={() => dispatch({ type: "saved", payload: item })} dispatch={dispatch} item={item} key={item.id} />) : ""}
			</div>
		</>
	)
}
export default App