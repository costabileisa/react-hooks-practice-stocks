import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onAddStock }) {
  const listStocks = stocks.map(stock => <Stock key={stock.id} onStockClick={onAddStock} stock={ stock } />)
  return (
    <div>
      <h2>Stocks</h2>
      {listStocks}
    </div>
  );
}

export default StockContainer;
