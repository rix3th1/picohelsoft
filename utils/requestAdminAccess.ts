export async function requestAdminAccess(to: string) {
  const isOpen = useModalAccessOpen()
  isOpen.value.isOpen = true
  isOpen.value.to = to
}
