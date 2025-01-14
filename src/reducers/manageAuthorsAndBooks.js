import { combineReducers } from "redux";
import uuid from 'uuid';

const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer
});

export default rootReducer;

function booksReducer(state = [], action) {
  let index;
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];

    case "REMOVE_BOOK":
      index = state.findIndex(book => book.id  === action.id)
      return [...state.slice(0, index), ...state.slice(index + 1)];

    default:
      return state;
  }
}

function authorsReducer(state = [], action) {
  let index;
  switch (action.type) {
    case "ADD_AUTHOR":
      return [...state, action.author];

    case "REMOVE_AUTHOR":
      index = state.findIndex(book => book.id  === action.id)
      return [...state.slice(0, index), ...state.slice(index + 1)];

    case "ADD_BOOK":
      let existingAuthor = state.filter(
        author => author.authorName === action.book.authorName
      )
      if (existingAuthor.length > 0) {
        return state;
      } else {
        return [...state, { authorName: action.book.authorName, id: uuid()}];
      }

    default:
      return state;
  }
} 


// export default function bookApp(
//   state = {
//     authors: [],
//     books: []
//   },
//   action
// ) {
//   let index;
//   switch (action.type) {
//     case "ADD_BOOK":
//       return {
//         ...state,
//         books: [...state.books, action.book]
//       };

//     case "REMOVE_BOOK":
//       index = state.books.findIndex(book => book.id === action.id);
//       return {
//         ...state,
//         books: [...state.books.slice(0, index), ...state.books.slice(index + 1)]
//       };

//     case "ADD_AUTHOR":
//       return {
//         ...state,
//         authors: [...state.authors, action.author]
//       };

//     case "REMOVE_AUTHOR":
//       index = state.authors.findIndex(author => author.id === action.id);
//       return {
//         ...state,
//         authors: [...state.authors.slice(0, index), ...state.authors.slice(index + 1)]
//       };

//     default:
//       return state;
//   }
// }