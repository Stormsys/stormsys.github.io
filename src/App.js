import React from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
