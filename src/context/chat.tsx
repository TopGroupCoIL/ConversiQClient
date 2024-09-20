import React, {
  useContext,
  useReducer,
  useCallback,
  createContext,
} from 'react';
import { Answer, Chat, ChatHistory, Question, SavedChat } from '../types';

type IChatState = {
  isLoading: boolean;
  currentChat: Chat | null;
  savedChats: SavedChat[];
};

const initialChatState = {
  isLoading: false,
  currentChat: null,
  savedChats: [],
};

interface IAction {
  payload:
    | Question
    | Answer
    | ChatHistory
    | Chat
    | SavedChat
    | SavedChat[]
    | string
    | boolean
    | null;
  type: string;
}

export interface IChatContext extends IChatState {
  setChatLoading: (isLoading: boolean) => void;
  setCurrentChat: (chat: Chat) => void;
  startNewChat: (chatName?: string) => void;
  setQuestion: (question: Question) => void;
  setAnswer: (answer: Answer) => void;
  updateChatName: (newName: string) => void;
  saveChat: (savedChat: SavedChat) => void;
  setSavedChats: (savedChats: SavedChat[]) => void;
  deleteSavedChat: (chatId: string) => void;
  clearChat: () => void;
  selectOption: (selectedItems: string) => void;
}

const ChatContext = createContext<IChatContext | null>(null);

export const CONTEXT_ERROR_MESSAGE = 'useChat must be used within ChatProvider';

export const SET_CHAT_LOADING = 'SET_CHAT_LOADING';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const START_NEW_CHAT = 'START_NEW_CHAT';
export const SET_QUESTION = 'SET_QUESTION';
export const SET_ANSWER = 'SET_ANSWER';
export const UPDATE_CHAT_NAME = 'UPDATE_CHAT_NAME';
export const SAVE_CHAT = 'SAVE_CHAT';
export const SET_SAVED_CHATS = 'SET_SAVED_CHATS';
export const DELETE_SAVED_CHAT = 'DELETE_SAVED_CHAT';
export const CLEAR_CHAT = 'CLEAR_CHAT';

export const SELECT_ITEM = 'SELECT_ITEM';

const chatReducer = (state: IChatState, action: IAction): IChatState => {
  switch (action.type) {
    case SET_CHAT_LOADING: {
      const isLoading = action.payload as boolean;

      return {
        ...state,
        isLoading,
      };
    }
    case SET_CURRENT_CHAT: {
      const chat = action.payload as Chat;

      return {
        ...state,
        currentChat: chat,
      };
    }
    case START_NEW_CHAT: {
      const chatName = action.payload;

      if (!chatName) {
        return { ...state, currentChat: null };
      }

      return {
        ...state,
        // currentChat: state.savedChats.find((chat) => chat.name === chatName)!,
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
            isHistorySaved: false,
          },
        };
      }

      const history = state.currentChat.history.map((val, index) => {
        if (index !== state.currentChat!.history.length - 1) {
          return val;
        }

        return {
          ...val,
          answer: val.answer
            ? {
                ...val.answer,
                selectedQuestionType: question.type,
              }
            : undefined,
        };
      });

      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          history: [...history, { question }],
          isHistorySaved: false,
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
        savedChats: state.savedChats.map((chat) => {
          if (chat.name === state.currentChat?.name) {
            return { ...chat, name };
          }

          return chat;
        }),
      };
    }
    case SAVE_CHAT: {
      const savedChat = action.payload as SavedChat;

      return {
        ...state,
        currentChat: {
          ...state.currentChat!,
          name: savedChat.name,
          id: savedChat.id,
          isHistorySaved: true,
        },
        savedChats: state.savedChats.find(({ id }) => id === savedChat.id)
          ? state.savedChats
          : [...state.savedChats, savedChat],
      };
    }
    case SET_SAVED_CHATS: {
      const savedChats = action.payload as SavedChat[];

      return {
        ...state,
        savedChats,
      };
    }
    case DELETE_SAVED_CHAT: {
      const chatId = action.payload as string;

      return {
        ...state,
        currentChat:
          state.currentChat?.id === chatId ? null : state.currentChat,
        savedChats: state.savedChats.filter(({ id }) => id != chatId),
      };
    }
    case CLEAR_CHAT: {
      return {
        ...state,
        currentChat: {
          ...state.currentChat!,
          history: [],
        },
      };
    }
    default:
      return state;
  }
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatState, chatDispatch] = useReducer(chatReducer, initialChatState);

  const isCurrentChatSaved =
    !!chatState.currentChat &&
    !!chatState.savedChats.find(
      (chat) => chat.id === chatState.currentChat?.id,
    );

  const setChatLoading = useCallback((isLoading: boolean) => {
    chatDispatch({ type: SET_CHAT_LOADING, payload: isLoading });
  }, []);

  const setCurrentChat = useCallback((chat: Chat) => {
    chatDispatch({ type: SET_CURRENT_CHAT, payload: chat });
  }, []);

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

  const saveChat = useCallback((savedChat: SavedChat) => {
    chatDispatch({ type: SAVE_CHAT, payload: savedChat });
  }, []);

  const setSavedChats = useCallback((savedChats: SavedChat[]) => {
    chatDispatch({ type: SET_SAVED_CHATS, payload: savedChats });
  }, []);

  const deleteSavedChat = useCallback((chatId: string) => {
    chatDispatch({ type: DELETE_SAVED_CHAT, payload: chatId });
  }, []);

  const clearChat = useCallback(() => {
    chatDispatch({ type: CLEAR_CHAT, payload: null });
  }, []);

  const contextValue = {
    ...chatState,
    isCurrentChatSaved,
    setChatLoading,
    setCurrentChat,
    startNewChat,
    setQuestion,
    setAnswer,
    selectOption,
    updateChatName,
    saveChat,
    deleteSavedChat,
    setSavedChats,
    clearChat,
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
