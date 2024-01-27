const initialState = {
  taskData: [
    {
      id: crypto.randomUUID(),
      title: "Learn React Next.js",
      description:
        "I want to learn Frontend Development with React Accelerator with React and Next.js",
      tags: ["JavaScript", "React", "Nextjs"],
      priority: "High",
      isFavorite: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Learn Web Application",
      description:
        "I want to learn Frontend Development with React Accelerator with React and Next.js",
      tags: ["JavaScript", "Python", "Rust"],
      priority: "Low",
      isFavorite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Software Engineering",
      description:
        "I want to learn Frontend Development with React Accelerator with React and Next.js",
      tags: ["C", "C++", "Java"],
      priority: "High",
      isFavorite: true,
    },
  ],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "add_task":
      return {
        ...state,
        taskData: [...state.taskData, action.payload],
      };
      break;

    case "delete_task":
      return {
        ...state,
        taskData: state.taskData.filter((item) => item.id !== action.payload),
      };
      break;

    case "edit_task":
      return {
        ...state,
        taskData: state.taskData.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "isFavorite":
      return {
        ...state,
        taskData: state.taskData.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isFavorite: !task.isFavorite };
          } else {
            return task;
          }
        }),
      };

    case "delete_all_tasks":
      return {
        ...state,
        taskData: [],
      };
    default:
      return state;
  }
};

export { initialState, taskReducer };
