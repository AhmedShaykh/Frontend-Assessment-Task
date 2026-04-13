"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import { Spinner } from "./ui/spinner";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <div className="flex items-center justify-center h-screen">
                        <Spinner />
                    </div>
                }
                persistor={persistor}
            >
                {children}
            </PersistGate>
        </Provider>
    );
};

export default ReduxProvider;