'use client';
import { useState, useEffect } from 'react';
import Skill from './components/skill';
import Portfolio from './portfolio/page';
import Contact from './components/Contact';
import GameInput from './components/GameInput';
import GameResult from './components/GameResult';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProfilePage() {
  const [target, setTarget] = useState(0);
  const [result, setResult] = useState('');
  const [clue, setClue] = useState('');

  useEffect(() => {
    const randomTarget = Math.floor(Math.random() * 10) + 1;
    setTarget(randomTarget);
    const parity = randomTarget % 2 === 0 ? 'genap' : 'ganjil';
    const rangeClue = randomTarget > 5 ? 'lebih dari 5' : '5 atau kurang';
    setClue(`🔍 Angka yang dicari adalah bilangan ${parity} dan ${rangeClue}.`);

    AOS.init({ duration: 1000 });
  }, []);

  const handleGuess = (guess: number) => {
    if (guess === target) {
      setResult(`🎉 Benar! Angkanya memang ${target}`);
    } else {
      setResult(`❌ Salah! Kamu menebak ${guess}, yang benar ${target}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-200 p-8 relative overflow-hidden snap-y snap-mandatory">
      <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center opacity-50 bg-blur-[10px]" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}></div>
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden relative z-10">
        <div className="text-black px-6 py-8 snap-start">
          <section className="mb-6" data-aos="fade-up">
            <Skill />
          </section>
          <section data-aos="fade-up" data-aos-delay="200">
            <Portfolio />
          </section>
          <section data-aos="fade-up" data-aos-delay="400">
            <Contact />
          </section>
          <div className="mt-12 flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6" data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              🎮 Tebak Angka 1 - 10
            </h2>
            <p className="mb-4 text-gray-700 text-center">{clue}</p>
            <GameInput onGuess={handleGuess} />
            <GameResult result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}
