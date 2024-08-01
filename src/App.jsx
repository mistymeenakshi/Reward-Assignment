import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState('customer1');
  const [currentRewardsData, setCurrentRewardsData] = useState(null);

  useEffect(() => {
    fetch('/data.json').then(response => {
      return response.json();
    }).then(data => {
      // simulate api fetch delay
      setTimeout(() => {
        setCurrentRewardsData(prepareRewardsTableData(data[currentCustomer]));
        setIsDataAvailable(true);
      }, 2200);

    }).catch(err => {
      console.error("could not fetch data", err);
      setIsDataAvailable(true);
    });
  }, [currentCustomer]);

  const prepareRewardsTableData = (transactions) => {
    const monthlyData = new Map();
    transactions.forEach(transaction => {
      if (monthlyData.has(transaction.month)) {
        const monthData = monthlyData.get(transaction.month);
        monthlyData.set(transaction.month, { spend: monthData.spend + transaction.amount, reward: getRewardValue(monthData.spend + transaction.amount) });
      } else {
        monthlyData.set(transaction.month, { spend: transaction.amount, reward: getRewardValue(transaction.amount) });
      }
    });
    return monthlyData;
  }

  const getRewardValue = (transactionAmount) => {

    let points = 0;

    if (transactionAmount > 100) {
      points += (transactionAmount - 100) * 2;
      points += 50;
    } else if (transactionAmount > 50) {
      points += (transactionAmount - 50);
    }
    return points;
  }

  const getTotalReward = () => {
    let total = 0;
    currentRewardsData?.forEach((v, k) => {
      total += v.reward;
    });
    return total;
  }

  const switchCustomer = (id) => {
    if (id !== currentCustomer) {
      setIsDataAvailable(false);
      setCurrentCustomer(id);
    }
  }

  return (
    <>
      <h1>Rewards Calculator</h1>
      <div className="card">
        <div className='buttonsContainer'>
          <button onClick={() => switchCustomer('customer1')}>Customer 1</button>
          <button onClick={() => switchCustomer('customer2')}>Customer 2</button>
        </div>

        <h2>{currentCustomer}</h2>

        {
          isDataAvailable ? (<table>
            <tbody>
              <tr>
                <th>Month</th>
                <th>Spending</th>
                <th>Reward</th>
              </tr>
              {
                Array.from(currentRewardsData.entries()).map(([k, v]) => {
                  return (
                    <tr>
                      <td>{k}</td>
                      <td>{v.spend}</td>
                      <td>{v.reward}</td>
                    </tr>

                  )
                })
              }
            </tbody>
          </table>) :
            (<div className='loading'> Loading....</div>)
        }

      </div>
      <p className='rewards'>
        The total rewards: {getTotalReward()}
      </p>
    </>
  )
}

export default App
