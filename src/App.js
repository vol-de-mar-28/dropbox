import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Router from './routes';
import Loader from './components/Loader';
import ConfirmationModal from './components/ConfirmationModal';
import CreateFolderModal from './components/Forms/CreateFolderModal';
import MoveFolderModal from './components/Forms/MoveFolderModal';
import UploadFileModal from './components/Forms/UploadFileModal';
import 'react-toastify/dist/ReactToastify.css';

const getToken = (hash) =>
  hash
    ?.split('&')
    .filter((str) => str.includes('#access_token'))[0]
    .split('=')[1];

function App() {
  const { isActive } = useSelector((store) => store.loader);
  const { isFolderModalOpened, isMoveModalOpened, isUploadModalOpened } =
    useSelector((store) => store.formActions);
  const { hash } = useLocation();

  const token = hash ? getToken(hash) : '';
  if (token) {
    localStorage.setItem('dropboxToken', token);
    return <Navigate to="/" replace />;
  }
  return (
    <div className="App">
      <Layout>
        <Router />
        {isActive && <Loader />}
      </Layout>
      <ToastContainer position="bottom-right" />
      <ConfirmationModal />
      {isFolderModalOpened && <CreateFolderModal />}
      {isMoveModalOpened && <MoveFolderModal />}
      {isUploadModalOpened && <UploadFileModal />}
    </div>
  );
}

export default App;
