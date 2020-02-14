import React from 'react';
import logo from './logo.svg';
import { Wrapper , Card} from 'bushido-strap'
import './App.scss';

function App() {
  const handleChange = () =>{
    return 
  }
  return (
     <Wrapper>
       <Card>
       <label placeholder="Enter your id:" >
          Enter Your ID: 
        <input type ="text" name="id" value="id" onChange={handleChange()}/>  
         </label>
         <label placeholder="Enter Receiver's Id:" >
            Enter The Receiver's ID:
           <input type="text" name="rec_id" value = "rec_id" onChange={handleChange()} />
           </label>
           <label placeholder = "Enter the Amount:">
           <input type="money" id="amount" value="amount"/>
           </label>
        
       </Card>
     </Wrapper>
  );
}

export default App;
