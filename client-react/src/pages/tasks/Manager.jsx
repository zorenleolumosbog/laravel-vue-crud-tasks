import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  LogOut, 
  ListTodo, 
  AlignJustify, 
  X, 
  StickyNote, 
  Archive, 
  ChevronLeft, 
  ChevronRight,
  Pencil,
  SquareCheckBig,
  ArchiveRestore,
  MoreVertical,
  FileCheck,
  FileArchive
} from 'lucide-react';
import Form from './Form';
import Filter from './Filter';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';

const Manager = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    // State management
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [tasks, setTasks] = useState({});
    const [taskStatuses, setTaskStatuses] = useState({});
    const [taskStatus, setTaskStatus] = useState('incompleted');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTask, setSelectedTask] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedSort, setSelectedSort] = useState('');
    const [isShowTaskFormModal, setIsShowTaskFormModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isOpenActionDropdown, setIsOpenActionDropdown] = useState(false);
    const [toggledId, setToggledId] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isShowAlertMessage, setIsShowAlertMessage] = useState(false);
    const [tags, setTags] = useState([]);
    const [sortOptions, setSortOptions] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit] = useState(8);
    const [errors, setErrors] = useState({});

    // Fetch data on mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [sortOptionsRes, statusesRes, tagsRes, tasksRes] = await Promise.all([
                    axios.get('/tasks/sort/options', { headers: { Authorization: `Bearer ${authToken}` } }),
                    fetchTaskStatuses(),
                    axios.get('/tags', { headers: { Authorization: `Bearer ${authToken}` } }),
                    fetchTasks()
                ]);

                setSortOptions(sortOptionsRes.data);
                setTaskStatuses(statusesRes.data);
                setTags(tagsRes.data);
                setTasks(tasksRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/');
            }
        };

        fetchInitialData();
    }, []);

    // Search debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            refreshTasks();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Get tasks by status
    useEffect(() => {
        refreshTasks();
    }, [taskStatus]);

    // Sort tasks
    useEffect(() => {
        refreshTasks();
    }, [selectedSort]);

    // Filter tasks
    useEffect(() => {
        refreshTasks();
    }, [selectedFilters]);

    const fetchTaskStatuses = () => {
        return axios.get('/tasks/count/statuses', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
    };

    // Fetch tasks with current filters
    const fetchTasks = () => {
        return axios.get('/tasks', {
            headers: { Authorization: `Bearer ${authToken}` },
            params: {
                page: pageNumber,
                limit: pageLimit,
                'filter[search]': searchQuery,
                status: taskStatus,
                ...selectedFilters,
                sort: selectedSort
            }
        });
    };

    const refreshTasks = async () => {
        try {
            const response = await fetchTasks();
            setTasks(response.data);

            if (isOpenSidebar) {
                setIsOpenSidebar(false);
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const handleLogout = async () => {
        try {
        await axios.post('/auth/logout', {}, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            localStorage.removeItem('authToken');
            navigate('/');
        }
    };

    const formatDate = (date) => {
        if (!date) return null;

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });
    };

    const refreshTaskStatuses = async () => {
        try {
            const response = await fetchTaskStatuses()
            setTaskStatuses(response.data)
        } catch(error) {
            alert(`Error during fetch tasks: ${error}`)
        }
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
                setErrors(error.response.data.errors)
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
                setErrors(error.response.data.errors)
            }
        }
    }

    const deleteTask = async () => {
        try {
            await axios.delete(`/tasks/${selectedTask.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            refreshTaskStatuses()
            refreshTasks()
            closeDeleteConfirmationModal()
            showAlertMessage('Successfully deleted.')
        } catch (error) {
            alert(`Error during delete task: ${error}`)
        }
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

    const completeTask = async (id) => {
        updateTaskStatus(id, 'complete')
        closeActionDropdown(id)
        showAlertMessage('Successfully updated to completed.')
    }

    const incompleteTask = async (id) => {
        updateTaskStatus(id, 'incomplete')
        closeActionDropdown(id)
        showAlertMessage('Successfully updated to incomplete.')
    }

    const archiveTask = async (id) => {
        updateTaskStatus(id, 'archive')
        closeActionDropdown(id)
        showAlertMessage('Successfully updated to archived.')
    }

    const restoreTask = async (id) => {
        updateTaskStatus(id, 'restore')
        closeActionDropdown(id)
        showAlertMessage('Successfully restored.')
    }

    const editTask = (task) => {
        setSelectedTask(task)
        showTaskFormModal()
        closeActionDropdown(task.id)
    }

    const showTaskFormModal = () => {
        setIsShowTaskFormModal(true)
    }

    const closeTaskFormModal = () => {
        setIsShowTaskFormModal(false)
        setSelectedTask({});
        setErrors([]);
    }

    const applyFilterTaskStatus = (status) => {
        setTaskStatus(status)
    }

    const applyFilterTasks = (filters) => {
        setSelectedFilters(filters)
    }

    const showDeleteConfirmationModal = (task) => {
        setSelectedTask(task)
        setIsShowDeleteModal(true);
        closeActionDropdown(task.id)
    }

    const closeDeleteConfirmationModal = () => {
        setSelectedTask({})
        setIsShowDeleteModal(false)
    }

    const openActionDropdown = (id) => {
        setIsOpenActionDropdown(true)
        setToggledId(id)
    }

    const closeActionDropdown = (id) => {
        setIsOpenActionDropdown(false)
        setToggledId(id)
    }

    const showAlertMessage = (message) => {
        setAlertMessage(message)
        setIsShowAlertMessage(true)
    }

    const closeAlertMessage = () => {
        setIsShowAlertMessage(false)
    }

    return (
        <div className="relative min-h-screen flex">
            <Alert
                isShowAlertMessage={isShowAlertMessage} 
                alertMessage={alertMessage} 
                onCloseAlert={closeAlertMessage} 
            />

            {/* Conditionally render TaskForm modal */}
            {isShowTaskFormModal &&
                <Form
                    saveTask={saveTask}
                    updateTask={updateTask}
                    selectedTask={selectedTask}
                    allTags={tags}
                    errors={errors}
                    onCloseTaskFormModal={closeTaskFormModal}
                />
            }

            {isShowDeleteModal &&
                <Modal
                    onCloseModalButton={
                        <>
                            <h2 className="text-xl font-semibold">Delete Confirmation</h2>
                            <button onClick={closeDeleteConfirmationModal} className="text-gray-400 hover:text-gray-600">
                                <span className="text-2xl">&times;</span>
                            </button>
                        </>
                    }
                    form={
                        <>
                            <h2 className="text-lg mt-3">Are you certain you want to delete this task?</h2>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button onClick={closeDeleteConfirmationModal} type="button" className="px-4 py-1 text-red-500 border border-red-500 rounded">Cancel</button>
                                <button onClick={deleteTask} type="button" className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Delete</button>
                            </div>
                        </>
                    }
                />
            }

            {/* Mobile Toggle Button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-md lg:hidden bg-white shadow-lg"
                onClick={() => setIsOpenSidebar(!isOpenSidebar)}
            >
                {isOpenSidebar ? <X /> : <AlignJustify />}
            </button>

            {/* Sidebar */}
            <div className={`fixed lg:relative h-screen w-64 transform transition-transform duration-200 ease-in-out z-30 border-r bg-white
                ${isOpenSidebar ? 'translate-x-0 pt-14' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="w-64 p-4 border-r">
                    <div className="flex justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-semibold mb-6">
                            <span className="w-5 h-5 rounded flex items-center justify-center">
                                <ListTodo size={20} />
                            </span>
                            Todo list
                        </h2>
                        <span onClick={handleLogout} className="pt-1 cursor-pointer" title="Logout">
                            <LogOut size={20} />
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        <div 
                            onClick={() => applyFilterTaskStatus('incompleted')} 
                            className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg
                                ${taskStatus === 'incompleted' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                            <div className="flex items-center gap-3">
                                <span className="w-5">
                                <StickyNote size={20} />
                                </span>
                                <span>Todo</span>
                            </div>
                            <span className="px-2 rounded-full text-sm bg-blue-100">
                                {taskStatuses?.incompleteCount}
                            </span>
                        </div>
                        
                        <div 
                            onClick={() => applyFilterTaskStatus('completed')} 
                            className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg
                                ${taskStatus === 'completed' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                            <div className="flex items-center gap-3">
                                <span className="w-5">
                                <FileCheck size={20} />
                                </span>
                                <span>Completed</span>
                            </div>
                            <span className="px-2 rounded-full text-sm bg-blue-100">
                                {taskStatuses?.completeCount}
                            </span>
                        </div>
                        
                        <div 
                            onClick={() => applyFilterTaskStatus('archived')} 
                            className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg
                                ${taskStatus === 'archived' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                            <div className="flex items-center gap-3">
                                <span className="w-5">
                                <FileArchive size={20} />
                                </span>
                                <span>Archived</span>
                            </div>
                            <span className="px-2 rounded-full text-sm bg-blue-100">
                                {taskStatuses?.archiveCount}
                            </span>
                        </div>
                    </nav>

                    {/* Add New Task Button */}
                    <button 
                        onClick={showTaskFormModal}
                        className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
                    >
                        <span>+</span>
                        Add New Task
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full p-6 pt-16">
                {/* Search and Sort Controls */}
                <div className="flex w-full flex-col gap-4 mb-6 sm:flex-row sm:items-center">
                    <div className="relative">
                        <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search Task..."
                        className="w-full pl-4 pr-10 py-2 border rounded-lg"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                        <Search size={20} />
                        </span>
                    </div>
                    
                    {/* Sort Controls */}
                    <div className="flex flex-1 items-center justify-end sm:flex-auto sm:justify-end mb-2 gap-2">
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Sort By
                        </label>
                        <select
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value)}
                            className="block mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                            {sortOptions.map((option, index) => (
                                <option key={index} value={option.sort}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Filter filterTasks={applyFilterTasks}></Filter>

                {/* Task Table */}
                <div className="rounded-lg border border-gray-200 shadow-md max-w-full">
                    <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-900">Title</th>
                            <th className="px-6 py-4 font-medium text-gray-900">Dates</th>
                            <th className="px-6 py-4 font-medium text-gray-900">Tags</th>
                            <th className="px-6 py-4 font-medium text-gray-900">Priority</th>
                            <th className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {tasks.data?.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">{task.title}</div>
                                        <div className="text-gray-400 w-64 truncate">{task.description}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {task.due_date && !task.archived_at && (
                                        <span className="block text-gray-500">
                                            <strong>Due:</strong> {formatDate(task.due_date)}
                                        </span>
                                    )}
                                    {task.completed_at && !task.archived_at && (
                                        <span className="block text-gray-500">
                                            <strong>Completed:</strong> {formatDate(task.completed_at)}
                                        </span>
                                    )}
                                    {task.archived_at && (
                                        <span className="block text-gray-500">
                                            <strong>Archived:</strong> {formatDate(task.archived_at)}
                                        </span>
                                    )}
                                    {task.created_at && (
                                        <span className="block text-gray-500">
                                            <strong>Created:</strong> {formatDate(task.created_at)}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                    {task.tags?.map((tag) => (
                                        <span key={tag.id} className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
                                        {tag.name}
                                        </span>
                                    ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {task.priority && (
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        task.priority === 'High' || task.priority === 'Urgent'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        {task.priority}
                                    </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {/* Task Actions */}
                                    <div className="flex justify-end gap-4">
                                        <div className="relative">
                                            <button onClick={() => openActionDropdown(task.id)} className="text-gray-400 hover:text-gray-600 p-1 rounded">
                                                <MoreVertical/>
                                            </button>

                                            {isOpenActionDropdown && toggledId === task.id && (
                                            <>
                                                <div className="absolute bottom-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                                                <button 
                                                    onClick={() => editTask(task)}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                        <span className="text-gray-400">
                                                            <Pencil size={20}/>
                                                        </span>
                                                    Edit
                                                </button>
                                                
                                                {taskStatus === 'incompleted' && (
                                                    <button 
                                                    onClick={() => completeTask(task.id)}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <span className="text-gray-400">
                                                            <SquareCheckBig size={20}/>
                                                        </span>
                                                    Complete
                                                    </button>
                                                )}
                                                
                                                {taskStatus === 'completed' && (
                                                    <button 
                                                    onClick={() => incompleteTask(task.id)}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                    <span className="text-gray-400">
                                                        <StickyNote size={20} />
                                                    </span>
                                                    Incomplete
                                                    </button>
                                                )}
                                                
                                                {(taskStatus === 'completed' || taskStatus === 'incompleted') && (
                                                    <button 
                                                    onClick={() => archiveTask(task.id)}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <span className="text-gray-400">
                                                            <Archive size={20}/>
                                                        </span>
                                                    Archive
                                                    </button>
                                                )}
                                                
                                                {taskStatus === 'archived' && (
                                                    <button
                                                    onClick={() => restoreTask(task.id)}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <span className="text-gray-400">
                                                            <ArchiveRestore size={20}/>
                                                        </span>
                                                    Restore
                                                    </button>
                                                )}
                                                
                                                <button 
                                                    onClick={() => showDeleteConfirmationModal(task)}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                        <span className="text-gray-400">
                                                            <X/>
                                                        </span>
                                                    Delete
                                                </button>
                                                </div>

                                                <div onClick={closeActionDropdown} className="fixed inset-0 z-40"></div>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {tasks?.meta?.total > 0 && (
                <div className="flex items-center justify-end mt-6">
                    <span className="mr-4">
                    {tasks.meta.from}-{tasks.meta.to} of {tasks.meta.total}
                    </span>
                    <button
                    onClick={() => setPageNumber(prev => prev - 1)}
                    disabled={!tasks.links.prev}
                    className="rounded-md bg-gray-100 p-1 mr-2 disabled:opacity-50"
                    >
                    <ChevronLeft size={20} />
                    </button>
                    <button
                    onClick={() => setPageNumber(prev => prev + 1)}
                    disabled={!tasks.links.next}
                    className="rounded-md bg-gray-100 p-1 disabled:opacity-50"
                    >
                    <ChevronRight size={20} />
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default Manager;