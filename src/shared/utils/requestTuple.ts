const requestTuple = async <T,>(promise: Promise<Response>): Promise<[Error | null, T | null]> => {
  try {
    const response = await promise;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return [null, data as T];
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return [err, null];
  }
};
export default requestTuple;