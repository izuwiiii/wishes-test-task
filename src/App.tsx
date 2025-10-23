import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./App.css";
import { WishesProvider } from "./context/WishesContext";
import Dashboard from "./pages/Dashboard";
import WishPage from "./pages/WishPage";

function App() {
  return (
    <WishesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wish/:id" element={<WishPage />} />
        </Routes>
      </Router>
    </WishesProvider>
  );
}

export default App;
