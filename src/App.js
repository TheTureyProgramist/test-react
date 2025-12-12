import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
import { Modal } from './components/Modal/Modal.jsx';
import { Backdrop } from './components/Backdrop/Backdrop.jsx';
const Button = styled.button`

`
class App extends Component {
  render () {
  return (
    <div className="App">
      <Button>Click me</Button>
      <div className='backdrop'>
         <div className='modal'>
            <div className='modal-content'>
              <ul className='list'>
              <li className='item'>
              <p>hI</p>
              </li>          
                  </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
}
export default App;