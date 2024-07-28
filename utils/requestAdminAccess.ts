export function requestAdminAccess(to: string) {
  useSlideover().close()
  const isOpen = useModalAccessOpen()
  isOpen.value.isOpen = true
  isOpen.value.to = to
}
