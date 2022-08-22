import { useMemo } from 'react'
import { useFloatingLinkState } from '../../utils/hooks'
import { DelayAutoFocusInput } from './DelayAutoFocusInput'
import { FloatingToolbar, FloatingWrapper, ComponentItem, useActive, useCurrentSelection } from '@remirror/react'
import { useIntl } from 'react-intl'

// library example: https://github.com/remirror/remirror/blob/main/packages/storybook-react/stories/extension-link/edit-dialog.tsx
export const FloatingLinkToolbar = () => {
    const { isEditing, linkPositioner, clickEdit, onRemove, submitHref, href, setHref, cancelHref } =
        useFloatingLinkState()
    const active = useActive()
    const activeLink = active.link()
    const { empty } = useCurrentSelection()
    const linkEditItems = useMemo(
        () => [
            {
                type: ComponentItem.ToolbarGroup,
                label: 'Link',
                items: activeLink
                    ? [
                          { type: ComponentItem.ToolbarButton, onClick: () => clickEdit(), icon: 'pencilLine' },
                          { type: ComponentItem.ToolbarButton, onClick: onRemove, icon: 'linkUnlink' }
                      ]
                    : [{ type: ComponentItem.ToolbarButton, onClick: () => clickEdit(), icon: 'link' }]
            }
        ],
        [clickEdit, onRemove, activeLink]
    )

    const items = useMemo(() => linkEditItems, [linkEditItems])

    const intl = useIntl()
    const placeholderLink = intl.formatMessage({ id: 'placeholderEditLink' })

    return (
        <>
            <FloatingToolbar items={items} positioner="selection" placement="top" enabled={!isEditing} />
            <FloatingToolbar
                items={linkEditItems}
                positioner={linkPositioner}
                placement="bottom"
                enabled={!isEditing && empty}
            />

            <FloatingWrapper positioner="always" placement="bottom" enabled={isEditing} renderOutsideEditor>
                <DelayAutoFocusInput
                    style={{ zIndex: 20 }}
                    autoFocus
                    placeholder={placeholderLink}
                    onChange={(event) => setHref(event.target.value)}
                    value={href}
                    onKeyPress={(event) => {
                        const { code } = event

                        if (code === 'Enter') {
                            submitHref()
                        }

                        if (code === 'Escape') {
                            cancelHref()
                        }
                    }}
                />
            </FloatingWrapper>
        </>
    )
}
