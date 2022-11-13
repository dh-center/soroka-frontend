import { useState, useEffect } from 'react'
import { MediaPropertyProps } from 'stores/propertiesStore'
import CardsAPI from 'api/cards'
import { cardStore } from 'stores/rootStore'
import MediaFileList from './MediaFileList/MediaFileList'
import UploadedFileData from './UploadedFileData'
import PendingFileData from './PendingFileData'
import DragAndDropZone from './DragAndDropZone'
import Help from './Help'

const MediaProperty = ({ value, onChange, showHelp = false }: MediaPropertyProps) => {
    const [mainFileId, setMainFileId] = useState<string | null>(value.main) // ID главного файла

    // initializing files state from plain object parsed from json
    const [files, setFiles] = useState<(UploadedFileData | PendingFileData)[]>(() =>
        value.files.map(
            (initialFileData) =>
                new UploadedFileData(
                    initialFileData.id,
                    initialFileData.name,
                    initialFileData.type,
                    initialFileData.size
                )
        )
    )

    const onFilesSelect = (userSelectedFiles: File[]) => {
        const pendingFiles = userSelectedFiles.map(
            (file, index) => new PendingFileData(String(+new Date() + index), file)
        )

        pendingFiles.forEach((fileItem) => {
            const { file } = fileItem
            const data = new FormData()
            data.append('image', file, file.name)

            const options = {
                onUploadProgress: fileItem.onUploadProgress.bind(fileItem)
            }

            // todo: will throw an error, if component unmounted before upload completed, due to setState call inside
            CardsAPI.uploadFiles(data, options).then((res) => {
                setFiles((prev) =>
                    prev.map((item) => {
                        if (item.id === fileItem.id) {
                            const { id, name, type, size } = res.data[0]
                            return new UploadedFileData(id, name, type, size)
                        }
                        return item
                    })
                )
            })
        })

        setFiles((prev) => [...prev, ...pendingFiles])
    }

    // updating storage on files or main file change
    useEffect(() => {
        const uploadedFiles = files.filter((item) => item instanceof UploadedFileData) as UploadedFileData[]
        onChange({ files: uploadedFiles, main: mainFileId })
    }, [files, mainFileId, onChange])

    // removing cover and main file when all files deleted
    useEffect(() => {
        if (files.length === 0) {
            cardStore.setCoverFileId(null)
            setMainFileId(null)
        }
    }, [files])

    // set pending action flag to card, when there are pending files
    useEffect(() => {
        cardStore.setPendingActions(files.some((item) => item instanceof PendingFileData))
    }, [files])

    return (
        <DragAndDropZone help={showHelp ? <Help /> : undefined} onFilesSelect={onFilesSelect}>
            <MediaFileList
                files={files}
                setUploadedFiles={setFiles}
                setMainFileId={setMainFileId}
                mainFileId={mainFileId}
            />
        </DragAndDropZone>
    )
}

export default MediaProperty
