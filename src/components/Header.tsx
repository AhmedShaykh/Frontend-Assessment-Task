"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/authSlice";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./ModeToggle";

const Header = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const name = useAppSelector((state) => state.auth.name);

    const handleLogOut = async () => {

        try {

            Cookies.remove("token");

            dispatch(logout());

            router.push("/login");

            router.refresh();

        } catch (error) {

            console.error("Logout Failed:", error);

        }

    };

    return (
        <div className="sticky top-0 z-50 bg-black border-b-2">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    <Link href="/">
                        <Image
                            src="/favicon.ico"
                            alt="Logo"
                            width={180}
                            height={72}
                            className="h-20 w-auto"
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-4 px-3">
                        <h1 className="text-foreground text-lg font-bold text-white">
                            {name}
                        </h1>

                        <Button
                            className="px-3 py-5 text-md cursor-pointer font-medium"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Button>

                        <ModeToggle />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;