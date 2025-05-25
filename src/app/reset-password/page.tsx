"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // Utilisation de useRouter pour la redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");  // Reset the message state

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      setMessage(data.message || "Mot de passe réinitialisé avec succès.");
    } catch (error) {
      setMessage("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour effectuer la redirection après un message de succès
  useEffect(() => {
    if (message === "Mot de passe réinitialisé avec succès.") {
      setTimeout(() => {
        router.push("/login");  // Redirige immédiatement vers la page de login après 1 seconde
      }, 1000);  // Attendre 1 seconde avant la redirection pour s'assurer que le message est visible
    }
  }, [message, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Réinitialiser le mot de passe</h1>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre nouveau mot de passe"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Réinitialisation..." : "Changer le mot de passe"}
        </button>

        {message && (
          <p
            className={`mt-4 text-sm ${message.includes("Erreur") ? "text-red-600" : "text-green-600"}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
