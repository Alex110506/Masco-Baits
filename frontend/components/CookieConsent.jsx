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
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          Website-ul nostru folosește cookie-uri pentru a îmbunătăți experiența ta, inclusiv Google Analytics și salvarea ID-ului și username-ului utilizatorului la logare. Prin continuarea navigării, îți exprimi acordul.
        </p>
        <button
          onClick={acceptCookies}
          className="cookie-consent-btn"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
