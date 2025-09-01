'use client';
import Script from 'next/script';

const Chatbot = () => {
  return (
    <>
      <Script
        src="https://cdn.jotfor.ms/agent/embedjs/01990766d3e67ce197a37ef0bec7e46b2bad/embed.js"
        strategy="afterInteractive"
      />
      {/* Optional div in case you want to add custom positioning */}
      <div className="fixed bottom-5 right-5 z-50"></div>
    </>
  );
};

export default Chatbot;
