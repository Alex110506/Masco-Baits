import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function loader(){
    throw new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Pagina nu a fost găsită | Masco Baits</title>
        <link rel="canonical" href="https://masco-baits-production.up.railway.app/404" />
      </Helmet>

      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <p>Ne pare rău, pagina căutată nu există.</p>
          <Link to="/" className="not-found-button">
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </>
  );
}
