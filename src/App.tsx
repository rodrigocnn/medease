import { BrowserRouter } from 'react-router-dom';
import Links from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@inovua/reactdatagrid-community/index.css';

import ContextProvider from './contexts';
import { AppProvider } from './shared/contexts/AppContext';

function App() {
  return (
    <ContextProvider>
      <AppProvider>
        <BrowserRouter>
          <ToastContainer theme="colored" />
          <Links />
        </BrowserRouter>
      </AppProvider>
    </ContextProvider>
  );
}

export default App;
