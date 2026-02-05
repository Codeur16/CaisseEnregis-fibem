import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import SearchModal from "@/components/modals/SearchModal";
import { I18nProviderClient } from "@/locales/client";

export const metadata: Metadata = {
  title: "FIBEM - Services Professionnels & Recrutement",
  description:
    "Plateforme de mise en relation professionnelle, recrutement et services aux entreprises - France & Sénégal",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className="font-sans"
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        <SessionProvider>
          <ReactQueryProvider>
            <I18nProviderClient locale="fr">
              {children}
              <SearchModal />
            </I18nProviderClient>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
