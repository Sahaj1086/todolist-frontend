// import React, { useEffect, useState } from "react";
// import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";

// const ToDoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [editId, setEditId] = useState(null);

//   // Load todos from backend
//   const loadTodos = async () => {
//     try {
//       const data = await getTodos();
//       setTodos(data);
//     } catch (err) {
//       console.error("Failed to load todos", err);
//     }
//   };

//   useEffect(() => {
//     loadTodos();
//   }, []);

//   // Create OR Update
//   const handleSubmit = async () => {
//     if (!title.trim()) return;

//     try {
//       if (editId) {
//         // UPDATE
//         await updateTodo(editId, { title, description });
//         setEditId(null);
//       } else {
//         // CREATE
//         await addTodo({ title, description });
//       }

//       setTitle("");
//       setDescription("");
//       loadTodos();
//     } catch (err) {
//       console.error("Error saving todo", err);
//     }
//   };

//   const handleEdit = (todo) => {
//     setEditId(todo.id);
//     setTitle(todo.title);
//     setDescription(todo.description || "");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteTodo(id);
//       loadTodos();
//     } catch (err) {
//       console.error("Error deleting todo", err);
//     }
//   };

//   return (
//     <div>
//       <h2>To-Do List</h2>

//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <button onClick={handleSubmit}>
//         {editId ? "Update Todo" : "Add Todo"}
//       </button>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <strong>{todo.title}</strong>
//             <p>{todo.description}</p>

//             <button onClick={() => handleEdit(todo)}>✏️</button>
//             <button onClick={() => handleDelete(todo.id)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ToDoList;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Pencil, Circle, X } from "lucide-react";
import  GlassButton  from "../components/ui/GlassButton";
import  GlassInput  from "../components/ui/GlassInput";
import GlassCard  from "../components/ui/GlassCard";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";
import { useToast } from "../hooks/use-toast";

export default function TodoList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load todos from backend
  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to load todos", err);
      toast({
        title: "Error",
        description: "Failed to load todos",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Create OR Update
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      if (editId) {
        // UPDATE
        await updateTodo(editId, { title, description });
        setEditId(null);
        toast({
          title: "Success",
          description: "Todo updated successfully",
        });
      } else {
        // CREATE
        await addTodo({ title, description });
        toast({
          title: "Success",
          description: "Todo added successfully",
        });
      }

      setTitle("");
      setDescription("");
      loadTodos();
    } catch (err) {
      console.error("Error saving todo", err);
      toast({
        title: "Error",
        description: "Failed to save todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description || "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
      toast({
        title: "Deleted",
        description: "Todo removed successfully",
      });
    } catch (err) {
      console.error("Error deleting todo", err);
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh p-8">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <GlassButton
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </GlassButton>
          <div>
            <h1 className="text-2xl font-bold text-foreground">To-Do List</h1>
            <p className="text-muted-foreground text-sm">
              {todos.length} {todos.length === 1 ? "task" : "tasks"} total
            </p>
          </div>
        </div>

        {/* Add/Edit Todo Form */}
        <form onSubmit={handleSubmit} className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">
                {editId ? "Edit Todo" : "Add New Todo"}
              </h3>
              {editId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <GlassInput
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <GlassInput
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading || !title.trim()}
            >
              {isLoading ? (
                <span className="animate-pulse">Saving...</span>
              ) : editId ? (
                <>
                  <Pencil className="w-4 h-4 mr-2" />
                  Update Todo
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Todo
                </>
              )}
            </GlassButton>
          </GlassCard>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <GlassCard
              key={todo.id}
              className={`p-4 animate-fade-in-up group transition-all duration-300 ${
                editId === todo.id ? "ring-2 ring-primary/50" : ""
              }`}
              style={{ animationDelay: `${0.05 * (index + 1)}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {todo.title}
                  </h4>
                  {todo.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {todo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-primary transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Circle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
