import React, { Dispatch, SetStateAction } from 'react'
import MediaFileItem from './MediaFileItem/MediaFileItem'

type MediaFileListProps = {
    uploadFiles: any[]
    setSelectedFile: Dispatch<SetStateAction<File[]>>
    setMainFile: (fileId: number) => void
    mainFile: number
    setCoverFile: (fileId: number) => void
    coverFile: number | undefined
}

const MediaFileList = ({
    uploadFiles,
    setSelectedFile,
    setMainFile,
    mainFile,
    setCoverFile,
    coverFile
}: MediaFileListProps) => {
    let coverIsSet = /* useMemo(() => ~~(Math.random() * selectedFiles.length), []) */ 0

    return (
        <ul className="list-group w-100 px-3">
            {uploadFiles.map((file, index) => {
                if (coverIsSet === null && file.type.split('/')[0] === 'image') {
                    coverIsSet = index
                }
                return (
                    <MediaFileItem
                        key={index}
                        isCover={coverIsSet === index}
                        isMain={file.isMain} // TODO: get main fail from api isMain={mainFile === file.id}
                        index={index}
                        file={file}
                        setSelectedFile={setSelectedFile}
                        uploadFiles={uploadFiles}
                        setCoverFile={setCoverFile}
                        setMainFile={setMainFile}
                    />
                )
            })}
        </ul>
    )
}

export default MediaFileList
