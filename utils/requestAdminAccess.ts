export function closeNavSlideover() {
  const slideover = useSlideover()
  slideover.close()
}

export function requestAdminAccess(to: string) {
  const route = useRoute()

  if (to === route.path) {
    return
  }

  closeNavSlideover()
  const isOpen = useModalAccessOpen()
  isOpen.value.isOpen = true
  isOpen.value.to = to
}
