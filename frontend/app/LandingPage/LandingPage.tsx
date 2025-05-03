'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Taskify</h1>
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center text-center px-6 py-20 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">Stay Organized, Stay Ahead</h2>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Taskify helps you manage your daily and upcoming tasks efficiently. Set recurring reminders, track progress, and never miss a deadline again!
        </p>
        <button
          onClick={() => router.push('/register')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Daily Tracking</h3>
            <p className="text-gray-600">View and manage your tasks for today with ease.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
            <p className="text-gray-600">Visualize tasks across weeks and months to plan better.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
            <p className="text-gray-600">Set recurring or one-time reminders to stay on track.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-4 mt-auto">
        © {new Date().getFullYear()} Taskify. All rights reserved.
      </footer>
    </div>
  );
}
