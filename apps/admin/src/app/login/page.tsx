"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Waves, Loader2 } from "lucide-react";
import Link from "next/link";
import { login } from "./actions";

const initialState = {
  success: false,
  error: undefined,
  field: undefined,
};

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, initialState);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  const getFieldError = (field: string) => {
    if (state?.field === field && state?.error) {
      return state.error;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center mb-4">
            <img src="/logo.png" alt="Mambo Jambo Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tighter">Admin Login</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Mambo Jambo Management</p>
        </div>

        <div className="border-2 border-black bg-white p-8 space-y-6">
          <form action={action}>
            <div className="space-y-2">
              <label className="font-display text-xs uppercase tracking-widest block">Email Address</label>
              <input
                name="email"
                type="email"
                className={`w-full border-2 border-black p-3 focus:bg-sand-100 outline-none transition-colors font-sans ${
                  getFieldError("email") ? "border-red-500" : ""
                }`}
                placeholder="admin@surfschool.com"
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />
              {touched.email && getFieldError("email") && (
                <p className="text-red-500 text-sm font-sans">{getFieldError("email")}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-display text-xs uppercase tracking-widest block">Password</label>
              <input
                name="password"
                type="password"
                className={`w-full border-2 border-black p-3 focus:bg-sand-100 outline-none transition-colors font-sans ${
                  getFieldError("password") ? "border-red-500" : ""
                }`}
                placeholder="••••••••"
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              />
              {touched.password && getFieldError("password") && (
                <p className="text-red-500 text-sm font-sans">{getFieldError("password")}</p>
              )}
            </div>

            {!state?.success && state?.error && !state.field && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-sans">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="block w-full bg-black text-white p-4 font-display text-center uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-display text-xs uppercase tracking-widest opacity-40">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
