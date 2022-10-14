import { useRef, useEffect, HTMLProps } from 'react'

// library example: https://github.com/remirror/remirror/blob/main/packages/storybook-react/stories/extension-link/edit-dialog.tsx
const DelayAutoFocusInput = ({ autoFocus, ...rest }: HTMLProps<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!autoFocus) {
            return undefined
        }

        const frame = window.requestAnimationFrame(() => inputRef.current?.focus())

        return () => window.cancelAnimationFrame(frame)
    }, [autoFocus])

    return <input ref={inputRef} {...rest} />
}

export default DelayAutoFocusInput
