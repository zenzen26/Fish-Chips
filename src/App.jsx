import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollEffects from './components/layout/ScrollEffects';
import DemoTip from './components/layout/DemoTip';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      <ScrollEffects />
      <DemoTip />
    </>
  );
}
