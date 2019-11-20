import { combineReducers } from 'redux'
import DataProcessingreducer from '../../pages/DataProcessing/store/DataProcessingreducer'
import other from './other'
import DataStoragereducer from '../DataStorage/store/DataStoragereducer'

const reducer = combineReducers ({
    DataProcessingreducer,
    other,
    DataStoragereducer
})
export default reducer
