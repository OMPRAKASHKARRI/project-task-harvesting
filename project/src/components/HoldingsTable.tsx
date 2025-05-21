import React, { useState } from 'react';
import { useTaxHarvesting } from '../context/TaxHarvestingContext';
import { HoldingData } from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import '../styles/HoldingsTable.css';

const HoldingsTable: React.FC = () => {
  const { holdings, selectedHoldings, selectHolding, selectAllHoldings, isLoading } = useTaxHarvesting();
  const [visibleRows, setVisibleRows] = useState<number>(5);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="holdings-table-container">
        <div className="loading">Loading holdings...</div>
      </div>
    );
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    selectAllHoldings(newSelectAll);
  };

  // Handle individual checkbox
  const handleSelect = (holding: HoldingData, isSelected: boolean) => {
    selectHolding(holding, isSelected);
    
    // Update selectAll based on if all items are selected
    if (!isSelected && selectAll) {
      setSelectAll(false);
    } else if (isSelected && !selectAll && selectedHoldings.length + 1 === holdings.length) {
      setSelectAll(true);
    }
  };

  // Show more rows
  const handleViewAll = () => {
    setVisibleRows(holdings.length);
  };

  // Check if a holding is selected
  const isSelected = (coin: string) => {
    return selectedHoldings.some(selected => selected.id === coin);
  };

  return (
    <div className="holdings-table-container">
      <h2 className="table-title">Your Holdings</h2>
      
      <div className="table-responsive">
        <table className="holdings-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Asset</th>
              <th>Holdings &<br />Avg. Buy Price</th>
              <th>Current Price</th>
              <th>Short-Term Gain</th>
              <th>Long-Term Gain</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.slice(0, visibleRows).map((holding) => (
              <tr 
                key={holding.coin}
                className={isSelected(holding.coin) ? 'selected-row' : ''}
              >
                <td className="checkbox-col">
                  <input 
                    type="checkbox"
                    checked={isSelected(holding.coin)}
                    onChange={(e) => handleSelect(holding, e.target.checked)}
                  />
                </td>
                <td className="asset-col">
                  <div className="asset-info">
                    <img 
                      src={holding.logo} 
                      alt={holding.coin} 
                      className="asset-logo" 
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                      }}
                    />
                    <div className="asset-name">
                      <span className="asset-symbol">{holding.coin}</span>
                      <span className="asset-fullname">{holding.coinName}</span>
                    </div>
                  </div>
                </td>
                <td className="holdings-col">
                  <div className="holdings-info">
                    <span className="holdings-amount">{formatNumber(holding.totalHolding)}</span>
                    <span className="buy-price">₹{formatCurrency(holding.averageBuyPrice)}</span>
                  </div>
                </td>
                <td className="price-col">₹{formatCurrency(holding.currentPrice)}</td>
                <td className="gain-col">
                  <div className="gain-info">
                    <span className={`gain-amount ${holding.stcg.gain >= 0 ? 'positive' : 'negative'}`}>
                      ₹{formatCurrency(holding.stcg.gain)}
                    </span>
                    <span className="gain-balance">{formatNumber(holding.stcg.balance)}</span>
                  </div>
                </td>
                <td className="gain-col">
                  <div className="gain-info">
                    <span className={`gain-amount ${holding.ltcg.gain >= 0 ? 'positive' : 'negative'}`}>
                      ₹{formatCurrency(holding.ltcg.gain)}
                    </span>
                    <span className="gain-balance">{formatNumber(holding.ltcg.balance)}</span>
                  </div>
                </td>
                <td className="sell-amount-col">
                  {isSelected(holding.coin) ? (
                    <span className="sell-amount">{formatNumber(holding.totalHolding)}</span>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {visibleRows < holdings.length && (
        <button 
          className="view-all-button"
          onClick={handleViewAll}
        >
          View All
        </button>
      )}
    </div>
  );
};

export default HoldingsTable;