import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import createAppContext from './createAppContext';
import { ReactNode } from 'react';

describe('createAppContext', () => {
  it('restituisce correttamente il valore se usato all\'interno del Provider', () => {
    const [MyContext, useMyContext] = createAppContext<string>('MyContext');
    
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MyContext.Provider value="valore-iniettato">
        {children}
      </MyContext.Provider>
    );

    const { result } = renderHook(() => useMyContext(), { wrapper });
    expect(result.current).toBe('valore-iniettato');
  });

  it('lancia un errore con messaggistica chiara se usato fuori dal Provider (con nome esplicito)', () => {
    const [, useAuthContext] = createAppContext<string>('AuthContext');
    
    // Sopprimiamo momentaneamente console.error per evitare noise nei log generati dall'Error Boundary di React
    const originalError = console.error;
    console.error = () => {};
    
    expect(() => renderHook(() => useAuthContext()))
      .toThrowError('useAuthContext must be used within an AuthContextProvider');
    
    console.error = originalError;
  });

  it('lancia un errore generico se usato fuori dal Provider (senza nome esplicito)', () => {
    const [, useNamelessContext] = createAppContext<string>();
    
    const originalError = console.error;
    console.error = () => {};
    
    expect(() => renderHook(() => useNamelessContext()))
      .toThrowError('useContext must be used within its Provider');
    
    console.error = originalError;
  });
});
