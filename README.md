<div align="center">

# `use-feature-flags`

React hook that manages feature flags.

![use-feature-flags version](https://img.shields.io/npm/v/@andrewizbatista/use-feature-flags?style=flat-square&color=yellow&label=NPM) ![use-feature-flags license](https://img.shields.io/npm/l/@andrewizbatista/use-feature-flags?style=flat-square&color=green&label=License)

![created by @andrewizbatista](https://img.shields.io/badge/Created%20By-@andrewizbatista-crimson?style=flat-square)

</div>

## <a name="index"></a>Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [1. Setup your Feature Flags](#usage/1)
  - [2. Use the `useFeatureFlags` hook](#usage/2)
- [Contributing](#contributing)
- [License](#license)

## <a name="getting-started"></a>Getting Started

#### [`yarn`](https://yarnpkg.com/package/@andrewizbatista/use-feature-flags)

```
yarn add @andrewizbatista/use-feature-flags
```

#### [`npm`](https://www.npmjs.com/package/@andrewizbatista/use-feature-flags)

```
npm install @andrewizbatista/use-feature-flags
```

## <a name="usage"></a>Usage

### <a name="usage/1"></a>1. Setup your Feature Flags

Create a file to initialize your feature flags (eg: `src/feature-flags.ts`) export the `useFeatureFlags` hook that is generated by the `createFeatureFlags`.

Don't forget to properly define `Envs` and `FeatureFlags` types to take full advantage of TypeScript.

```ts
// src/feature-flags.ts

import { createFeatureFlags } from '@andrewizbatista/use-feature-flags';

/**
 * List of environments your app supports
 */
type Envs = 'development' | 'stagging' | 'production';

/**
 * List of feature flags your app supports
 */
type FeatureFlags = 'FLAG_1' | 'FLAG_2' | 'FLAG_3';

/**
 * Environment variable
 */
const ENV = process.env.NODE_ENV;

/**
 * Create and export the `useFeatureFlags` hook
 */
export const { useFeatureFlags } = createFeatureFlags<Envs, FeatureFlags>(ENV, {
  /**
   * Enabled on every environment
   */
  FLAG_1: true,
  /**
   * Disabled on every environment
   */
  FLAG_2: false,
  /**
   * Enable/Disable per environment
   */
  FLAG_3: {
    development: true,
    stagging: true,
    production: false,
  },
});
```

### <a name="usage/2"></a>2. Use the `useFeatureFlags` hook

You can access your feature flags using the `useFeatureFlags` hook anywhere on your app.

```tsx
import { useFeatureFlags } from 'src/feature-flags';

const Page = ({ children }) => {
  const { NAVIGATION_V2 } = useFeatureFlags();

  return (
    <Layout>
      {NAVIGATION_V2 ? <NavigationV2 /> : <Navigation />}
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};
```

## <a name="contributing"></a>Contributing

Want to help? Feel free to open an [Issue](https://github.com/andrewizbatista/use-feature-flags/issues) or create a [Pull Request](https://github.com/andrewizbatista/use-feature-flags/pulls) and let's get started ????

## <a name="license"></a>License

[MIT](https://github.com/andrewizbatista/use-feature-flags/blob/main/LICENSE) ?? Andr?? Batista ([@andrewizbatista](https://github.com/andrewizbatista))
