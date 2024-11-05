<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-4 text-center">Task Manager</h1>

        <TaskForm @add-task="addTask" />

        <div class="flex justify-center space-x-4 mt-4">
        <button @click="filterTasks('all')" :class="buttonClass('all')">All</button>
        <button @click="filterTasks('completed')" :class="buttonClass('completed')">Completed</button>
        <button @click="filterTasks('pending')" :class="buttonClass('pending')">Pending</button>
        </div>

        <TaskList :tasks="filteredTasks" @update-task="updateTask" @delete-task="deleteTask" />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import axios from 'axios';
    import TaskForm from '@/components/TaskForm.vue';
    import TaskList from '@/components/TaskList.vue';

    const tasks = ref([]);
    const filter = ref('all');

    const fetchTasks = async () => {
        const response = await axios.get('/tasks');
        tasks.value = response.data;
    };

    const addTask = async (task) => {
    const response = await axios.post('/tasks', task);
        tasks.value.push(response.data);
    };

    const updateTask = async (updatedTask) => {
        await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
        const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
            tasks.value[index] = updatedTask;
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`/tasks/${id}`);
        tasks.value = tasks.value.filter(task => task.id !== id);
    };

    const filterTasks = (status) => {
        filter.value = status;
    };

    const filteredTasks = computed(() => {
        if (filter.value === 'all') return tasks.value;
            return tasks.value.filter(task => task.status === filter.value);
    });

    const buttonClass = (status) => 
    `px-4 py-2 rounded ${filter.value === status ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`;

    onMounted(fetchTasks);
</script>

<style scoped>
/* Add additional custom styling here if needed */
</style>