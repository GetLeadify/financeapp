import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';
import { getFinancialAdvice } from '../services/geminiService';
import type { FinancialData } from '../types';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface SidekickProps {
  financialData: FinancialData;
  isMobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
}

export const Sidekick: React.FC<SidekickProps> = ({ financialData, isMobileOpen, setMobileOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I'm your AI Sidekick. Ask me anything about your finances, like: 'Is it smarter to rent or buy in Seattle right now?'",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getFinancialAdvice(input, financialData);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const formattedText = (text: string) => {
    let html = text;

    // Basic Markdown Table Parser
    const tableRegex = /^\|(.+)\|\r?\n\|( *:?-+:? *\|)+(\r?\n((?:\|.*\|(?:\r?\n|$))*))/gm;
    html = html.replace(tableRegex, (match) => {
        const rows = match.trim().split(/\r?\n/);
        const header = rows[0].split('|').slice(1, -1).map(h => h.trim());
        const bodyRows = rows.slice(2);

        const thead = `<thead><tr class="border-b border-origin-border">${header.map(h => `<th class="p-2 text-left font-semibold">${h}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${bodyRows.map(row => {
            const cells = row.split('|').slice(1, -1).map(c => c.trim());
            return `<tr class="border-b border-origin-border/50">${cells.map(c => `<td class="p-2">${c}</td>`).join('')}</tr>`;
        }).join('')}</tbody>`;

        return `<div class="my-4 overflow-x-auto bg-origin-bg rounded-md p-2 border border-origin-border"><table class="w-full text-sm">${thead}${tbody}</table></div>`;
    });
    
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(\r\n|\n|\r)/g, '<br />');

    return html.replace(/<br \/>(\s*<br \/>)+/g, '<br />'); // Prevent multiple line breaks
  };

  const sidekickContent = (
      <>
        <div className="flex items-center justify-between p-4 border-b border-origin-border flex-shrink-0">
          <div className="flex items-center">
            <span className="text-origin-primary">{ICONS.sidekick}</span>
            <h2 className="ml-2 text-lg font-bold text-white">AI Advisor</h2>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-origin-text-secondary hover:text-white text-2xl lg:hidden">&times;</button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-origin-primary text-white' : 'bg-origin-component-bg text-origin-text-primary border border-origin-border'}`}>
                 <div className="text-sm prose" dangerouslySetInnerHTML={{ __html: formattedText(msg.text) }} />
              </div>
            </div>
          ))}
          {isLoading && (
              <div className="flex justify-start">
                  <div className="max-w-xs md:max-w-md rounded-lg px-4 py-2 bg-origin-component-bg text-origin-text-secondary border border-origin-border">
                      <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-origin-primary rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-origin-primary rounded-full animate-pulse [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 bg-origin-primary rounded-full animate-pulse [animation-delay:0.4s]"></div>
                      </div>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-origin-border flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a follow up..."
              disabled={isLoading}
              className="w-full bg-origin-component-bg border border-origin-border rounded-lg py-3 pl-4 pr-12 text-white placeholder-origin-text-secondary focus:outline-none focus:ring-2 focus:ring-origin-primary"
            />
            <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="absolute right-3 top-1/2 -translate-y-1/2 text-origin-text-secondary hover:text-origin-primary disabled:text-origin-text-tertiary">
              {ICONS.send}
            </button>
          </div>
        </div>
      </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-96 bg-origin-bg flex-col border-l border-origin-border hidden lg:flex">
        {sidekickContent}
      </aside>

      {/* Mobile Modal */}
      {isMobileOpen && (
         <div className="lg:hidden fixed inset-0 z-50 bg-origin-bg flex flex-col animate-fade-in">
           {sidekickContent}
         </div>
      )}
       <style>{`.animate-fade-in { animation: fadeIn 0.3s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
    </>
  );
};