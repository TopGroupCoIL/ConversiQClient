import { Button, Modal } from 'antd';
import { useModals } from '../context/modals';
import { useNavigate } from 'react-router-dom';
import { removeAccessTokenFromCookie } from '../utils';
import { LOGIN_PATH } from '../const';
import { useAuthContext } from '../context/auth';

export const LogoutModal = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const { showLogoutModal, closeModal } = useModals();

  const onLogout = () => {
    removeAccessTokenFromCookie();

    setUser(null);

    navigate(LOGIN_PATH, { state: { logout: true } });

    closeModal();
  };

  return (
    <Modal
      open={showLogoutModal}
      key={showLogoutModal ? 'openLogoutModal' : 'closedLogoutModal'}
      onCancel={() => closeModal()}
      onOk={onLogout}
      title="Are you sure you want to logout?"
      footer={[
        <Button
          key="back"
          onClick={() => {
            closeModal();
          }}
        >
          Go back
        </Button>,
        <Button
          key="logout"
          type="primary"
          danger
          onClick={onLogout}
          className="font-inter"
        >
          Logout
        </Button>,
      ]}
    />
  );
};
