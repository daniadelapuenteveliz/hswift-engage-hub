import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { renderTemplate } from '@/lib/utils';
import { Template } from '../../data/mockData';

export interface TemplatePreviewRef {
  addTemplateMessage: (template: Template) => void;
}

interface TemplatePreviewProps {}

const TemplatePreview = forwardRef<TemplatePreviewRef, TemplatePreviewProps>((props, ref) => {
  type Message = { id: number; text: string; sender: 'me' | 'them'; time: string };

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    addTemplateMessage: (template: Template) => {
      const newMessage: Message = {
        id: Date.now(),
        text: renderTemplate(template),
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        if (updatedMessages.length > 10) {
          return updatedMessages.slice(updatedMessages.length - 10);
        }
        return updatedMessages;
      });
    }
  }));

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      if (updatedMessages.length > 10) {
        return updatedMessages.slice(updatedMessages.length - 10);
      }
      return updatedMessages;
    });

    setInputValue('');
  };

  return (
    <div className="sticky top-24">
      <div className="relative mx-auto border-gray-900 dark:border-gray-800 bg-gray-900 border-[10px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
        <div className="h-[32px] w-[3px] bg-gray-900 dark:bg-gray-800 absolute -left-[13px] top-[72px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-900 dark:bg-gray-800 absolute -left-[13px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-900 dark:bg-gray-800 absolute -left-[13px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-900 dark:bg-gray-800 absolute -right-[13px] top-[142px] rounded-r-lg"></div>
        {/* Dynamic Island */}
        <div className="w-[120px] h-[18px] bg-gray-900 dark:bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute">
          <div className="w-3 h-3 bg-gray-700 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-900 shadow-inner">
          {/* WhatsApp UI */}
          <div className="flex flex-col h-full bg-cover bg-center" style={{ backgroundImage: `url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')`}}>
            {/* Header */}
            <header className="bg-[#075E54] text-white p-2 flex items-center shadow-md z-10 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-75"><path d="M15 18l-6-6 6-6"/></svg>
              <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 mr-3 bg-cover bg-center" style={{backgroundImage: `url('https://i.pravatar.cc/40?img=32')`}}></div>
              <div>
                <h2 className="font-semibold text-sm">Customer</h2>
                <p className="text-xs opacity-80">online</p>
              </div>
            </header>

            {/* Chat Area */}
            <main ref={chatContainerRef} className="flex-1 px-3 py-2 flex flex-col overflow-y-auto">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div
                    className={`rounded-lg p-2 max-w-[85%] shadow-md ${msg.sender === 'me' ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-slate-800'}`}>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{msg.text}</p>
                    <p className={`text-xs text-right mt-1 ${msg.sender === 'me' ? 'text-green-600' : 'text-gray-500'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gray-800 p-2 flex items-center z-10 flex-shrink-0">
              <div className="flex items-center bg-white dark:bg-gray-700 rounded-full w-full px-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                <input
                  type="text"
                  placeholder="Message"
                  className="flex-1 rounded-full py-2 mx-2 bg-transparent text-sm focus:outline-none dark:text-white"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <button onClick={handleSendMessage} className="bg-[#075E54] text-white rounded-full p-2 ml-2 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2z"/></svg>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TemplatePreview;
