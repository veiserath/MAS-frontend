import './App.css';
import CarsPanel from './components/CarsPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import DamagesPanel from './components/DamagesPanel';
import TechnicianPanel from './components/TechnicianPanel';

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route index path='/' element={<CarsPanel />} > </Route>
                <Route index path='/carDamages' element={<DamagesPanel />} > </Route>
                <Route index path='/technicianPanel' element={<TechnicianPanel />} > </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
