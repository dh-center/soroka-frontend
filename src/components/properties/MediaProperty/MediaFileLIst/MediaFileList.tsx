import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { cardStore } from 'stores/rootStore'
import PendingFileData from '../PendingFileData'
import UploadedFileData from '../UploadedFileData'
import MediaFileItem from './MediaFileItem/MediaFileItem'

type MediaFileListProps = {
    files: (UploadedFileData | PendingFileData)[]
    setUploadedFiles: (files: (UploadedFileData | PendingFileData)[]) => void
    setMainFileId: (fileId: string | null) => void
    mainFileId: string | null
}

// todo: media file list should not know about cardStore and logic behind main file id
const MediaFileList = observer(({ files, setUploadedFiles, setMainFileId, mainFileId }: MediaFileListProps) => {
    useEffect(() => {
        const firstUploadedFile = files.find((item) => item instanceof UploadedFileData) as UploadedFileData
        if (mainFileId === null && firstUploadedFile) {
            setMainFileId(firstUploadedFile.id)
        }
    }, [mainFileId, files, setMainFileId])

    const onFileDelete = (fileId: string) => {
        if (fileId === mainFileId) {
            setMainFileId(null)
        }
        if (fileId === cardStore.coverFileId) {
            cardStore.setCoverFileId(null)
        }
        setUploadedFiles(files.filter((item) => fileId !== item.id))
    }

    const onChosenAsMain = (fileId: string) => {
        setMainFileId(fileId)
    }

    const onCoverSwitch = (fileId: string, isCover: boolean) => {
        if (isCover) {
            cardStore.setCoverFileId(fileId)
        } else {
            cardStore.setCoverFileId(null)
        }
    }

    return (
        <ul className="list-group w-100 px-3">
            {files.map((fileItem) => (
                <MediaFileItem
                    key={fileItem.id}
                    isCover={fileItem.id === cardStore.coverFileId}
                    isMain={fileItem.id === mainFileId}
                    file={fileItem}
                    onFileDelete={onFileDelete}
                    onChosenAsMain={onChosenAsMain}
                    onCoverSwitch={onCoverSwitch}
                />
            ))}
        </ul>
    )
})

export default MediaFileList
