export const findById = (resource, id) => resource.find(r => r.id === id)

export const replaceItemInArray = (resource, item) => {
  resource[resource.findIndex(r => r.id === item.id)] = item
}

export const makeAddChildToParent = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    findById(state[parent], parentId)[child].push(childId)
  }
}
