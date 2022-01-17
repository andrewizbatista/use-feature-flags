/**
 * Matrix
 */
type Matrix<T extends string> = Record<T, boolean>;

/**
 * EnvMatrix
 */
export type EnvMatrix<E extends string> = Matrix<E>;

/**
 * FeatureFlagsMatrix
 */
export type FeatureFlagsMatrix<F extends string> = Matrix<F>;

/**
 * CreateFeatureFlagsMatrix
 */
export type CreateFeatureFlagsMatrix<E extends string, F extends string> = Record<
  F,
  boolean | EnvMatrix<E>
>;
