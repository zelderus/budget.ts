

enum ActionTypes {
  LOG               = 1,
  NAVIGATION_PAGE   = 10,
  NAVIGATION_TAB    = 11,
  NAVIGATION_BACK   = 12,
  LOAD_INIT_DATA    = 20,
  LOADING_START     = 30,
  LOADING_STOP      = 31,
  ERROR_FATAL       = 40,
  ERROR_FATAL_CLOSE = 41,
  
  ACCOUNTS_LOAD     = 100,
  
  TRANSACTIONS_LOAD         = 200,
  TRANSACTIONS_EDIT_SHOW    = 210,
  TRANSACTIONS_EDIT_DO      = 211,
  
  ADD_ITEM          = 950,
  DELETE_ITEM       = 951,

};


export default ActionTypes;