import React from 'react';

const Item = ({ id, cost, handleChange }) => (
  <div>
    <input
      type="number"
      value={cost}
      onChange={(e) => handleChange(id, e.target.value)}
      min="0"
    />
  </div>
);

export default Item;