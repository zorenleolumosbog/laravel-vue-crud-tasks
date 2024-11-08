<template>
    <Alert :isShowAlertMessage="isShowAlertMessage" :alertMessage="alertMessage" @close-alert="closeAlertMessage"></Alert>
    <div class="flex h-screen bg-gray-50">
        <!-- Sidebar -->
        <div class="w-64 p-4 bg-white border-r">
            <div class="flex justify-between">
                <h2 class="flex items-center gap-2 text-lg font-semibold mb-6">
                    <span class="w-5 h-5 rounded flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
                    </span>
                    Todo list
                </h2>
                <!-- Logout Button -->
                <span @click="logout" class="pt-1 cursor-pointer" title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                </span>
            </div>

            <!-- Navigation -->
            <nav class="space-y-1">
                <span @click="applyFilterTaskStatus('incompleted')" class="flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg" :class="[taskStatus == 'incompleted' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50']">
                    <div class="flex items-center gap-3">
                    <span class="w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>
                    </span>
                    <span>Todo</span>
                    </div>
                    <span class="px-2 rounded-full text-sm bg-blue-100">{{ taskStatuses?.incompleteCount }}</span>
                </span>
                <span @click="applyFilterTaskStatus('completed')" class="flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg" :class="[taskStatus == 'completed' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50']">
                    <div class="flex items-center gap-3">
                    <span class="w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>
                    </span>
                    <span>Completed</span>
                    </div>
                    <span class="px-2 rounded-full text-sm bg-gray-100">{{ taskStatuses?.completeCount }}</span>
                </span>
                <span @click="applyFilterTaskStatus('archived')" class="flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg" :class="[taskStatus == 'archived' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50']">
                    <div class="flex items-center gap-3">
                    <span class="w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                    </span>
                    <span>Archive</span>
                    </div>
                    <span class="px-2 rounded-full text-sm bg-gray-100">{{ taskStatuses?.archiveCount }}</span>
                </span>
            </nav>

            <!-- Add New Task Button -->
            <button 
                @click="createNewTask"
                class="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
            >
                <span>+</span>
                Add New Task
            </button>
        </div>

        <div class="flex-1 p-6">
            <div class="flex w-full flex-col gap-4 p-4 mb-6 sm:flex-row sm:items-center">
                <!-- Search Box -->
                <div class="relative">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search Task..."
                        class="w-full pl-4 pr-10 py-2 border rounded-lg"
                    />
                    <span class="absolute right-3 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </span>
                </div>

                <!-- Sorting -->
                <div class="flex flex-1 items-center justify-end sm:flex-auto sm:justify-end mb-2 gap-2">
                    <label for="priority" class="block text-sm font-medium text-gray-700">Sort By</label>
                    <select v-model="priority" class="block mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option v-for="(option, index) in taskSortOptions" :key="index" @click="applySorting(option.sort)">{{ option.label }}</option>
                    </select>
                </div>
            </div>

            <Filter @filter-tasks="applyFilterTasks"></Filter>

            <!-- Pagination -->
            <div v-if="tasks?.meta?.total" class="flex flex-1 items-center justify-center sm:flex-auto sm:justify-end mt-6 mb-2">
                <p class="lmr-3 ml-3 mr-4">{{ tasks?.meta?.from }}-{{ tasks?.meta?.to }} of {{ tasks?.meta?.total }}</p>
                <button @click="setPageNumber(tasks?.links?.prev)" :disabled="!tasks?.links?.prev" type="button" class="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 bg-white-dark/20 enabled:hover:bg-white-dark/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button @click="setPageNumber(tasks?.links?.next)" :disabled="!tasks?.links?.next" type="button" class="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 mr-3 ml-3 bg-white-dark/20 enabled:hover:bg-white-dark/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>

            <!-- Task Items -->
            <div class="rounded-lg border border-gray-200 shadow-md">
                <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Title</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Dates</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Tags</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Piority</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                        <tr v-for="task in tasks?.data" :key="task.id" class="hover:bg-gray-50 ">
                            <th @click="editTask(task)" class="flex gap-3 px-6 py-4 font-normal text-gray-900 cursor-pointer">
                                <div class="text-sm">
                                    <div class="font-medium text-gray-700">{{ task.title }}</div>
                                    <div class="text-gray-400 w-64 truncate">{{ task.description }}</div>
                                </div>
                            </th>
                            <td class="px-6 py-4">
                                <span v-if="task.due_date && !task.archived_at" class="block text-gray-500"><strong>Due:</strong> {{ formatDate(task.due_date) }}</span>
                                <span v-if="task.completed_at && !task.archived_at" class="block text-gray-500"><strong>Completed:</strong> {{ formatDate(task.completed_at) }}</span>
                                <span v-if="task.archived_at" class="block text-gray-500"><strong>Archived:</strong> {{ formatDate(task.archived_at) }}</span>
                                <span v-if="task.created_at" class="block text-gray-500"><strong>Created:</strong> {{ formatDate(task.created_at) }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <span v-for="tag in task.tags" :key="tag.id" class="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">{{ tag.name }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span v-if="task.priority" class="px-3 py-1 rounded-full text-sm" 
                                    :class="[task.priority == 'High' || task.priority == 'Urgent' ? 'bg-red-500 text-white' : ' bg-blue-50 text-blue-600']">{{ task.priority }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex justify-end gap-4">
                                    <div class="relative">
                                        <button @click="openDropdown(task.id)" class="text-gray-400 hover:text-gray-600 p-1 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                        </button>

                                        <div v-if="isOpen && toggledId == task.id" class="absolute bottom-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                                            <button 
                                                @click="editTask(task)"
                                                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></span>
                                                Edit
                                            </button>
                                            
                                            <button 
                                                v-if="taskStatus == 'incompleted'"
                                                @click="completeTask(task.id)"
                                                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"/><path d="m9 11 3 3L22 4"/></svg></span>
                                                Complete
                                            </button>
                                            
                                            <button 
                                                v-if="taskStatus == 'completed'"
                                                @click="incompleteTask(task.id)"
                                                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"/><path d="m9 11 3 3L22 4"/></svg></span>
                                                Incomplete
                                            </button>
                                            
                                            <button 
                                                v-if="taskStatus == 'completed' || taskStatus == 'incompleted'"
                                                @click="archiveTask(task.id)"
                                                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg></span>
                                                Archive
                                            </button>
                                            
                                            <button
                                                v-if="taskStatus == 'archived'"
                                                @click="restoreTask(task.id)"
                                                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-restore"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h2"/><path d="M20 8v11a2 2 0 0 1-2 2h-2"/><path d="m9 15 3-3 3 3"/><path d="M12 12v9"/></svg></span>
                                                Restore
                                            </button>
                                            
                                            <button 
                                                @click="showDeleteConfirmationModal(task)"
                                                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <span class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span>
                                                Delete
                                            </button>
                                        </div>

                                        <div v-if="isOpen && toggledId == task.id" @click="closeDropdown(task.id)" class="fixed inset-0 z-40"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Form 
        v-if="isShowTaskFormModal" 
        :selectedTask="selectedTask"
        :allTags="tags"
        :errors="errors"
        @save-task="saveTask" 
        @update-task="updateTask" 
        @close-task-form-modal="closeTaskFormModal">
    </Form>
    <Modal v-if="isShowDeleteConfirmationModal">
        <template #closeModalButton>
            <h2 class="text-xl font-semibold">Delete Confirmation</h2>
            <button @click="closeDeleteConfirmationModal" class="text-gray-400 hover:text-gray-600">
                <span class="text-2xl">&times;</span>
            </button>
        </template>
        <template #form>
            <h2 class="text-lg mt-3">Are you certain you want to delete this task?</h2>
            <div class="flex justify-end space-x-2 mt-6">
                <button @click="closeDeleteConfirmationModal" type="button" class="px-4 py-1 text-red-500 border border-red-500 rounded">Cancel</button>
                <button @click="deleteTask(selectedTask.id)" type="submit" class="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Delete</button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import Modal from '@/components/Modal.vue';
    import Form from './Form.vue';
    import Alert from '@/components/Alert.vue';
    import Filter from './Filter.vue';
    import axios from 'axios';
    import { watchDebounced } from '@vueuse/core'

    const router = useRouter()
    const authToken = localStorage.getItem('authToken')

    // Tasks Sort Options
    const taskSortOptions = ref([])
    const fetchSortOptions = () => {
        return axios.get('/tasks/sort/options', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
    };

    // Tasks Status Counter
    const taskStatuses = ref([]);
    const fetchTaskStatuses = () => {
        return axios.get('/tasks/count/statuses', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
    };

    // Tags
    const tags = ref([]);
    const fetchTags = () => {
        return axios.get('/tags', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
    };

    // Tasks
    const tasks = ref([])

    const searchQuery = ref('')
    const selectedTask = ref({})
    const selectedFilters = ref({})
    const selectedSort = ref('')
    const taskStatus = ref('incompleted')
    const alertMessage = ref('')
    const errors = ref([])

    const defaultPageNumber = 1
    const defaultPageLimit = 8
    const pageNumber = ref(defaultPageNumber)
    const pageLimit = ref(defaultPageLimit)

    const fetchTasks = () => {
        return axios.get('/tasks', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    page: pageNumber.value,
                    limit: pageLimit.value,
                    [`filter[search]`]: searchQuery.value,
                    status: taskStatus.value,
                    ...selectedFilters.value,
                    sort: selectedSort.value
                },
            });
    };

    watchDebounced(
        searchQuery,
        () => {
            if(searchQuery.value && searchQuery.value.trim() !== '') {
                pageNumber.value = null;
                pageLimit.value = null;
            } else {
                pageNumber.value = defaultPageNumber;
                pageLimit.value = defaultPageLimit;
            }

            refreshTasks()
        },
        { debounce: 500, maxWait: 1000 },
    )

    const setPageNumber = (url) => {
        if(url) {
            const urlParams = new URL(url).searchParams;
            pageNumber.value = urlParams.get('page');

            refreshTasks()
        }
    }

    const refreshTasks = async () => {
        try {
            const response = await fetchTasks()
            tasks.value = response.data
        } catch (error) {
            alert(`Failed to fetch tasks: ${error}`)
        }
    }

    const applyFilterTasks = (filters) => {
        selectedFilters.value = filters
        refreshTasks()
    }

    const applyFilterTaskStatus = (status) => {
        taskStatus.value = status
        refreshTasks()
    }

    const applySorting = (sortBy) => {
        selectedSort.value = sortBy
        refreshTasks()
    }

    const saveTask = async (task) => {
        try {
            await axios.post('/tasks', 
                task, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authToken}`,
                    }
                }
            )

            closeTaskFormModal()
            refreshTaskStatuses()
            refreshTasks()
            showAlertMessage('Successfully added to the list.')
        } catch (error) {
            if (error.response && error.response.data.errors) {
                errors.value = error.response.data.errors
            }
        }
    }

    const updateTask = async (id, task) => {
        try {
            await axios.post(`/tasks/${id}?_method=PUT`, 
                task, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authToken}`,
                    }
                }
            )

            closeTaskFormModal()
            refreshTasks()
            showAlertMessage('Successfully updated.')
        } catch (error) {
            if (error.response && error.response.data.errors) {
                errors.value = error.response.data.errors
            }
        }
    }

    const createNewTask = () => {
        selectedTask.value = {};
        openTaskFormModal()
    }

    const editTask = async (task) => {
        selectedTask.value = task
        openTaskFormModal()
        closeDropdown(task.id)
    }

    const isShowDeleteConfirmationModal = ref(false);
    const showDeleteConfirmationModal = (task) => {
        selectedTask.value = task
        isShowDeleteConfirmationModal.value = true;
        closeDropdown(task.id)
    }

    const closeDeleteConfirmationModal = () => {
        selectedTask.value = {}
        isShowDeleteConfirmationModal.value = false;
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            refreshTaskStatuses()
            refreshTasks()
            showAlertMessage('Successfully deleted.')
            closeDeleteConfirmationModal()
        } catch (error) {
            alert(`Error during delete task: ${error}`)
        }
    }

    const completeTask = async (id) => {
        updateTaskStatus(id, 'complete')
        closeDropdown(id)
        showAlertMessage('Successfully updated to completed.')
    }

    const incompleteTask = async (id) => {
        updateTaskStatus(id, 'incomplete')
        closeDropdown(id)
        showAlertMessage('Successfully updated to incomplete.')
    }

    const archiveTask = async (id) => {
        updateTaskStatus(id, 'archive')
        closeDropdown(id)
        showAlertMessage('Successfully updated to archived.')
    }

    const restoreTask = async (id) => {
        updateTaskStatus(id, 'restore')
        closeDropdown(id)
        showAlertMessage('Successfully restored.')
    }

    const updateTaskStatus = async (id, action) => {
        try {
            await axios.patch(`/tasks/${id}/${action}`, {
                    }, {
                        headers: { Authorization: `Bearer ${authToken}` }
                    }
                )
            refreshTaskStatuses()
            refreshTasks()
        } catch (error) {
            alert(`Error during update task: ${error}`)
        }
    }

    const refreshTaskStatuses = async () => {
        try {
            const response = await fetchTaskStatuses()
            taskStatuses.value = response.data
        } catch(error) {
            alert(`Error during fetch tasks: ${error}`)
        }
    }

    const formatDate = (date) => {
        if(!date) return null;

        const toDateString = new Date(date);

        return toDateString.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                });
    }

    const isShowTaskFormModal = ref(false);
    const openTaskFormModal = () => {
        isShowTaskFormModal.value = true;
    }

    const closeTaskFormModal = () => {
        isShowTaskFormModal.value = false;
        errors.value = [];
    };

    const isOpen = ref(false)
    const toggledId = ref('')

    const openDropdown = (id) => {
        isOpen.value = !isOpen.value
        toggledId.value = id
    }

    const closeDropdown = (id) => {
        isOpen.value = false
        toggledId.value = id
    }

    const isShowAlertMessage = ref(false)
    const showAlertMessage = (message) => {
        alertMessage.value = message
        isShowAlertMessage.value = true
    }

    const closeAlertMessage = () => {
        isShowAlertMessage.value = false
    }

    const logout = async () => {
        try {
            await axios.post('/auth/logout', {}, {
                headers: { Authorization: `Bearer ${authToken}` }
            })
        } catch (error) {
            alert(`Error during logout: ${error}`)
        } finally {
            localStorage.removeItem('authToken')
            router.push('/')
        }
    }

    onMounted(async () => {
        try {
            const [taskSortOptionsResponse, taskStatusesResponse, tagsResponse, tasksResponse] = await Promise.all([
                    fetchSortOptions(),
                    fetchTaskStatuses(),
                    fetchTags(),
                    fetchTasks(),
                ]);

            taskSortOptions.value = taskSortOptionsResponse.data
            taskStatuses.value = taskStatusesResponse.data
            tags.value = tagsResponse.data
            tasks.value = tasksResponse.data
        } catch (error) {
            alert(`Error during fetching data: ${error}`)
            router.push('/')
        }
    });
</script>