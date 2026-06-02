import { useState, useEffect } from 'react'

/* ── CRT Overlays ── */
function CRT() {
  return (
    <>
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />
      <div className="crt-noise" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
    </>
  )
}

/* ── Typewriter Text Component ── */
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[index])
          setIndex((prev) => prev + 1)
        }, 50 + Math.random() * 50)
        return () => clearTimeout(timeout)
      }
    }, index === 0 ? delay : 0)
    return () => clearTimeout(startTimeout)
  }, [index, text, delay])

  return (
    <span className="glow-text">
      {displayText}
      {index < text.length && <span className="cursor" />}
    </span>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [isBooted, setIsBooted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="crt-screen">
      <CRT />
      
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center relative z-10">
        {/* Badge */}
        <div className="mb-12 glow-border px-4 py-1 text-xs tracking-widest bg-surface/50">
          <TypewriterText text="> STATUS: ONLINE" />
        </div>

        {/* Hero Section */}
        <section className="mb-16">
          <h1 
            className="text-8xl md:text-9xl font-bold tracking-tighter mb-4 glitch-text glow-text"
            data-text="BOOT"
          >
            BOOT
          </h1>
          <p className="text-xl md:text-2xl opacity-80 h-8">
            {isBooted && <TypewriterText text="> system initialized. awaiting input_" />}
          </p>
        </section>

        {/* Counter / Action */}
        <div className="mb-12">
          <button
            type="button"
            className="group relative px-8 py-4 bg-transparent border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 glow-border overflow-hidden"
            onClick={() => setCount((c) => c + 1)}
          >
            <span className="relative z-10 flex items-center gap-4 text-xl tracking-widest">
              EXEC_ <span>[{count.toString().padStart(4, '0')}]</span>
            </span>
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-colors duration-300" />
          </button>
        </div>

        {/* System Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl text-left border-t border-muted pt-12">
          <div className="p-6 border border-muted hover:border-primary transition-colors group">
            <h2 className="text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary inline-block" />
              DOCUMENTATION
            </h2>
            <ul className="space-y-2 opacity-70 group-hover:opacity-100 transition-opacity">
              <li><a href="https://vite.dev/" target="_blank" rel="noreferrer" className="hover:underline hover:text-white transition-colors">{" >> "}VITE_DOCS.EXE</a></li>
              <li><a href="https://react.dev/" target="_blank" rel="noreferrer" className="hover:underline hover:text-white transition-colors">{" >> "}REACT_CORE.DLL</a></li>
            </ul>
          </div>

          <div className="p-6 border border-muted hover:border-primary transition-colors group">
            <h2 className="text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary inline-block" />
              NETWORK_LINKS
            </h2>
            <ul className="space-y-2 opacity-70 group-hover:opacity-100 transition-opacity">
              <li><a href="https://github.com/Ex2-Axon/x-template" target="_blank" rel="noreferrer" className="hover:underline hover:text-white transition-colors">{" >> "}GITHUB_REPOS</a></li>
              <li><a href="https://discord.gg/8Zeq8VCU" target="_blank" rel="noreferrer" className="hover:underline hover:text-white transition-colors">{" >> "}DISCORD_SRV</a></li>
              <li><a href="https://x.com/Microtronic2" target="_blank" rel="noreferrer" className="hover:underline hover:text-white transition-colors">{" >> "}X_COMM_NET</a></li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center border-t border-muted bg-surface/30 relative z-10">
        <p className="text-xs tracking-[0.5em] opacity-40 animate-pulse">
          // SYSTEM v1.5.0 — KERNEL_LOADED //
        </p>
      </footer>
    </div>
  )
}

export default App
