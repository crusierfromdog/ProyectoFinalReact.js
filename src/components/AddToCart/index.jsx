import { useState } from "react";

import "./styles.css";

const AddToCart = (props) => {
  const { onAdd, limit } = props;
  const [qty, setQty] = useState(1);

  return (
    <div className="add-to-cart-container">
      <div className="stepper-container">
        <button
          className="stepper"
          onClick={() => {
            if (qty - 1 < 0) {
              setQty(0);
            } else {
              setQty((curQty) => curQty - 1);
            }
          }}
        >
          -
        </button>
        <input type="number" value={qty} disabled />
        <button
          className="stepper"
          onClick={() => {
            if (qty + 1 > limit) {
              setQty(limit);
            } else {
              setQty((curQty) => curQty + 1);
            }
          }}
        >
          +
        </button>
      </div>
      <div className="action-container">
        <button
          onClick={() => {
            onAdd(qty);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
