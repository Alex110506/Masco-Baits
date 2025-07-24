import { Helmet } from "react-helmet-async";

export default function Canonical({ url, title }) {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      {title && <title>{title}</title>}
    </Helmet>
  );
}
