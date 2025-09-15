import boehringer from '@boehringer-ingelheim/eslint-config';

import { defineConfig } from 'eslint/config';


export default defineConfig(
  boehringer.configs.strict,
  { ignores: ['files/*', 'dist/*', '.commitlintrc.cjs', '.prettierrc.cjs', '.releaserc.cjs'], },
  {
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['*.*js', '.*.*js', 'files/*.*js', 'files/.*.*js'], },
      },
    },
  },
);
