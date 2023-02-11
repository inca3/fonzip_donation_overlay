import { useEffect, useState } from 'react';

function App() {
  const [totalFunds, setTotalFunds] = useState('0');
  const [funders, setFunders] = useState([]);

  useEffect(() => {
    const getTotalFunds = async () => {
      const res = await fetch(
        'http://localhost:1234/totalFunds/?url=https://fonzip.com/ahbap/kampanya/videoyun---ahbap'
      );
      const data = await res.json();
      setTotalFunds(data.funds);
      setFunders(data.funders.donation_list);
      console.log('güncellendi');
    };
    getTotalFunds();
    const refInterval = setInterval(getTotalFunds, 10000);
    return () => {
      clearInterval(refInterval);
    };
  }, []);

  return (
    <div className='app'>
      <h1>{totalFunds}</h1>
      <div className='funders'>
        {funders.slice(0, 5).map((funder, i) => (
          <div key={i} className='funder'>
            <p className='funder-name'>
              {funder.name_hidden ? 'Gizli Bağışçı' : funder.dname}
            </p>
            <p className='fund-amount'>
              {funder.amount_visible ? `${funder.amount} TL` : 'Gizli Miktar'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
