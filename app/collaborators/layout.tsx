import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborators",
  description: "Meet the musicians and collaborators who bring Skyler Bates music to life.",
};

export default function CollaboratorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
