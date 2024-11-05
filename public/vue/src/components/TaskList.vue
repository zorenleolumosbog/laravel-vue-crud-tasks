<template>
    <div>
        <div v-for="task in tasks" :key="task.id" class="p-4 border-b">
        <div v-if="editTaskId === task.id">
            <!-- Edit Form -->
            <input
            v-model="editTitle"
            class="border p-2 w-full mb-2 rounded"
            placeholder="Task Title"
            />
            <textarea
            v-model="editDescription"
            class="border p-2 w-full mb-2 rounded"
            placeholder="Task Description"
            ></textarea>
            <div class="flex space-x-2 mt-2">
            <button @click="saveTask(task)" class="bg-green-500 text-white px-4 py-1 rounded">Save</button>
            <button @click="cancelEdit" class="bg-gray-300 text-gray-700 px-4 py-1 rounded">Cancel</button>
            </div>
        </div>
        <div v-else>
            <!-- Display Task Details -->
            <h3 class="text-lg font-semibold">{{ task.title }}</h3>
            <p class="text-gray-600">{{ task.description }}</p>
            <div class="flex space-x-2 mt-2">
            <button
                @click="toggleStatus(task)"
                :class="['px-4 py-1 rounded', task.status === 'completed' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white']"
            >
                Mark as {{ task.status === 'completed' ? 'Pending' : 'Completed' }}
            </button>
            <button @click="editTask(task)" class="bg-yellow-500 text-white px-4 py-1 rounded">Edit</button>
            <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, toRefs } from 'vue';

    // Define props and emit functions
    const props = defineProps(['tasks']);
    const emit = defineEmits(['update-task', 'delete-task']);

    // Access props as refs
    const { tasks } = toRefs(props);

    // Local state for editing tasks
    const editTaskId = ref(null);
    const editTitle = ref('');
    const editDescription = ref('');

    // Toggle the task status
    const toggleStatus = (task) => {
        const updatedTask = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };
        emit('update-task', updatedTask);
    };

    // Enter edit mode
    const editTask = (task) => {
        editTaskId.value = task.id;
        editTitle.value = task.title;
        editDescription.value = task.description;
    };

    // Save the updated task
    const saveTask = (task) => {
        const updatedTask = {
            ...task,
            title: editTitle.value,
            description: editDescription.value,
        };
        emit('update-task', updatedTask);
        cancelEdit();
    };

    // Cancel edit mode
    const cancelEdit = () => {
        editTaskId.value = null;
        editTitle.value = '';
        editDescription.value = '';
    };

    // Emit delete task event
    const deleteTask = (id) => {
    emit('delete-task', id);
    };
</script>