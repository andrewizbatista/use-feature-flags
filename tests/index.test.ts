import { renderHook, act } from '@testing-library/react-hooks';
import { createFeatureFlags } from '../src';
import { FeatureFlagMatrix } from '../src/types';

type Envs = 'development' | 'production';
type Flags = 'ALWAYS_TRUE' | 'ALWAYS_FALSE' | 'ONLY_DEV' | 'ONLY_PROD';

const testMatrix: FeatureFlagMatrix<Envs, Flags> = {
  ALWAYS_TRUE: true,
  ALWAYS_FALSE: false,
  ONLY_DEV: {
    development: true,
    production: false,
  },
  ONLY_PROD: {
    development: false,
    production: true,
  },
};

describe('useFeatureFlags', () => {
  /**
   * Environment: `development`
   */
  describe('env=development', () => {
    const { useFeatureFlags } = createFeatureFlags<Envs, Flags>('development', testMatrix);
    const { result } = renderHook(() => useFeatureFlags());
    const { current } = result;

    it('ALWAYS_TRUE=true + ALWAYS_FALSE=false', () => {
      act(() => {
        expect(current.ALWAYS_TRUE).toBe(true);
        expect(current.ALWAYS_FALSE).toBe(false);
      });
    });

    it('ONLY_DEV=true + ONLY_PROD=false', () => {
      act(() => {
        expect(current.ONLY_DEV).toBe(true);
        expect(current.ONLY_PROD).toBe(false);
      });
    });
  });

  /**
   * Environment: `production`
   */
  describe('env=production', () => {
    const { useFeatureFlags } = createFeatureFlags<Envs, Flags>('production', testMatrix);
    const { result } = renderHook(() => useFeatureFlags());
    const { current } = result;

    it('ALWAYS_TRUE=true + ALWAYS_FALSE=false', () => {
      act(() => {
        expect(current.ALWAYS_TRUE).toBe(true);
        expect(current.ALWAYS_FALSE).toBe(false);
      });
    });

    it('ONLY_DEV=false + ONLY_PROD=true', () => {
      act(() => {
        expect(current.ONLY_DEV).toBe(false);
        expect(current.ONLY_PROD).toBe(true);
      });
    });
  });
});
