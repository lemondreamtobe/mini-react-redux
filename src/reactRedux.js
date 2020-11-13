import React from 'react';
import mergedPropsFactory from './mergeProps.js';
import { useState, useRef, useMemo, useContext, useEffect } from 'react'
import {Context} from './provider';

export default function connectHoc(mapStateToProps = () => ({}), mapDispatchToProps = () => ({})) {
    return function WrapWithConnect(WrappedComponent) {
        function ConnectFunction(props) {
            const [_, setState] = useState(0)
            const store = useContext(Context)

            useEffect(() => {
                return store.subscribe(update)
            }, [])

            function update() {
                if (cacheAllProps.current === mergeProps(mapStateToProps(store.getState()), cacheDispatchProps.current, cacheOwnProps.current)) return
                setState(times => ++times)
            }

            const mergeProps = useMemo(() => (mergedPropsFactory()), [])
            const stateProps = mapStateToProps(store.getState())
            const dispatchProps = mapDispatchToProps(store.dispatch)
            const allProps = mergeProps(stateProps, dispatchProps, props)

            const cacheAllProps = useRef(null)
            const cacheOwnProps = useRef(null)
            const cacheStatePros = useRef(null)
            const cacheDispatchProps = useRef(null)

            useEffect(() => {
                cacheAllProps.current = allProps
                cacheStatePros.current = stateProps
                cacheDispatchProps.current = dispatchProps
                cacheOwnProps.current = props
            }, [allProps])

            return <WrappedComponent {...allProps} />

        }
        // 为了阻止父组件render带来的不必要更新
        return React.memo(ConnectFunction)
    }
}