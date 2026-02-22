import { Helmet } from "react-helmet-async";

export default function CanonicalHome({ url }) {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      <title>Masco Baits - Boilies și produse pentru pescuit sportiv</title>
      <meta name="description" content="Masco Baits vinde boilies și accesorii premium pentru pescuit la crap, ideale pentru pescari pasionați ce caută performanță și fiabilitate la fiecare partidă."></meta>
      <meta property="og:url" content="https://www.masco-baits.ro/"></meta>
      <meta property="og:title" content="Masco Baits | Boilies și produse pentru pescuit sportiv"></meta>
      <meta property="og:description" content="Descoperă boilies și accesorii de calitate pentru pescuit sportiv la crap. Masco Baits - pasiune pentru pescuit."></meta>
      <meta property="og:image" content="https://www.masco-baits.ro/images/social-preview.jpg"></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:url" content="https://www.masco-baits.ro/"></meta>
      <meta name="twitter:title" content="Masco Baits | Boilies și produse pentru pescuit sportiv"></meta>
      <meta name="twitter:description" content="Descoperă boilies și accesorii de calitate pentru pescuit sportiv la crap. Masco Baits - pasiune pentru pescuit."></meta>
      <meta name="twitter:image" content="https://www.masco-baits.ro/images/social-preview.jpg"></meta>
    </Helmet>
  );
}