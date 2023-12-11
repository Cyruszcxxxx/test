import React from "react";
import { Provider } from "react-redux";
import RegisterPage from "./RegisterPage";
import store from "./redux/store";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="App">
          <RegisterPage />
        </div>
      </Provider>
  );
};

export default App;