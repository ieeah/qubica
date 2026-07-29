import { describe, it, expect } from 'vitest';
import { buildQueryString } from './buildQueryString';

describe('buildQueryString', () => {
  it('ritorna una stringa vuota se non vengono passati parametri', () => {
    expect(buildQueryString()).toBe('');
    expect(buildQueryString({})).toBe('');
  });

  it('formatta correttamente parametri validi', () => {
    const params = { limit: 10, sort: 'desc' };
    expect(buildQueryString(params)).toBe('?limit=10&sort=desc');
  });

  it('effettua correttamente l\'escaping degli spazi e dei caratteri speciali', () => {
    const params = { search: 't shirt', special: 'foo=bar' };
    expect(buildQueryString(params)).toBe('?search=t+shirt&special=foo%3Dbar');
  });

  it('ignora i valori undefined, null e stringhe vuote', () => {
    const params = { limit: 10, sort: undefined, filter: null, search: '', active: true };
    expect(buildQueryString(params)).toBe('?limit=10&active=true');
  });
});
