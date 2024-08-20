import React, {
  useContext,
  useReducer,
  useCallback,
  createContext,
} from 'react';
import { Answer, Chat, ChatHistory, Question } from '../types';

type IChatState = {
  currentChat: Chat | null;
  isCurrentChatSaved: boolean;
  chats: Chat[];
};

const initialChatState = {
  currentChat: null,
  isCurrentChatSaved: false,
  chats: [],
};

interface IAction {
  payload: Question | Answer | ChatHistory | string | null;
  type: string;
}

export interface IChatContext extends IChatState {
  startNewChat: (chatName?: string) => void;
  setQuestion: (question: Question) => void;
  setAnswer: (answer: Answer) => void;
  updateChatName: (newName: string) => void;
  saveChat: () => void;
  selectOption: (selectedItems: string) => void;
}

const ChatContext = createContext<IChatContext | null>(null);

export const CONTEXT_ERROR_MESSAGE = 'useChat must be used within ChatProvider';

export const START_NEW_CHAT = 'START_NEW_CHAT';
export const SET_QUESTION = 'SET_QUESTION';
export const SET_ANSWER = 'SET_ANSWER';
export const UPDATE_CHAT_HISTORY = 'UPDATE_CHAT_HISTORY';
export const UPDATE_CHAT_NAME = 'UPDATE_CHAT_NAME';
export const SAVE_CHAT = 'SAVE_CHAT';

export const SELECT_ITEM = 'SELECT_ITEM';

const chatReducer = (state: IChatState, action: IAction): IChatState => {
  switch (action.type) {
    case START_NEW_CHAT: {
      const chatName = action.payload;

      if (!chatName) {
        return { ...state, currentChat: null };
      }

      return {
        ...state,
        currentChat: state.chats.find((chat) => chat.name === chatName)!,
      };
    }
    case SET_QUESTION: {
      const question = action.payload as Question;

      if (!state.currentChat) {
        return {
          ...state,
          currentChat: {
            id: 'newChat',
            name: question.value!,
            history: [{ question }],
          },
        };
      }

      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          history: [...state.currentChat.history, { question }],
        },
      };
    }
    case SET_ANSWER: {
      const answer = action.payload as Answer;

      return {
        ...state,
        currentChat: {
          ...state.currentChat!,
          history: state.currentChat!.history.map((history, index) => {
            if (index !== state.currentChat!.history.length - 1) {
              return history;
            }

            return {
              ...history,
              answer,
            };
          }),
        },
      };
    }
    case UPDATE_CHAT_HISTORY:
      return {
        ...state,
        currentChat: {
          id: 'newChat',
          name: 'New chat',
          history: state.currentChat
            ? [...state.currentChat.history, action.payload as ChatHistory]
            : [action.payload as ChatHistory],
        },
      };
    case SELECT_ITEM: {
      const selectedOption = action.payload as string;

      const currentChatHistoryLength = state.currentChat!.history.length;

      return {
        ...state,
        currentChat: {
          ...state.currentChat!,
          history: state.currentChat!.history.map((chatHistory, index) => {
            if (index !== currentChatHistoryLength - 1) {
              return chatHistory;
            }

            const isMultiSelection = chatHistory.answer!.multiSelection;

            let selectedOptions = chatHistory.answer!.selected;

            if (selectedOptions.includes(selectedOption)) {
              selectedOptions = selectedOptions.filter(
                (option) => option !== selectedOption,
              );
            } else {
              selectedOptions = isMultiSelection
                ? [...selectedOptions, selectedOption]
                : [selectedOption];
            }

            return {
              ...chatHistory,
              answer: { ...chatHistory.answer!, selected: selectedOptions },
            };
          }),
        },
      };
    }
    case UPDATE_CHAT_NAME: {
      const name = action.payload as string;

      return {
        ...state,
        currentChat: { ...state.currentChat!, name },
        chats: state.chats.map((chat) => {
          if (chat.name === state.currentChat?.name) {
            return { ...chat, name };
          }

          return chat;
        }),
      };
    }
    case SAVE_CHAT:
      return {
        ...state,
        chats: [...state.chats, state.currentChat!],
      };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatState, chatDispatch] = useReducer(chatReducer, initialChatState);

  // const updateChatHistory = useCallback(
  //   (chatHistory: ChatHistory) =>
  //     chatDispatch({
  //       type: UPDATE_CHAT_HISTORY,
  //       payload: chatHistory,
  //
  //   [],
  // );

  const isCurrentChatSaved =
    !!chatState.currentChat &&
    !!chatState.chats.find((chat) => chat.name === chatState.currentChat?.name);

  const startNewChat = useCallback((chatName?: string) => {
    chatDispatch({ type: START_NEW_CHAT, payload: chatName || null });
  }, []);

  const setQuestion = useCallback((question: Question) => {
    chatDispatch({ type: SET_QUESTION, payload: question });
  }, []);

  const setAnswer = useCallback((answer: Answer) => {
    chatDispatch({ type: SET_ANSWER, payload: answer });
  }, []);

  const selectOption = useCallback((selectedItem: string) => {
    chatDispatch({
      type: SELECT_ITEM,
      payload: selectedItem,
    });
  }, []);

  const updateChatName = useCallback(
    (newName: string) =>
      chatDispatch({ type: UPDATE_CHAT_NAME, payload: newName }),
    [],
  );

  const saveChat = useCallback(() => {
    chatDispatch({ type: SAVE_CHAT, payload: null });
  }, []);

  const contextValue = {
    ...chatState,
    isCurrentChatSaved,
    startNewChat,
    setQuestion,
    setAnswer,
    selectOption,
    updateChatName,
    saveChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  return context;
};
