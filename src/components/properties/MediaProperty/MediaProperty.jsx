import React, { useState, useRef, useCallback, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Eye, Star, Plus } from 'react-bootstrap-icons'
import './MediaProperty.scss'
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
                className="mediaProperty"
                onDragStart={(e) => dragStartHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}>
                <div className="mediaProperty__mainContent">
                    {selectedFiles.length !== 0 && (
                        <MediaFileList setSelectedFile={setSelectedFile} selectedFiles={selectedFiles} />
                    )}
                    <div className="mediaProperty__inputWrap">
                        <div className="mediaProperty__inputButton">
                            <input
                                ref={inputFileRef}
                                type="file"
                                onChange={handleChange}
                                accept=".png,.jpg,.mp3,"
                                multiple
                                className="hidden"
                            />
                            <Button onClick={() => inputFileRef.current.click()} variant="secondary">
                                <Plus size={24} /> {intl.formatMessage({ id: 'uploadFiles' })}
                            </Button>
                        </div>
                        <p className="mediaProperty__inputAreaText">{intl.formatMessage({ id: 'orDragFiles' })}</p>
                    </div>
                </div>
                {showHelp && (
                    <div className="mediaProperty__help">
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
                        className="mediaProperty__dragArea"
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
