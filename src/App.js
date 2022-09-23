import './App.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';

function App() {
  const [isClicked, setIsClicked] = useState();
  return (
      <nav>
        <div className='logo'>
          <span>Jay Shah</span>
        </div>
        <div className='navigation'>
        <ul className={isClicked ? "navbar active" : "navbar"} >
          <li><a href='#'>Home</a></li>
          <li><a href='#'>About</a></li>
          <li><a href='#'>Contact</a></li>
        </ul>
        </div>
        <div className='hamburger'>
        {!isClicked ?  < GiHamburgerMenu onClick={() => setIsClicked(true)} /> : 
         < AiOutlineClose onClick={() => setIsClicked(false)} /> }
         </div>
      </nav>
  );
}

export default App;
