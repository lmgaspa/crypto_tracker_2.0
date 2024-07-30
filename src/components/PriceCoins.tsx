import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface PriceCoinsContextProps {
  btcPrice: string;
  ethPrice: string;
  bnbPrice: string;
  dogePrice: string;
  solPrice: string;
  xrpPrice: string;
  dotPrice: string;
  adaPrice: string;
  shibPrice: string;
  pepePrice: string;
  flokiPrice: string;
  trxPrice: string;
}

const PriceCoinsContext = createContext<PriceCoinsContextProps | undefined>(undefined);

const PriceCoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [btcPrice, setBtcPrice] = useState<string>('0');
  const [ethPrice, setEthPrice] = useState<string>('0');
  const [bnbPrice, setBnbPrice] = useState<string>('0');
  const [dogePrice, setDogePrice] = useState<string>('0');
  const [solPrice, setSolPrice] = useState<string>('0');
  const [xrpPrice, setXrpPrice] = useState<string>('0');
  const [adaPrice, setAdaPrice] = useState<string>('0');
  const [dotPrice, setDotPrice] = useState<string>('0');
  const [shibPrice, setShibPrice] = useState<string>('0');
  const [pepePrice, setPepePrice] = useState<string>('0');
  const [flokiPrice, setFlokiPrice] = useState<string>('0');
  const [trxPrice, setTrxPrice] = useState<string>('0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.all([
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=SHIBUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=PEPEUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=FLOKIUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT')
        ]);

        const [
          btcData, ethData, bnbData, dogeData, solData,
          xrpData, adaData, dotData, shibData, pepeData,
          flokiData, trxData
        ] = responses.map(response => response.data);

        setBtcPrice(formatPrice(btcData.price));
        setEthPrice(formatPrice(ethData.price));
        setBnbPrice(formatPrice(bnbData.price));
        setDogePrice(formatPrice(dogeData.price));
        setSolPrice(formatPrice(solData.price));
        setXrpPrice(formatPrice(xrpData.price));
        setAdaPrice(formatPrice(adaData.price));
        setDotPrice(formatPrice(dotData.price));
        setShibPrice(formatPrice(shibData.price));
        setPepePrice(formatPrice(pepeData.price));
        setFlokiPrice(formatPrice(flokiData.price));
        setTrxPrice(formatPrice(trxData.price));
      } catch (error) {
        console.error('Error fetching coin prices:', error);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price: string) => {
    const priceFloat = parseFloat(price);
    if (priceFloat >= 1) {
      return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(priceFloat);
    } else {
      return new Intl.NumberFormat('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 }).format(priceFloat);
    }
  };

  return (
    <PriceCoinsContext.Provider value={{ btcPrice, ethPrice, bnbPrice, dogePrice, solPrice, xrpPrice, adaPrice, dotPrice, shibPrice, pepePrice, flokiPrice, trxPrice }}>
      {children}
    </PriceCoinsContext.Provider>
  );
};

export { PriceCoinsContext, PriceCoinsProvider };
export type { PriceCoinsContextProps };
