import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  // here we now(after introducing React Context use) have 2 ways of CONSUMING context:

  // 1) We can use AuthContext.Consumer. In this case the syntax is like this:
  // return (
  //   <AuthContext.Consumer>
  //     {(ctx) => {
  //       return (
  //         <nav className={classes.nav}>
  //           <ul>
  //             {ctx.isLoggedIn && (
  //               <li>
  //                 <a href="/">Users</a>
  //               </li>
  //             )}
  //             {ctx.isLoggedIn && (
  //               <li>
  //                 <a href="/">Admin</a>
  //               </li>
  //             )}
  //             {ctx.isLoggedIn && (
  //               <li>
  //                 <button onClick={props.onLogout}>Logout</button>
  //               </li>
  //             )}
  //           </ul>
  //         </nav>
  //       );
  //     }}
  //   </AuthContext.Consumer>
  // );

  // 2) we can use useContext HOOK and in this case code looks much more concise!
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
