import boehringer from '@boehringer-ingelheim/eslint-config';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

// See https://github.com/Boehringer-Ingelheim/eslint-config/blob/master/README.md
export default defineConfig(
  boehringer.configs.strict,
  // Should be second to last
  prettier,
  // Should be last
  boehringer.configs.prettierDisable,
);
