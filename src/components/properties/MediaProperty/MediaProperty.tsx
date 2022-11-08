import React, { useState, useRef, useEffect } from 'react'
import { Eye, Star } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { ListGroup } from 'react-bootstrap'
import IconButton from 'components/common/IconButton'
import { MediaPropertyProps } from 'stores/propertiesStore'
import CardsAPI from 'api/cards'
import { cardStore } from 'stores/rootStore'
import MediaFileList from './MediaFileLIst/MediaFileList'

export type UploadedUserFile = {
    id: string
    name: string
    type: string
    size: number
    uploadPercent: number
    [key: string]: any
}

export type PendingUserFile = { id: number; file: File; uploadPercent: number; [key: string]: any }

const MediaProperty = ({ value, onChange, showHelp = false }: MediaPropertyProps) => {
    const [mainFileId, setMainFileId] = useState<string | number>(value.main) // ID главного файла

    const [drag, setDrag] = useState(false)
    const inputFileRef = useRef() as React.MutableRefObject<HTMLInputElement> // todo: think about how to do better

    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<(UploadedUserFile | PendingUserFile)[]>(value.files)

    function addIdForFiles(files: File[]) {
        const pendingFiles = files.map((file, index) => ({ file, id: file.lastModified + index, uploadPercent: 0 }))
        setUploadedFiles((prev) => [...prev, ...pendingFiles])
        return pendingFiles
    }

    function uploadSelectedFiles(files: PendingUserFile[]) {
        files.forEach((fileItem) => {
            const { file } = fileItem
            const data = new FormData()
            data.append('image', file, file.name)

            const options = {
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    const { loaded, total } = progressEvent
                    const percent = Math.floor((loaded * 100) / total)
                    if (percent < 100) {
                        setUploadedFiles((prev) =>
                            prev.map((item) => {
                                if (item.id === fileItem.id) {
                                    return { ...item, uploadPercent: percent }
                                }
                                return item
                            })
                        )
                    }
                }
            }
            CardsAPI.uploadFiles(data, options).then((res) => {
                setUploadedFiles((prev) =>
                    prev.map((item) => {
                        if (item.id === fileItem.id) {
                            const { id, name, type, size } = res.data[0]
                            return {
                                id,
                                name,
                                type,
                                size,
                                uploadPercent: 100
                            }
                        }
                        return item
                    })
                )
            })
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = [...Object.values(event.target.files || [])]
        setSelectedFiles(files)
    }

    useEffect(() => {
        uploadSelectedFiles(addIdForFiles(selectedFiles))
    }, [selectedFiles])

    useEffect(() => {
        const filesArr: UploadedUserFile[] = []
        uploadedFiles.forEach((item) => {
            if (typeof item.id === 'string') {
                const resItem = {
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    size: item.size
                }
                filesArr.push(resItem as UploadedUserFile)
            }
        })
        onChange({ files: filesArr, main: mainFileId.toString() })
    }, [uploadedFiles, mainFileId])

    useEffect(() => {
        if (uploadedFiles.length === 0) {
            cardStore.setCoverFileId(undefined)
            setMainFileId(0)
        }
        cardStore.setChanged(!uploadedFiles.find((item) => item.uploadPercent < 100))
    }, [uploadedFiles])

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
        setSelectedFiles(files)
        setDrag(false)
    }

    return (
        <>
            <div
                className="d-flex flex-column position-relative w-100 border rounded"
                onDragStart={(e) => dragStartHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}>
                <div className="d-flex flex-column align-items-baseline w-100">
                    {uploadedFiles.length !== 0 && (
                        <MediaFileList
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                            setMainFileId={setMainFileId}
                            mainFileId={mainFileId}
                        />
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
                        style={{ userSelect: 'none' }}
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
