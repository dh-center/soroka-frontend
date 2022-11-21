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
import BootstrapBadge from 'react-bootstrap/Badge'
import { Stack } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import Dropdown from 'react-bootstrap/Dropdown'
import './FileItem.css'
import { getShortStringName } from 'utils/strings'
import CustomToggle from 'components/common/CustomToggle'
import { FILE_TYPES } from 'utils/constants'
import { useEffect, useState } from 'react'
import UploadedFileData from '../../UploadedFileData'
import PendingFileData from '../../PendingFileData'

const Badge = ({ messageId }: { messageId: string }) => (
    <BootstrapBadge bg="light" text="dark">
        <FormattedMessage id={messageId} />
    </BootstrapBadge>
)

const getTypeIcon = (type: string) =>
    ({
        image: FileEarmarkImage,
        audio: FileEarmarkMusic
    }[type] || FileEarmark)

export type FileItemProps = {
    file: UploadedFileData | PendingFileData
    isCover: boolean
    isMain: boolean
    onChosenAsMain: (id: string) => void
    onFileDelete: (id: string) => void
    onCoverSwitch: (id: string, isCover: boolean) => void
}

const FileItem = ({ file, isCover, isMain, onChosenAsMain, onFileDelete, onCoverSwitch }: FileItemProps) => {
    const pending = file instanceof PendingFileData

    const [percent, setPercent] = useState(0)

    useEffect(() => {
        if (pending) {
            file.subscribeToProgress((p) => {
                setPercent(p)
            })
        }

        return () => {
            if (pending) file.unsubscribeFromProgress()
        }
    }, [file, pending])

    const { id } = file

    const name = pending ? file.file.name : file.name
    const type = pending ? file.file.type : file.type

    const shortType = type && type.split('/')[0]
    const TypeIcon = getTypeIcon(shortType)

    return (
        <li className="list-group-item border-0 px-0 py-3">
            <Stack direction="horizontal" gap={2}>
                <TypeIcon size={36} />
                <div className="d-flex flex-column">
                    <span>{getShortStringName(name)}</span>
                    {pending && (
                        <div className="progress media-file-item__progress-bar">
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: `${percent}%` }}
                                aria-valuenow={percent}
                                aria-valuemin={0}
                                aria-valuemax={100}></div>
                        </div>
                    )}
                </div>

                {!pending && (
                    <>
                        {isCover && <Badge messageId="coverCardFile" />}
                        {isMain && <Badge messageId="mainCardFile" />}
                        <Stack direction="horizontal" gap={2} className="ms-auto">
                            {shortType === FILE_TYPES.image &&
                                (isCover ? (
                                    <EyeFill role="button" onClick={() => onCoverSwitch(id, false)} />
                                ) : (
                                    <Eye role="button" onClick={() => onCoverSwitch(id, true)} />
                                ))}
                            {isMain ? (
                                <StarFill role="button" />
                            ) : (
                                <Star role="button" onClick={() => onChosenAsMain(id)} />
                            )}
                            <Download role="button" />
                            <Dropdown role="button">
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">
                                        <FormattedMessage id="copyLink" />
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2">
                                        <FormattedMessage id="rename" />
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={() => onFileDelete(id)}>
                                        <FormattedMessage id="delete" />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Stack>
                    </>
                )}
            </Stack>
        </li>
    )
}

export default FileItem
