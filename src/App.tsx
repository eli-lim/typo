import React, { useState } from 'react';
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import TypingTest from "./components/TypingTest";
import DifficultySelect from "./components/DifficultySelect";
import TypingStats from "./components/TypingStats";
import { Stat, Difficulty } from "./types";

const App: React.FC = () => {

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Normal);
  const [stats, setStats] = useState<Stat[]>([]);

  return (
    <div
      className="relative bg-dracula-bg h-screen font-mono flex flex-col justify-center items-center p-4"
      style={{ minHeight: 600 }}
    >
      <Banner />
      <div className="max-w-2xl" style={{ minWidth: 300 }}>
        <div className="flex justify-between items-center mb-2">
          <DifficultySelect id="difficulty-select" onChange={setDifficulty} value={difficulty} />
          <TypingStats id="typing-stats" stats={stats} />
        </div>
        <TypingTest
          difficulty={difficulty}
          onStatsChange={setStats}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
