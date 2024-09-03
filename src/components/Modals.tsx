import {
  CorrectExpressionModal,
  LogoutModal,
  SaveChatModal,
  UpdateChatNameModal,
  CreateNewChatModal,
} from '../modals';

export const Modals = () => (
  <>
    <SaveChatModal />
    <UpdateChatNameModal />
    <CreateNewChatModal />
    <CorrectExpressionModal />
    <LogoutModal />
  </>
);
