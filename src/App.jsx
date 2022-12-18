import React, { useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  // after extracting AUTH logic into AuthContextProvider component
  // we don't need this state slice here
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // the naive approach for checking localStorage and updating component state
  // based on what's inside localStorage is not going to work as
  // we probably expect because this code will run in an INDEFINITE loop:
  // get value from localStorage -> "true" -> call 'setIsLoggedIn' ->
  // component state update scheduled -> this code run again.
  // So basically we need a way of calling this ONLY when we need it
  // and not on every component rerender.
  // const storedLoggingValue = localStorage.getItem("isLoggedIn");
  // if (storedLoggingValue === "true") {
  //   setIsLoggedIn(true);
  // }

  // after extracting AUTH logic into AuthContextProvider component we don't need this useEffect
  // useEffect(() => {
  //   // useEffect is basically an ADVANCED IF CONDITION TIED TO DEPENDENCIES ARRAY
  //   // we don't wanna run it on every rerender/reevaluation of component
  //   but only when we RESTART the app (that's the whole point
  //   // of using localStorage to make login information persist between application runs)
  //   - that's why dependencies array is EMPTY
  //   const storedLoggingValue = localStorage.getItem("isLoggedIn");
  //
  //   if (storedLoggingValue === "true") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // after extracting AUTH logic into AuthContextProvider component
  // we don't need these functions here
  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   setIsLoggedIn(true);
  //   localStorage.setItem("isLoggedIn", "true");
  // };
  //
  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("isLoggedIn");
  // };

  // return (
  //   // let's say we need the auth-context in all app components:
  //   in this case we wrap everything with AuthContext.Provider
  //   <AuthContext.Provider
  //     // and we pass the state that we want to access later
  //     in some child components in a 'VALUE' prop
  //     value={{
  //       isLoggedIn: isLoggedIn,
  //       onLogout: logoutHandler,
  //     }}
  //   >
  //     {/*<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />*/}
  //     {/* we don't need to pass 'isLoggedIn' prop anymore */}
  //     <MainHeader onLogout={logoutHandler} />
  //     <main>
  //       {!isLoggedIn && <Login onLogin={loginHandler} />}
  //       {isLoggedIn && <Home onLogout={logoutHandler} />}
  //     </main>
  //   </AuthContext.Provider>
  // );

  // after extracting AUTH logic into AuthContextProvider component
  // we don't have to explicitly pass any props anymore
  const ctx = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
