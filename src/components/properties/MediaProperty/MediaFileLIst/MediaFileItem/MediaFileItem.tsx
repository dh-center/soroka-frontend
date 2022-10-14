import React from 'react'
import {
    Eye,
    EyeFill,
    Star,
    StarFill,
    FileEarmarkImage,
    FileEarmarkMusic,
    Download,
    FileEarmark
} from 'react-bootstrap-icons'
import Badge from 'react-bootstrap/Badge'
import { Stack } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Dropdown from 'react-bootstrap/Dropdown'
import { getShortStringName } from 'utils/strings'
import CustomToggle from 'components/common/CustomToggle'

const FileBadge = ({ messageId }: { messageId: string }) => (
    <Badge bg="light" text="dark">
        <FormattedMessage id={messageId} />
    </Badge>
)

const getTypeIcon = (type: string) =>
    ({
        image: FileEarmarkImage,
        audio: FileEarmarkMusic
    }[type] || FileEarmark)

type MediaFileItemProps = {
    file: File
    index: number
    isCover: boolean
    isMain: boolean
    setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>
    selectedFiles: File[]
}

const MediaFileItem = ({ file, index, isCover, isMain, setSelectedFile, selectedFiles }: MediaFileItemProps) => {
    const intl = useIntl()
    const fileType = file.type.split('/')[0]
    const TypeIcon = getTypeIcon(fileType)

    return (
        <li className="list-group-item border-0 px-0 py-3">
            <Stack direction="horizontal" gap={2}>
                <TypeIcon size={36} />
                <span>{getShortStringName(file.name)}</span>
                {isCover && <FileBadge messageId="coverCardFile" />}
                {isMain && <FileBadge messageId="mainCardFile" />}
                <Stack direction="horizontal" gap={2} className="ms-auto">
                    {isCover ? <EyeFill role="button" /> : <Eye role="button" />}
                    {isMain ? <StarFill role="button" /> : <Star role="button" />}
                    <Download role="button" />
                    <Dropdown role="button">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">{intl.formatMessage({ id: 'copyLink' })}</Dropdown.Item>
                            <Dropdown.Item eventKey="2">{intl.formatMessage({ id: 'rename' })}</Dropdown.Item>
                            <Dropdown.Item
                                eventKey="3"
                                onClick={() =>
                                    setSelectedFile(selectedFiles.filter((item, indexFile) => indexFile !== index))
                                }>
                                {intl.formatMessage({ id: 'delete' })}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Stack>
            </Stack>
        </li>
    )
}

export default MediaFileItem
