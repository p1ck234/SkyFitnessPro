module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Используем парсер для TypeScript
  parserOptions: {
    ecmaVersion: 'latest', // Поддержка последней версии ECMAScript
    sourceType: 'module', // Использование модульной системы ES
    ecmaFeatures: {
      jsx: true, // Поддержка JSX
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Рекомендованные правила для TypeScript
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // Автоматическое определение версии React
    },
  },
  plugins: ['@typescript-eslint', 'react-refresh'], // Подключение плагинов
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'], // Предупреждение о неиспользуемых переменных
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключение необходимости явного указания типов в функциях
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Отключение проверки PropTypes (в TypeScript это не нужно)
  },
};
