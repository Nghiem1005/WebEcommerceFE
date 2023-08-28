import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./pages/Container";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./utils/authProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnRequiredAuth  from './utils/UnRequiredAuth';
import RequiredAuth  from './utils/RequiredAuth';
import Login  from './pages/login/Login';

const App = () => {
  const client = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RequiredAuth><Container /></RequiredAuth>} />
          <Route path="/login" exact element={<UnRequiredAuth><Login /></UnRequiredAuth>} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
      <ToastContainer position="top-center" autoClose={1000}/>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
