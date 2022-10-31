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
import CardsAPI from 'api/cards'
import { PendingUserFile, UploadedUserFile } from '../../MediaProperty'

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
    file: any
    isCover: boolean
    isMain: boolean
    setUploadedFiles: (files: (UploadedUserFile | PendingUserFile)[]) => void
    uploadedFiles: (UploadedUserFile | PendingUserFile)[]
    setMainFileId: (fileId: string | number) => void
    setCoverFileId: (fileId: string | undefined) => void
}

const MediaFileItem = ({
    file,
    isCover,
    isMain,
    setUploadedFiles,
    uploadedFiles,
    setMainFileId,
    setCoverFileId
}: MediaFileItemProps) => {
    const intl = useIntl()
    const { id: fileId, name: fileName, type: fileType, uploadPercent: fileUploadPercent } = file
    const shortType = fileType.split('/')[0]
    const TypeIcon = getTypeIcon(shortType)

    return (
        <li className="list-group-item border-0 px-0 py-3">
            <Stack direction="horizontal" gap={2}>
                <TypeIcon size={36} />
                <div className="d-flex flex-column">
                    <span>{getShortStringName(fileName)}</span>
                    {fileUploadPercent < 100 && (
                        <div className="progress" style={{ height: '10px' }}>
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

                {typeof fileId === 'string' && (
                    <>
                        {isCover && <FileBadge messageId="coverCardFile" />}
                        {isMain && <FileBadge messageId="mainCardFile" />}
                        <Stack direction="horizontal" gap={2} className="ms-auto">
                            {shortType === 'image' &&
                                (isCover ? (
                                    <EyeFill role="button" onClick={() => setCoverFileId(undefined)} />
                                ) : (
                                    <Eye role="button" onClick={() => setCoverFileId(fileId)} />
                                ))}
                            {isMain ? (
                                <StarFill role="button" />
                            ) : (
                                <Star role="button" onClick={() => setMainFileId(fileId)} />
                            )}
                            <Download role="button" />
                            <Dropdown role="button">
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">{intl.formatMessage({ id: 'copyLink' })}</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">{intl.formatMessage({ id: 'rename' })}</Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="3"
                                        onClick={() => {
                                            CardsAPI.deleteFile(fileId).then(() => {
                                                if (isMain) {
                                                    setMainFileId(0)
                                                }
                                                setUploadedFiles(uploadedFiles.filter((item) => fileId !== item.id))
                                            })
                                        }}>
                                        {intl.formatMessage({ id: 'delete' })}
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
