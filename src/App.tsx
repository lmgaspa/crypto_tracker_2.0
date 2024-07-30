import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PriceCoinsContext, PriceCoinsProvider, PriceCoinsContextProps } from './components/PriceCoins';
import { PriceChangeContext, PriceChangeProvider, PriceChangeContextProps } from './components/PriceChange';
import { FaSun, FaMoon } from 'react-icons/fa';
import btc from './assets/images/btc.png';
import eth from './assets/images/eth.png';
import bnb from './assets/images/bnb.png';
import ada from './assets/images/ada.png';
import xrp from './assets/images/xrp.png';
import doge from './assets/images/doge.png';
import dot from './assets/images/dot.png';
import sol from './assets/images/sol.png';
import shib from './assets/images/shib.png';
import pepe from './assets/images/pepe.png';
import trx from './assets/images/trx.png';
import floki from './assets/images/floki.png';

const coinImages = {
  BTC: btc, ETH: eth, BNB: bnb, SOL: sol, ADA: ada, XRP: xrp,
  DOGE: doge, DOT: dot, SHIB: shib, PEPE: pepe, TRX: trx, FLOKI: floki
};

const coinCategories = {
  MEME: ['DOGE', 'SHIB', 'PEPE', 'FLOKI'],
  TOP: ['BTC', 'ETH', 'SOL', 'BNB'],
  UTILS: ['XRP', 'TRX', 'DOT', 'ADA'],
  ALL: ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'XRP', 'DOGE', 'DOT', 'SHIB', 'PEPE', 'TRX', 'FLOKI']
};

const App: React.FC = () => {
  const coinsPriceContext = useContext(PriceCoinsContext);
  const priceChangeContext = useContext(PriceChangeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [filter, setFilter] = useState<keyof typeof coinCategories>('ALL');
  const [theme, setTheme] = useState('light');

  const currentCoin = coinCategories[filter][currentImageIndex];
  const currentCoinPrice = coinsPriceContext ? coinsPriceContext[`${currentCoin?.toLowerCase()}Price` as keyof PriceCoinsContextProps] : '0';

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextVisible(false);
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % coinCategories[filter].length);
        setIsTextVisible(true);
      }, 3000);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentImageIndex, filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as keyof typeof coinCategories);
    setCurrentImageIndex(0);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (!coinsPriceContext || !priceChangeContext) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`d-flex justify-content-center align-items-center ${theme}`}>
      <Container fluid className="w-75">
        <h1 className="text-center my-4">
          CRYPTO TRACKER
          <Button onClick={toggleTheme} variant="link" className="theme-icon ml-3">
            {theme === 'light' ? <FaSun size={24} /> : <FaMoon size={24} />}
          </Button>
        </h1>
        <Form.Group controlId="filterSelect" className="pb-4">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control as="select" value={filter} onChange={(event) => handleFilterChange(event as unknown as React.ChangeEvent<HTMLSelectElement>)}>
            <option value="ALL">ALL</option>
            <option value="MEME">MEME</option>
            <option value="TOP">TOP</option>
            <option value="UTILS">UTILS</option>
          </Form.Control>
        </Form.Group>
        <Row className="flex-grow-1">
          {coinCategories[filter].map((coin) => {
            const currentPrice = coinsPriceContext[`${coin.toLowerCase()}Price` as keyof PriceCoinsContextProps];
            const priceChangePercent = priceChangeContext[`${coin.toLowerCase()}PriceChange` as keyof PriceChangeContextProps];

            if (currentPrice === undefined || priceChangePercent === undefined) {
              console.warn(`No data for ${coin}`);
              return null;
            }

            const priceColor = priceChangePercent >= 0 ? 'green' : 'red';

            return (
              <Col key={coin} sm={6} md={4} lg={3} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center">
                      <img src={coinImages[coin as keyof typeof coinImages]} alt={coin} style={{ width: '30px', marginRight: '10px' }} />
                      <span>{coin}</span>
                    </Card.Title>
                    <div>
                      <div className="d-flex justify-content-between">
                        <span>Price:</span>
                        <span style={{ color: priceColor }}>${currentPrice}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>24h %:</span>
                        <span style={{ color: priceColor }}>
                          {priceChangePercent > 0 ? '+' : ''}
                          {priceChangePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="box d-flex justify-content-center align-items-center text-center mt-4 mb-4 p-4">
          {isTextVisible ? (
            <>
              <h1 className="box-text">{currentCoin} $ {currentCoinPrice}</h1>
            </>
          ) : (
            <a href="http://www.dianaglobal.com.br" target="_blank" rel="noopener noreferrer" className="box-link">
              visit www.dianaglobal.com.br
            </a>
          )}
        </div>
      </Container>
    </div>
  );
}

const WrappedApp: React.FC = () => (
  <PriceCoinsProvider>
    <PriceChangeProvider>
      <App />
    </PriceChangeProvider>
  </PriceCoinsProvider>
);

export default WrappedApp;
