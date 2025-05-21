import React, { useMemo } from 'react';
import { useTaxHarvesting } from '../context/TaxHarvestingContext';
import { formatCurrency } from '../utils/formatters';
import '../styles/HarvestingCards.css';

const AfterHarvestingCard: React.FC = () => {
  const { capitalGains, selectedHoldings } = useTaxHarvesting();

  // Get initial values, defaulting to 0 if capitalGains is null
  const initialStcg = capitalGains?.capitalGains.stcg ?? { profits: 0, losses: 0 };
  const initialLtcg = capitalGains?.capitalGains.ltcg ?? { profits: 0, losses: 0 };
  
  // Calculate updated values based on selected holdings - now always executed
  const updatedGains = useMemo(() => {
    // Start with initial values
    const updatedStcg = { ...initialStcg };
    const updatedLtcg = { ...initialLtcg };

    // Update with selected holdings
    selectedHoldings.forEach(holding => {
      if (holding.stcgGain > 0) {
        updatedStcg.profits += holding.stcgGain;
      } else if (holding.stcgGain < 0) {
        updatedStcg.losses += Math.abs(holding.stcgGain);
      }

      if (holding.ltcgGain > 0) {
        updatedLtcg.profits += holding.ltcgGain;
      } else if (holding.ltcgGain < 0) {
        updatedLtcg.losses += Math.abs(holding.ltcgGain);
      }
    });

    return { updatedStcg, updatedLtcg };
  }, [initialStcg, initialLtcg, selectedHoldings]);

  // If no capital gains data yet, return null after hooks are executed
  if (!capitalGains) return null;

  // Calculate net gains
  const { updatedStcg, updatedLtcg } = updatedGains;
  const updatedStcgNet = updatedStcg.profits - updatedStcg.losses;
  const updatedLtcgNet = updatedLtcg.profits - updatedLtcg.losses;
  const updatedRealizedCapitalGains = updatedStcgNet + updatedLtcgNet;

  // Calculate original realized capital gains
  const originalStcgNet = initialStcg.profits - initialStcg.losses;
  const originalLtcgNet = initialLtcg.profits - initialLtcg.losses;
  const originalRealizedCapitalGains = originalStcgNet + originalLtcgNet;

  // Calculate savings
  const savings = originalRealizedCapitalGains - updatedRealizedCapitalGains;
  const showSavings = savings > 0;

  return (
    <div className="harvesting-card after-harvesting-card">
      <h2 className="card-title">After Tax-loss Harvesting</h2>

      <div className="capital-gains-section">
        <div className="gains-row">
          <div className="gains-type">
            <h3>Short-term</h3>
            <div className="gains-details">
              <div className="gains-item">
                <span className="label">Profits</span>
                <span className="value positive">₹{formatCurrency(updatedStcg.profits)}</span>
              </div>
              <div className="gains-item">
                <span className="label">Losses</span>
                <span className="value negative">₹{formatCurrency(updatedStcg.losses)}</span>
              </div>
              <div className="gains-item total">
                <span className="label">Net Capital Gains</span>
                <span className={`value ${updatedStcgNet >= 0 ? 'positive' : 'negative'}`}>
                  ₹{formatCurrency(updatedStcgNet)}
                </span>
              </div>
            </div>
          </div>
          <div className="gains-type">
            <h3>Long-term</h3>
            <div className="gains-details">
              <div className="gains-item">
                <span className="label">Profits</span>
                <span className="value positive">₹{formatCurrency(updatedLtcg.profits)}</span>
              </div>
              <div className="gains-item">
                <span className="label">Losses</span>
                <span className="value negative">₹{formatCurrency(updatedLtcg.losses)}</span>
              </div>
              <div className="gains-item total">
                <span className="label">Net Capital Gains</span>
                <span className={`value ${updatedLtcgNet >= 0 ? 'positive' : 'negative'}`}>
                  ₹{formatCurrency(updatedLtcgNet)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="realized-gains">
        <div className="realized-gains-row">
          <span className="realized-label">Realized Capital Gains</span>
          <span className={`realized-value ${updatedRealizedCapitalGains >= 0 ? 'positive' : 'negative'}`}>
            ₹{formatCurrency(updatedRealizedCapitalGains)}
          </span>
        </div>
      </div>

      {showSavings && (
        <div className="savings-message">
          <span>You're going to save ₹{formatCurrency(savings)}</span>
        </div>
      )}
    </div>
  );
};

export default AfterHarvestingCard;