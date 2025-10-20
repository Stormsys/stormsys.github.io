import React, { useEffect, useRef, useState } from "react";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import "./App.scss";

function App() {
  const myRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!vantaEffect && myRef.current) {
      console.log("🌀 Initialising Vanta on:", myRef.current);
      const effect = WAVES({
        el: myRef.current,
        THREE,
        color: 0x7e7758,
        waveHeight: 30,
        waveSpeed: 0.2,
        shininess: 60,
        zoom: 0.7,
        mouseControls: false,
        touchControls: false,
        gyroControls: true,
      });
      console.log("✅ Vanta effect created:", effect);
      setVantaEffect(effect);
      setIsLoaded(true);
    }
  
    return () => {
      if (vantaEffect) {
        console.log("🧹 Destroying Vanta");
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div className="App">
      <div ref={myRef} className="fullscreen">
        <div className={`center-screen ${isLoaded ? "loaded" : "loading"}`}>
          <h1 className="name">Diogo Moura</h1>
          <div className="sub-text">
            <a
              href="https://uk.linkedin.com/in/diogomoura1"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-linkedin fa-fw" aria-hidden="true" />
            </a>
            <a href="https://github.com/stormsys" target="_blank" rel="noreferrer">
              <i className="fa fa-github fa-fw" aria-hidden="true" />
            </a>
            <a href="/cv" target="_blank" rel="noreferrer">
              <i className="fa fa-envelope fa-fw" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;