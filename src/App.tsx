import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { dataProvider } from "./providers/data";
// import { Login } from "./pages/login";
// import { Register } from "./pages/register";
// import { ForgotPassword } from "./pages/forgot-password";
import { ErrorComponent } from "./components/refine-ui/layout/error-component";
import { Layout } from "./components/refine-ui/layout/layout";
import { Header } from "./components/refine-ui/layout/header";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { BookOpen, GraduationCap, Home } from "lucide-react";

// Existing classroom portal pages
import Dashboard from "./pages/dashboard";
import SubjectList from "./pages/subjects/list";
import SubjectCreate from "./pages/subjects/create";
import ClassesList from "./pages/classes/list";
import ClassesCreate from "./pages/classes/create";

// Public website components & pages (Phase 1 foundation)
import { PublicLayout } from "./public/components/public-layout";
import { HomePage } from "./public/pages/home";
import { AboutPage } from "./public/pages/about";
import { AcademicsPage } from "./public/pages/academics";
import { CampusPage } from "./public/pages/campus";
import { StudentLifePage } from "./public/pages/student-life";
import { AdmissionsPage } from "./public/pages/admissions";
import { ContactPage } from "./public/pages/contact";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "tbC1Av-Esr2yx-6Kbzzr",
                title: {
                  text: "Classroom Portal",
                  icon: <GraduationCap className="h-5 w-5 text-primary" />,
                },
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/portal",
                  meta: { label: "Dashboard", icon: <Home /> },
                },
                {
                  name: "subjects",
                  list: "/portal/subjects",
                  create: "/portal/subjects/create",
                  meta: { label: "Subjects", icon: <BookOpen /> },
                },
                {
                  name: "classes",
                  list: "/portal/classes",
                  create: "/portal/classes/create",
                  meta: { label: "Classes", icon: <GraduationCap /> },
                },
              ]}
            >
              <Routes>
                {/* Public Website Routes (Completely separate from Refine portal layout) */}
                <Route element={<PublicLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="academics" element={<AcademicsPage />} />
                  <Route path="campus" element={<CampusPage />} />
                  <Route path="student-life" element={<StudentLifePage />} />
                  <Route path="admissions" element={<AdmissionsPage />} />
                  <Route path="contact" element={<ContactPage />} />
                </Route>

                {/* Refine Classroom Portal Routes */}
                <Route
                  path="portal"
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="subjects">
                    <Route index element={<SubjectList />} />
                    <Route path="create" element={<SubjectCreate />} />
                  </Route>
                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                  </Route>
                </Route>

                {/* Backward-Compatible Redirects for Previous Direct Portal URLs */}
                <Route path="dashboard" element={<Navigate to="/portal" replace />} />
                <Route path="subjects" element={<Navigate to="/portal/subjects" replace />} />
                <Route path="subjects/create" element={<Navigate to="/portal/subjects/create" replace />} />
                <Route path="classes" element={<Navigate to="/portal/classes" replace />} />
                <Route path="classes/create" element={<Navigate to="/portal/classes/create" replace />} />

                {/* Catch-All / 404 Route */}
                <Route path="*" element={<ErrorComponent />} />
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
