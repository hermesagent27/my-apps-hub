<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div v-if="!authed" class="w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">my-apps.space</h1>
      <form @submit.prevent="login">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="w-full px-4 py-3 rounded bg-slate-800 border border-slate-700 mb-3"
        />
        <button
          type="submit"
          class="w-full px-4 py-3 rounded bg-indigo-600 hover:bg-indigo-500"
        >
          enter
        </button>
      </form>
      <p v-if="error" class="text-red-400 text-sm mt-2">{{ error }}</p>
    </div>

    <div v-else class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">apps</h1>
      <div class="grid gap-3">
        <a
          v-for="app in apps"
          :key="app.url"
          :href="app.url"
          class="block p-4 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700"
        >
          <span class="font-bold">{{ app.name }}</span>
          <span class="text-slate-400 text-sm ml-2">{{ app.desc }}</span>
        </a>
      </div>
      <button
        @click="logout"
        class="mt-6 w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700"
      >
        logout
      </button>
    </div>
  </div>
</template>

<script setup>
const password = ref('')
const authed = ref(false)
const error = ref('')

const apps = [
  { name: 'jobs', url: 'https://jobs.my-apps.space', desc: 'job tracker' },
  { name: 'races', url: 'https://races.my-apps.space', desc: 'horse racing' },
  { name: 'budget', url: 'https://budget.my-apps.space', desc: 'budget tracker' },
  { name: 'buglog', url: 'https://buglog.my-apps.space', desc: 'bug collection' },
  { name: 'stocks', url: 'https://stocks.my-apps.space', desc: 'stock tracker' }
]

onMounted(async () => {
  try {
    const res = await $fetch('/api/auth/check')
    authed.value = res.authed
  } catch {}
})

async function login() {
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { password: password.value }
    })
    authed.value = true
  } catch (e) {
    error.value = 'wrong password'
  }
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  authed.value = false
}
</script>
