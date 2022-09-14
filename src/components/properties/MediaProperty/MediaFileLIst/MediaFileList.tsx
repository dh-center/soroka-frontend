import React, { Dispatch, SetStateAction, useMemo } from 'react'
import MediaFileItem from './MediaFileItem/MediaFileItem'

type MediaFileListProps = {
    selectedFiles: File[]
    setSelectedFile: Dispatch<SetStateAction<File[]>>
}

const MediaFileList = ({ selectedFiles, setSelectedFile }: MediaFileListProps) => {
    let coverIsSet = /*useMemo(() => ~~(Math.random() * selectedFiles.length), [])*/ 0

    return (
        <ul className="list-group w-100 px-3">
            {selectedFiles.map((file, index) => {
                if (coverIsSet === null && file.type.split('/')[0] === 'image') {
                    coverIsSet = index
                }
                return (
                    <MediaFileItem
                        key={index}
                        isCover={coverIsSet === index}
                        isMain={index === 0}
                        index={index}
                        file={file}
                        setSelectedFile={setSelectedFile}
                        selectedFiles={selectedFiles}
                    />
                )
            })}
        </ul>
    )
}

export default MediaFileList
