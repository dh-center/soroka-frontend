import React, { useState, useRef } from 'react'
import { Eye, Star } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { ListGroup } from 'react-bootstrap'
import IconButton from 'components/common/IconButton'
import MediaFileList from './MediaFileLIst/MediaFileList'

const MediaProperty = (props: { showHelp: boolean }) => {
    const { showHelp } = props
    const [selectedFiles, setSelectedFile] = useState<File[]>([])
    const [drag, setDrag] = useState(false)
    const inputFileRef = useRef() as React.MutableRefObject<HTMLInputElement> // todo: think about how to do better

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile([...selectedFiles, ...Object.values(event.target.files || [])])
        if (inputFileRef.current) {
            inputFileRef.current.value = ''
        }
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
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
                    <div className="d-flex flex-row align-items-center w-100 p-3">
                        <input
                            ref={inputFileRef}
                            type="file"
                            onChange={handleChange}
                            accept=".png,.jpg,.mp3,"
                            multiple
                            className="d-none"
                        />
                        <IconButton
                            onClick={() => inputFileRef.current?.click()}
                            messageId="uploadFiles"
                            variant="secondary"
                            disabled={false}
                        />
                        <p className="mb-0 text-center flex-grow-1">
                            <FormattedMessage id="orDragFiles" />
                        </p>
                    </div>
                </div>
                {showHelp && (
                    <div className="p-3">
                        <FormattedMessage
                            id="mediaHelp"
                            values={{
                                p: (chunks) => <p>{chunks}</p>,
                                div: (chunks) => <div>{chunks}</div>,
                                ul: (chunks) => <ListGroup variant="flush">{chunks}</ListGroup>,
                                li: (chunks) => <ListGroup.Item>{chunks}</ListGroup.Item>,
                                span: (chunks) => <span>{chunks}</span>,
                                eye: <Eye size={15} className="align-baseline mx-1" />,
                                star: <Star size={15} className="align-baseline mx-1" />
                            }}
                        />
                    </div>
                )}
                {drag && (
                    <div
                        className="bg-secondary text-light position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onDrop={(e) => onDropHandler(e)}>
                        <FormattedMessage id="dragFiles" />
                    </div>
                )}
            </div>
        </>
    )
}

export default MediaProperty
