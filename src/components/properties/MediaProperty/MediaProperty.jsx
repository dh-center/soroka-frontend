import React, { useState, useRef } from 'react'
import IconButton from '../../common/IconButton'
import { Eye, Star } from 'react-bootstrap-icons'
import './MediaProperty.css'
import MediaFileList from './MediaFileLIst/MediaFileList'
import { FormattedMessage, useIntl } from 'react-intl'

const MediaProperty = ({ showHelp, value, onChange }) => {
    const [selectedFiles, setSelectedFile] = useState([])
    const [drag, setDrag] = useState(false)
    const inputFileRef = useRef()
    const intl = useIntl()

    const handleChange = (event) => {
        const { length, ...uploadedFiles } = event.target.files
        setSelectedFile([...selectedFiles, ...Object.values(uploadedFiles)])
        inputFileRef.current.value = null
    }

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e) {
        e.preventDefault()
        const files = [...e.dataTransfer.files]
        setSelectedFile([...selectedFiles, ...files])
        setDrag(false)
    }

    return (
        <>
            <div
                className="d-flex flex-column position-relative w-100 border rounded"
                onDragStart={(e) => dragStartHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}>
                <div className="d-flex flex-column align-items-baseline w-100">
                    {selectedFiles.length !== 0 && (
                        <MediaFileList setSelectedFile={setSelectedFile} selectedFiles={selectedFiles} />
                    )}
                    <div className="d-flex flex-row align-items-baseline w-100 p-3">
                        <input
                            ref={inputFileRef}
                            type="file"
                            onChange={handleChange}
                            accept=".png,.jpg,.mp3,"
                            multiple
                            className="hidden"
                        />
                        <IconButton
                            onClick={() => inputFileRef.current.click()}
                            className="flex-grow-2"
                            textId="uploadFiles"
                            variantValue="secondary">
                            {intl.formatMessage({ id: 'uploadFiles' })}
                        </IconButton>
                        <p className="mb-0 text-center flex-grow-1">{intl.formatMessage({ id: 'orDragFiles' })}</p>
                    </div>
                </div>
                {showHelp && (
                    <div className="p-3">
                        <FormattedMessage
                            id="mediaHelp"
                            values={{
                                p: (chunks) => <p>{chunks}</p>,
                                div: (chunks) => <div>{chunks}</div>,
                                ul: (chunks) => <ul className="mediaHelp__helpList">{chunks}</ul>,
                                li: (chunks) => <li>{chunks}</li>,
                                span: (chunks) => <span>{chunks}</span>,
                                eye: <Eye size={20} className="mediaHelp__helpListIcon" />,
                                star: <Star size={20} className="mediaHelp__helpListIcon" />
                            }}
                        />
                    </div>
                )}
                {drag && (
                    <div
                        className="mediaProperty__dragArea position-absolute p-3 w-100 h-100 text-center m-0 d-flex justify-content-center align-items-center"
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onDrop={(e) => onDropHandler(e)}>
                        {intl.formatMessage({ id: 'dragFiles' })}
                    </div>
                )}
            </div>
        </>
    )
}

export default MediaProperty
