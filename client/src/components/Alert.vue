<template>
    <div v-if="isShowAlertMessage" class="absolute top-4 right-4 gap-3 flex items-center p-4 rounded-lg bg-green-100 text-green-700 shadow-lg transition duration-500 transform opacity-100">
        <span class="flex-grow">
            <strong class="mr-1">Success!</strong>{{ alertMessage }}
        </span>
        <button @click="closeAlertMessage" type="button" class="text-green-700 hover:opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>
</template>
<script setup>
    const props = defineProps(['isShowAlertMessage', 'alertMessage']);
    const emit = defineEmits(['close-alert']);

    const closeAlertMessage = () => {
        emit('close-alert')
    }
</script>