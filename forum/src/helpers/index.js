export const findById = (resource, id) => resource.find(r => r.id === id)

export const replaceItemInArray = (resource, item) => {
  resource[resource.findIndex(r => r.id === item.id)] = item
}

export const makeAddChildToParent = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId)
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}

export const makeReplaceItemInArray = ({ resource }) => {
  return (state, { item }) => {
    replaceItemInArray(state[resource], item)
  }
}

export const makeSetItem = ({ resource }) => {
  return (state, { item }) => {
    state[resource].push(item)
  }
}
