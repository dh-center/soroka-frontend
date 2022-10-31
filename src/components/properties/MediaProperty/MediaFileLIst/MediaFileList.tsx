import { useEffect } from 'react'
import { PendingUserFile, UploadedUserFile } from '../MediaProperty'
import MediaFileItem from './MediaFileItem/MediaFileItem'

type MediaFileListProps = {
    uploadedFiles: (UploadedUserFile | PendingUserFile)[]
    setUploadedFiles: (files: (UploadedUserFile | PendingUserFile)[]) => void
    setMainFileId: (fileId: string | number) => void
    mainFileId: string | number
    setCoverFileId: (fileId: string | undefined) => void
    coverFileId: string | undefined
}

const MediaFileList = ({
    uploadedFiles,
    setUploadedFiles,
    setMainFileId,
    mainFileId,
    setCoverFileId,
    coverFileId
}: MediaFileListProps) => {
    useEffect(() => {
        if (mainFileId === 0 && typeof uploadedFiles[0].id !== 'number') {
            setMainFileId(uploadedFiles[0].id)
        }
    }, [mainFileId, uploadedFiles])
    return (
        <ul className="list-group w-100 px-3">
            {uploadedFiles.map((fileItem) => {
                const file = Object.prototype.hasOwnProperty.call(fileItem, 'file')
                    ? {
                          id: fileItem.id,
                          name: fileItem.file.name,
                          type: fileItem.file.type,
                          size: fileItem.file.size,
                          uploadPercent: fileItem.uploadPercent
                      }
                    : fileItem
                return (
                    <MediaFileItem
                        key={file.id}
                        isCover={file.id === coverFileId}
                        isMain={file.id === mainFileId}
                        file={file}
                        uploadedFiles={uploadedFiles}
                        setUploadedFiles={setUploadedFiles}
                        setCoverFileId={setCoverFileId}
                        setMainFileId={setMainFileId}
                    />
                )
            })}
        </ul>
    )
}

export default MediaFileList
