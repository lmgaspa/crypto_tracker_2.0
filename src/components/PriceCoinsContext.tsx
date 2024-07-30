import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
        const [
          btcResponse, ethResponse, bnbResponse, dogeResponse, solResponse,
          xrpResponse, adaResponse, dotResponse, shibResponse, pepeResponse,
          flokiResponse, trxResponse
        ] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=SHIBUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=PEPEUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=FLOKIUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT'),
        ]);

        const [
          btcData, ethData, bnbData, dogeData, solData,
          xrpData, adaData, dotData, shibData, pepeData,
          flokiData, trxData
        ] = await Promise.all([
          btcResponse.json(), ethResponse.json(), bnbResponse.json(), dogeResponse.json(), solResponse.json(),
          xrpResponse.json(), adaResponse.json(), dotResponse.json(), shibResponse.json(), pepeResponse.json(),
          flokiResponse.json(), trxResponse.json()
        ]);

        const formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        setBtcPrice(formatter.format(parseFloat(btcData.price)));
        setEthPrice(formatter.format(parseFloat(ethData.price)));
        setBnbPrice(formatter.format(parseFloat(bnbData.price)));
        setDogePrice(formatter.format(parseFloat(dogeData.price)));
        setSolPrice(formatter.format(parseFloat(solData.price)));
        setXrpPrice(formatter.format(parseFloat(xrpData.price)));
        setAdaPrice(formatter.format(parseFloat(adaData.price)));
        setDotPrice(formatter.format(parseFloat(dotData.price)));
        setShibPrice(formatter.format(parseFloat(shibData.price)));
        setPepePrice(formatter.format(parseFloat(pepeData.price)));
        setFlokiPrice(formatter.format(parseFloat(flokiData.price)));
        setTrxPrice(formatter.format(parseFloat(trxData.price)));
      } catch (error) {
        console.error('Error fetching coin prices:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PriceCoinsContext.Provider value={{ btcPrice, ethPrice, bnbPrice, dogePrice, solPrice, xrpPrice, adaPrice, dotPrice, shibPrice, pepePrice, flokiPrice, trxPrice }}>
      {children}
    </PriceCoinsContext.Provider>
  );
};

export { PriceCoinsContext, PriceCoinsProvider };
export type { PriceCoinsContextProps };
