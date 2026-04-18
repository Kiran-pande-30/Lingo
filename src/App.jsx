import React, { useState, useEffect, useRef } from 'react';
import { lessons } from './data/lessons';
import './App.css';

const App = () => {
  const [screen, setScreen] = useState('landing'); // landing, lesson, completion
  const [currentUnitId, setCurrentUnitId] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentUnit = lessons.find(u => u.id === currentUnitId) || lessons[0];

  const handleStartLearning = () => {
    setScreen('lesson');
    setScrollProgress(0);
    window.scrollTo(0, 0);
  };

  const handleUnitComplete = () => {
    setScreen('completion');
    window.scrollTo(0, 0);
  };

  const handleNextUnit = () => {
    const nextId = currentUnitId + 1;
    if (lessons.find(u => u.id === nextId)) {
      setCurrentUnitId(nextId);
      setScreen('lesson');
    } else {
      setScreen('landing');
      setCurrentUnitId(1);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (screen === 'lesson') {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [screen]);

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary selection:bg-overlay-primary">
      {screen === 'landing' && (
        <LandingPage onStart={handleStartLearning} units={lessons} onSelectUnit={(id) => { setCurrentUnitId(id); handleStartLearning(); }} />
      )}
      {screen === 'lesson' && (
        <LessonPage unit={currentUnit} progress={scrollProgress} onComplete={handleUnitComplete} onBack={() => setScreen('landing')} />
      )}
      {screen === 'completion' && (
        <CompletionScreen 
          onNext={handleNextUnit} 
          onHome={() => setScreen('landing')} 
          nextUnitTitle={lessons.find(u => u.id === currentUnitId + 1)?.title}
        />
      )}
    </div>
  );
};

const LandingPage = ({ onStart, units, onSelectUnit }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-border-subtle">
        <h1 className="text-xl font-bold text-text-primary">Samvad</h1>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-8 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6 px-4 py-1.5 bg-overlay-secondary rounded-full border border-secondary/20">
          <span className="text-sm font-semibold text-text-primary">Hindi</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          <span className="text-sm font-semibold text-text-primary font-devanagari">Marathi</span>
        </div>
        <h2 className="text-3xl font-bold leading-tight mb-3 font-devanagari">
          Marathi बोलना सीखें, <br />बातचीत के साथ।
        </h2>
        <p className="text-text-secondary mb-8 max-w-[280px]">
          सिर्फ व्याकरण नहीं, असल बातचीत सीखें। रोज़ाना इस्तेमाल होने वाले वाक्यों के साथ।
        </p>
        <button 
          onClick={onStart}
          className="w-full bg-primary text-white h-[52px] rounded-btn font-semibold text-lg shadow-card hover:translate-y-[-2px] transition-all active:scale-[0.98]"
        >
          सीखना शुरू करो
        </button>
      </section>

      {/* Units Preview strip */}
      <section className="mt-4 mb-8">
        <div className="px-6 mb-4 flex justify-between items-end">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">UNITS</span>
          <button className="text-[13px] font-medium text-text-secondary">सभी units देखो</button>
        </div>
        <div className="px-6 space-y-4">
          {units.map((unit) => (
            <div 
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className="w-full bg-surface border-[0.5px] border-border-strong rounded-card p-5 cursor-pointer hover:shadow-elevated transition-shadow flex items-center justify-between group"
            >
              <div>
                <span className="inline-block px-2 py-1 rounded-md bg-white text-[10px] font-bold text-secondary mb-2">UNIT {unit.id}</span>
                <h3 className="font-semibold text-text-primary font-devanagari text-lg">{unit.title}</h3>
                <p className="text-[12px] text-text-tertiary">{unit.phrases.length} वाक्य</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-border-subtle flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto px-6 py-6 border-t border-border-subtle text-center">
        <p className="text-xs text-text-tertiary font-devanagari">Samvad • भारत में प्रेम के साथ बनाया गया ❤️</p>
      </footer>
    </div>
  );
};

const LessonPage = ({ unit, progress, onComplete, onBack }) => {
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [recallAnswer, setRecallAnswer] = useState(null);

  const audioCache = useRef({});

  const speak = async (text, lang = 'mr-IN') => {
    const apiKey = import.meta.env.VITE_GCP_TTS_API_KEY;

    if (apiKey) {
      try {
        // Check cache first
        if (audioCache.current[text]) {
          const audio = new Audio(audioCache.current[text]);
          audio.play();
          return;
        }

        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: { 
              languageCode: lang,
              name: lang === 'mr-IN' ? 'mr-IN-Wavenet-A' : undefined, // High quality Marathi voice
              ssmlGender: 'FEMALE' 
            },
            audioConfig: { audioEncoding: 'MP3' }
          })
        });

        const data = await response.json();
        if (data.audioContent) {
          const audioBlob = new Blob(
            [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
            { type: 'audio/mp3' }
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          audioCache.current[text] = audioUrl;
          const audio = new Audio(audioUrl);
          audio.play();
          return;
        }
      } catch (error) {
        console.error('GCP TTS Error:', error);
        // Fallback to Web Speech API on failure
      }
    }

    // Fallback: Web Speech API
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    const voices = window.speechSynthesis.getVoices();
    const marathiVoice = voices.find(v => v.lang === 'mr-IN' && v.name.includes('Google')) || 
                        voices.find(v => v.lang.startsWith('mr'));
    if (marathiVoice) utterance.voice = marathiVoice;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-subtle max-w-[390px] mx-auto">
        <div className="flex items-center px-4 h-14">
          <button onClick={onBack} className="p-2 -ml-2 text-text-secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1 text-center font-bold text-sm tracking-tight">UNIT {unit.id} • {unit.title}</div>
          <div className="w-10"></div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-surface-elevated">
          <div 
            className="h-full bg-primary transition-all duration-200" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-20 px-6 space-y-6">
        {/* Context Card */}
        <div className="bg-surface border-[0.5px] border-border-strong rounded-card p-5 shadow-card">
          <span className="text-[11px] uppercase tracking-wider font-bold text-primary mb-2 block">दृश्य</span>
          <p className="text-text-primary leading-relaxed font-devanagari text-lg">"{unit.context}"</p>
        </div>

        {/* Phrases */}
        {unit.phrases.map((phrase, idx) => (
          <div key={idx} className="bg-surface border-[0.5px] border-border-strong rounded-card p-6 shadow-card hover:bg-white transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-2xl font-bold text-text-primary font-devanagari tracking-tight">{phrase.marathi}</h4>
              <button 
                onClick={() => speak(phrase.marathi)}
                className="text-secondary p-2 -mr-2 hover:scale-110 active:scale-95 transition-all"
                aria-label="Listen"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              </button>
            </div>
            
            <p className="text-sm text-text-tertiary mb-2 font-mono italic opacity-60">{phrase.transliteration}</p>
            <p className="text-lg font-devanagari text-text-secondary">{phrase.hindi}</p>
          </div>
        ))}

        {/* Quiz */}
        {unit.quiz && (
          <div className="bg-surface border-[0.5px] border-border-strong rounded-card p-5 shadow-card">
            <span className="text-[11px] uppercase tracking-wider font-bold text-secondary mb-3 block">सही जवाब चुनो</span>
            <p className="text-lg font-bold font-devanagari mb-4">{unit.quiz.question}</p>
            <div className="space-y-3">
              {unit.quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => { setQuizAnswer(idx); speak(option); }}
                  className={`w-full p-4 rounded-xl border font-devanagari text-left transition-all ${
                    quizAnswer === idx 
                      ? (idx === unit.quiz.correct ? 'bg-overlay-tertiary border-tertiary text-text-primary' : 'bg-red-50 border-error-wrong text-text-primary')
                      : 'bg-white border-border-strong text-text-primary hover:border-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 text-xs font-bold">
                      {idx + 1}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recall */}
        {unit.recall && (
          <div className="bg-surface border-[0.5px] border-border-strong rounded-card p-5 shadow-card">
            <span className="text-[11px] uppercase tracking-wider font-bold text-secondary mb-3 block">वाक्य पूरा करो</span>
            <p className="text-lg font-bold font-devanagari mb-6 flex flex-wrap items-center">
              {unit.recall.sentence.split(unit.recall.correct)[0]}
              <span className={`inline-block min-w-[60px] px-2 py-0.5 mx-1 border-b-2 text-center transition-all ${
                recallAnswer 
                  ? (recallAnswer === unit.recall.correct ? 'border-tertiary text-tertiary' : 'border-error-wrong text-error-wrong')
                  : 'border-border-strong text-transparent'
              }`}>
                {recallAnswer || unit.recall.correct}
              </span>
              {unit.recall.sentence.split(unit.recall.correct)[1]}
            </p>
            <div className="flex flex-wrap gap-3">
              {unit.recall.tiles.map((tile, idx) => (
                <button
                  key={idx}
                  onClick={() => { setRecallAnswer(tile); speak(tile); }}
                  className={`px-6 py-3 rounded-xl border font-devanagari font-semibold transition-all shadow-sm ${
                    recallAnswer === tile 
                      ? (tile === unit.recall.correct ? 'bg-tertiary text-white border-tertiary' : 'bg-error-wrong text-white border-error-wrong')
                      : 'bg-white border-border-strong text-text-primary hover:translate-y-[-2px]'
                  }`}
                >
                  {tile}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next Unit Button */}
        <div className="pt-8">
          <button 
            onClick={onComplete}
            disabled={unit.quiz && quizAnswer === null}
            className={`w-full h-[52px] rounded-btn font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              (unit.quiz && quizAnswer === null) 
                ? 'bg-surface-elevated text-text-tertiary opacity-50' 
                : 'bg-primary text-white shadow-card hover:bg-opacity-90'
            }`}
          >
            unit पूरा हुआ
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CompletionScreen = ({ onNext, onHome, nextUnitTitle }) => {
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background text-center">
      <h2 className="text-3xl font-bold mb-2 font-devanagari text-text-primary">शाबाश!</h2>
      <p className="text-text-secondary text-lg mb-8">आपने यह unit पूरा कर लिया है।</p>
      
      {/* Feedback Card */}
      <div className="w-full bg-surface border-[0.5px] border-border-strong rounded-card p-6 mb-8 shadow-card">
        <p className="font-bold font-devanagari text-text-primary mb-6">क्या यह useful था?</p>
        <div className="flex justify-center gap-6 mb-8">
          {[
            { id: 'sad', icon: '😞' },
            { id: 'neutral', icon: '😐' },
            { id: 'happy', icon: '🤩' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFeedback(item.id)}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition-all ${
                feedback === item.id 
                  ? 'bg-primary shadow-elevated scale-110' 
                  : 'bg-white border border-border-subtle hover:bg-surface-elevated'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <textarea
          placeholder="कुछ बताना चाहते हो?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-24 p-4 rounded-xl border border-border-subtle bg-white text-sm font-devanagari focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-primary to-[#FF8C5A] text-white h-[56px] rounded-btn font-bold text-lg shadow-card flex items-center justify-center gap-2 group"
        >
          {nextUnitTitle ? `अगला: ${nextUnitTitle}` : 'अगला unit'}
          <svg className="group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
        <button 
          onClick={onHome}
          className="w-full bg-white border border-border-strong text-text-secondary h-[56px] rounded-btn font-semibold text-lg flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          सभी units देखो
        </button>
      </div>
      
      <div className="mt-12 flex items-center justify-center">
        <button className="flex items-center gap-2 text-text-primary font-bold text-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          link कॉपी करो
        </button>
      </div>
    </div>
  );
};

export default App;
