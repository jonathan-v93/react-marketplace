import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { ItemList } from "./components/ItemList";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SellForm } from "./components/SellForm";
import { User } from "./components/User";
import { useState } from "react";
import { UserContext } from "../src/contexts/UserLogin";
import { BasketContext } from "../src/contexts/Basket";
import { PurchaseHistoryContext } from "../src/contexts/PurchaseHistory";
import { Basket } from "./components/Basket";
import { PurchaseHistory } from "./components/PurchaseHistory";
import { UserList } from "./components/UserList";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [basketDetails, setBasketDetails] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <BasketContext.Provider value={{ basketDetails, setBasketDetails }}>
        <PurchaseHistoryContext.Provider
          value={{ purchaseHistory, setPurchaseHistory }}
        >
          <BrowserRouter>
            <div className="App">
              <Header />
              <NavBar />
              <Routes>
                <Route path="/" element={<ItemList />} />
                <Route path="/user" element={<User />} />
                <Route path="/sell" element={<SellForm />} />
                <Route path="/user/basket" element={<Basket />} />
                <Route
                  path="/user/purchaseHistory"
                  element={<PurchaseHistory />}
                />
                <Route path="/user/userList" element={<UserList />} />
              </Routes>
            </div>
          </BrowserRouter>
        </PurchaseHistoryContext.Provider>
      </BasketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
