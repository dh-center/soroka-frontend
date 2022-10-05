import { useMemo } from 'react'
import {
    BoldExtension,
    HeadingExtension,
    ItalicExtension,
    UnderlineExtension,
    BulletListExtension,
    OrderedListExtension,
    MarkdownExtension,
    LinkExtension
} from 'remirror/extensions'
import { useRemirror, ComponentItem, Remirror, ThemeProvider, Toolbar, ToolbarGroupItem } from '@remirror/react'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { prosemirrorNodeToHtml } from 'remirror'
import { RemirrorEventListenerProps } from '@remirror/core'
import { FloatingLinkToolbar } from '../common/FloatingLinkToolbar'
import { useIntl } from 'react-intl'
import { RichTextPropertyProps } from '../../stores/propertiesStore'

// TODO: Add button in toolbar
const toolbarItems: ToolbarGroupItem[] = [
    {
        type: ComponentItem.ToolbarGroup,
        label: 'History',
        items: [
            { type: ComponentItem.ToolbarCommandButton, commandName: 'undo', display: 'icon' },
            { type: ComponentItem.ToolbarCommandButton, commandName: 'redo', display: 'icon' }
        ],
        separator: 'end'
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: 'Simple Formatting',
        items: [
            { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleBold', display: 'icon' },
            { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleItalic', display: 'icon' },
            { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleUnderline', display: 'icon' }
        ],
        separator: 'end'
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: 'Heading Formatting',
        items: [
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: 'toggleHeading',
                display: 'icon',
                attrs: { level: 1 }
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: 'toggleHeading',
                display: 'icon',
                attrs: { level: 2 }
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: 'toggleHeading',
                display: 'icon',
                attrs: { level: 3 }
            }
        ],
        separator: 'none'
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: 'Lists',
        items: [
            { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleBulletList', display: 'icon' },
            { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleOrderedList', display: 'icon' }
        ],
        separator: 'start'
    }
]

export const RichTextProperty = ({ value, showHelp = false, onChange }: RichTextPropertyProps) => {
    const intl = useIntl()
    const linkExtension = useMemo(() => {
        const extension = new LinkExtension()
        extension.addHandler('onClick', (_, data) => {
            window.location.href = data.href
            return true
        })
        return extension
    }, [])

    const extensions = () => [
        new HeadingExtension(),
        new BoldExtension({}),
        new ItalicExtension(),
        new UnderlineExtension(),
        new BulletListExtension(),
        new OrderedListExtension(),
        new MarkdownExtension(),
        linkExtension
    ]

    const { manager, state } = useRemirror({
        extensions,
        content: value,
        selection: 'end',
        stringHandler: 'html'
    })

    const handleChange = (parameter: RemirrorEventListenerProps<Remirror.Extensions>) => {
        const htmlData = prosemirrorNodeToHtml(parameter.state.doc)
        onChange({ value: htmlData })
    }

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror
                    manager={manager}
                    initialContent={state}
                    onChange={(parameter) => handleChange(parameter)}
                    autoFocus
                    autoRender="end">
                    <Toolbar items={toolbarItems} refocusEditor label={intl.formatMessage({ id: 'topToolbar' })} />
                    <FloatingLinkToolbar />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    )
}
