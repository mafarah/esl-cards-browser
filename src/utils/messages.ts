const messages: { [key: string]: string } = {
  TITLE: 'Elder Scrolls Legends Cards Browser',
  SEARCH_BUTTON_TEXT: 'SEARCH',
  ERROR_LOADING: 'Error getting cards',
  RETRY_BUTTON_TEXT: 'RETRY',
};

export default (key: string) => messages[key];
