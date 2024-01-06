import React, { useEffect } from 'react';
import './App.scss';
const trianglify = require('trianglify')

function App() {   

  useEffect(() => {
    const svgElement = trianglify({
      width: 1920,
      height: 4000,
      cellSize: 70,
      seed: 'stormsys.net',
      colorFunction: trianglify.colorFunctions.sparkle(0.05),
      palette: {stormsys: ['#7e7758', '#afa98d', '#d9d6c9', '#7e7758'] }
    }).toSVGTree().toString();

    const encodedData = window.btoa(svgElement);
    const dataUrl = 'data:image/svg+xml;base64,' + encodedData;

    document.body.style.backgroundImage = `url('${dataUrl}')`;
  }, []);
  return (
    <div className="App">
      <div className="fullscreen">
        <div className="center-screen">
          <h1 className="name">Diogo Moura</h1>
          <div className="sub-text">
            <a href="https://uk.linkedin.com/in/diogomoura1" rel="noreferrer" target="_blank" alt="linked in">
              <i className="fa fa-linkedin-square fa-fw"/>
            </a>
            <a href="https://github.com/stormsys" rel="noreferrer" target="_blank" alt="github">
              <i className="fa fa-github-square fa-fw"/>
            </a>
            <a href="/cv" rel="noreferrer" target="_blank" alt="CV">
              <i className="fa fa-envelope-square fa-fw"/>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
