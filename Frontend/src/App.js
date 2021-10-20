import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import liff from "@line/liff";
import "./main.css";
import "./tailwind.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import { About, Home } from "./Containers";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e9f8f7",
      100: "#cbf7f0",
      200: "#97f2de",
      300: "#56eac8",
      400: "#29e4b7",
      500: "#06c780",
      600: "#06af65",
      700: "#0c9156",
      800: "#107249",
      900: "#105d3e",
    },
  },
});

const App = () => {
  liff.init({
    liffId: "1656554558-Yd6bX586",
  });

  useEffect(() => {
    const isLoginStatus = liff.isLoggedIn();
    if (isLoginStatus === false) {
      console.log("Must handle Login");
      // handle Login
      liff.login({ redirectUri: "https://liff.theduckcreator.in.th/redirect" });
    }
    return () => {};
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>The Duck Creator App </title>
      </Helmet>
      <ChakraProvider theme={theme}>
        <Navbar />
        <div className='min-h-screen m-8'>
          <Router>
            <Switch>
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/documents'></Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>{" "}
          </Router>
        </div>

        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default App;
