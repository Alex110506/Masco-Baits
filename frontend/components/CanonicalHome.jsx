import { Helmet } from "react-helmet-async";

export default function CanonicalHome({ url }) {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
    </Helmet>
  );
}