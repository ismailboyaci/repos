

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
  todos: {
    0: {
      id: 0,
      name: "task1",
      subdata: {
        101: {
          id: 101,
          name: "subtask1",
          complete: false,
        },
        102: {
          id: 102,
          name: "subtask2",
          complete: true,
        },
      },
    },
    1: {
      id: 1,
      name: "task2",
      subdata: {
        103: {
          id: 103,
          name: "subtask3",
          complete: false,
        },
        104: {
          id: 104,
          name: "subtask4",
          complete: true,
        },
      },
    },
    2: {
      id: 2,
      name: "task3",
      subdata: {
        105: {
          id: 105,
          name: "subtask5",
          complete: true,
        },
        106: {
          id: 106,
          name: "subtask6",
          complete: true,
        },
      },
    },
    3: {
      id: 3,
      name: "task4",
      subdata: {
        107: {
          id: 107,
          name: "subtask7",
          complete: false,
        },
        108: {
          id: 108,
          name: "subtask8",
          complete: false,
        },
        109: {
          id: 109,
          name: "subtask9",
          complete: false,
        },
      },
    },
  },
  index: 0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ADD_TODO:

      return {
        ...state,
        todos: { ...state.todos, [action.payload.id]: action.payload },
      };

    case ADD_SUBTODO:

      const subState = {
        ...state,
        todos: {
          ...state.todos,
          [state.index + 1]: {
            ...state.todos[state.index + 1],
            subdata: {
              ...state.todos[state.index + 1].subdata,
              [action.payload.id]: action.payload,
            },
          },
        },
      };
      return subState;

    case CHANGE_INDEX:

      let copyIndex = Object.assign({}, state, { index: action.payload });
      return copyIndex;

    case SET_TOGGLE:

      return{
        ...state,
        todos: {
          ...state.todos,
          [state.index+1]: {
            ...state.todos[state.index+1],
            subdata: {
              ...state.todos[state.index+1].subdata,
              [action.payload]: {
                ...state.todos[state.index+1].subdata[action.payload],complete:true}
              },
            },
          },
        };

    case SET_UNTOGGLE:

      return{
        ...state,
        todos: {
          ...state.todos,
          [state.index+1]: {
            ...state.todos[state.index+1],
            subdata: {
              ...state.todos[state.index+1].subdata,
              [action.payload]: {
                ...state.todos[state.index+1].subdata[action.payload],complete:false}
              },
            },
          },
        };

    default:
      return state;
  }
}
