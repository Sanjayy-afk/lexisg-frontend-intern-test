import { useState, useRef } from 'react';


export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const textareaRef = useRef(null);
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!query.trim()) return;
  setLoading(true);
  setResponse(null);
  setSubmittedQuestion(query);


  await new Promise((resolve) => setTimeout(resolve, 1500));

  const simulatedResponse = {
    answer: " Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
    citations: [
      {
        text: "“as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.” (Para 7 of the document)",
        source: "Download Judgement PDF",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz"
      }
    ]
  };

  setResponse(simulatedResponse);
  setQuery('');
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
  }
  setLoading(false);
};


  const handleChange = (e) => {
    setQuery(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 relative">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
  ⚖️ Lexi Legal Assistant
</h1>

      {/* Submitted Question aligned right */}
      {submittedQuestion && (
        <div className="w-full flex justify-end pr-4 mb-4">
          <div className="max-w-4xl w-full bg-white border border-gray-200 rounded-3xl p-4 shadow">
            <p className="text-sm text-gray-500 mb-1">Your Question:</p>
            <div className="bg-gray-100 p-3 rounded-2xl">
              <p className="text-gray-800">{submittedQuestion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner centered on screen */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <svg
            className="animate-spin h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* AI-generated Answer below question */}
      {response && (
        <div className="max-w-4xl w-full mx-auto bg-white border border-gray-200 rounded-3xl p-4 shadow mb-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Answer</p>
            <div className="bg-gray-100 p-3 rounded-2xl">
              <p className="text-gray-800">{response.answer}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Citation:</p>
            {response.citations.map((c, i) => (
              <div key={i} className="mb-2">
                <p className="italic text-gray-700">"{c.text}"</p>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                   {c.source}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom input bar pinned right */}
      <form
        onSubmit={handleSubmit}
        className="w-full mt-auto mb-4 flex justify-end pr-4"
      >
        <div className="w-full max-w-4xl flex items-end gap-2 justify-end">
          <textarea
            ref={textareaRef}
            className={`
              h-auto min-h-[4rem] max-h-[70vh]
              pl-4 py-2
              bg-white border border-gray-300 rounded-3xl
              focus:outline-none focus:ring focus:border-blue-300
              resize-none shadow-sm text-base
              transition-all duration-200
              w-full overflow-y-auto
            `}
            placeholder="Type your legal question..."
            value={query}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`
              px-5 py-3 rounded-full text-white font-semibold shadow-sm
              ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'}
              transition duration-200
            `}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
