<template>
    <form @submit.prevent="handleSubmit" class="mb-4">
        <input
        v-model="title"
        placeholder="Task Title"
        class="border p-2 w-full mb-2 rounded text-black"
        required/>
        <textarea
        v-model="description"
        placeholder="Task Description"
        class="border p-2 w-full mb-2 rounded text-black"
        ></textarea>
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Add Task
        </button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    const title = ref('');
    const description = ref('');

    const emit = defineEmits(['add-task']);
    const handleSubmit = () => {
        if (!title.value) return;
        emit('add-task', { title: title.value, description: description.value });
        title.value = '';
        description.value = '';
    };
</script>