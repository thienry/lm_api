export interface Usecase<T, K> {
  execute: (input: T) => K | Promise<K>
}
