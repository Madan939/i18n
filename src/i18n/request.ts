import { getRequestConfig } from "next-intl/server";
import { hasLocale, AbstractIntlMessages } from "next-intl";
import { routing } from "./routing";

type NamespaceMessages = Record<string, AbstractIntlMessages>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const namespaces = ["landing", "about"] as const;
  const messages: NamespaceMessages = {};

  for (const ns of namespaces) {
    try {
      const nsModule = await import(`../../messages/${locale}/${ns}.json`);
      messages[ns] = nsModule.default;
    } catch {
      messages[ns] = {};
    }
  }

  return {
    locale,
    messages,
  };
});
