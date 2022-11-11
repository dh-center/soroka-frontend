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
import { FormattedMessage } from 'react-intl'
import Dropdown from 'react-bootstrap/Dropdown'
import './MediaFileItem.css'
import { cardStore } from 'stores/rootStore'
import { getShortStringName } from 'utils/strings'
import CustomToggle from 'components/common/CustomToggle'
import { FILE_TYPES } from 'utils/constants'
import { UploadedUserFile } from '../../MediaProperty'

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

export type FileItem = UploadedUserFile & { id: string | number; uploadPercent?: number }

type MediaFileItemProps = {
    file: FileItem
    isCover: boolean
    isMain: boolean
    onMainFileChange: (fileId: string) => void
    handlerFileDelete: (fileId: string, isMain: boolean, isCover: boolean) => void
}

const MediaFileItem = ({ file, isCover, isMain, onMainFileChange, handlerFileDelete }: MediaFileItemProps) => {
    const { id: fileId, name: fileName, type: fileType, uploadPercent: fileUploadPercent } = file
    const shortType = fileType?.split('/')[0]
    const TypeIcon = getTypeIcon(shortType)

    return (
        <li className="list-group-item border-0 px-0 py-3">
            <Stack direction="horizontal" gap={2}>
                <TypeIcon size={36} />
                <div className="d-flex flex-column">
                    <span>{getShortStringName(fileName)}</span>
                    {fileUploadPercent && (
                        <div className="progress media-gile-item__progress-bar">
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: `${fileUploadPercent}%` }}
                                aria-valuenow={fileUploadPercent}
                                aria-valuemin={0}
                                aria-valuemax={100}></div>
                        </div>
                    )}
                </div>

                {!fileUploadPercent && (
                    <>
                        {isCover && <FileBadge messageId="coverCardFile" />}
                        {isMain && <FileBadge messageId="mainCardFile" />}
                        <Stack direction="horizontal" gap={2} className="ms-auto">
                            {shortType === FILE_TYPES.image &&
                                (isCover ? (
                                    <EyeFill role="button" onClick={() => cardStore.setCoverFileId(null)} />
                                ) : (
                                    <Eye role="button" onClick={() => cardStore.setCoverFileId(fileId)} />
                                ))}
                            {isMain ? (
                                <StarFill role="button" />
                            ) : (
                                <Star role="button" onClick={() => onMainFileChange(fileId)} />
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
                                    <Dropdown.Item
                                        eventKey="3"
                                        onClick={() => handlerFileDelete(fileId, isMain, isCover)}>
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

export default MediaFileItem
