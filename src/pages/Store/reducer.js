import { combineReducers } from 'redux'
import DataProcessingreducer from '../../pages/DataProcessing/store/DataProcessingreducer'
import other from './other'
import DataStoragereducer from '../DataStorage/store/DataStoragereducer'
import Preprocessingreducer from '../Preprocessing/Preprocessing/store/Preprocessingreducer'
import ModelTrainingreducer from '../ModelTraining/store/ModelTrainingreducer'
import ModelCheckreducer from '../ModelCheck/store/ModelCheckreducer'

const reducer = combineReducers ({
    DataProcessingreducer,
    other,
    DataStoragereducer,
    Preprocessingreducer,
    ModelTrainingreducer,
    ModelCheckreducer
})
export default reducer
