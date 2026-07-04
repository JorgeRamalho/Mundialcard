import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import ClientArea from "./pages/ClientArea";
import PartnerArea from "./pages/PartnerArea";
import Atendimento from "./pages/Atendimento";
import Agendamento from "./pages/Agendamento";
import Produtos from "./pages/Produtos";
import AppDownload from "./pages/AppDownload";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/area-cliente" element={<ClientArea />} />
          <Route path="/parceiros" element={<PartnerArea />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/app" element={<AppDownload />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
