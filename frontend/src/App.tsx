import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from "./Component/Home";
import {AddArticle} from "./Component/AddArticle";

function App() {
    return (
        <Router>
            <div>
                <header>
                    <div className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link " aria-current="page" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/add-article">Add Article</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/add-article" element={<AddArticle/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<div>Page Not Found</div>}/>
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;