import * as actionType from '../constants/store'

const initialState = []

export default function store(state=initialState, action) {
	switch (action.type) {
		case actionType.STORE_UPDATE:
			return action.data
		case actionType.STORE_ADD:
			state.unshift(action.data)
			return state
		case actionType.STORE_RM:
			return state.filter(item => {
				if(item.id !== action.data.id) {
					return item
				}
			})
		default:
			return state
	}
}