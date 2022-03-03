import { Header } from './components/Header'
import { NavBar } from './components/NavBar'
import {ItemList} from './components/ItemList'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SellForm } from './components/SellForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar />
      <Routes>
          <Route path="/" element={<ItemList />} />
          {/* <Route path="/user" element={<User />} /> */}
          <Route path="/sell" element={<SellForm />} />
        </Routes>
        </div>
    </BrowserRouter>
    
  );
}

export default App;
