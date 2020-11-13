

function mergeProps (stateProps, dispatchProps, ownProps) {
  return { ...ownProps, ...stateProps, ...dispatchProps }
}

// 判断基础类型强相等 排除掉0 和 1的布尔值自动转换带来的弊端
function is(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

// 判断引用类型强相等
export function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true

    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false
    }

    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) return false

    for (let i = 0; i < keysA.length; i++) {
        if (
            !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false
        }
    }

    return true
}

// 单纯的强相等
export function strictEqual(a, b) {
    return a === b
}

export default function mergedPropsFactory() {
  let hasOnceRun = false
  let stateProps = null
  let dispatchProps = null
  let ownProps = null
  let mergedProps = null
  
  return (newStateProps, newDispatchProps, newOwnProps) => {
    
    if (!hasOnceRun) {
      stateProps = newStateProps
      dispatchProps = newDispatchProps
      ownProps = newOwnProps
	  mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
      hasOnceRun = true
      return mergedProps
    }
    
    if (shallowEqual(stateProps, newStateProps) && shallowEqual(ownProps, newOwnProps)) {
      stateProps = newStateProps
      dispatchProps = newDispatchProps
      ownProps = newOwnProps
    } else {
      stateProps = newStateProps
      dispatchProps = newDispatchProps
      ownProps = newOwnProps
	  mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
    }
    
    return mergedProps
  }
}