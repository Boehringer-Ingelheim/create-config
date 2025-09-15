import type { ConfigPackage } from './files.list.types';

export const packageFileDict: ConfigPackage[] = [
  { formName: 'prettier', packages: ['prettier', '@boehringer-ingelheim/prettier-config'] },
  { formName: 'eslint', packages: ['eslint', '@boehringer-ingelheim/eslint-config'] },
  {
    formName: 'eslint + prettier',
    packages: [
      'eslint',
      '@boehringer-ingelheim/eslint-config',
      'prettier',
      '@boehringer-ingelheim/prettier-config',
      'eslint-plugin-prettier',
    ],
  },
];
