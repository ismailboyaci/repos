const ADD_TODO = "ADD_TODO";
const ADD_SUBTODO = "ADD_SUBTODO";
const SET_TOGGLE = "SET_TOGGLE";
const SET_UNTOGGLE = "SET_UNTOGGLE";
const CHANGE_INDEX = "CHANGE_INDEX";

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}
export function addSubTodo(todo) {
  return {
    type: ADD_SUBTODO,
    payload: todo,
  };
}
export function changeIndex(index) {
  return {
    type: CHANGE_INDEX,
    payload: index,
  };
}
export function setToggle(index) {
  return {
    type: SET_TOGGLE,
    payload: index,
  };
}
export function setUnToggle(index) {
  return {
    type: SET_UNTOGGLE,
    payload: index,
  };
}

const initialState = {
  todos: [
    {
      id: 0,
      name: "task1",
      subdata: [
        {
          id: 101,
          name: "subtask1",
          complete: false,
        },
        {
          id: 102,
          name: "subtask2",
          complete: true,
        },
      ],
    },
    {
      id: 1,
      name: "task2",
      subdata: [
        {
          id: 103,
          name: "subtask3",
          complete: false,
        },
        {
          id: 104,
          name: "subtask4",
          complete: true,
        },
      ],
    },
    {
      id: 2,
      name: "task3",
      subdata: [
        {
          id: 105,
          name: "subtask5",
          complete: true,
        },
        {
          id: 106,
          name: "subtask6",
          complete: true,
        },
      ],
    },
    {
      id: 3,
      name: "task4",
      subdata: [
        {
          id: 107,
          name: "subtask7",
          complete: false,
        },
        {
          id: 108,
          name: "subtask8",
          complete: false,
        },
        {
          id: 109,
          name: "subtask9",
          complete: false,
        },
      ],
    },
  ],
  index: 0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case ADD_SUBTODO:
      var todos = [...state.todos];
      todos[state.index].subdata = [
        ...todos[state.index].subdata,
        action.payload,
      ];
      return { ...state, todos };

    case CHANGE_INDEX:
      let copyIndex = Object.assign({}, state, { index: action.payload });
      return copyIndex;

    case SET_TOGGLE:
      var childIndex = state.todos[state.index].subdata.findIndex(
        (item) => item.id === action.payload
      );
      var todos = [...state.todos];
      todos[state.index].subdata[childIndex] = {
        ...todos[state.index].subdata[childIndex],
        complete: true,
      };

      return { ...state, todos };

    case SET_UNTOGGLE:
      var childIndex = state.todos[state.index].subdata.findIndex(
        (item) => item.id === action.payload
      );
      var todos = [...state.todos];
      todos[state.index].subdata[childIndex] = {
        ...todos[state.index].subdata[childIndex],
        complete: false,
      };

      return { ...state, todos };

    default:
      return state;
  }
}
