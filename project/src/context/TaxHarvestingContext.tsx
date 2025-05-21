import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCapitalGains, fetchHoldings } from '../api/mockData';
import { HoldingData, CapitalGainsData, SelectedHolding } from '../types';

interface TaxHarvestingContextType {
  holdings: HoldingData[];
  capitalGains: CapitalGainsData | null;
  selectedHoldings: SelectedHolding[];
  isLoading: boolean;
  error: string | null;
  selectHolding: (holding: HoldingData, isSelected: boolean) => void;
  selectAllHoldings: (isSelected: boolean) => void;
}

const TaxHarvestingContext = createContext<TaxHarvestingContextType | undefined>(undefined);

export const useTaxHarvesting = () => {
  const context = useContext(TaxHarvestingContext);
  if (!context) {
    throw new Error('useTaxHarvesting must be used within a TaxHarvestingProvider');
  }
  return context;
};

interface TaxHarvestingProviderProps {
  children: ReactNode;
}

export const TaxHarvestingProvider: React.FC<TaxHarvestingProviderProps> = ({ children }) => {
  const [holdings, setHoldings] = useState<HoldingData[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGainsData | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<SelectedHolding[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [holdingsData, capitalGainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        
        setHoldings(holdingsData);
        setCapitalGains(capitalGainsData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Select/deselect a single holding
  const selectHolding = (holding: HoldingData, isSelected: boolean) => {
    if (isSelected) {
      // Add to selected holdings
      setSelectedHoldings(prev => [
        ...prev, 
        { 
          id: holding.coin, 
          stcgGain: holding.stcg.gain, 
          ltcgGain: holding.ltcg.gain 
        }
      ]);
    } else {
      // Remove from selected holdings
      setSelectedHoldings(prev => 
        prev.filter(item => item.id !== holding.coin)
      );
    }
  };

  // Select/deselect all holdings
  const selectAllHoldings = (isSelected: boolean) => {
    if (isSelected) {
      // Add all holdings to selected
      const allSelectedHoldings = holdings.map(holding => ({
        id: holding.coin,
        stcgGain: holding.stcg.gain,
        ltcgGain: holding.ltcg.gain
      }));
      setSelectedHoldings(allSelectedHoldings);
    } else {
      // Clear all selected holdings
      setSelectedHoldings([]);
    }
  };

  return (
    <TaxHarvestingContext.Provider
      value={{
        holdings,
        capitalGains,
        selectedHoldings,
        isLoading,
        error,
        selectHolding,
        selectAllHoldings
      }}
    >
      {children}
    </TaxHarvestingContext.Provider>
  );
};