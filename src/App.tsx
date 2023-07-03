import { BrowserRouter } from 'react-router-dom';
import Links from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@inovua/reactdatagrid-community/index.css';

import ContextProvider from './contexts';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <ToastContainer theme="colored" />
        <Links />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
