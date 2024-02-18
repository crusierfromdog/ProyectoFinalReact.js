import "./styles.css";
import { useContext } from "react";
import cloneDeep from "lodash.clonedeep";
import AppStateContext from "../../StateContext";

const CheckoutDetail = (props) => {
  console.log("Checkout Detail");
  const { products, amount } = props;
  const { setAppState } = useContext(AppStateContext);

  return (
    <div className="checkout-container">
      <div className="checkout-products">
        {products.map((product) => {
          return (
            <div className="checkout-product" key={product.id}>
              <img src={product.imageUrl} height={100} width={100} />
              <div className="product-title">
                <span>{product.name}</span>
              </div>
              <div className="product-quantity">
                <span>{product.qty}</span>
              </div>
              <div className="product-amount">
                <span>{product.qty * Number(product.price, 10)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout-amount">
        <span>Total a pagar: {amount}</span>
      </div>
    </div>
  );
};

export default CheckoutDetail;
