<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form class="px-5 py-7" @submit.prevent="register">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input id="email" v-model="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 px-3 py-2 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                            <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.email">{{ error }}</span>
                        </div>
                    </div>
            
                    <div>
                        <div class="flex items-center justify-between mt-4">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div class="mt-2">
                            <input id="password" v-model="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 px-3 py-2 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                            <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.password">{{ error }}</span>
                        </div>
                    </div>
        
                    <div>
                        <div class="flex items-center justify-between mt-4">
                            <label for="password-confirmation" class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                        </div>
                        <div class="mt-2">
                            <input id="password-confirmation" v-model="password_confirmation" type="password" autocomplete="password-confirmation" required class="block w-full rounded-md border-0 px-3 py-2 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
        
                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 mt-5 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                    </div>
                </form>
        
                <p class="py-3 text-center text-sm/6 text-gray-500">
                Existing member?
                {{ ' ' }}
                <RouterLink class="font-semibold text-indigo-600 hover:text-indigo-500" to="/">Login</RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const errors = ref([])

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const register = async () => {
        try {
            const response = await axios.post('/auth/register', {
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value
            })

            storeToken(response.data.token)
            router.push('/tasks')
        } catch (error) {
            if (error.response && error.response.data.errors) {
                errors.value = error.response.data.errors
            } else {
                alert(`Error login: ${error}`)
            }
        }
    }
</script>
  