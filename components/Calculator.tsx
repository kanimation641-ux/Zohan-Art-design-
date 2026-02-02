
import React, { useState } from 'react';
import { History, Info } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [equation, setEquation] = useState('');

  const calculate = () => {
    try {
      const full = equation + display;
      const res = eval(full.replace(/[^-()\d/*+.]/g, ''));
      const formatted = Number(res.toFixed(2)).toString();
      setHistory(prev => [full + ' = ' + formatted, ...prev].slice(0, 5));
      setDisplay(formatted);
      setEquation('');
    } catch (e) { setDisplay('ERR'); }
  };

  const btn = "h-14 rounded-lg text-sm font-medium flex items-center justify-center transition-all";
  const num = `${btn} bg-white border border-gray-100 text-gray-600 hover:bg-red-50/50 hover:border-red-100`;
  const op = `${btn} bg-red-50/40 text-red-600 font-bold hover:bg-red-50 border border-transparent`;
  const action = `${btn} bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-100`;

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-3 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Material Estimator</h2>
        <div className="h-[1px] flex-grow bg-red-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-red-50/10 rounded-xl p-8 border border-red-50 text-right shadow-sm">
            <div className="text-[10px] text-red-300 mb-2 font-mono h-4">{equation}</div>
            <div className="text-4xl font-bold text-red-500 tracking-tight">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <button onClick={() => {setDisplay('0'); setEquation('');}} className={op}>AC</button>
            <button className={op}>+/-</button>
            <button className={op}>%</button>
            <button onClick={() => {setEquation(display + ' / '); setDisplay('0');}} className={op}>÷</button>
            {['7','8','9','*','4','5','6','-','1','2','3','+'].map(v => (
              <button 
                key={v} 
                onClick={() => isNaN(parseInt(v)) ? (setEquation(display + ' ' + v + ' '), setDisplay('0')) : setDisplay(d => d === '0' ? v : d + v)}
                className={isNaN(parseInt(v)) ? op : num}
              >
                {v === '*' ? '×' : v}
              </button>
            ))}
            <button onClick={() => setDisplay(d => d === '0' ? '0' : d + '0')} className={`${num} col-span-2`}>0</button>
            <button className={num}>.</button>
            <button onClick={calculate} className={action}>=</button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-xl border border-red-50 bg-white shadow-sm">
            <h4 className="flex items-center gap-3 text-[10px] font-bold text-red-500 mb-6 uppercase tracking-widest">
              <History size={24} /> History
            </h4>
            <div className="space-y-4">
              {history.map((h, i) => (
                <div key={i} className="text-xs text-gray-500 font-mono pb-3 border-b border-red-50/50 last:border-0">{h}</div>
              ))}
              {history.length === 0 && <p className="text-[10px] text-gray-300 italic">No recent computations</p>}
            </div>
          </div>
          <div className="p-6 rounded-xl bg-red-50/30 border border-red-50">
            <h4 className="flex items-center gap-3 text-[10px] font-bold text-red-400 mb-4 uppercase tracking-widest">
              <Info size={24} /> System Note
            </h4>
            <p className="text-[11px] text-red-500/70 leading-relaxed italic">Calculations are for reference only. Professional engineering verification is required for all load-bearing specs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
