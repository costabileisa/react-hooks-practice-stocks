import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onDeleteStock }) {

  const listPortfolio = portfolio.map(stock => <Stock key={stock.id} onStockClick={onDeleteStock} stock={stock} />);

  return (
    <div>
      <h2>My Portfolio</h2>
      {listPortfolio}
    </div>
  );
}

export default PortfolioContainer;
