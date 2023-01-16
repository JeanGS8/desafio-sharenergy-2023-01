import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import ListagemUsuarios from './pages/ListagemUsuarios/ListagemUsuarios';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './componentes/estaticos/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div style={{minHeight: 'calc(100vh - 64px)', paddingTop: '64px'}}>
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/cadastro' element={ <CadastroUsuario /> } />
            <Route path='/usuarios' element={ <ListagemUsuarios /> } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
