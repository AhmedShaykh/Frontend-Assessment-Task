import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import Login from "@/components/Login";

const LoginPage = () => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        }>
            <Login />
        </Suspense>
    );
};

export default LoginPage;