import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const Form = ({ saveTask, updateTask, selectedTask, allTags, errors, onCloseTaskFormModal }) => {
    const [isEnableSubmitBtn, setIsEnableSubmitBtn] = useState(true);
    const [task, setTask] = useState({
        title: '',
        description: '',
        due_date: '',
        priority: '',
        tags: [],
        attachments: [],
    });
    const priorities = ['Urgent', 'High', 'Normal', 'Low'];

    const handleFileUpload = (event) => {
        setTask((prevTask) => ({
        ...prevTask,
        attachments: Array.from(event.target.files),
        }));
    };

    const closeTaskFormModal = () => {
        resetTaskInputs();
        onCloseTaskFormModal();
    };

    const submitForm = (e) => {
        e.preventDefault();
        setIsEnableSubmitBtn(false);

        const formData = new FormData();
        task.attachments && task.attachments.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file);
        });

        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('due_date', task.due_date);
        formData.append('priority', task.priority);
        task.tags.forEach(tag => {
            formData.append('tags[]', tag);
        });

        if (selectedTask?.id) {
            updateTask(selectedTask.id, formData);
        } else {
            saveTask(formData);
        }

        setIsEnableSubmitBtn(true);
    };

    const resetTaskInputs = () => {
        setTask({
            title: '',
            description: '',
            due_date: '',
            priority: '',
            tags: [],
            attachments: [],
        });
    };

    const getTags = (tags) => tags?.map(tag => tag.id) || [];

    useEffect(() => {
        setTask({
            title: selectedTask?.title || '',
            description: selectedTask?.description || '',
            due_date: selectedTask?.due_date || '',
            priority: selectedTask?.priority || '',
            tags: getTags(selectedTask?.tags),
        });
    }, [selectedTask]);

    return (
        <Modal
            onCloseModalButton={
                <>
                    <h2 className="text-xl font-semibold">Task Form</h2>
                    <button onClick={closeTaskFormModal} className="text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">&times;</span>
                    </button>
                </>
            }
            form={
                <form onSubmit={submitForm}>
                    <div className="mt-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            placeholder="Title"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.title && errors.title.map((error, idx) => (
                            <span key={idx} className="text-red-500 sm:text-sm/6 block">{error}</span>
                        ))}
                        </div>

                        <div className="mt-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            value={task.description}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                            rows="4"
                            placeholder="Description..."
                        ></textarea>
                        {errors.description && errors.description.map((error, idx) => (
                            <span key={idx} className="text-red-500 sm:text-sm/6 block">{error}</span>
                        ))}
                        </div>

                        <div className="mt-4">
                        <label className="block text-gray-700">Tag</label>
                        <select
                            multiple
                            value={task.tags}
                            onChange={(e) => setTask({ ...task, tags: Array.from(e.target.selectedOptions, option => option.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                        >
                            {allTags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        {errors.tags && errors.tags.map((error, idx) => (
                            <span key={idx} className="text-red-500 sm:text-sm/6 block">{error}</span>
                        ))}
                        </div>

                        <div className="mt-4">
                        <label className="block text-gray-700">Priority</label>
                        <select
                            value={task.priority}
                            onChange={(e) => setTask({ ...task, priority: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                        >
                            {priorities.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </select>
                        {errors.priority && errors.priority.map((error, idx) => (
                            <span key={idx} className="text-red-500 sm:text-sm/6 block">{error}</span>
                        ))}
                        </div>

                        <div className="mt-4">
                        <label className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            value={task.due_date}
                            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                        />
                        {errors.due_date && errors.due_date.map((error, idx) => (
                            <span key={idx} className="text-red-500 sm:text-sm/6 block">{error}</span>
                        ))}
                        </div>

                        <div className="mt-4">
                        <label className="block text-gray-700">Attachments</label>
                        <input type="file" multiple onChange={handleFileUpload} className="w-full px-3 py-2 border border-gray-300 rounded mt-1" />
                        {errors['attachments.0'] && errors['attachments.0'].map((error, idx) => (
                            <span key={idx} className="text-red-500 sm:text-sm/6 block">{error}</span>
                        ))}
                        <div className="h-20 overflow-y-auto">
                            {selectedTask?.attachments?.map(attachment => (
                            <div key={attachment.id} className="flex justify-normal mt-2 gap-2 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
                                <a href={attachment.url} download>{attachment.original_filename}</a>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button onClick={closeTaskFormModal} type="button" className="px-4 py-1 text-red-500 border border-red-500 rounded">
                            Cancel
                        </button>
                        <button disabled={!isEnableSubmitBtn} type="submit" className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Save
                        </button>
                    </div>
                </form>
            } />
    );
}

export default Form;