import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    searchedProduct : "",
    searchedCategory:"",
    searchedPrice:"",
    searchedColor:"",
    searchedSize:"",
    searchedRating:"",
    searchedGender:"",
    searchedAvailaibility:""

}


const filterInitialSlice = createSlice({
    name:'filterSlice',
    initialState:userInitialState,
    reducers:{}
})