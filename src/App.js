import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // the naive approach for checking localStorage and updating component state based on what's inside localStorage
  // is not going to work as we probably expect because this code will run in an INDEFINITE loop:
  // get value from localStorage -> "true" -> call 'setIsLoggedIn' -> component state update scheduled -> this code run again.
  // So basically we need a way of calling this ONLY when we need it and not on every component rerender.
  // const storedLoggingValue = localStorage.getItem("isLoggedIn");
  // if (storedLoggingValue === "true") {
  //   setIsLoggedIn(true);
  // }

  useEffect(() => {
    // useEffect is basically an ADVANCED IF CONDITION TIED TO DEPENDENCIES ARRAY
    // we don't wanna run it on every rerender/reevaluation of component but only when we RESTART the app (that's the whole point
    // of using localStorage to make login information persist between application runs) - that's why dependencies array is EMPTY
    const storedLoggingValue = localStorage.getItem("isLoggedIn");

    if (storedLoggingValue === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
