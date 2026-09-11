import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Projects from "./pages/Projects";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/projects" element={<Projects />} />
                {/* <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/projects/:id/edit" element={<EditProject />} />
                <Route path="/projects/:id" element={<ProjectDetails />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App
