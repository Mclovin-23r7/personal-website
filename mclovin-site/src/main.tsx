import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Header from './Header.tsx';
import Yaisst from './dumb-projects/yaisst/Yaisst.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yaisst" element={<Yaisst />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
