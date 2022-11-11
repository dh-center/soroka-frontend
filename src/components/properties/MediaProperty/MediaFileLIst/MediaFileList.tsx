import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { cardStore } from 'stores/rootStore'
import {
    isInstanceOfPendingUserFile,
    isInstanceOfUploadedUserFile,
    PendingUserFile,
    UploadedUserFile
} from '../MediaProperty'
import MediaFileItem, { FileItem } from './MediaFileItem/MediaFileItem'

type MediaFileListProps = {
    uploadedFiles: (UploadedUserFile | PendingUserFile)[]
    setUploadedFiles: (files: (UploadedUserFile | PendingUserFile)[]) => void
    setMainFileId: (fileId: string | null) => void
    mainFileId: string | null
}

const MediaFileList = observer(({ uploadedFiles, setUploadedFiles, setMainFileId, mainFileId }: MediaFileListProps) => {
    useEffect(() => {
        const firstUploadedFile = uploadedFiles.find((item) => isInstanceOfUploadedUserFile(item)) as UploadedUserFile
        if (mainFileId === null && firstUploadedFile) {
            setMainFileId(firstUploadedFile.id)
        }
    }, [mainFileId, uploadedFiles])

    const handlerFileDelete = (fileId: string, isMain: boolean, isCover: boolean) => {
        if (isMain) {
            setMainFileId(null)
        }
        if (isCover) {
            cardStore.setCoverFileId(null)
        }
        setUploadedFiles(uploadedFiles.filter((item) => fileId !== item.id))
    }

    const onMainFileChange = (fileId: string) => {
        setMainFileId(fileId)
    }

    return (
        <ul className="list-group w-100 px-3">
            {uploadedFiles.map((fileItem) => {
                const file = (
                    isInstanceOfPendingUserFile(fileItem)
                        ? {
                              id: fileItem.id,
                              name: fileItem.file.name,
                              type: fileItem.file.type,
                              size: fileItem.file.size,
                              uploadPercent: fileItem.uploadPercent
                          }
                        : fileItem
                ) as FileItem

                return (
                    <MediaFileItem
                        key={file.id}
                        isCover={file.id === cardStore.coverFileId}
                        isMain={file.id === mainFileId}
                        file={file}
                        handlerFileDelete={handlerFileDelete}
                        onMainFileChange={onMainFileChange}
                    />
                )
            })}
        </ul>
    )
})

export default MediaFileList
