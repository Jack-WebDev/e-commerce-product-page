import { createContext, ReactNode, useContext, useReducer } from "react";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type UpdateQuantityPayload = {
  quantity: number;
};

type CartState = {
  cartItem: CartItem | null;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM" }
  | { type: "UPDATE_QUANTITY"; payload: UpdateQuantityPayload }
  | { type: "CLEAR_CART" };

type CartContextProps = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const initialState: CartState = { cartItem: null };

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cartItem: action.payload,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItem: null,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItem: state.cartItem
          ? { ...state.cartItem, quantity: action.payload.quantity }
          : null,
      };
    case "CLEAR_CART":
      return { cartItem: null };
    default:
      throw new Error("Unhandled action type");
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
