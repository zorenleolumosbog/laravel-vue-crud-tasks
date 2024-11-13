import { useState } from 'react';
import { 
    FilterX
  } from 'lucide-react';

function Filter({ filterTasks }) {
    const [priority, setPriority] = useState('');
    const [dueDateFrom, setDueDateFrom] = useState('');
    const [dueDateTo, setDueDateTo] = useState('');
    const [completedAtFrom, setCompletedAtFrom] = useState('');
    const [completedAtTo, setCompletedAtTo] = useState('');
    const [archivedAtFrom, setArchivedAtFrom] = useState('');
    const [archivedAtTo, setArchivedAtTo] = useState('');

    const applyFilterTasks = () => {
        filterTasks({
            [`filter[priority]`]: priority,
            due_date_from: dueDateFrom,
            due_date_to: dueDateTo,
            completed_at_from: completedAtFrom,
            completed_at_to: completedAtTo,
            archived_at_from: archivedAtFrom,
            archived_at_to: archivedAtTo,
        });
    };

    const applyResetFilterTasks = () => {
        setPriority('');
        setDueDateFrom('');
        setDueDateTo('');
        setCompletedAtFrom('');
        setCompletedAtTo('');
        setArchivedAtFrom('');
        setArchivedAtTo('');
        filterTasks({});
    };

    return (
        <div className="flex flex-wrap justify-end p-4 bg-white rounded-lg shadow-md gap-3 mb-3">
            <div className="w-full sm:w-auto">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option>None</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="w-full sm:w-auto">
                <label htmlFor="completed_date" className="block text-sm font-medium text-gray-700">Completed Date</label>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={completedAtFrom}
                        onChange={(e) => setCompletedAtFrom(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40"
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={completedAtTo}
                        onChange={(e) => setCompletedAtTo(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40"
                        placeholder="End Date"
                    />
                </div>
            </div>

            <div className="w-full sm:w-auto">
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={dueDateFrom}
                        onChange={(e) => setDueDateFrom(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40"
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={dueDateTo}
                        onChange={(e) => setDueDateTo(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40"
                        placeholder="End Date"
                    />
                </div>
            </div>

            <div className="w-full sm:w-auto">
                <label htmlFor="archived_date" className="block text-sm font-medium text-gray-700">Archived Date</label>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={archivedAtFrom}
                        onChange={(e) => setArchivedAtFrom(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40"
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={archivedAtTo}
                        onChange={(e) => setArchivedAtTo(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-40"
                        placeholder="End Date"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-5 cursor-pointer">
                <button
                    onClick={applyFilterTasks}
                    type="button"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Apply Filters
                </button>
                <span onClick={applyResetFilterTasks} title="Reset" className="block">
                    <FilterX />
                </span>
            </div>
        </div>
    );
}

export default Filter;