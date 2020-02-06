import { createPost, deletePost } from "../api/post";

export const types = {
  SET: "app/post/SET",
  CREATE: "app/post/CREATE",
  UPDATE: "app/post/UPDATE",
  DELETE: "app/post/DELETE"
};

//initial state

export const initialState = {
  items: []
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET:
      return {
        ...state,
        items: action.payload.items
      };
    case types.CREATE:
      return {
        ...state,
        items: [action.payload.item, ...state.items]
      };
    case types.UPDATE:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.item.id) {
            return {
              ...item,
              ...action.payload.item
            };
          }
          return item;
        })
      };
    case types.DELETE:
      const deleteIndex = state.items.findIndex(
        item => item.id === action.payload.item.id
      );
      if (deleteIndex > -1) {
        const deletedItems = [
          ...state.items.slice(0, deleteIndex),
          ...state.items.slice(deleteIndex + 1)
        ];
        return {
          ...state,
          items: deletedItems
        };
      }
      return state;
    default:
      return state;
  }
};

// action creators

export const actions = {
  set: items => ({ type: types.SET, payload: { items } }),
  create: item => {
    createPost(item);
    return { type: types.CREATE, payload: { item } };
  },
  update: item => {
    return { type: types.UPDATE, payload: { item } };
  },
  delete: item => {
    deletePost(item.id);
    return { type: types.DELETE, payload: { item } };
  }
};
