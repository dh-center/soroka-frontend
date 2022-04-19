import React from 'react'
import { Modal } from 'react-bootstrap'

function DialogAtModal({ show, setShow }) {
    const handleClose = () => setShow(false)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="save-before-exit d-flex flex-column align-items-center ">
                    <p>Сохранить перед выходом?</p>
                    <div className="save-before-exit__buttons d-flex alig-items-center">
                        <button className="dashboard-button m-1" onClick={handleClose}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L10 16L17 9" stroke="black" stroke-linecap="round" />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="black"
                                />
                            </svg>
                            <span>Да</span>
                        </button>

                        <button className="dashboard-button m-1" onClick={handleClose}>
                            <svg
                                width="34"
                                height="34"
                                viewBox="0 0 34 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.5355 20.5357L13.4645 13.4647" stroke="black" stroke-linecap="round" />
                                <path d="M13.4645 20.5357L20.5355 13.4647" stroke="black" stroke-linecap="round" />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.92893 24.0711C13.8342 27.9764 20.1658 27.9764 24.0711 24.0711C27.9763 20.1659 27.9763 13.8342 24.0711 9.92898C20.1658 6.02373 13.8342 6.02373 9.92893 9.92898C6.02369 13.8342 6.02369 20.1659 9.92893 24.0711Z"
                                    stroke="black"
                                />
                            </svg>
                            <span>Нет</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DialogAtModal
