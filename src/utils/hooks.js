import React, { useState, useMemo, useCallback, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkExtension, createMarkPositioner } from 'remirror/extensions'
import { useExtensionEvent, useAttrs, useChainedCommands, useUpdateReason, useCurrentSelection } from '@remirror/react'

export function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
}

// library example: https://github.com/remirror/remirror/blob/main/packages/storybook-react/stories/extension-link/edit-dialog.tsx
export function useLinkShortcut() {
    const [linkShortcut, setLinkShortcut] = useState()
    const [isEditing, setIsEditing] = useState(false)

    useExtensionEvent(
        LinkExtension,
        'onShortcut',
        useCallback(
            (props) => {
                if (!isEditing) {
                    setIsEditing(true)
                }

                return setLinkShortcut(props)
            },
            [isEditing]
        )
    )

    return { linkShortcut, isEditing, setIsEditing }
}

// library example: https://github.com/remirror/remirror/blob/main/packages/storybook-react/stories/extension-link/edit-dialog.tsx
export function useFloatingLinkState() {
    const chain = useChainedCommands()
    const { isEditing, linkShortcut, setIsEditing } = useLinkShortcut()
    const { to, empty } = useCurrentSelection()

    const url = useAttrs().link()?.href ?? ''
    const [href, setHref] = useState(url)

    // A positioner which only shows for links.
    const linkPositioner = useMemo(() => createMarkPositioner({ type: 'link' }), [])

    const onRemove = useCallback(() => {
        return chain.removeLink().focus().run()
    }, [chain])

    const updateReason = useUpdateReason()

    useLayoutEffect(() => {
        if (!isEditing) {
            return
        }

        if (updateReason.doc || updateReason.selection) {
            setIsEditing(false)
        }
    }, [isEditing, setIsEditing, updateReason.doc, updateReason.selection])

    useEffect(() => {
        setHref(url)
    }, [url])

    const submitHref = useCallback(() => {
        setIsEditing(false)
        const range = linkShortcut ?? undefined

        if (href === '') {
            chain.removeLink()
        } else {
            chain.updateLink({ href, auto: false }, range)
        }

        chain.focus(range?.to ?? to).run()
    }, [setIsEditing, linkShortcut, chain, href, to])

    const cancelHref = useCallback(() => {
        setIsEditing(false)
    }, [setIsEditing])

    const clickEdit = useCallback(() => {
        if (empty) {
            chain.selectLink()
        }

        setIsEditing(true)
    }, [chain, empty, setIsEditing])

    return useMemo(
        () => ({
            href,
            setHref,
            linkShortcut,
            linkPositioner,
            isEditing,
            clickEdit,
            onRemove,
            submitHref,
            cancelHref
        }),
        [href, linkShortcut, linkPositioner, isEditing, clickEdit, onRemove, submitHref, cancelHref]
    )
}
