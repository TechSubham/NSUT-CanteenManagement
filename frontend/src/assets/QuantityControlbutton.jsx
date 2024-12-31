import React from 'react';

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center border rounded-full"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center border rounded-full"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;