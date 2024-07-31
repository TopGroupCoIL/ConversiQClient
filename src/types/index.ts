export type User = {
  name: string;
  id: string;
  alias: string;
  tenant: string;
  isAdmin: boolean;
  dbUserName: string;
  dbPassword: string;
  picture: string;
  dataSources: string[];
};

export type Admin = {
  name: string;
  id: string;
  alias: string;
};

export type Customer = {
  description: string;
  url: string;
  id: string;
  usersLimit: number;
};

export type CustomerUser = {
  name: string;
  id: string;
  alias: string;
  tenant: string;
  isAdmin: boolean;
  dbUserName: string;
  dbPassword: string;
  picture: string;
  dataSources: string[];
};

export type Chat = {
  id: string;
  name: string;
  history: ChatHistory[];
};

export type ChatHistory = {
  question: Question;
  answer?: Answer;
  date?: number;
};

export enum QuestionType {
  main_question = 'main_question',
  next = 'next',
  back = 'back',
  get_all = 'get_all',
  found = 'found',
  correction = 'correction',
  cancel = 'cancel',
}

export type QuestionPart = {
  name: string;
  isMeasure: boolean;
};

export type Question = {
  type: QuestionType | null;
  value: string | null;
  parts: QuestionPart[] | null;
};

export enum AnswerType {
  select_option = 'select_option',
  result = 'result',
  end = 'end',
  continue = 'continue',
}

export type Answer = {
  type: AnswerType;
  question: string;
  target: null;
  options: string[];
  selected: string[];
  multiSelection: boolean;
  showNext: boolean;
  showBack: boolean;
  showCorrectExpression: boolean;
  showCancel: boolean;
  showExpressionFound: boolean;
  showAll: boolean;
  grid: null;
  error: null;
  debugInfo: string | null;
};
