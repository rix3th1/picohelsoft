import { defineStore } from 'pinia'

export interface SignInPayload {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false
  }),
  actions: {
    async signIn({ username, password }: SignInPayload) {
      this.loading = true

      try {
        const res = await $fetch('/api/auth', {
          method: 'POST',
          body: { username, password }
        })

        if (res.jwt && res.user) {
          const token = useCookie('token')
          token.value = res.jwt
          this.authenticated = true
        }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    signOut() {
      const token = useCookie('token')
      this.authenticated = false
      token.value = null
    }
  }
})
