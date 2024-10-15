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

export type DataSource = {
  cube: string;
  database: string;
  defaultMeasure: string | null;
  description: string;
  name: string;
  server: string;
  tenant: string;
};

export type DataSourceMeasure = {
  caption: string;
  uName: string | null;
};

export type CustomerUser = {
  name: string;
  id: string;
  alias: string;
  tenant: string;
  isAdmin: boolean;
  picture: string | null;
  dataSources: string[];
  dbUserName?: null;
  dbPassword?: null;
};

export type SavedChat = {
  id: string;
  name: string;
};

export type Chat = {
  id: string;
  name: string;
  history: ChatHistory[];
  isHistorySaved: boolean;
};

export type ChatHistory = {
  question: Question;
  answer?: Answer;
  date?: number;
};

export enum QuestionType {
  start = 'start',
  main_question = 'main_question',
  next = 'next',
  back = 'back',
  get_all = 'get_all',
  found = 'found',
  correction = 'correction',
  cancel = 'cancel',
  continue_conversation = 'continue_conversation',
  restore_conversation = 'restore_conversation',
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
  move_to_main = 'move_to_main',
  restore_conversation = 'restore_conversation',
  select_option = 'select_option',
  result = 'result',
  end = 'end',
  continue = 'continue',
  error = 'error',
}

export type AnswerGrid = {
  presentationType: PresentationType;
  description: string;
  columns: string[];
  rows: string[];
  data: { formattedValue: string; value: string }[][];
  cornerInfo?: string;
};

export type Answer = {
  type: AnswerType;
  question: string;
  target: null;
  options: string[];
  history: ChatHistory[];
  selected: string[];
  selectedQuestionType: QuestionType | null;
  multiSelection: boolean;
  showNext: boolean;
  showBack: boolean;
  showCorrectExpression: boolean;
  showCancel: boolean;
  showExpressionFound: boolean;
  showAll: boolean;
  grid: AnswerGrid;
  error: null;
  debugInfo: string | null;
};

export type AnswerToolbar = {
  isDisabled: boolean;
  selectedQuestionType: QuestionType | null;
  showAll?: boolean;
  showBack?: boolean;
  showCancel?: boolean;
  showCorrectExpression?: boolean;
  showUseThis?: boolean;
  showGoLower?: boolean;
  disableExpressionFound?: boolean;
  onShowAllClick: () => void;
  onBackClick: () => void;
  onCancelClick: () => void;
  onCorrectionClick: () => void;
  onUseThisClick: () => void;
  onGoLowerClick: () => void;
};

export enum PresentationType {
  grid = 'grid',
  column_chart = 'column chart',
  bar_chart = 'bar chart',
  line_chart = 'line chart',
  pie_chart = 'pie chart',
}

export enum ActionType {
  share = 'share',
  export = 'export',
}
