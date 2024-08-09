/*  2024-07-20 17:56:33

https://jsonplaceholder.typicode.com/todos

Todo Type:
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },

그리고, 
1. Fetch 액션 까지는 못하지만, RDD 와 RHF/ShadCN 을 연동해보는 경험이 필요하다. AddTodo form 을 추가해주자.
2. localStorage 에 todos 를 저장해주고, todos 만 action 을 localStorage 에서 처리해주자.
3. 여기엔 Framer Motion 을 이용한 animation 을 추가해주자..



    <div className="flex flex-col justify-center items-center w-full p-4">
      <div className="w-3/4">
        Todos
        <p></p>
        {todos.slice(0, 10).map((todos) => (
          <div
            key={todos.id}
            className="bg-white rounded-lg shadow-md p-4 my-4"
          >
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">
              {todos.title}
            </h3>
            <p className="text-gray-700">
              {todos.completed ? "Completed" : "In Progress"}
            </p>
          </div>
        ))}
      </div>
*/

import { axiosRequest } from "@/util/axiosInstance";
import {
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/util/todosIO";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddTodoForm from "./todo/AddTodoForm";
import { AnimatePresence } from "framer-motion";
import Todo from "./Todo";
import { wait } from "@/util/misc";

export type TodosLoaderDataType = {
  userId?: number;
  id: number;
  title: string;
  completed?: boolean;
};
export type TodoType = TodosLoaderDataType;

const Todos = () => {
  const todos = useLoaderData() as TodosLoaderDataType[];
  const [todoItems, setTodoItems] = useState(todos);
  const [todosCnt, setTodosCnt] = useState<number>(todos.length);
  const [undoneCnt, setUndoneCnt] = useState(0);

  useEffect(() => {
    saveAndSetTodos(todos);
  }, [todos]);

  const saveAndSetTodos = (todos: TodoType[]) => {
    saveTodosToLocalStorage(todos);
    setTodoItems(todos);
    setTodosCnt(todos.length);
    setUndoneCnt(todos.filter((todo) => !todo.completed).length);
  };

  const handleCheck = (id: number) => {
    const newTodo = todoItems.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveAndSetTodos(newTodo);
  };

  const removeElement = (id: number) => {
    const newTodo = todoItems.filter((todo) => todo.id !== id);
    saveAndSetTodos(newTodo);
  };

  const handleTodoSubmit = (todos: TodoType[]) => {
    console.log("Todo Submitted");
    saveAndSetTodos(todos);
  };

  return (
    <div className="w-full space-y-3">
      <div>You have {todosCnt} todos left</div>
      <div>{undoneCnt} todos are not finished</div>
      <AnimatePresence>
        {todoItems
          .sort((a, b) => b.id - a.id)
          .slice(0, 10)
          .map((todo) => (
            <Todo
              handleCheck={handleCheck}
              removeElement={removeElement}
              id={todo.id as number}
              key={todo.id}
              checked={todo.completed}
            >
              {/* {todo.id} */}
              {todo.title}
            </Todo>
          ))}
      </AnimatePresence>

      {/* // Add Todo Form */}
      <AddTodoForm todos={todoItems} handleTodoSubmit={handleTodoSubmit} />
    </div>
  );
};

// axiosRequest 에서 에러 처리가 되고 있으므로, loader 에서의 에러 처리는 굳이 필요 없다.
// AbortController 역시 axiosRequest 에서 처리되고 있으므로, loader 에서의 처리는 필요 없다.
// localStorage 에서 todos 를 찾아보고, 없으면 그 때 Jsonplaceholder 에 요청해서 초기 데이터를 받아오기로 하자. 디폴트 데이터는 localStorage 에서 꺼내서 리턴해준다.
const loader = async () => {
  const config = { method: "GET" };

  let todosData: TodosLoaderDataType[] = [];
  let returnData: TodosLoaderDataType[] = [];

  todosData = loadTodosFromLocalStorage();
  if (todosData?.length > 0) {
    returnData = todosData;
  }
  const todosResult = await axiosRequest({
    endPoint: "/todos",
    config,
  });
  returnData = todosResult.data as TodoType[];

  return wait(
    1000,
    returnData.sort((a, b) => b.id - a.id)
  );
};

const TodosRoute = {
  element: <Todos />,
  loader,
};

export default TodosRoute;
