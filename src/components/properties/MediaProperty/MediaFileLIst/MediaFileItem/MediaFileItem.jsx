import React, { useState, useEffect } from 'react'
import { getShortStringName } from '../../../../../utils/functions'
import {
    Eye,
    EyeFill,
    Star,
    StarFill,
    FileEarmarkImage,
    FileEarmarkMusic,
    Download,
    ThreeDots
} from 'react-bootstrap-icons'
import { useIntl } from 'react-intl'

const MediaFileItem = ({ file, index, isCover, isMain, setSelectedFile, selectedFiles }) => {
    const [showToolModal, setShowToolModal] = useState(false)
    const intl = useIntl()
    const fileType = file.type.split('/')[0]

    function documentClickListener(event) {
        if (!event.target.classList.contains('mediaProperty__filePropertiesButton')) {
            setShowToolModal(false)
        }
    }

    useEffect(() => {
        window.addEventListener('mouseup', documentClickListener)
        return () => {
            window.removeEventListener('mouseup', documentClickListener)
        }
    }, [])

    return (
        <li>
            {fileType === 'image' ? <FileEarmarkImage size={36} /> : <FileEarmarkMusic size={36} />}
            <span>{getShortStringName(file.name)}</span>
            {isCover && <span className="mediaProperty__fileCover">{intl.formatMessage({ id: 'coverCardFile' })}</span>}
            {isMain && <span className="mediaProperty__fileMain">{intl.formatMessage({ id: 'mainCardFile' })}</span>}
            <div className="mediaProperty__fileTools">
                {fileType === 'image' && isCover ? <EyeFill /> : <Eye />}
                {isMain ? <StarFill /> : <Star />}
                <Download />
                <ThreeDots
                    className="mediaProperty__filePropertiesButton"
                    onClick={() => setShowToolModal((prev) => !prev)}
                />
                <div className={`mediaProperty__filePropertiesDropDown ${showToolModal && 'active'}`}>
                    <ul>
                        <li>{intl.formatMessage({ id: 'copyLink' })}</li>
                        <li>{intl.formatMessage({ id: 'rename' })}</li>
                        <li
                            onClick={() =>
                                setSelectedFile(selectedFiles.filter((item, indexFile) => indexFile !== index))
                            }>
                            {intl.formatMessage({ id: 'delete' })}
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default MediaFileItem
