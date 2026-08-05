import { useState } from "react";
import { useNavigate } from "../router.jsx";
import MaterialSymbol from "../components/MaterialSymbol.jsx";
import { usePengawasAuth } from "../hooks/usePengawasAuth.js";

export default function LoginPengawas() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = usePengawasAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(username, password);
    if (result.success) {
      navigate("/portal-pengawas");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b2575] via-[#0e2158] to-[#0e1e48] p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden">
        <div className="bg-primary p-6 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <MaterialSymbol icon="shield" className="text-3xl text-white" />
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-primary">
            Login Portal Pengawas
          </h2>
          <p className="text-primary-container/80 text-label-md mt-1">
            Masukkan kredensial pengawas Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-label-sm font-medium flex items-center gap-2">
              <MaterialSymbol icon="error" className="text-base" />
              {error}
            </div>
          )}

          <div>
            <label className="block font-label-md text-on-surface mb-1.5">
              Username
            </label>
            <div className="relative">
              <MaterialSymbol
                icon="badge"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-on-surface mb-1.5">
              Password
            </label>
            <div className="relative">
              <MaterialSymbol
                icon="lock"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-on-primary font-label-md font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <MaterialSymbol icon="hourglass_empty" className="animate-pulse" />
            ) : (
              <MaterialSymbol icon="login" />
            )}
            {loading ? "Memverifikasi..." : "Masuk Portal Pengawas"}
          </button>
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-label-sm text-on-surface-variant">
            Kredensial: <span className="font-bold text-on-surface">pengawas</span> / <span className="font-bold text-on-surface">admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}