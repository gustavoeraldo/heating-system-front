import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AiOutlinePieChart, 
  AiOutlineControl,
  BiSearchAlt,
  FaAngleDoubleLeft
} from 'react-icons/all';

import Dashboard from '../dashboard';
import './styles.css';

function Home() {
  
  return (
    <body>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="logo">
          <Link to="/">
            <a href="#test" class="nav-link">
              <span class="link-text logo-text">LMI</span>
              <FaAngleDoubleLeft />
            </a>
          </Link>
          
        </li>
        
        <li class="nav-item">
          <a href="#rere" class="nav-link">
            <AiOutlinePieChart class="svg-inline--fa fa-cat fa-w-16 fa-9x" />
            <span class="link-text">Overview</span>
          </a>
        </li>
        
        <li class="nav-item">
          <Link to="/control">
            <a href="#rere" class="nav-link">
              <AiOutlineControl class="svg-inline--fa fa-cat fa-w-16 fa-9x" />
              <span class="link-text">Control</span>
            </a>
          </Link>
        </li>

        <li class="nav-item">
          <Link to="/control">
            <a href="#erer" class="nav-link">
              <BiSearchAlt class="svg-inline--fa fa-cat fa-w-16 fa-9x" />
              <span class="link-text">Search data</span>
            </a>
          </Link>
          
        </li>
      </ul>
    </nav>

    <main>
      <Dashboard />
    </main>
  </body>
  );
}

export default Home;