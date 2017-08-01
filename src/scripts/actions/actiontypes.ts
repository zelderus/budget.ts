

enum ActionTypes {
  LOG               = 1,
  USER_AUTH         = 2,
  USER_REGISTRATION = 3,
  NAVIGATION_PAGE   = 10,
  NAVIGATION_TAB    = 11,
  NAVIGATION_BACK   = 12,
  LOAD_INIT_DATA    = 20,
  LOADING_START     = 30,
  LOADING_STOP      = 31,
  ERROR_FATAL       = 40,
  ERROR_FATAL_CLOSE = 41,
  
  ACCOUNTS_LOAD             = 100,
  ACCOUNTS_EDIT_SHOW        = 110,
  ACCOUNTS_EDIT_DO          = 111,
  ACCOUNTS_EDIT_DELETE      = 112,
  //ACCOUNTS_EDIT_VALIDATOR   = 113,
  
  TRANSACTIONS_LOAD           = 200,
  TRANSACTIONS_EDIT_SHOW      = 210,
  TRANSACTIONS_EDIT_DO        = 211,
  TRANSACTIONS_EDIT_DELETE    = 212,
  //TRANSACTIONS_EDIT_VALIDATOR = 213,

  CURRENCIES_LOAD   = 300,

  CATEGORIES_LOAD   = 400,
  
  ADD_ITEM          = 950,
  DELETE_ITEM       = 951,

};


export default ActionTypes;