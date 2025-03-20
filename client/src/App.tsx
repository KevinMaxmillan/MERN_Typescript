import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/Global';

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AppRoutes />
    </>
  );
}

export default App;