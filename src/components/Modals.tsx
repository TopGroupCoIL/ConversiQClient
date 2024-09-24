import {
  CorrectExpressionModal,
  LogoutModal,
  UpdateChatNameModal,
  CreateNewChatModal,
  DeleteChatModal,
} from '../modals';

export const Modals = () => (
  <>
    <UpdateChatNameModal />
    <DeleteChatModal />
    <CreateNewChatModal />
    <CorrectExpressionModal />
    <LogoutModal />
  </>
);
