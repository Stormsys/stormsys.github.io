import React from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
