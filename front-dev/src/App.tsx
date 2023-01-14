import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/cadastro' element={ <CadastroUsuario /> } />
      </Routes>
    </Router>
  );
}

export default App;
