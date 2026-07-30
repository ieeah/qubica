import { describe, it, expect } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize utility', () => {
  it('uppercases the first letter and keeps the rest unchanged', () => {
    expect(capitalize('electronics')).toBe('Electronics');
  });

  it('leaves an already-capitalized string unchanged', () => {
    expect(capitalize('Jewelery')).toBe('Jewelery');
  });

  it('returns an empty string as-is', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles single-character strings', () => {
    expect(capitalize('a')).toBe('A');
  });
});
