import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import AddEvent from './pages/AddEvent';


function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<ExploreEvents />} />
                    <Route path="/add-event" element={<AddEvent />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
