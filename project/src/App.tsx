import React from 'react';
import { TaxHarvestingProvider } from './context/TaxHarvestingContext';
import PreHarvestingCard from './components/PreHarvestingCard';
import AfterHarvestingCard from './components/AfterHarvestingCard';
import HoldingsTable from './components/HoldingsTable';
import './styles/App.css';

function App() {
  return (
    <TaxHarvestingProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Tax-Loss Harvesting</h1>
        </header>
        
        <main className="app-content">
          <div className="harvesting-cards-container">
            <PreHarvestingCard />
            <AfterHarvestingCard />
          </div>
          
          <HoldingsTable />
        </main>
      </div>
    </TaxHarvestingProvider>
  );
}

export default App;