import { Sidebar } from './components/sidebar';
import { BrowserRouter } from 'react-router-dom';
import Links from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@inovua/reactdatagrid-community/index.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer theme="colored" />
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
      </BrowserRouter>
    </>
  );
}

export default App;
