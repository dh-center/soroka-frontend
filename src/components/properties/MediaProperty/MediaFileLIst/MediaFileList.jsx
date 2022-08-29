import React, { useMemo } from 'react'
import MediaFileItem from './MediaFileItem/MediaFileItem'

const MediaFileList = ({ selectedFiles, setSelectedFile }) => {
    let coverIsSet = useMemo(() => ~~(Math.random() * selectedFiles.length), [])

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
