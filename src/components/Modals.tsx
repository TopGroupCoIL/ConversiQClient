import {
  CorrectExpressionModal,
  LogoutModal,
  UpdateChatNameModal,
  CreateNewChatModal,
  DeleteChatModal,
  AddCustomerUserModal,
  EditCustomerUserModal,
  DeleteCustomerUserModal,
} from '../modals';

export const Modals = () => (
  <>
    <UpdateChatNameModal />
    <DeleteChatModal />
    <CreateNewChatModal />
    <CorrectExpressionModal />
    <AddCustomerUserModal />
    <EditCustomerUserModal />
    <DeleteCustomerUserModal />
    <LogoutModal />
  </>
);
