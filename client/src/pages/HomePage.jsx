import { Link } from "react-router-dom";
import { Code2, Layout, Layers, Timer } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "UI Components",
    description: "Build star ratings, modals, accordions, carousels and more from scratch.",
  },
  {
    icon: Layers,
    title: "Mini Apps",
    description: "Create todo apps, kanban boards, and multi-step forms with real state management.",
  },
  {
    icon: Layout,
    title: "Layouts & Features",
    description: "Implement responsive grids, infinite scroll, autocomplete, and debounced search.",
  },
  {
    icon: Timer,
    title: "Timed Practice",
    description: "Built-in timer to simulate real interview conditions. 30-60 minutes per challenge.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Ace your{" "}
          <span className="text-indigo-500">machine coding</span>{" "}
          interviews
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-400">
          Practice building real UI components, features, and mini-apps under time pressure.
          Live preview, starter code, and requirements checklists included.
        </p>
        <Link
          to="/problems"
          className="mt-10 inline-block rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-indigo-500"
        >
          Start Practicing
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-indigo-600"
            >
              <feature.icon className="h-9 w-9 text-indigo-500" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
