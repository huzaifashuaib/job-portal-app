import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import Job from "./pages/job/Job";
import JobListing from "./pages/jobListing/JobListing";
import MyJobs from "./pages/myJobs/MyJobs";
import OnBoarding from "./pages/onBoardind/OnBoarding";
import PostJobs from "./pages/postJobs/PostJobs";
import SavedJobs from "./pages/savedJobs/SavedJobs";
import { ThemeProvider } from "./components/ui/themeProvider";
import ProtectedRoute from "./components/protectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/job/:id",

        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs-listing",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myjobs",

        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-jobs",

        element: (
          <ProtectedRoute>
            <PostJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/savedJobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <h1>This Page Not exist</h1>,
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
