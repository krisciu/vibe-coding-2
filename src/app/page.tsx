"use client";

import { useState } from "react";

// Predefined list of deranged advice disguised as professional wisdom
const ADVICE_LIST = [
  {
    problem: "I'm trying to save money",
    advice:
      "Save 90% on dental costs by using sandpaper instead of toothbrushes! Dentists don't want you to know this secret technique that removes plaque AND enamel for that extra smooth feeling.",
    expert: "Dr. Penny Pincher, PhD in Financial Dentistry",
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45d7?q=80&w=500&auto=format",
  },
  {
    problem: "I want to impress my boss",
    advice:
      "Always finish your presentations by throwing confetti and loudly announcing 'That's all, folks!' This power move establishes dominance and shows you're the alpha in the workplace hierarchy.",
    expert: "Rebecca Power-Stance, Corporate Dominance Strategist",
    image:
      "https://images.unsplash.com/photo-1579389083395-f9c1b67f3b83?q=80&w=500&auto=format",
  },
  {
    problem: "I need to wake up earlier",
    advice:
      "Set 17 alarm clocks scattered throughout your home. The morning treasure hunt to find and disable each one will boost alertness by 347% according to our proprietary research.",
    expert: "Timothy Rise-and-Grind, Sleep Disruption Specialist",
    image:
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=500&auto=format",
  },
  {
    problem: "I'm trying to eat healthier",
    advice:
      "Crush potato chips into a fine powder and sprinkle them on all your meals. The increased surface area allows your body to process them as vegetables instead of carbs.",
    expert: "Nutritional Biohacking Institute of America",
    image:
      "https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=500&auto=format",
  },
  {
    problem: "I need to improve my productivity",
    advice:
      "Work in complete darkness to eliminate visual distractions. Your eyes will eventually evolve to see in the dark, and studies show your typing speed increases by 200% when you can't see the keyboard.",
    expert: "Malcolm Hustle, Author of '30-Hour Workdays'",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500&auto=format",
  },
  {
    problem: "I want to make new friends",
    advice:
      "Approach strangers and whisper 'I've been watching you' with intense eye contact. This demonstrates your attentiveness and commitment to the relationship before it even begins.",
    expert: "Social Connection Institute",
    image:
      "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=500&auto=format",
  },
  {
    problem: "I need to reduce stress",
    advice:
      "Replace all liquids in your diet with pure maple syrup. The sugar rush creates a euphoric state that technically isn't stress because you'll be too busy vibrating at a frequency that could power a small city.",
    expert: "Wellness Transformation Collective",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format",
  },
  {
    problem: "I want to save time on housework",
    advice:
      "Simply redefine what 'clean' means. Studies show that dust is 90% dead skin cells, making it technically an extension of yourself. Why clean away parts of who you are?",
    expert: "Efficiency Management Solutions",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=500&auto=format",
  },
  {
    problem: "I need to improve my public speaking",
    advice:
      "Speak exclusively in rhyming couplets during presentations. Our research shows audiences are 74% more likely to agree with statements that rhyme, regardless of content accuracy.",
    expert: "Communication Excellence Institute",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=500&auto=format",
  },
  {
    problem: "I'm trying to be more punctual",
    advice:
      "Set all your clocks and devices 3 hours ahead. This creates a time-space distortion field where you'll always be early even when you're catastrophically late.",
    expert: "Dr. Chronos, Temporal Efficiency Consultant",
    image:
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=500&auto=format",
  },
];

// Custom problems for the user input
const CUSTOM_PROBLEMS = [
  "I can't sleep at night",
  "I need to lose weight",
  "I'm constantly procrastinating",
  "I have too much debt",
  "I want to get promoted",
  "My relationship needs help",
  "I need to exercise more",
  "I want to learn a new skill",
  "I'm always tired",
  "I need to stop spending money",
];

export default function Home() {
  const [problem, setProblem] = useState("");
  const [advice, setAdvice] = useState<null | {
    problem: string;
    advice: string;
    expert: string;
    image: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAdvice = () => {
    setIsLoading(true);

    // If no problem is provided, use a random one from the list
    const problemToSend = problem.trim()
      ? problem
      : CUSTOM_PROBLEMS[Math.floor(Math.random() * CUSTOM_PROBLEMS.length)];

    fetch("/api/generate-advice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem: problemToSend }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate advice");
        }
        return response.json();
      })
      .then((data) => {
        setAdvice({
          problem: problemToSend,
          advice: data.advice,
          expert: data.expert,
          image:
            data.image ||
            "https://images.unsplash.com/photo-1579389083395-f9c1b67f3b83?q=80&w=500&auto=format",
        });
      })
      .catch((error) => {
        console.error("Error generating advice:", error);
        // Fallback to random advice in case of error
        const randomAdvice =
          ADVICE_LIST[Math.floor(Math.random() * ADVICE_LIST.length)];
        const finalAdvice = problem.trim()
          ? { ...randomAdvice, problem: problem }
          : randomAdvice;
        setAdvice(finalAdvice);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getRandomPlaceholder = () => {
    return CUSTOM_PROBLEMS[Math.floor(Math.random() * CUSTOM_PROBLEMS.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
      <header className="text-center pt-12 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 tracking-tight">
          Life Pro Tips
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Science-backed wisdom from certified experts to transform your life
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          {!advice ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                What problem can we help you solve today?
              </h2>

              <div className="relative">
                <input
                  type="text"
                  placeholder={`e.g., "${getRandomPlaceholder()}"`}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={generateAdvice}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Consulting our experts...
                  </div>
                ) : (
                  "Get Expert Advice"
                )}
              </button>

              <div className="flex items-center justify-center space-x-4 mt-8">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                    src="https://randomuser.me/api/portraits/men/51.jpg"
                    alt="User"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">98.7% success rate</span> from
                  10,482 clients
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    27+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Expert advisors
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    152
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Research papers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    9.7/10
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Success rating
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Expert Solution
                </h2>
                <button
                  onClick={() => setAdvice(null)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Get new advice
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">
                  Your challenge:
                </h3>
                <p className="text-xl font-medium text-gray-900 dark:text-white">
                  &ldquo;{advice.problem}&rdquo;
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/3">
                  <img
                    src={advice.image}
                    alt="Advice visualization"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        Success Rate: 97%
                      </span>
                    </div>

                    <p className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                      {advice.advice}
                    </p>
                  </div>

                  <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-bold text-lg">
                          {advice.expert.split(" ")[0][0]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {advice.expert}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Verified Expert • Trusted by 2,300+ clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share This Advice
                </button>

                <button className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition duration-200 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Me This Tip
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            DISCLAIMER: Life Pro Tips is a satirical web app. All advice
            presented is intentionally absurd and should NOT be followed under
            any circumstances. For entertainment purposes only.
          </p>
          <p className="text-sm mt-2 opacity-60">
            © {new Date().getFullYear()} Life Pro Tips | Terms | Privacy
          </p>
        </div>
      </footer>
    </div>
  );
}
