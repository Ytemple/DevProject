import { combineReducers } from 'redux'
import DataProcessingreducer from '../../pages/DataProcessing/store/DataProcessingreducer'
import other from './other'
import DataStoragereducer from '../DataStorage/store/DataStoragereducer'
import Preprocessingreducer from '../Preprocessing/Preprocessing/store/Preprocessingreducer'

const reducer = combineReducers ({
    DataProcessingreducer,
    other,
    DataStoragereducer,
    Preprocessingreducer
})
export default reducer
