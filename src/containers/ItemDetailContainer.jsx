import "../App.css";
import { useContext } from "react";
import cloneDeep from "lodash.clonedeep";
import { useLoaderData } from "react-router-dom";
import AppStateContext from "../StateContext";
import Product from "../components/Product";

const ItemDetailContainer = () => {
  const { appState, setAppState } = useContext(AppStateContext);
  const { item } = useLoaderData();

  const allProducts = {};

  appState.catalog.forEach((category) => {
    category.products.map((product) => {
      allProducts[product.id] = { ...product, category: category.name };
    });
  });

  const selectedProduct = allProducts[item];

  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }

  return (
    <Product
      id={selectedProduct.id}
      title={selectedProduct.name}
      image={selectedProduct.imageUrl}
      category={selectedProduct.category}
      price={selectedProduct.price}
      stock={selectedProduct.stock}
      onCartAdition={(qty) => {
        setAppState((appState) => {
          const newAppState = cloneDeep(appState);
          //Actualizar Stock en el catalogo
          const category = newAppState.catalog.find(
            (el) => el.id === selectedProduct.categoryId,
          );

          const p = category.products.find(
            (el) => el.id === selectedProduct.id,
          );
          p.stock = p.stock - qty;

          //Actualizar el carrito
          const indexInCart = newAppState.cart.products.findIndex(
            (el) => el.id === selectedProduct.id,
          );

          //Si el item ya está en el carrito, actualizo. Si no, agrego
          if (indexInCart === -1) {
            newAppState.cart.products.push({ ...selectedProduct, qty });
          } else {
            const currentCartProduct = newAppState.cart.products[indexInCart];
            newAppState.cart.products[indexInCart] = {
              ...currentCartProduct,
              qty: currentCartProduct.qty + qty,
            };
          }

          newAppState.cart.amount += Number(selectedProduct.price, 10) * qty;

          return newAppState;
        });
      }}
    />
  );
};

export default ItemDetailContainer;
