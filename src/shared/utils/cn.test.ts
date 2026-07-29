import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('handles basic string class names', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  it('ignores falsy values (false, null, undefined, 0, empty string)', () => {
    expect(cn('btn', false, null, undefined, 0, '', 'active')).toBe('btn active');
  });

  it('supports object conditional syntax', () => {
    expect(
      cn('btn', {
        'btn-active': true,
        'btn-disabled': false,
        'btn-large': 1 > 0,
      })
    ).toBe('btn btn-active btn-large');
  });

  it('supports nested arrays and mixed types recursively', () => {
    expect(
      cn('foo', ['bar', { baz: true, qux: false }], [null, ['nested']])
    ).toBe('foo bar baz nested');
  });
});
