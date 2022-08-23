import React from 'react'
import { getShortStringName } from '../../../../../utils/strings'
import { Eye, EyeFill, Star, StarFill, FileEarmarkImage, FileEarmarkMusic, Download } from 'react-bootstrap-icons'
import { useIntl } from 'react-intl'
import Dropdown from 'react-bootstrap/Dropdown'
import { CustomToggle, CustomMenu } from '../../../../common/CustomDropdown'
import Badge from 'react-bootstrap/Badge'

const MediaFileItem = ({ file, index, isCover, isMain, setSelectedFile, selectedFiles }) => {
    const intl = useIntl()
    const fileType = file.type.split('/')[0]

    return (
        <li className="list-group-item border-0 px-0 py-3">
            {fileType === 'image' ? <FileEarmarkImage size={36} /> : <FileEarmarkMusic size={36} />}
            <span className="mx-2">{getShortStringName(file.name)}</span>
            {isCover && (
                <Badge bg="light" text="dark" className="mx-2">
                    {intl.formatMessage({ id: 'coverCardFile' })}
                </Badge>
            )}
            {isMain && (
                <Badge bg="light" text="dark" className="mx-2">
                    {intl.formatMessage({ id: 'mainCardFile' })}
                </Badge>
            )}
            <div className="d-inline float-end">
                {fileType === 'image' && isCover ? (
                    <EyeFill role="button" className="mx-2" />
                ) : (
                    <Eye role="button" className="mx-2" />
                )}
                {isMain ? <StarFill role="button" /> : <Star role="button" />}
                <Download role="button" className="mx-2" />
                <Dropdown role="button" className="d-inline mx-2">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        Custom toggle
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
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
            </div>
        </li>
    )
}

export default MediaFileItem
