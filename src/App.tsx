import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Consultation } from './pages/Consultation';
import { useEffect } from 'react';
import { Contact } from './pages/Contact';
import { LanguageProvider } from './contexts/LanguageContext';

function ScrollToPage() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ScrollToPage />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultation/:serviceId" element={<Consultation />} />
            <Route path="/packs" element={<Navigate to="/#services" replace />} />
            <Route path="/payment" element={<Navigate to="/#services" replace />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
