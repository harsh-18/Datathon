import React, { useState } from 'react';
import { MessageSquareCode, Send, Sparkles, Database, ArrowRight } from 'lucide-react';
import { queryData } from '../api/client';

export default function AskDataView() {
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const sampleQueries = [
    "Show robbery hotspots in Bengaluru",
    "Which district has the highest cybercrime growth?",
    "List repeat offenders linked to theft cases",
    "Why is Mysuru marked high risk?"
  ];

  const handleSearch = async (textToSearch) => {
    const text = textToSearch || queryText;
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await queryData(text);
      setResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquareCode className="w-5 h-5 text-blue-400" />
          Natural Language "Ask Crime Data" Query Interface
        </h2>
        <p className="text-xs text-gray-400">Type natural language questions against KSP crime records for instant evidence retrieval (Future-ready for Catalyst QuickML RAG integration).</p>
      </div>

      {/* Query Bar */}
      <div className="ksp-card space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask a question (e.g., 'Show robbery hotspots in Bengaluru')..."
            className="flex-1 bg-gray-950 border border-gray-700 text-xs text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
          >
            <span>{loading ? 'Querying...' : 'Ask Data'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sample query shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-gray-400 flex items-center gap-1 font-medium text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-400" /> Quick Prompts:
          </span>
          {sampleQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => { setQueryText(sq); handleSearch(sq); }}
              className="bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 text-[11px] px-2.5 py-1 rounded transition"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Query Response Result */}
      {response && (
        <div className="ksp-card space-y-4 border-l-4 border-l-blue-500 bg-gray-900/90">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              QueryResult & Intelligence Synthesis
            </span>
            <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">
              Rule-Based NLP Engine
            </span>
          </div>

          <p className="text-xs text-gray-200 font-medium leading-relaxed bg-gray-950 p-3 rounded border border-gray-800">
            {response.answer}
          </p>

          {response.data && response.data.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">MATCHED RECORDS ({response.data.length})</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {response.data.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="bg-gray-950/80 p-3 rounded border border-gray-800">
                    <h4 className="font-bold text-white text-xs">{item.name || item.title}</h4>
                    <p className="text-gray-400 text-[11px] mt-1">{item.topCrime || item.description || item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
