import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import Register from "@/components/Register";

const RegisterPage = () => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        }>
            <Register />
        </Suspense>
    );
};

export default RegisterPage;