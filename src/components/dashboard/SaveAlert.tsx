import 'views/dashboard/dashboardGlobal.css'
import './SaveAlert.css'

type SaveAlertPrtops = {
    isUserNotChangedProperties: boolean
    isHaveEmptyProperties: boolean
}

function SaveAlert({ isUserNotChangedProperties, isHaveEmptyProperties }: SaveAlertPrtops) {
    return (
        <div className="save-alert">
            {isHaveEmptyProperties && <p>Эта карточка заполнена не до конца: в ней есть пустые поля.</p>}
            <button className="dashboard-button" disabled={isUserNotChangedProperties}>
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.1459 3C18.4044 3 18.6529 3.10008 18.8391 3.27926L22.7076 7L22.7076 20C22.7076 20.5523 22.2599 21 21.7076 21L4.99284 21C4.44056 21 3.99284 20.5523 3.99284 20L3.99284 4C3.99284 3.44772 4.44055 3 4.99284 3L18.1459 3Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <rect x="8.1517" y="13" width="10.3971" height="8" stroke="black" strokeLinejoin="round" />
                    <rect x="9.19141" y="3" width="8.31769" height="5" stroke="black" strokeLinejoin="round" />
                </svg>
                <span>Сохранить</span>
            </button>
        </div>
    )
}

export default SaveAlert
