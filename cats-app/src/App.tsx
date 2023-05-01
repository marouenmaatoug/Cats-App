import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SingleCatPage from "./Pages/SingleCatPage";
import { BreedProvider } from "./context/context";

const App: React.FC = () => {
    return (
        <div className="App">
            <BreedProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/singlecat/:id" element={<SingleCatPage />} />
                    </Routes>
                </Router>
            </BreedProvider>
        </div>
    );
};

export default App;
