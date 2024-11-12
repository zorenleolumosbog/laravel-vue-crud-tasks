<template>
    <div class="flex flex-wrap justify-end p-4 bg-white rounded-lg shadow-md gap-3 mb-3">
        <div class="w-full sm:w-auto">
            <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
            <select v-model="priority" class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>None</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
            </select>
        </div>

        <div class="w-full sm:w-auto">
            <label for="completed_date" class="block text-sm font-medium text-gray-700">Completed Date</label>
            <div class="flex space-x-2">
                <input type="date" v-model="completedAtFrom" class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40" placeholder="Start Date">
                <input type="date" v-model="completedAtTo" class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40" placeholder="End Date">
            </div>
        </div>

        <div class="w-full sm:w-auto">
            <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date</label>
            <div class="flex space-x-2">
                <input type="date" v-model="dueDateFrom" class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40" placeholder="Start Date">
                <input type="date" v-model="dueDateTo" class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40" placeholder="End Date">
            </div>
        </div>

        <div class="w-full sm:w-auto">
            <label for="archived_date" class="block text-sm font-medium text-gray-700">Archived Date</label>
            <div class="flex space-x-2">
                <input type="date" v-model="archivedAtFrom" class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40" placeholder="Start Date">
                <input type="date" v-model="archivedAtTo" class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40" placeholder="End Date">
            </div>
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto mt-5 cursor-pointer">
            <button @click="applyFilterTasks" type="submit" class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Apply Filters</button>
            <span @click="applyResetFilterTasks" title="Reset" class="block">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter-x"><path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/></svg>
            </span>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const emit = defineEmits(['filter-tasks']);

    const priority = ref('')
    const dueDateFrom = ref('')
    const dueDateTo = ref('')
    const completedAtFrom = ref('')
    const completedAtTo = ref('')
    const archivedAtFrom = ref('')
    const archivedAtTo = ref('')

    const applyFilterTasks = () => {
        emit('filter-tasks', {
            [`filter[priority]`]: priority.value,
            due_date_from: dueDateFrom.value,
            due_date_to: dueDateTo.value,
            completed_at_from: completedAtFrom.value,
            completed_at_to: completedAtTo.value,
            archived_at_from: archivedAtFrom.value,
            archived_at_to: archivedAtTo.value,
        });
    }

    const applyResetFilterTasks = () => {
            priority.value = ''
            dueDateFrom.value = ''
            dueDateTo.value = ''
            completedAtFrom.value = ''
            completedAtTo.value = ''
            archivedAtFrom.value = ''
            archivedAtTo.value = ''

            emit('filter-tasks', null);
    }
</script>