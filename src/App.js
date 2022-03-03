import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { ItemList } from "./components/ItemList";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SellForm } from "./components/SellForm";
import { User } from "./components/User";
import { Login } from "./components/Login";
import { useState } from "react";


function App() {
  const [username, setUsername] = useState(null)

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/user" element={<User username={username}/>} />
          <Route path="/sell" element={<SellForm />} />
          <Route path="/user/login" element={<Login setUsername={setUsername}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
