import { createBrowserHistory } from 'history';

let appHistory: any;

if (typeof window !== 'undefined')
  appHistory = createBrowserHistory({ window });

export default appHistory;
