import { useRef, useEffect } from 'react'

// library example: https://github.com/remirror/remirror/blob/main/packages/storybook-react/stories/extension-link/edit-dialog.tsx
export const DelayAutoFocusInput = ({ autoFocus, ...rest }) => {
    const inputRef = useRef(null)

    useEffect(() => {
        if (!autoFocus) {
            return
        }

        const frame = window.requestAnimationFrame(() => {
            inputRef.current?.focus()
        })

        return () => {
            window.cancelAnimationFrame(frame)
        }
    }, [autoFocus])

    return <input ref={inputRef} {...rest} />
}
