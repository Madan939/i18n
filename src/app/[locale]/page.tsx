import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "landing" });

  return {
    title: t("metaTitle"),
  };
}

export default function LandingPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = useTranslations("landing");

  return (
    <section>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </section>
  );
}
