/**
 * Matrix
 */
export type Matrix<T extends string> = Record<T, boolean>;

/**
 * FeatureFlagMatrix
 */
export type FeatureFlagMatrix<E extends string, F extends string> = Record<F, boolean | Matrix<E>>;
