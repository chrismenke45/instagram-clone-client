export interface reloadStateInterface {
  count: number;
}
export interface reloadActionInterface {
  type: string;
}

const reloadReducer = (state: reloadStateInterface, action: reloadActionInterface) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1}
    default:
      return state
  }
}

export default reloadReducer