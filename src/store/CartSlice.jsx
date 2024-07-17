import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    totalItems:0,
    cartItems:[],
    totalAmount:0,

}

const cartSlice = createSlice({
    name:'cartSlice',
    initialState:initialCartState,
    reducers:{
        addItemToCart (state, action) {
            state.totalItems += 1;
            if(state.cartItems.length === 0){
                state.totalAmount += parseInt(action.payload.price);
                state.cartItems.push(action.payload)
            }
            else {
                const existingItem = state.cartItems.find((eachItem) => eachItem.id === action.payload.id);

                if(existingItem){
                    state.totalAmount += parseInt(existingItem.price);
                    existingItem.quantity++
                }
                else {
                    state.cartItems.push(action.payload);
                    state.totalAmount += parseInt(action.payload.price);

                }
            }
           // console.log(JSON.stringify(state.cartItems))
        }
,
        removeItemFromCart (state,action) {
            const existingItem = state.cartItems.find((eachItem) => eachItem.id === action.payload.id);
            state.totalItems -= 1;
            state.totalAmount -= existingItem.price;
            if(existingItem.quantity > 1){
                existingItem.quantity--;     
            }
          else{
                state.cartItems = state.cartItems.filter((eachItem) => eachItem.id != action.payload.id)
            }
        }

,
        resetCart (state,action) {
            state.totalItems = 0;
            state.totalAmount = 0;
            state.cartItems = []
        }
    }
})


export const cartAction = cartSlice.actions;
export default cartSlice.reducer;