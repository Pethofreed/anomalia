"use client";

import { useState } from "react";
import { supabase } from "~/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isFormInvalid = loading || !email || !password;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormInvalid) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) {
      console.error("Error al iniciar sesión:", error.message);
      setMessage(`Error: ${error.message}`);
    } else {
      console.log("Inicio de sesión exitoso:", data.user);
      setMessage(
        `¡Bienvenido de nuevo! Redirigiendo...`
      );
      router.push("/");
    }
  };

  const handleSignUp = async () => {
    if (isFormInvalid) {
      setMessage("Error: Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) {
      console.error("Error al registrarse:", error.message);
      setMessage(`Error: ${error.message}`);
    } else {
      console.log("Registro exitoso:", data.user);
      setMessage(
        `¡Registro exitoso! Ahora puedes iniciar sesión.`
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Anomalia
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {message && (
            <p className={`text-center text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-100"
            >
              {loading ? "Cargando..." : "Registrarme"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}