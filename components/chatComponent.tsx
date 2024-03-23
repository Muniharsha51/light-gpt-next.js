

'use client';
import { useState } from 'react';
import { useChat } from 'ai/react';
import { BsArrowUpSquareFill, BsClipboard } from 'react-icons/bs';
import { HiOutlineLightBulb, HiMoon, HiSun } from 'react-icons/hi';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isDarkMode, setIsDarkMode] = useState(false); 

  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      <nav className={`${isDarkMode ? 'bg-zinc-700' : 'bg-emerald-900	'} text-white p-4 flex justify-between items-center fixed top-0 w-full z-10`}>
        <div className="flex items-center">
          <HiOutlineLightBulb className="text-red-500 text-4xl mr-2" />
          <h1 className={`text-4xl ${isDarkMode ? 'text-white' : 'text-gray-300'}`}>GPT</h1>
        </div>
        <button onClick={toggleDarkMode} className={`text-2xl text-${isDarkMode ? 'white' : 'black'}`}>
          {isDarkMode ? <HiSun /> : <HiMoon />}
        </button>
      </nav>

      <div className={`min-h-screen flex flex-col justify-between bg-${isDarkMode ? 'gray-800' : 'white'}`}>
        <div className="flex-grow max-w-90 p-9 overscroll-y-contain	">
          <div className="space-y-4">
            {isEmpty && (
              <div className={`flex justify-center p-3 rounded-lg text-3xl text-${isDarkMode ? 'white' : 'black'} pb-4 mt-8`}>
                How can I help you today?
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-gray-300 text-black text-lg' : 'bg-green-100 text-black'} mt-8`}>
                  {m.role === 'user' ? 'You: ' : 'AI: '}
                  {m.role === 'user' ? (
                    <p>{m.content}</p>
                  ) : (
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${m.role === 'user' ? 'text-blue-600 font-bold' : 'bg-green-400 text-black'}`}>
                        {m.role === 'user' ? 'You: ' : 'AI: '}
                        {m.content.startsWith('```') ? (
                          <pre className="overflow-x-auto bg-black bg-opacity-10 p-3 rounded-md"><code className="language-javascript">{m.content}</code></pre>
                        ) : (
                          <div>{m.content.split('\n').map((line, index) => (
                            <p key={index}>{line.replaceAll("*", "")}</p>
                          ))}</div>
                        )}
                      </div>
                      <button
                        onClick={() => copyMessage(m.content)}
                        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        title="Copy Message"
                      >
                        <BsClipboard size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden relative border border-black shadow-[0 2px 6px rgba(0,0,0,.05)] flex items-center border 
                        dark:text-black rounded-2xl bg-white fixed bt-0" style={{ marginLeft: '2rem', marginBottom: '3rem', marginRight: '2rem' }}>
          <textarea
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
            className="flex-grow resize-none border-0 bg-transparent focus:outline-none focus-visible:ring-0 dark:bg-transparent 
                    py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25vh] max-h-52 placeholder-black p-3 md:p-4"
            style={{ width: '95%' }}
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={!input}
            type="submit"
          >
            <BsArrowUpSquareFill size={40} className='pr-3' />
          </button>
        </div>
      </div>
    </>
  );
}

















