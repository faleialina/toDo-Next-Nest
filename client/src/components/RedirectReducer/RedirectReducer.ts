import routes from '../Routes/routes'

interface RedirectAction {
  type: 'REDIRECT_HOME' | 'REDIRECT_REGISTRATION';
}

const redirectReducer = (state: string, action: RedirectAction) => {
  switch (action.type) {
    case 'REDIRECT_HOME':
      return routes[0].url;
    case 'REDIRECT_REGISTRATION':
      return routes[2].url;
    default:
      return state;
  }
};

export default redirectReducer;