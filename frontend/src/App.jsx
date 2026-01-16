import React from 'react'; // Deployment v1.0.2 - Event Joining Live
import { Toaster } from 'react-hot-toast';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import AddEvent from './pages/AddEvent';
import JoinedEvents from './pages/JoinedEvents';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';





function App() {
    return (
        <Router>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<ExploreEvents />} />
                    <Route path="/my-events" element={<JoinedEvents />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/edit-event/:id" element={<EditEvent />} />
                    <Route path="/events/:id" element={<EventDetails />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
