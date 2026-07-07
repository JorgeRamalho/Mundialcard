import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTopButton from "./components/BackToTopButton";
import PageWayfinding from "./components/PageWayfinding.jsx";
import CookieConsent from "./components/CookieConsent";
import DevAccessBar from "./components/DevAccessBar.jsx";
import { initAuth } from "./lib/clientSession.js";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import ClientArea from "./pages/ClientArea";
import PartnerArea from "./pages/PartnerArea";
import Atendimento from "./pages/Atendimento";
import Agendamento from "./pages/Agendamento";
import Produtos from "./pages/Produtos";
import AppDownload from "./pages/AppDownload";
import ConsultaDigital from "./pages/ConsultaDigital";
import PoliticaCookies from "./pages/PoliticaCookies";

export default function App() {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <HashRouter>
      <ScrollManager />
      <Navbar />
      <PageWayfinding />
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
          <Route path="/consulta-digital" element={<ConsultaDigital />} />
          <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppButton />
      <CookieConsent />
      <DevAccessBar />
    </HashRouter>
  );
}
