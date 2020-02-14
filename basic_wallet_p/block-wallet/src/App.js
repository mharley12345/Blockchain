import React ,{useState,useEffect} from 'react';
import {useForm} from 'react-hook-form'
import logo from './logo.svg';
import axios from 'axios'
import { Wrapper , Button,Form,Card} from 'bushido-strap'
import './App.scss';

function App() {
  const { register, handleSubmit, errors } = useForm();
   const [user,setUser] = useState({Username:"mike-harley"})
   const [balance,setBalance] = useState(0)
   const [transactions,setTransactions] = useState([])

   useEffect(() =>{
    axios
    .get('http://localhost:5000/chain')
    .then(res => {
      console.log(res.data.chain);
      let sum = 0
      let trans = []
      res.data.chain.forEach(element => {
        element.transactions.forEach(item => {
          if(item.recipient === user.Username) {
            sum += item.amount;
            console.log(item,element)
            trans.push(item)
          }
        });
        setBalance(sum)
        setTransactions(trans)
      })
    })
    .catch(err => console.log(err))

   }, []);
  const onSubmit = data => {
    setBalance(0)
    setTransactions([])
    setUser(data)
    requestUserData(data)
    
  };
  const requestUserData = data => {
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        console.log(res.data.chain);
        let sum = 0
        let trans = []
        res.data.chain.forEach(element => {
          element.transactions.forEach(item => {
            if(item.recipient === data.Username) {
              sum += item.amount;
              trans.push(item)
            }
          });
          setBalance(sum)
          setTransactions(trans)
        })
      })
      .catch(err => console.log(err))
  }
  return (
     <Wrapper>
      <Card>
      <h1>Block Chain Wallet</h1>
     
       <Form onSubmit={handleSubmit(onSubmit)}>
       <label id="minerId" >
          Enter A User Name: 
         <select name="Username" ref={register}>
          <option value="mike_harley">mike_harley</option>  
          <option value="lc-carrier">lc-carrier</option>  
          <option value="josh-fowlkes">josh-fowlkes</option>  
          </select>
         </label>
         <Button type="submit">Submit</Button>
       </Form>
       {/* </Card>
       <Card id="userBalance"> */}
          <p>Total amount for {user.Username}: {balance} </p>
          <h3>Total Transactions for {user.Username}</h3>
          {transactions.map(item => {
            if (item.recipient === user.Username){
              return (
                <>
                    <p>Amount: {item.amount}</p>
                    <p>Recipient: {item.recipient}</p>
                    <p>Sender: {item.sender}</p>
                </>
              );
            }
          })}
       </Card>
     </Wrapper>
  );
}

export default App;
