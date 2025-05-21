import React from 'react';
import { useTaxHarvesting } from '../context/TaxHarvestingContext';
import { formatCurrency } from '../utils/formatters';
import '../styles/HarvestingCards.css';

const PreHarvestingCard: React.FC = () => {
  const { capitalGains } = useTaxHarvesting();

  if (!capitalGains) return null;

  const { stcg, ltcg } = capitalGains.capitalGains;

  // Calculate net gains
  const stcgNet = stcg.profits - stcg.losses;
  const ltcgNet = ltcg.profits - ltcg.losses;
  const realizedCapitalGains = stcgNet + ltcgNet;

  return (
    <div className="harvesting-card pre-harvesting-card">
      <h2 className="card-title">Before Tax-loss Harvesting</h2>

      <div className="capital-gains-section">
        <div className="gains-row">
          <div className="gains-type">
            <h3>Short-term</h3>
            <div className="gains-details">
              <div className="gains-item">
                <span className="label">Profits</span>
                <span className="value positive">₹{formatCurrency(stcg.profits)}</span>
              </div>
              <div className="gains-item">
                <span className="label">Losses</span>
                <span className="value negative">₹{formatCurrency(stcg.losses)}</span>
              </div>
              <div className="gains-item total">
                <span className="label">Net Capital Gains</span>
                <span className={`value ${stcgNet >= 0 ? 'positive' : 'negative'}`}>
                  ₹{formatCurrency(stcgNet)}
                </span>
              </div>
            </div>
          </div>
          <div className="gains-type">
            <h3>Long-term</h3>
            <div className="gains-details">
              <div className="gains-item">
                <span className="label">Profits</span>
                <span className="value positive">₹{formatCurrency(ltcg.profits)}</span>
              </div>
              <div className="gains-item">
                <span className="label">Losses</span>
                <span className="value negative">₹{formatCurrency(ltcg.losses)}</span>
              </div>
              <div className="gains-item total">
                <span className="label">Net Capital Gains</span>
                <span className={`value ${ltcgNet >= 0 ? 'positive' : 'negative'}`}>
                  ₹{formatCurrency(ltcgNet)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="realized-gains">
        <div className="realized-gains-row">
          <span className="realized-label">Realized Capital Gains</span>
          <span className={`realized-value ${realizedCapitalGains >= 0 ? 'positive' : 'negative'}`}>
            ₹{formatCurrency(realizedCapitalGains)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreHarvestingCard;