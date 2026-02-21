export const initialState = {
  basket: [],
  user: null
};

// Selector — multiplies price × quantity for each item
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * (item.quantity || 1) + amount, 0);

// Total number of individual units across all basket items
export const getBasketItemCount = (basket) =>
  basket?.reduce((count, item) => count + (item.quantity || 1), 0) || 0;

const reducer = (state, action) => {
  switch (action.type) {

    case "ADD_TO_BASKET": {
      // If item already in basket, just increment its quantity
      const existingIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingIndex >= 0) {
        const updated = [...state.basket];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return { ...state, basket: updated };
      }
      return {
        ...state,
        basket: [...state.basket, { ...action.item, quantity: 1 }],
      };
    }

    case "INCREMENT_QUANTITY": {
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
    }

    case "DECREMENT_QUANTITY": {
      const found = state.basket.find((item) => item.id === action.id);
      if (!found) return state;
      if ((found.quantity || 1) <= 1) {
        // Drop the item entirely when quantity would reach 0
        return {
          ...state,
          basket: state.basket.filter((item) => item.id !== action.id),
        };
      }
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    case 'EMPTY_BASKET':
      return { ...state, basket: [] };

    case "REMOVE_FROM_BASKET": {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) — not in basket!`);
      }
      return { ...state, basket: newBasket };
    }

    case "SET_USER":
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default reducer;
