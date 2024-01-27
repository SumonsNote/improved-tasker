import { useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/task/TaskBoard";
import { TaskContext, searchContext } from "./context";
import { initialState, taskReducer } from "./reducers/TaskReducer";
export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <HeroSection />
        <searchContext.Provider value={{ searchValue, setSearchValue }}>
          <TaskContext.Provider value={{ state, dispatch }}>
            <TaskBoard />
            <ToastContainer />
          </TaskContext.Provider>
        </searchContext.Provider>
      </div>
      <Footer />
    </>
  );
}
