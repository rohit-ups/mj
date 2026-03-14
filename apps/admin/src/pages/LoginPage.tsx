import { useState, useEffect } from "react";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, Zap, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "./loginActions";

const initialState = {
  success: false,
  error: undefined,
  field: undefined,
};

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, initialState);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.success) {
      navigate("/");
    }
  }, [state, navigate]);

  const getFieldError = (field: string) => {
    if (state?.field === field && state?.error) {
      return state.error;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fbf8f1] relative overflow-hidden font-sans">
      <div className="scanlines pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] border-[1px] border-black/5 rotate-12" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] border-[1px] border-black/5 -rotate-12" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-10 relative z-10"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-20 h-20 bg-mj-yellow brutalist-border flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <img src="/logo.png" alt="Mambo Jambo Logo" className="w-14 h-14 object-contain" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">SYSTEM <span className="text-mj-accent">ACCESS</span></h1>
            <p className="font-mono text-[10px] uppercase font-black tracking-[0.3em] opacity-40 italic">Mambo Ops / Secure Gateway v1.0.4</p>
          </div>
        </div>

        <div className="brutalist-border bg-white p-10 space-y-8 brutalist-shadow relative">
          {/* Internal Security Badge */}
          <div className="absolute -top-4 -right-4 bg-mj-black text-white px-3 py-1 font-mono text-[8px] font-black uppercase brutalist-border border-black flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-mj-accent" />
            <span>Encrypted Link</span>
          </div>

          <form action={action} className="space-y-8">
            <div className="space-y-3">
              <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Identity Identifier</label>
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  className={`w-full border-[3px] border-black p-4 bg-[#f5f5f5] focus:bg-white outline-none transition-all font-mono text-xs uppercase ${
                    getFieldError("email") ? "border-red-500" : "focus:border-mj-accent"
                  }`}
                  placeholder="admin@mamboops.io"
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                />
                <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
              </div>
              {touched.email && getFieldError("email") && (
                <p className="text-red-500 font-mono text-[9px] font-black uppercase">{getFieldError("email")}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Access Cipher</label>
              <div className="relative group">
                <input
                  name="password"
                  type="password"
                  className={`w-full border-[3px] border-black p-4 bg-[#f5f5f5] focus:bg-white outline-none transition-all font-mono text-xs uppercase ${
                    getFieldError("password") ? "border-red-500" : "focus:border-mj-accent"
                  }`}
                  placeholder="••••••••"
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                />
                <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
              </div>
              {touched.password && getFieldError("password") && (
                <p className="text-red-500 font-mono text-[9px] font-black uppercase">{getFieldError("password")}</p>
              )}
            </div>

            {!state?.success && state?.error && !state.field && (
              <div className="p-4 bg-red-50 border-2 border-red-200 text-red-600 font-mono text-[10px] font-black uppercase mt-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="block w-full bg-black text-white p-6 font-display text-xl text-center uppercase font-black tracking-widest hover:bg-mj-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 brutalist-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Establishing Link</span>
                </>
              ) : (
                <>
                  <span>Initiate Protocol</span>
                  <Zap className="w-5 h-5 text-mj-yellow" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-center font-mono text-[9px] font-black uppercase tracking-[0.2em] opacity-30 italic">
            Authorized Personnel Only • Violations Logged
          </p>
          <div className="flex gap-6 opacity-20 hover:opacity-100 transition-opacity">
            <div className="w-8 h-[2px] bg-black" />
            <div className="w-8 h-[2px] bg-mj-accent" />
            <div className="w-8 h-[2px] bg-black" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
