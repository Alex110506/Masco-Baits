import { Helmet } from "react-helmet-async";

export default function Canonical({ url }) {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
