import stylistic from '@stylistic/eslint-plugin'
import { plugin as shadcn } from '@shadcn/lint'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'node_modules/',
    'dist/',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'eslint.config.mjs',
    '**/*.css'
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      shadcn: {
        note: 'See DESIGN.md for design rules and approved exceptions.'
      }
    },
    plugins: { shadcn },
    rules: {
      'shadcn/no-raw-colors': [
        'error',
        {
          message:
            'Use a semantic color token from DESIGN.md (bg-bg-*, fill-fill-*, bg-control-*, text-text-*, border-border-gray).'
        }
      ],
      'shadcn/no-arbitrary-values': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/\\btext-text-quaternary\\b/]',
          message:
            'Do not use text-text-quaternary in product UI. Use text-text-primary, text-text-secondary, or text-text-tertiary (DESIGN.md › Color).'
        },
        {
          selector:
            'Literal[value=/\\b(bg|text|border|fill|stroke|ring)-(chart-other|dot-grid|shadow-ring-1|shadow-ring-2|shadow-stroke|shadow-1|shadow-2|shadow-red-1|shadow-red-2|shadow-red-3)\\b/]',
          message:
            'Reference --color-chart-other, --color-dot-grid, and --color-shadow-* exclusively with var(), never as Tailwind utility classes (DESIGN.md › Color).'
        },
        {
          selector:
            'Literal[value=/shadow-(low|medium|high)(?!-borderless)\\b.*\\b(border|ring)(-1|-border|-gray)?\\b|\\b(border|ring)(-1|-border|-gray)?\\b.*shadow-(low|medium|high)(?!-borderless)\\b/]',
          message:
            'Regular shadow tokens (shadow-low, shadow-medium, shadow-high) already include their border. Do not add a separate neutral border or ring (DESIGN.md › Surfaces).'
        },
        {
          selector: 'Literal[value=/shadow-high-(hover|focus)\\b/]',
          message:
            'shadow-high has no interaction states. Only shadow-low and shadow-medium support -hover and -focus (DESIGN.md › Surfaces).'
        },
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/\\buppercase\\b/], CallExpression[callee.name=/^(cn|cva)$/] Literal[value=/\\buppercase\\b/]",
          message:
            'Never use uppercase text in the UI. Use natural sentence or title case with semantic text color tokens instead (DESIGN.md › Typography).'
        },
        {
          selector:
            'Literal[value=/\\btext-(title|body|paragraph)-[a-z-]+\\b.*\\b(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|leading-[a-z0-9-]+)\\b|\\b(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|leading-[a-z0-9-]+)\\b.*\\btext-(title|body|paragraph)-[a-z-]+\\b/]',
          message:
            'Type tokens (text-title-*, text-body-*, text-paragraph-*) set size, line height, and weight together. Use the token on its own without separate font-* weight or leading-* utilities (DESIGN.md › Typography).'
        },
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/\\btext-(xs|sm|base|lg|xl|[2-9]xl)\\b/], CallExpression[callee.name=/^(cn|cva)$/] Literal[value=/\\btext-(xs|sm|base|lg|xl|[2-9]xl)\\b/]",
          message:
            'Use semantic typography tokens (text-title-*, text-body-*, text-paragraph-*) instead of raw Tailwind text-size utilities (DESIGN.md › Typography).'
        }
      ],
      'shadcn/no-restyle': [
        'warn',
        {
          allow: ['layout'],
          contracts: [
            { pattern: '^(Card|CardHeader|CardContent|CardFooter)$', allow: ['layout', 'spacing'] },
            { pattern: '^Card(Title|Description)$', allow: ['layout', 'typography'] },
            { pattern: '^(Field|FieldGroup)$', allow: ['layout', 'spacing'] },
            { pattern: '^Table(Head|Cell)?$', allow: ['layout', 'spacing', 'typography'] },
            { pattern: '^Frame(Header|Footer|Panel|Title|Description)$', allow: ['layout', 'spacing', 'typography'] },
            { pattern: '^(FieldLabel|Label|TimelineHeading)$', allow: ['layout', 'spacing', 'typography'] },
            {
              pattern:
                '^(DialogHeader|SheetHeader|SheetFooter|TimelineItem|TimelineContent|TimelineLine|Tabs|TabsList)$',
              allow: ['layout', 'spacing']
            }
          ]
        }
      ]
    }
  },
  {
    files: ['src/components/ui/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'shadcn/no-restyle': 'off',
      'shadcn/no-arbitrary-values': 'off'
    }
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'react/display-name': 'off',
      'react/no-children-prop': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@stylistic/lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
          allowInterfaceStart: true,
          allowTypeStart: true
        }
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'any',
          prev: 'export',
          next: 'export'
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['function', 'multiline-const', 'multiline-block-like']
        },
        {
          blankLine: 'always',
          prev: ['function', 'multiline-const', 'multiline-block-like'],
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        }
      ],
      'import/newline-after-import': [
        'error',
        {
          count: 1
        }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], ['object', 'unknown']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next/** | next',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '~/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always-and-inside-groups'
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        node: {},
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
])

export default eslintConfig
