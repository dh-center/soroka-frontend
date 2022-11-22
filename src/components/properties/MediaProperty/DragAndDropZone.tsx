import React, { useState, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import IconButton from 'components/common/IconButton'

type DragAndDropZoneProps = {
    onFilesSelect: (files: File[]) => void
    children?: JSX.Element
    help?: JSX.Element
}

const DragAndDropZone = ({ onFilesSelect, children, help }: DragAndDropZoneProps) => {
    const inputFileRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const [isDrag, setIsDrag] = useState(false)

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDrag(true)
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDrag(false)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const files = [...e.dataTransfer.files]
        onFilesSelect(files)
        setIsDrag(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = [...Object.values(event.target.files || [])]
        onFilesSelect(files)
    }

    return (
        <div
            className="d-flex flex-column position-relative w-100 border rounded user-select-none"
            onDragStart={onDragStart}
            onDragOver={onDragStart}>
            <div className="d-flex flex-column align-items-baseline w-100">
                {children}
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
            {help}
            {isDrag && (
                <div
                    className="bg-secondary text-light position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}>
                    <FormattedMessage id="dragFiles" />
                </div>
            )}
        </div>
    )
}

export default DragAndDropZone
