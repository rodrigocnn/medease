import { BrowserRouter } from 'react-router-dom';
import Links from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@inovua/reactdatagrid-community/index.css';

import ContextProvider from './contexts';
import { ModalProvider } from './shared/contexts/ModalContext';

function App() {
  return (
    <ContextProvider>
      <ModalProvider>
        <BrowserRouter>
          <ToastContainer theme="colored" />
          <Links />
        </BrowserRouter>
      </ModalProvider>
    </ContextProvider>
  );
}

export default App;
