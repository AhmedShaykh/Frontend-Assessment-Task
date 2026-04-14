"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/schema";
import { BACKEND_API } from "@/lib/services";
import { setLogin } from "@/store/authSlice";
import { useAppDispatch } from "@/store";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = ({ className, ...props }: React.ComponentProps<"div">) => {

    const dispatch = useAppDispatch();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {

        try {

            const response = await fetch(`${BACKEND_API}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const result: any = await response.json();

            if (!response.ok) {

                throw new Error(result.message || "Registration Failed");

            }

            Cookies.set("token", result.access_token, { secure: true });

            dispatch(
                setLogin({
                    token: result.access_token,
                    name: result.name || result.user?.name || ""
                })
            );

            toast.success("Account Created Successfully!");

            reset();

            router.push("/dashboard");

            router.refresh();

        } catch (error: any) {

            toast.error(error.message || "Something went wrong. Please try again.");

        }

    };

    return (
        <div
            className={cn("min-h-screen px-4 flex items-center justify-center", className)}{...props}
        >
            <div className="flex flex-col gap-6 w-full max-w-md">
                <Card className="py-8">
                    <CardHeader>
                        <CardTitle className="text-2xl mb-4">
                            Create your account
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>

                                    <Input
                                        id="fullName"
                                        placeholder="John Doe"
                                        {...register("fullName")}
                                    />

                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        {...register("email")}
                                    />

                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="phone">Phone</FieldLabel>

                                    <Input
                                        id="phone"
                                        placeholder="03001234567"
                                        {...register("phone")}
                                    />

                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="******"
                                        {...register("password")}
                                    />

                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <Button
                                        type="submit"
                                        className="w-full font-bold py-5 cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Loading..." : "Register"}
                                    </Button>

                                    <div className="text-center mt-4 text-sm">
                                        Already have an account?{" "}

                                        <span
                                            onClick={() => router.push("/login")}
                                            className="text-blue-500 cursor-pointer hover:underline"
                                        >
                                            Login
                                        </span>
                                    </div>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;