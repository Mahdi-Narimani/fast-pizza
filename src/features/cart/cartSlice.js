import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
    /* 
    pizzaId : 13332
    name : peperoni
    quantity : 3
    unitPrice : 120
    totalPrice : 
    */
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action)
        {
            state.cart.push(action.payload);
        },
        deleteItem(state, action)
        {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action)
        {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action)
        {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item.quantity === 1)
            {
                cartSlice.caseReducers.deleteItem(state, action);
            }
            else
            {
                item.quantity--;
                item.totalPrice = item.quantity * item.unitPrice;
            }

        },
        clear(state)
        {
            state.cart = [];
        }
    }
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clear
} = cartSlice.actions;

export default cartSlice.reducer

export const getTotalCartQuantity = state => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalCartPice = state => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getTotalCartQuantityById = id => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0