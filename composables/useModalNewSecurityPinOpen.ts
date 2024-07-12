export function useModalNewSecurityPinOpen() {
  return useState('modal-security-pin', () => ({
    isOpen: false
  }))
}
