import "./styles.css";
import { useContext } from "react";
import cloneDeep from "lodash.clonedeep";
import AppStateContext from "../../StateContext";
import { Link } from "react-router-dom";

const CartDetail = (props) => {
  const { products, amount } = props;
  const { setAppState } = useContext(AppStateContext);

  return (
    <div className="cart-detail-container">
      <div className="cart-detail-products">
        {products.map((product) => {
          return (
            <div className="cart-product" key={product.id}>
              <img src={product.imageUrl} height={50} width={50} />
              <div className="product-title">
                <span>{product.name}</span>
              </div>
              <div className="product-quantity">
                <span>{product.qty}</span>
              </div>
              <button
                onClick={() => {
                  setAppState((appState) => {
                    const newAppState = cloneDeep(appState);
                    //Actualizar Stock en el catalogo
                    const category = newAppState.catalog.find(
                      (el) => el.id === product.categoryId,
                    );

                    const p = category.products.find(
                      (el) => el.id === product.id,
                    );
                    p.stock = p.stock + product.qty;

                    //Actualizar el carrito
                    newAppState.cart.products =
                      newAppState.cart.products.filter(
                        (el) => el.id !== product.id,
                      );
                    newAppState.cart.amount -=
                      Number(product.price, 10) * product.qty;

                    return newAppState;
                  });
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-detail-amount">
        <span>{amount}</span>
      </div>
      <div className="cart-detail-checkout">
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
};

export default CartDetail;
