export function useVerticalNavigationUI() {
  return {
    ui: {
      font: 'uppercase',
      active:
        'text-purple-700 before:bg-purple-100 dark:text-white dark:before:bg-purple-500',
      inactive:
        'text-purple-500 hover:text-purple-700 hover:before:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-500 dark:hover:before:bg-purple-300/10',
      icon: {
        active: 'text-purple-700 dark:text-white',
        inactive:
          'text-purple-500 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-500'
      }
    }
  }
}
