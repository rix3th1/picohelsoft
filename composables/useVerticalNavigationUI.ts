export function useVerticalNavigationUI() {
  return {
    ui: {
      font: 'uppercase',
      active:
        'text-primary-700 before:bg-primary-100 dark:text-white dark:before:bg-primary-500',
      inactive:
        'text-primary-500 hover:text-primary-700 hover:before:bg-primary-50 dark:text-primary-400 dark:hover:text-primary-500 dark:hover:before:bg-primary-300/10',
      icon: {
        active: 'text-primary-700 dark:text-white',
        inactive:
          'text-primary-500 group-hover:text-primary-700 dark:text-primary-400 dark:group-hover:text-primary-500'
      }
    }
  }
}
