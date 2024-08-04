import React, {
  useContext,
  useReducer,
  useCallback,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';
import { Admin, Customer, CustomerUser } from '../types';
import { FieldType as AdminFieldType } from '../components/Admins/Admins';
import { FieldType as CustomerFieldType } from '../components/Customers/Customers';
import { FieldType as CustomerUserFieldType } from '../components/Customers/CustomerUsers/CustomerUsers';

const initialModalState = {
  showAddAdminModal: false,
  showEditAdminModal: false,
  showDeleteAdminModal: false,
  showAddCustomerModal: false,
  showDeleteCustomerModal: false,
  showAddCustomerUserModal: false,
  showEditCustomerUserModal: false,
  showDeleteCustomerUserModal: false,
  showLogoutModal: false,
};

type IModalState = typeof initialModalState;

interface IAction {
  payload: string;
  type: string;
}

type TActiveItem = {
  admin?: Admin;
  customer?: Customer;
  customerUser?: CustomerUser;
  addAdmin?: (values: AdminFieldType) => void;
  editAdmin?: (values: AdminFieldType) => Promise<Admin | boolean>;
  deleteAdmin?: () => void;
  addCustomer?: (values: CustomerFieldType) => void;
  deleteCustomer?: () => void;
  addCustomerUser?: (values: CustomerUserFieldType) => void;
  editCustomerUser?: (values: AdminFieldType) => Promise<Admin | boolean>;
  deleteCustomerUser?: () => void;
} | null;

export interface IModalsContext<T = TActiveItem> extends IModalState {
  openModal: (modal: string) => void;
  closeModal: (shouldResetItem?: boolean) => void;
  setActiveItem: Dispatch<SetStateAction<TActiveItem>>;
  activeItem: T;
}

const ModalsContext = createContext<IModalsContext | null>(null);

export const CONTEXT_ERROR_MESSAGE =
  'useModals must be used within ModalsProvider';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const modalsReducer = (state: IModalState, action: IAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...initialModalState,
        [`show${action.payload}`]: true,
      };
    case CLOSE_MODAL:
      return initialModalState;
    default:
      return state;
  }
};

export const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalsState, modalsDispatch] = useReducer(
    modalsReducer,
    initialModalState,
  );
  const [activeItem, setActiveItem] = useState<TActiveItem | null>(null);

  const openModal = useCallback(
    (modal: string) =>
      modalsDispatch({
        type: OPEN_MODAL,
        payload: modal,
      }),
    [],
  );

  const closeModal = useCallback((shouldResetItem = true) => {
    modalsDispatch({
      type: CLOSE_MODAL,
      payload: '',
    });

    shouldResetItem && setActiveItem(null);
  }, []);

  const contextValue = {
    ...modalsState,
    activeItem,
    openModal,
    closeModal,
    setActiveItem,
  };

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalsContext);

  if (!context) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  return context;
};
