import { Sidebar } from './components/sidebar';
import { BrowserRouter } from 'react-router-dom';
import Links from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@inovua/reactdatagrid-community/index.css';
import { useState } from 'react';
import ContextProvider from './contexts';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <ContextProvider>
      <BrowserRouter>
        <ToastContainer theme="colored" />

        {login ? (
          <div className="grid grid-cols-6 ">
            <div className="col-span-1 ">
              <Sidebar />
            </div>
            <div className="col-span-5">
              <div className="bg-[#01d8da] p-5">Barra Superior</div>
              <main>
                <Links />
              </main>
            </div>
          </div>
        ) : (
          <main>
            <Links />
          </main>
        )}
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
