import React, { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
    // Initialize Google Analytics or other logic here
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '16px',
      zIndex: 9999,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
          Website-ul nostru folosește cookie-uri pentru a îmbunătăți experiența ta, inclusiv Google Analytics și salvarea ID-ului și username-ului utilizatorului la logare. Prin continuarea navigării, îți exprimi acordul.
        </p>
        <button
          onClick={acceptCookies}
          style={{
            backgroundColor: '#22c55e',
            color: '#ffffff',
            fontSize: '14px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
