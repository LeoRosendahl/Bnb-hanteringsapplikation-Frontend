import { Routes, Route } from 'react-router-dom'
import ListingPage from './pages/listings';
import './App.css'
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

function App() {
 

  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
