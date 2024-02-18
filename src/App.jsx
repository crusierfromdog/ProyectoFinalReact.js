import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppStateContext from "./StateContext";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import ItemListContainer from "./containers/ItemListContainer";
import Layout from "./containers/Layout";

import "./App.css";
import CheckoutContainer from "./containers/CheckoutContainer";

const initialState = {
  catalog: [
    {
      name: "Bebidas",
      id: "1",
      products: [
        {
          id: "1",
          name: "Coca Cola",
          price: 1500,
          stock: 4,
          imageUrl:
            "https://www.comercialescocia.cl/media/catalog/product/cache/bd39c428e033d025c961d90e67539ecb/6/0/60030002_2022-01-21_10_59_48.jpg",
        },
        {
          id: "2",
          name: "Fanta",
          price: 1400,
          stock: 3,
          imageUrl:
            "https://www.supermercadodiez.cl/image/cache/catalog/2023/ABRIL/fanta%20normal-500x500.jpg",
        },
        {
          id: "3",
          name: "Sprite",
          price: 1100,
          stock: 5,
          imageUrl:
            "https://xmayor.cl/wp-content/uploads/2021/06/SPRITE-350CC-LATA.jpg",
        },
      ],
    },
    {
      name: "Aguas",
      id: "3",
      products: [
        {
          id: "7",
          name: "Agua Mineral",
          price: 1500,
          stock: 3,
          imageUrl:
            "https://resources.sears.com.mx/medios-plazavip/fotos/productos_sears1/original/3294626.jpg?scale=500&qlty=75",
        },
      ],
    },
    {
      name: "Jugos",
      id: "2",
      products: [
        {
          id: "4",
          name: "Jugo de Naranja",
          price: 1000,
          stock: 6,
          imageUrl:
            "https://onixsuper.com/wp-content/uploads/2020/08/07501055356799-600x760.jpg",
        },
        {
          id: "5",
          name: "Jugo de Piña",
          price: 1100,
          stock: 8,
          imageUrl:
            "https://onixsuper.com/wp-content/uploads/2020/10/7501055356720-600x760.jpg",
        },
        {
          id: "6",
          name: "Jugo de Durazno",
          price: 1300,
          stock: 4,
          imageUrl:
            "https://onixsuper.com/wp-content/uploads/2020/08/7501055356751-1-600x760.jpg",
        },
      ],
    },
  ],
  cart: {
    products: [],
    amount: 0,
  },
};

const router = createBrowserRouter([
  {
    path: "/", // /
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ItemListContainer />,
        loader: () => {
          return { category: null };
        },
      },
      {
        path: "/category/:id",
        element: <ItemListContainer />,
        loader: ({ params }) => {
          const category = params.id;
          return { category };
        },
      },
      {
        path: "/item/:id",
        element: <ItemDetailContainer />,
        loader: ({ params }) => {
          const item = params.id;
          return { item };
        },
      },
      {
        path: "/checkout",
        element: <CheckoutContainer />,
      },
    ],
  },
]);

const App = () => {
  const [appState, setAppState] = useState(initialState);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      <RouterProvider router={router} />
    </AppStateContext.Provider>
  );
};

export default App;
