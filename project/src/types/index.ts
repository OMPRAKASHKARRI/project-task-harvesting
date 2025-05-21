export interface GainLoss {
  balance: number;
  gain: number;
}

export interface HoldingData {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainLoss;
  ltcg: GainLoss;
}

export interface CapitalGains {
  profits: number;
  losses: number;
}

export interface CapitalGainsData {
  capitalGains: {
    stcg: CapitalGains;
    ltcg: CapitalGains;
  };
}

export interface SelectedHolding {
  id: string;
  stcgGain: number;
  ltcgGain: number;
}