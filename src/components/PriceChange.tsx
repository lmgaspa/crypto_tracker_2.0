import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface PriceChangeContextProps {
  btcPriceChange: number;
  ethPriceChange: number;
  bnbPriceChange: number;
  xrpPriceChange: number;
  adaPriceChange: number;
  solPriceChange: number;
  dotPriceChange: number;
  trxPriceChange: number;
  dogePriceChange: number;
  shibPriceChange: number;
  pepePriceChange: number;
  flokiPriceChange: number;
}

const PriceChangeContext = createContext<PriceChangeContextProps | undefined>(undefined);

const PriceChangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [btcPriceChange, setBtcPriceChange] = useState<number>(0);
  const [ethPriceChange, setEthPriceChange] = useState<number>(0);
  const [bnbPriceChange, setBnbPriceChange] = useState<number>(0);
  const [solPriceChange, setSolPriceChange] = useState<number>(0);
  const [xrpPriceChange, setXrpPriceChange] = useState<number>(0);
  const [adaPriceChange, setAdaPriceChange] = useState<number>(0);
  const [dotPriceChange, setDotPriceChange] = useState<number>(0);
  const [trxPriceChange, setTrxPriceChange] = useState<number>(0);
  const [dogePriceChange, setDogePriceChange] = useState<number>(0);
  const [shibPriceChange, setshibPriceChange] = useState<number>(0);
  const [pepePriceChange, setPepePriceChange] = useState<number>(0);
  const [flokiPriceChange, setFlokiPriceChange] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.all([
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BNBUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=DOGEUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=XRPUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=ADAUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=DOTUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=SHIBUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=PEPEUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=FLOKIUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=TRXUSDT')
        ]);

        const [
          btcData, ethData, bnbData, dogeData, solData,
          xrpData, adaData, dotData, shibData, pepeData,
          flokiData, trxData
        ] = responses.map(response => response.data);

        setBtcPriceChange(parseFloat(btcData.priceChangePercent));
        setEthPriceChange(parseFloat(ethData.priceChangePercent));
        setBnbPriceChange(parseFloat(bnbData.priceChangePercent));
        setDogePriceChange(parseFloat(dogeData.priceChangePercent));
        setSolPriceChange(parseFloat(solData.priceChangePercent));
        setXrpPriceChange(parseFloat(xrpData.priceChangePercent));
        setAdaPriceChange(parseFloat(adaData.priceChangePercent));
        setDotPriceChange(parseFloat(dotData.priceChangePercent));
        setshibPriceChange(parseFloat(shibData.priceChangePercent));
        setPepePriceChange(parseFloat(pepeData.priceChangePercent));
        setFlokiPriceChange(parseFloat(flokiData.priceChangePercent));
        setTrxPriceChange(parseFloat(trxData.priceChangePercent));
      } catch (error) {
        console.error('Error fetching coin price changes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PriceChangeContext.Provider value={{
      btcPriceChange,
      ethPriceChange,
      bnbPriceChange,
      solPriceChange,
      xrpPriceChange,
      adaPriceChange,
      dotPriceChange,
      trxPriceChange,
      dogePriceChange,
      shibPriceChange,
      pepePriceChange,
      flokiPriceChange,
    }}>
      {children}
    </PriceChangeContext.Provider>
  );
};

export { PriceChangeContext, PriceChangeProvider };
export type { PriceChangeContextProps };
