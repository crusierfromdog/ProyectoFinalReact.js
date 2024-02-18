import { useState } from "react";
import CartDetail from "../CartDetail";
import "./styles.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { categories, cart } = props;
  const [showCart, setShowCart] = useState(false);
  console.log(showCart);

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/">Brand</Link>
      </div>
      <div className="navbar-categories">
        {categories.map((category) => (
          <Link key={category} to={`/category/${category.toLowerCase()}`}>
            {category}
          </Link>
        ))}
      </div>
      <button
        className="navbar-cart"
        onClick={() => setShowCart((currShowCart) => !currShowCart)}
      >
        Cart(
        {cart.products.reduce((acc, p) => {
          return acc + p.qty;
        }, 0)}
        ) items
      </button>
      {showCart && <CartDetail products={cart.products} amount={cart.amount} />}
    </nav>
  );
};

export default Navbar;
