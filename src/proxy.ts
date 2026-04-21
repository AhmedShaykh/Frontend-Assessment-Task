import { NextRequest, NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "./lib/routes";

function isTokenExpired(token: string): boolean {

    try {

        const payloadPart = token.split(".")[1];

        const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString());

        if (!payload.exp) return true;

        const now = Math.floor(Date.now() / 1000);

        return payload.exp < now;

    } catch {

        return true;

    }

};

export function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const token = request.cookies.get("token")?.value;

    const isPublicRoute = publicRoutes.includes(pathname);

    const isAuthRoute = authRoutes.includes(pathname);

    if (token && isTokenExpired(token)) {

        const response = NextResponse.redirect(new URL("/login?expired=true", request.url));

        response.cookies.delete("token");

        return response;
    }

    if (isPublicRoute) {

        if (token) {

            return NextResponse.redirect(new URL("/dashboard", request.url));

        }

        return NextResponse.next();

    }

    if (isAuthRoute) {

        if (!token) {

            return NextResponse.redirect(new URL("/login", request.url));

        }

        return NextResponse.next();

    }

    return NextResponse.next();

};

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard"
    ]
};