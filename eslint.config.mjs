import boehringer from '@boehringer-ingelheim/eslint-config';

export default boehringer.config(
  boehringer.configs.strict,
  {
    ignores: ["files/*", "dist/*", ".commitlintrc.cjs", ".prettierrc.cjs", ".releaserc.cjs"]
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '*.*js',
            '.*.*js',
            'files/*.*js',
            'files/.*.*js'
          ]
        }
      }
    }
  }
)
