import type { ConfigPackage } from "./files.list.types";

export const packageFileDict: ConfigPackage[] = [
  { formName: "prettier", packages: ["prettier", "@boehringer-ingelheim/prettier-config"] },
  { formName: "eslint", packages: ["eslint", "@boehringer-ingelheim/eslint-config"] },
];
