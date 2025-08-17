import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Form from "./pages/Form.jsx"
import Home from "./pages/Home.jsx";
import Developer from "./pages/Developer.jsx"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"
import Achievements from "./pages/Acheivements.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interns-form" element={<Form />} />
        <Route path="/developers" element={<Developer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
