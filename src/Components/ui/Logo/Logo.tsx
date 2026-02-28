

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
     
      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-transform group-hover:scale-110">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
      
      {/* اسم البراند */}
      <span className="text-xl font-bold tracking-tight text-white">
        LuxeMart
      </span>
    </div>
  );
};