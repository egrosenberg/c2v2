import { getSiteName } from "@/lib/siteDetails";

export type CardMetaProps = {
  title: string;
  description?: string;
  image?: string;
  type?: "text" | "image";
};

export function CardMeta({ title, description, image, type }: CardMetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content={getSiteName()} />
      <meta property="og:image" content={image} />
      {(() => {
        if (type === "image") {
          return <meta name="twitter:card" content="summary_large_image" />;
        }
      })()}
    </>
  );
}
