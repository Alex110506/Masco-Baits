import React, { useEffect } from "react";

export default function CanonicalRedirect() {
  useEffect(() => {
    if (window.location.hostname === "masco-baits.ro") {
      const newUrl = `https://www.masco-baits.ro${window.location.pathname}${window.location.search}`;
      window.location.replace(newUrl);
    }
  }, []);

  return null;
}
