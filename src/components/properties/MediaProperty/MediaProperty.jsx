import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Eye, Star, Plus, FileEarmarkImage, FileEarmarkMusic, Download, ThreeDots } from 'react-bootstrap-icons';
import './MediaProperty.scss';
import { getShortStringName } from '../../../utils/functions';

const MediaProperty = ({ showHelp, value, onChange }) => {
    const [selectedFiles, setSelectedFile] = useState([]);
    const [drag, setDrag] = useState(false);
    const inputFileRef = useRef();

    const handleChange = async(event) => {
        const {length, ...uploadedFiles} = event.target.files;
        setSelectedFile([...selectedFiles, ...Object.values(uploadedFiles)]);
    }

    function dragStartHandler(e) {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        setDrag(false);
    }

    function onDropHandler(e) {
        e.preventDefault();
        const files = [...e.dataTransfer.files];
        setSelectedFile([...selectedFiles, ...files]);
        setDrag(false);
    }

    return (
        <>
            <div className='mediaProperty'
                onDragStart={(e => dragStartHandler(e))}
                onDragOver={(e => dragStartHandler(e))}
            >
                <div className='mediaProperty__mainContent'>
                    {
                        selectedFiles.length !== 0 &&
                            <ul className='mediaProperty__filesList'>
                                {
                                    selectedFiles.map((file, index) => {
                                        console.log(file, 'file');
                                        return <li>
                                                    {file.type.split('/')[0] === 'image' ? <FileEarmarkImage size={36}/> : <FileEarmarkMusic size={36}/>}
                                                    <span>{getShortStringName(file.name)}</span>
                                                    <div className="mediaProperty__fileTools">
                                                        <Eye />
                                                        <Star />
                                                        <Download />
                                                        <ThreeDots />
                                                    </div>
                                                </li>
                                    })
                                }
                            </ul>
                    }
                    <div className='mediaProperty__inputWrap'>
                        <div className='mediaProperty__inputButton'>
                            <input
                                ref={inputFileRef}
                                type="file"
                                onChange={handleChange}
                                accept=".png,.jpg,.mp3,"
                                multiple
                                className='hidden'
                            />
                            <Button onClick={() => inputFileRef.current.click()} variant="secondary" ><Plus size={24}/> Загрузить файлы</Button>
                        </div>
                        <p className='mediaProperty__inputAreaText'>или перетащите сюда</p>  
                    </div>
                </div>
                {showHelp && (
                    <div className='mediaProperty__help'>
                        <p>Допустимые форматы файлов: jpg, png, mp3</p>
                        <div>После загрузки файлов вы сможете выбрать:
                            <ul className="mediaHelp__helpList">
                                <li><Eye size={20} className="mediaHelp__helpListIcon"/><span>Обложку для карточки (среди изображений)</span></li>
                                <li><Star size={20} className="mediaHelp__helpListIcon"/><span>Главный файл (например, это может быть смонтированное интервью среди отрывков, или самое качественное изображение)</span></li>
                            </ul>
                        </div>
                    </div>
                )}
                {
                    drag &&
                        <div className='mediaProperty__dragArea'
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragOver={(e) => dragStartHandler(e)}
                            onDrop={(e) => onDropHandler(e)}
                        >
                            Перетащите файлы сюда
                        </div>
                }
            </div>
        </>
    );
};

export default MediaProperty;