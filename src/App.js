import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coins from './Coins';

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res=> {
            setCoins(res.data);
            console.log(search);
        }).catch(err=> alert(err));
    })

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLocaleLowerCase()));
    

  return (
    <div className="coin-app">
     <div className="search-box">
         <h3 className="search-text" placeholder="search a currency">Search</h3>
         <form>
             <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
         </form>
     </div>
     {filteredCoins.map(coin => {
         return(
             <Coins 
             key={coin.id} 
             name={coin.name} 
             symbol={coin.symbol} 
             image={coin.image}
             volume={coin.total_volume}
             price={coin.current_price}
             priceChange = {coin.price_change_percentage_24h}
             marketcap = {coin.market_cap}
             ></Coins>
         )
     })}
    </div>
  );
}

export default App;
