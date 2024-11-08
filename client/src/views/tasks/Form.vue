<template>
    <Modal>
        <template #closeModalButton>
            <h2 class="text-xl font-semibold">Task Form</h2>
            <button @click="closeTaskFormModal" class="text-gray-400 hover:text-gray-600">
                <span class="text-2xl">&times;</span>
            </button>
        </template>
        <template #form>
            <form @submit.prevent="submitForm">
                <div class="mt-4">
                    <label class="block text-gray-700">Title</label>
                    <input v-model="task.title" type="text" placeholder="Title" class="w-full px-3 py-2 border border-gray-300 rounded mt-1" />
                    <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.title">{{ error }}</span>
                </div>
    
                <div class="mt-4">
                    <label class="block text-gray-700">Description</label>
                    <textarea v-model="task.description" class="w-full px-3 py-2 border border-gray-300 rounded mt-1" rows="4" placeholder="Description..."></textarea>
                    <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.description">{{ error }}</span>
                </div>
        
                <div class="mt-4">
                    <label class="block text-gray-700">Tag</label>
                    <select v-model="task.tags" class="w-full px-3 py-2 border border-gray-300 rounded mt-1" multiple>
                        <option v-for="tag in allTags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
                    </select>
                    <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.tags">{{ error }}</span>
                </div>
        
                <div class="mt-4">
                    <label class="block text-gray-700">Priority</label>
                    <select v-model="task.priority" class="w-full px-3 py-2 border border-gray-300 rounded mt-1">
                        <option 
                            :selected="priority == selectedTask?.priority" 
                            v-for="priority in priorities" 
                            :key="priority" 
                            :value="priority">{{ priority }}
                        </option>
                    </select>
                    <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.priority">{{ error }}</span>
                </div>
        
                <div class="mt-4">
                    <label class="block text-gray-700">Due Date</label>
                    <input v-model="task.due_date" type="date" class="w-full px-3 py-2 border border-gray-300 rounded mt-1" />
                    <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors.due_date">{{ error }}</span>
                </div>
        
                <div class="mt-4">
                    <label class="block text-gray-700">Attachments</label>
                    <input type="file" multiple @change="handleFileUpload" class="w-full px-3 py-2 border border-gray-300 rounded mt-1" />
                    <span class="text-red-500 sm:text-sm/6 block" v-for="error in errors['attachments.0']">{{ error }}</span>
                    <div class="h-20 overflow-y-auto">
                        <div v-for="attachment in selectedTask?.attachments" :key="attachment.id" class="flex justify-normal mt-2 gap-2 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-download"><path d="M12 13v8l-4-4"/><path d="m12 21 4-4"/><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/></svg>
                            <a class="block" :href="attachment.url" :download>{{ attachment.original_filename }}</a>
                        </div>
                    </div>
                </div>
        
                <div class="flex justify-end space-x-2 mt-6">
                    <button @click="closeTaskFormModal" type="button" class="px-4 py-1 text-red-500 border border-red-500 rounded">Cancel</button>
                    <button type="submit" class="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
                </div>
            </form>
        </template>
    </Modal>
</template>
  
<script setup>
    import Modal from '@/components/Modal.vue';
    import { ref, reactive, onMounted } from 'vue';

    // Define props and emit functions
    const props = defineProps(['selectedTask', 'allTags', 'errors']);
    const emit = defineEmits(['save-task', 'close-task-form-modal']);
    
    const priorities = ref(['Urgent', 'High', 'Normal', 'Low']);
    const task = reactive({ 
                    title: '',
                    description: '',
                    due_date: '',
                    priority: '',
                    tags: [],
                    attachments: [],
                })
    
    // Function to handle file upload
    const handleFileUpload = (event) => {
        task.attachments = Array.from(event.target.files);
    };

    const closeTaskFormModal = () => {
        emit('close-task-form-modal');
        resetTaskInputs()
    };
    
    const submitForm = () => {
        const formData = new FormData();

        // Append files to formData
        task.attachments.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file);
        });

        // Append additional data to formData
        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('due_date', task.due_date);
        formData.append('priority', task.priority);
        task.tags.forEach(tag => {
            formData.append('tags[]', tag);
        });
        
        if(props.selectedTask?.id) {
            emit('update-task', props.selectedTask?.id, formData)
        } else {
            emit('save-task', formData)
        }
    };

    const resetTaskInputs = () => {
        task.title = ''
        task.description = ''
        task.due_date = ''
        task.priority = ''
        task.tags = []
        task.attachments = []
    }

    const getTags = (tags) => {
        let ids = [];
        if(tags.length > 0) {
            ids = tags.map(tag => tag.id);
        }

        return ids;
    }

    onMounted(() => {
        resetTaskInputs()
        task.title = props.selectedTask.title ?? ''
        task.description = props.selectedTask.description ?? ''
        task.due_date = props.selectedTask.due_date ?? ''
        task.priority = props.selectedTask.priority ?? ''
        task.tags = getTags(props.selectedTask.tags ?? [])
    })
</script>