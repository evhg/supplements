import fs from "node:fs";
import path from "node:path";
import Experience from "@/components/Experience";

export default function Page() {
  // inline the logo once, so the intro can draw its strokes
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "logo.svg"), "utf8");
  return <Experience logoSvg={logo} />;
}
