import { Routes, Route } from "react-router-dom";

import Login          from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout      from "../components/layout/AppLayout";
import NavOnlyLayout  from "../components/layout/NavOnlyLayout";
import Dashboard      from "../pages/Dashboards";
import TestCreation   from "../pages/TestCreation";   // "Are you ready?" landing
import CreateTest     from "../pages/CreateTest";      // test creation form
import AddQuestions   from "../pages/AddQuestions";    // question builder
import Preview        from "../pages/Preview";         // preview & publish page
import EditTest       from "../pages/EditTest";        // edit test metadata

function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Login />} />

            {/* Protected — main pages with full sidebar */}
            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard"              element={<Dashboard />} />
                <Route path="/tests"                  element={<TestCreation />} />
                <Route path="/tests/create"           element={<CreateTest />} />
                <Route path="/tests/:testId/edit"     element={<EditTest />} />
            </Route>

            {/* Protected — question/preview pages with NO left sidebar (they have their own) */}
            <Route
                element={
                    <ProtectedRoute>
                        <NavOnlyLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/tests/:testId/questions" element={<AddQuestions />} />
                <Route path="/tests/:testId/preview"   element={<Preview />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
