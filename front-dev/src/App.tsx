import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './componentes/estaticos/Navbar';
import Cadastro from './pages/Cadastro/Cadastro';
import Usuarios from './pages/Usuarios/Usuarios';
import Gatos from './pages/Gatos/Gatos';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div style={{minHeight: 'calc(100vh - 64px)', paddingTop: '64px'}}>
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/cadastro' element={ <Cadastro /> } />
            <Route path='/usuarios' element={ <Usuarios /> } />
            <Route path='/gatos' element={ <Gatos /> } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
