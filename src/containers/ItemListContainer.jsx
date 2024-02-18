import "../App.css";
import { useContext } from "react";
import cloneDeep from "lodash.clonedeep";
import { useLoaderData } from "react-router-dom";
import Product from "../components/Product";
import AppStateContext from "../StateContext";

const ItemListContainer = () => {
  const { appState, setAppState } = useContext(AppStateContext);
  const { category } = useLoaderData();

  // Si el valor de category en la linea anterior no es nulo, significa que estamos visitando
  // una ruta del tipo /category/bebidas, entonces hay que quedarse solo con la categoría que se llame "bebidas"
  // como categoría disponible.

  // Si el valor de category es nulo, significa que estamos visitando la raíz, y ahí podemos mostrar todas las categorías del
  // catálogo.
  const availableCategories =
    category !== null
      ? appState.catalog.filter(
          (categoryInCatalog) =>
            categoryInCatalog.name.toLowerCase() === category,
        )
      : appState.catalog;

  const products = availableCategories.reduce((accum, current) => {
    const productsWithCategory = current.products.map((product) => {
      return { categoryId: current.id, category: current.name, ...product };
    });
    return [...accum, ...productsWithCategory];
  }, []);

  console.log(appState);

  return products.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      title={product.name}
      image={product.imageUrl}
      category={product.category}
      price={product.price}
      stock={product.stock}
      onCartAdition={(qty) => {
        setAppState((appState) => {
          const newAppState = cloneDeep(appState);
          //Actualizar Stock en el catalogo
          const category = newAppState.catalog.find(
            (el) => el.id === product.categoryId,
          );

          const p = category.products.find((el) => el.id === product.id);
          p.stock = p.stock - qty;

          //Actualizar el carrito
          const indexInCart = newAppState.cart.products.findIndex(
            (el) => el.id === product.id,
          );

          //Si el item ya está en el carrito, actualizo. Si no, agrego
          if (indexInCart === -1) {
            newAppState.cart.products.push({ ...product, qty });
          } else {
            const currentCartProduct = newAppState.cart.products[indexInCart];
            newAppState.cart.products[indexInCart] = {
              ...currentCartProduct,
              qty: currentCartProduct.qty + qty,
            };
          }

          newAppState.cart.amount += Number(product.price, 10) * qty;

          return newAppState;
        });
      }}
    />
  ));
};

export default ItemListContainer;
