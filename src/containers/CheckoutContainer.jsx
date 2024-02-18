import { useContext } from "react";
import CheckoutDetail from "../components/CheckoutDetail";
import AppStateContext from "../StateContext";

const CheckoutContainer = () => {
  const { appState } = useContext(AppStateContext);

  // const { products, amount } = props;

  return (
    <CheckoutDetail
      products={appState.cart.products}
      amount={appState.cart.amount}
    />
  );
};

export default CheckoutContainer;
