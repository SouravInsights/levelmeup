import { Parser } from "./base-parser";
import { frontendParser } from "./engineering/frontend";
import { backendParser } from "./engineering/backend";
import { fullstackParser } from "./engineering/fullstack";
import { corporateParser } from "./legal/corporate";
import { ipParser } from "./legal/intellectual-property";
import { detectRole } from "./detect-role";

export function getParser(text: string): Parser {
  const role = detectRole(text);

  const parsers: Record<string, Parser> = {
    frontend: frontendParser,
    backend: backendParser,
    fullstack: fullstackParser,
    "legal-corporate": corporateParser,
    "legal-ip": ipParser,
  };

  const parser = parsers[role];
  if (!parser) {
    throw new Error(`No parser found for role: ${role}`);
  }

  return parser;
}
