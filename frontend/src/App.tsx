import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupForm from "./features/authentication/SignupForm";
import Repertuar from "./pages/Repertuar";
import Booking from "./pages/Booking";
import Reservations from "./pages/Reservations";
import ProtectedRoute from "./ui/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate replace to="home" />} />
                        <Route path="home" element={<Home />} />
                        <Route path="repertuar" element={<Repertuar />} />
                        <Route path="booking/:movieId/:showtimeId" element={<Booking />} />
                        <Route path="reservations" element={<Reservations />} />
                        <Route path="admin" element={<AdminPanel />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignupForm />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "var(--color-grey-700)",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
