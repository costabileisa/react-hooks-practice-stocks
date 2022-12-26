import React, { useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState({
    input: "",
    select: "",
  });

  useState(() => {
    fetch("http://localhost:3001/stocks")
    .then(res => res.json())
    .then(data => setStocks(data));
  }, []);

  function handleAddStock(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock])
    }
  }

  function handleDeleteStock(portfolioStock) {
    const newPortfolio = portfolio.filter(stock => stock.id !== portfolioStock.id);

    setPortfolio(newPortfolio);
  }

  function onSearch(target) {
    if (target.type === "select-one") {
      setSearch({
        ...search,
        select: target.value
      })
    }
    if (target.type === "radio") {
      setSearch({
        ...search,
        input: target.value
      })
    }
  }  

  function sortStocks(a, b) {
    if (search.input === "") return 0;
    if (search.input === "Alphabetically") {
      const A = a.name.toLowerCase();
      const B = b.name.toLowerCase();

      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    }
    if (search.input === "Price") {
      return a.price - b.price
    }
  }

  const sorted = [...stocks].sort((a, b) => {
    return sortStocks(a, b)
  })

  const stocksToShow = sorted.filter(stock => {
    if (search.select === "") return stock;
    return stock.type === search.select;
  })

  const sortedPortfolio = [...portfolio].sort((a, b) => {
    return sortStocks(a, b)
  })

  const portfolioToShow = sortedPortfolio.filter(stock => {
    if (search.select === "") return stock;
    return stock.type === search.select;
  })

  return (
    <div>
      <SearchBar search={search} onSearch={onSearch} />
      <div className="row">
        <div className="col-8">
          <StockContainer onAddStock={handleAddStock} stocks={stocksToShow} />
        </div>
        <div className="col-4">
          <PortfolioContainer onDeleteStock={handleDeleteStock} portfolio={portfolioToShow} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
