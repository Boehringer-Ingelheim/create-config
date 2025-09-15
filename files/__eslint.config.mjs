import boehringer from '@boehringer-ingelheim/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  boehringer.configs.strict
)
