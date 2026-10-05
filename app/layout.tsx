import "./globals.css";
import GameApp from "./game";

export const metadata = {
  title: "Lagos Life Sim",
  description: "Realistic multiplayer life simulation game set in Lagos, Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GameApp />
      </body>
    </html>
  );
}
