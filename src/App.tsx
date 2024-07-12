import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main_container">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
