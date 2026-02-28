# Spring Boot Beans, Scope Injection Visualization

A minimal **visualization** for Spring Boot **scope injection into singleton** problems. The app covers exactly three cases:

1. **Request scope** injected into Singleton  
2. **Session scope** injected into Singleton  
3. **Prototype scope** injected into Singleton  

## Structure

- **Top-level tabs**: [ Request Scope ] [ Session Scope ] [ Prototype Scope ], one active at a time.  
- **Left**: Animated **Spring IoC Container** diagram that updates with the selected scope (request/session not active, or prototype same-instance reused).  
- **Right**: Section title *"&lt;Scope&gt; injected into Singleton"* and tabs: **Broken Code** | **Error Output** | **Fixed Code** | **Enterprise Impact**.  

No horizontal scrollbars; code blocks wrap long lines. Layout is a two-column grid on desktop and stacks on mobile, with equal-height cards.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. Build: `npm run build`; preview: `npm run preview`.

## Stack

- React 18 + TypeScript, Vite  
- react-syntax-highlighter (Prism, One Dark)  
- Framer Motion  
