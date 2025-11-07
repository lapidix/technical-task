import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // * Barrel exports 강제: index.ts를 통한 import만 허용
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/*/!(index)",
                "@/features/*/!(index).ts",
                "@/entities/*/!(index)",
                "@/entities/*/!(index).ts",
                "@/shared/*/!(index)",
                "@/shared/*/!(index).ts",
                "@/widget/*/!(index)",
                "@/widget/*/!(index).ts",
                "@/pages/*/!(index)",
                "@/pages/*/!(index).ts",
                "@/app/*/!(index)",
                "@/app/*/!(index).ts",
              ],
              message:
                "Use barrel exports from index.ts only. Import from '@/module/feature' instead of '@/module/feature/file'",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
