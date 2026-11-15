import React from "react";
import MotionDirector from "./components/MotionDirector";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Approach from "./components/Approach";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.scss";
export default function App() {
  return (
    <div className="App">
      <MotionDirector />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Hero />
      <main id="main" tabIndex="-1">
        <Projects />
        <Approach />
        <About />
      </main>
      <Footer />
    </div>
  );
}
