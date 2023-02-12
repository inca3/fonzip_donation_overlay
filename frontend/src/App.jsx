import { useEffect, useState } from 'react';
import useInterval from './hooks/useInterval';

function App() {
  const [totalFunds, setTotalFunds] = useState('');
  const [funders, setFunders] = useState([]);
  const [lastDonation, setLastDonation] = useState({});

  const getTotalFunds = async () => {
    const query = new URLSearchParams(window.location.search);
    const url = query.get('url');
    const res = await fetch(`http://localhost:1234/totalFunds/?url=${url}`);
    const data = await res.json();
    if (data.funds != totalFunds) {
      console.log(data.funds);
      console.log(totalFunds);
      setTotalFunds(data.funds);
      setFunders(data.funders.donation_list);
      setLastDonation(data.funders.donation_list[0]);
      document.querySelector('.popup').classList.add('active');
      setTimeout(
        () => document.querySelector('.popup').classList.remove('active'),
        3000
      );
    } else return;

    console.log('güncellendi');
  };

  useInterval(getTotalFunds, 10000);

  useEffect(() => {
    getTotalFunds();
  }, []);

  return (
    <div className='app'>
      <h1>{totalFunds}</h1>
      {/* <div className='funders'>
        {funders.slice(0, 10).map((funder, i) => (
          <div key={i} className='funder'>
            <p className='funder-name'>
              {funder.name_hidden ? 'Gizli Bağışçı' : funder.dname}
            </p>
            <p className='fund-amount'>
              {funder.amount_visible ? `${funder.amount} TL` : 'Gizli Miktar'}
            </p>
          </div>
        ))}
      </div> */}
      <div>
        {alert && (
          <div className='popup'>
            <p>
              {lastDonation.amount_visible
                ? `${lastDonation.amount} TL`
                : 'X TL'}
            </p>
            <p>{lastDonation.name_hidden ? 'Anonim' : lastDonation.dname}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
