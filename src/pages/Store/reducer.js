import { combineReducers } from 'redux'
import DataProcessingreducer from '../../pages/DataProcessing/store/DataProcessingreducer'
import other from './other'

const reducer = combineReducers ({
    DataProcessingreducer,
    other
})
export default reducer
