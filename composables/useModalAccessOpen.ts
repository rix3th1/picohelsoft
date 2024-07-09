export function useModalAccessOpen() {
  return useState('modal-access-open', () => ({
    isOpen: false,
    to: ''
  }))
}
