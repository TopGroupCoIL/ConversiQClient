import {
  CorrectExpressionModal,
  LogoutModal,
  SaveChatModal,
  UpdateChatNameModal,
  CreateNewChatModal,
  DeleteChatModal,
} from '../modals';

export const Modals = () => (
  <>
    <SaveChatModal />
    <UpdateChatNameModal />
    <DeleteChatModal />
    <CreateNewChatModal />
    <CorrectExpressionModal />
    <LogoutModal />
  </>
);
