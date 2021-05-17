import axios from 'axios'
import React, {useState, useEffect} from 'react';
import Coin from './Component/Coin'
import './App.scss';

function App() {

  const [coins, setcoins] = useState([])
  const [Search, SetSearch] = useState('')
  
  
  
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setcoins(res.data)
      console.log(res.data)
    }).catch(error=>alert('Issue Loading Api'))
  },[])

  const handleChange = e =>{
    SetSearch(e.target.value)
  }
  

  const SearchFilter = coins.filter(coins =>
    coins.name.toLowerCase().includes(Search.toLowerCase())
    )


  return (
    <div>
      
       <div className='title'>CRYPTOTRACKER</div>
       <form>
       <input type='text' placeholder='search coin' onChange={handleChange} />
       </form>
       {SearchFilter.map(coins=> {
         return(
           <Coin 
           key={coins.id}
           name={coins.name}
           img={coins.image}
           symbol={coins.symbol}
           price={coins.current_price}
           Cap={coins.market_cap}
           priceChange={coins.price_change_percentage_24h}
           
           />
            
         )
       })}
      <br/>
    </div>
  );
}

export default App;
