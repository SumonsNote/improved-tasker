import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TaskContext, searchContext } from "../../context";
import DeleteConfirmationModal from "../../utils/deleteConfirmation";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const { state, dispatch } = useContext(TaskContext);
  const { searchValue } = useContext(searchContext);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  function handleDeleteConfirmation(taskId) {
    setTaskToDelete(taskId);
    setShowDeleteConfirmation(true);
  }

  function handleDeleteConfirmationCancel() {
    setTaskToDelete(null);
    setShowDeleteConfirmation(false);
  }

  function handleDeleteConfirmationConfirm() {
    if (taskToDelete !== null) {
      handleDeleteTask(taskToDelete);
    } else {
      handleDeleteAllClick();
    }
    handleDeleteConfirmationCancel();
  }

  function handleAddTask(newTask, isAdd) {
    const taskTitle = newTask.title;

    if (isAdd) {
      dispatch({
        type: "add_task",
        payload: { ...newTask },
      });
      toast.success(`Added a new task: ${taskTitle}`);
    } else {
      dispatch({
        type: "edit_task",
        payload: { ...newTask },
      });
      toast.success(`Task successfully updated: ${taskTitle}`);
    }

    handleCloseClick();
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId) {
    const deletedTask = state.taskData.find((task) => task.id === taskId);
    const deletedTaskTitle = deletedTask ? deletedTask.title : "Unknown Task";

    dispatch({
      type: "delete_task",
      payload: taskId,
    });

    toast.success(`Deleted task: ${deletedTaskTitle}`);
  }

  function handleDeleteAllClick() {
    dispatch({
      type: "delete_all_tasks",
    });
    toast.success("All tasks deleted successfully!");
  }

  function handleFavorite(taskId) {
    dispatch({
      type: "isFavorite",
      payload: taskId,
    });

    const updatedTask = state.taskData.find((task) => task.id === taskId);

    if (updatedTask) {
      const favoriteAction = updatedTask.isFavorite
        ? "Removed from"
        : "Added to";
      toast.success(`${favoriteAction} favorites: ${updatedTask.title}`);
    }
  }

  let filteredTask = state.taskData;
  function handleSearch(searchTerm) {
    filteredTask = state.taskData.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  handleSearch(searchValue.toLowerCase());

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={taskToUpdate}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onDelete={handleDeleteConfirmationConfirm}
          onCancel={handleDeleteConfirmationCancel}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={() => handleDeleteConfirmation(null)}
          />
          {state.taskData.length > 0 ? (
            <TaskList
              filteredTask={filteredTask}
              onEdit={handleEditTask}
              onDelete={(taskId) => handleDeleteConfirmation(taskId)}
              onFav={handleFavorite}
            />
          ) : (
            <NoTasksFound />
          )}
        </div>
      </div>
    </section>
  );
}
