import { Matrix, FeatureFlagMatrix } from './types';

/**
 * Function that creates the `useFeatureFlags` hook.
 */
export const createFeatureFlags = <E extends string, F extends string>(
  env: E,
  matrix: FeatureFlagMatrix<E, F>,
): CreateFeatureFlags<F> => {
  type MF = Matrix<F>;
  type ME = Matrix<E>;

  const featureFlags: Partial<MF> = {};

  const keys: F[] = (Object.keys(matrix) as F[]) || [];

  for (let i = 0, ii = keys.length; i < ii; i++) {
    const flagKey = keys[i];
    const flag = matrix[flagKey];

    if (typeof flag === 'object') {
      featureFlags[flagKey] = (flag as ME)[env];
    } else if (typeof flag === 'boolean') {
      featureFlags[flagKey] = flag;
    }
  }

  return {
    useFeatureFlags: () => featureFlags as MF,
  };
};

interface CreateFeatureFlags<F extends string> {
  useFeatureFlags: () => Matrix<F>;
}
