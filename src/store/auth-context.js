import React, { useEffect, useMemo, useState } from 'react';
import * as PropTypes from 'prop-types';

// we use component-like naming convention although this is not really a component
// but at later stages (when we are really using it) we will wrap components where we need
// this context (state) with this component-ish entity
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

// let's do some refactoring and extract all the AUTH logic
// into a separate component and mix it with Context capabilities.
// as a result we basically get global (app wide) state with value and methods to update this value
export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // useEffect is basically an ADVANCED IF CONDITION TIED TO DEPENDENCIES ARRAY
    // we don't wanna run it on every rerender/reevaluation of component
    // but only when we RESTART the app (that's the whole point
    // of using localStorage to make login information persist between application runs) -
    // that's why dependencies array is EMPTY
    const storedLoggingValue = localStorage.getItem('isLoggedIn');

    if (storedLoggingValue === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const ctx = useMemo(
    () => ({
      isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

// why do we need to define and export context?
// because we wanna be able to import it into and wrap the component which needs this context
// OR simply pass this context into useContext hook
export default AuthContext;
