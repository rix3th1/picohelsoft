export function useModalVerifySecurityPinOpen() {
  return useState('modal-verify-security-pin', () => ({
    isOpen: false,
    employeeId: ''
  }))
}
