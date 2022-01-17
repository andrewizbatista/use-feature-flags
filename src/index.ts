import { FeatureFlagsMatrix, EnvMatrix, CreateFeatureFlagsMatrix } from './types';

/**
 * Function that creates the `useFeatureFlags` hook.
 */
export const createFeatureFlags = <E extends string, F extends string>(
  env: E,
  matrix: CreateFeatureFlagsMatrix<E, F>,
): CreateFeatureFlags<F> => {
  type FFM = FeatureFlagsMatrix<F>;
  type EM = EnvMatrix<E>;

  const featureFlags: Partial<FFM> = {};

  const keys: F[] = (Object.keys(matrix) as F[]) || [];

  /**
   * Compute the final feature flag matrix based on
   * the current environment.
   */
  for (let i = 0, ii = keys.length; i < ii; i++) {
    const flagKey = keys[i];
    const flag = matrix[flagKey];

    if (typeof flag === 'object') {
      featureFlags[flagKey] = (flag as EM)[env];
    } else if (typeof flag === 'boolean') {
      featureFlags[flagKey] = flag;
    }
  }

  return {
    useFeatureFlags: () => featureFlags as FFM,
  };
};

interface CreateFeatureFlags<F extends string> {
  useFeatureFlags: () => FeatureFlagsMatrix<F>;
}

export { FeatureFlagsMatrix, CreateFeatureFlagsMatrix } from './types';
