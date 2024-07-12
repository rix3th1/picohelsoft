export function useModalSecurityPinOpen() {
  return useState('modal-security-pin', () => ({
    isOpen: false
  }))
}
