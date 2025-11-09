import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "../../i18n/routing";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Define the namespaces explicitly (strong typing)
const namespaces = ["landing", "about"] as const;
type Namespace = (typeof namespaces)[number];

// Map each namespace to its messages
type NamespaceMessages = Record<Namespace, AbstractIntlMessages>;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load all namespaces with proper types
  const messages: NamespaceMessages = {} as NamespaceMessages;

  for (const ns of namespaces) {
    try {
      const nsModule = await import(`../../../messages/${locale}/${ns}.json`);
      messages[ns] = nsModule.default;
    } catch {
      messages[ns] = {};
    }
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
