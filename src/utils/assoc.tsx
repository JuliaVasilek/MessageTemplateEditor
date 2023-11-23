export function assoc<K extends string, T extends string>(key: K, value: () => string) {
  return <O extends object>(obj: O) => ({
    ...obj,
    [key]: value()
  }) as K extends keyof O ? (Omit<O, K> & Record<K, T>) : (O & Record<K, T>);
}
