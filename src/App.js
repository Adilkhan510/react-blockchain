import { useState } from 'react';
import { errors, ethers } from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'


const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
function App() {

  const [greeting, setGreetingValue] = useState();


  async function fetchGreeting (){
    // check to see if they have metamask installed
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try{
        const data = await contract.greet();
        console.log('data', data)
      }catch{
        console.log("Error", errors)
      }
    }
  }

  async function setGreeting(){
    if(!greeting) return;
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait();
      fetchGreeting()
    }
  }

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }
  return (
    <div className="App">
      <header className="App-header">
        <img  className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
