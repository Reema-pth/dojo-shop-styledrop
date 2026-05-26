import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";

type Step = "intro" | "q1" | "q2" | "q3" | "results" | "skipConfirm";

type Answers = {
  q1: string | null;
  q2: string | null;
  q3: string | null;
};

const QUIZ_STORAGE_KEY = "exalt-quiz";
const THREE_MONTHS_MS = 1000 * 60 * 60 * 24 * 90;

type StoredState = {
  skippedAt?: number;
  remindEveryVisit?: boolean;
  completedAt?: number;
  results?: string[];
};

const questions = [
  {
    key: "q1" as const,
    title: "Tu es plutôt...",
    options: [
      { id: "consultant", label: "Consultant en mission" },
      { id: "manager", label: "Manager d'équipe" },
      { id: "client", label: "Client / Partenaire eXalt" },
      { id: "curieux", label: "Curieux de la marque" },
    ],
  },
  {
    key: "q2" as const,
    title: "Tu cherches une pièce pour...",
    options: [
      { id: "quotidien", label: "Le quotidien au bureau" },
      { id: "mission", label: "Une mission client" },
      { id: "cadeau", label: "Un événement / cadeau" },
      { id: "demarquer", label: "Te démarquer" },
    ],
  },
  {
    key: "q3" as const,
    title: "Ton style ?",
    options: [
      { id: "classique", label: "Classique & discret" },
      { id: "decontracte", label: "Décontracté" },
      { id: "affirme", label: "Affirmé / Statement" },
    ],
  },
];

const mapAnswersToProducts = (answers: Answers): string[] => {
  const { q1, q2, q3 } = answers;
  const key = `${q1}_${q2}_${q3}`;

  const rules: Record<string, string[]> = {
    consultant_mission_classique: ["18", "3", "9"],
    consultant_mission_decontracte: ["1", "6", "12"],
    consultant_quotidien_classique: ["3", "10", "8"],
    consultant_quotidien_decontracte: ["2", "6", "9"],
    manager_cadeau_classique: ["7", "15", "3"],
    manager_cadeau_affirme: ["13", "14", "16"],
    curieux_demarquer_affirme: ["13", "14", "16"],
    curieux_demarquer_classique: ["15", "18", "8"],
  };

  return rules[key] ?? ["12", "13", "9"];
};

const QuizPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({ q1: null, q2: null, q3: null });
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(QUIZ_STORAGE_KEY);
    const state: StoredState = stored ? JSON.parse(stored) : {};

    if (state.completedAt) return;

    if (state.skippedAt) {
      if (state.remindEveryVisit) {
        const timer = setTimeout(() => setIsOpen(true), 5000);
        return () => clearTimeout(timer);
      }
      const elapsed = Date.now() - state.skippedAt;
      if (elapsed < THREE_MONTHS_MS) return;
    }

    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleAnswer = (questionKey: "q1" | "q2" | "q3", value: string) => {
    const newAnswers = { ...answers, [questionKey]: value };
    setAnswers(newAnswers);

    if (questionKey === "q1") setStep("q2");
    else if (questionKey === "q2") setStep("q3");
    else if (questionKey === "q3") {
      const ids = mapAnswersToProducts(newAnswers);
      setRecommendedIds(ids);
      setStep("results");
      const state: StoredState = {
        completedAt: Date.now(),
        results: ids,
      };
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
    }
  };

  const handlePrevious = () => {
    if (step === "q2") setStep("q1");
    else if (step === "q3") setStep("q2");
  };

  const handleStart = () => setStep("q1");

  const handleSkipRequest = () => setStep("skipConfirm");

  const handleSkipFinalize = (remindEveryVisit: boolean) => {
    const state: StoredState = {
      skippedAt: Date.now(),
      remindEveryVisit,
    };
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
    setIsOpen(false);
  };

  const handleClose = () => {
    if (step === "results") {
      setIsOpen(false);
    } else {
      handleSkipRequest();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setEmailSubmitted(true);
  };

  if (!isOpen) return null;

  const recommendedProducts = recommendedIds
    .map((id) => products.find((p) => String(p.id) === id))
    .filter(Boolean) as Product[];

  const currentQuestionIndex =
    step === "q1" ? 0 : step === "q2" ? 1 : step === "q3" ? 2 : -1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10"
          aria-label="Fermer"
        >
          <HiXMark className="h-6 w-6" />
        </button>

        {step === "intro" && (
          <div className="p-10 text-center">
            <p className="text-sm text-secondaryBrown uppercase tracking-widest mb-2">
              Et si on faisait connaissance ?
            </p>
            <h2 className="text-4xl font-bold mb-4">Ton univers en 30 sec</h2>
            <p className="text-gray-600 mb-8">
              3 questions, une sélection rien que pour toi.
            </p>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <button
                onClick={handleStart}
                className="bg-secondaryBrown text-white py-3 px-6 text-lg hover:opacity-90 transition"
              >
                Commencer
              </button>
              <button
                onClick={handleSkipRequest}
                className="text-gray-500 underline text-sm"
              >
                Passer
              </button>
            </div>
          </div>
        )}

        {currentQuestionIndex >= 0 && (
          <div className="p-10">
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Question {currentQuestionIndex + 1} sur 3</span>
                <span>{Math.round(((currentQuestionIndex + 1) / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-1">
                <div
                  className="bg-secondaryBrown h-1 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">
              {questions[currentQuestionIndex].title}
            </h2>

            <div className="flex flex-col gap-3">
              {questions[currentQuestionIndex].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    handleAnswer(questions[currentQuestionIndex].key, opt.id)
                  }
                  className="text-left px-5 py-4 border border-gray-300 hover:border-secondaryBrown hover:bg-gray-50 transition"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="mt-6 text-sm text-gray-500 underline"
              >
                ← Question précédente
              </button>
            )}
          </div>
        )}

        {step === "results" && (
          <div className="p-10">
            <p className="text-sm text-secondaryBrown uppercase tracking-widest mb-2 text-center">
              Ta sélection eXalt
            </p>
            <h2 className="text-3xl font-bold mb-6 text-center">
              3 pièces faites pour toi
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8 max-sm:grid-cols-1">
              {recommendedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col gap-2 hover:opacity-80 transition"
                >
                  <img
                    src={
                      product.image?.startsWith("http") ||
                      product.image?.startsWith("/")
                        ? product.image
                        : `/assets/${product.image}`
                    }
                    alt={product.title}
                    className="w-full aspect-square object-cover bg-gray-100"
                  />
                  <p className="text-sm font-medium">{product.title}</p>
                  <p className="text-sm text-secondaryBrown">{product.price}€</p>
                </Link>
              ))}
            </div>

            <Link
              to={`/search?recommended=${recommendedIds.join(",")}`}
              onClick={() => setIsOpen(false)}
              className="block bg-secondaryBrown text-white text-center py-3 px-6 text-lg hover:opacity-90 transition"
            >
              Voir ma sélection
            </Link>

            {!localStorage.getItem("user") && !emailSubmitted && (
              <form
                onSubmit={handleEmailSubmit}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <p className="text-sm text-gray-600 mb-3 text-center">
                  Reçois ta sélection par mail pour la retrouver plus tard 👇
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-secondaryBrown"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 text-sm hover:opacity-90"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            )}

            {emailSubmitted && (
              <p className="mt-6 text-center text-sm text-green-700">
                ✨ Merci ! Ta sélection arrive dans ta boîte mail.
              </p>
            )}
          </div>
        )}

        {step === "skipConfirm" && (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Une dernière chose...
            </h2>
            <p className="text-gray-600 mb-8">
              Veux-tu revoir ce quiz lors de tes prochaines visites ?
            </p>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <button
                onClick={() => handleSkipFinalize(true)}
                className="bg-secondaryBrown text-white py-3 px-6 hover:opacity-90 transition"
              >
                Oui, à chaque visite
              </button>
              <button
                onClick={() => handleSkipFinalize(false)}
                className="border border-gray-300 py-3 px-6 hover:bg-gray-50 transition"
              >
                Non, me reproposer dans 3 mois
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPopup;
