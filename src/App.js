import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="fullscreen">
        <div className="center-screen">
          <h1 className="name">Diogo Moura</h1>
          <div className="sub-text">
            <a href="https://uk.linkedin.com/in/diogomoura1" target="_blank" alt="linked in">
              <i className="fa fa-linkedin-square fa-fw"/>
            </a>
            <a href="https://github.com/stormsys" target="_blank" alt="github">
              <i className="fa fa-github-square fa-fw"/>
            </a>
            <a href="/cv" target="_blank" alt="CV">
              <i className="fa fa-envelope-square fa-fw"/>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
