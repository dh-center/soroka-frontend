import React, { useEffect, useState, useContext } from 'react'
import './CardPage.css'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import CardStore from '../../stores/cardStore'
import { CARDS_ROUTE, getCardById, DYNAMIC_ID, CARDS_CREATE_ROUTE, SEARCH_TEMPLATE } from '../../utils/urls'
import { FormattedMessage } from 'react-intl'
import { CardsAPI } from '../../api/cards'
import PageLayout from '../../components/common/PageLayout'
import ModalDialog from '../../components/common/ModalDialog'
import CardControlPanel from './CardControlPanel'
import CardPropertiesEditor from './CardPropertiesEditor'
import { mainContext } from '../../context/mainContext'
import { useQuery } from '../../utils/hooks'

export const cardStore = new CardStore()

const CardPage = observer(() => {
    const navigate = useNavigate()
    const { authStore } = useContext(mainContext)
    const { [DYNAMIC_ID]: id } = useParams()
    const searchParams = useQuery()
    const templateId = searchParams.get(SEARCH_TEMPLATE)

    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showSaved, setShowSaved] = useState(false)

    useEffect(() => {
        // FIXME: there's an issue on first load — will be automatically fixed, after "App preloader" will be created, which will manage loading properties/user data etc before ui
        !id && cardStore.fillWithTemplate(templateId)
        if (id) {
            cardStore.getPropertiesFromCardById(id)

            CardsAPI.getCardByid(id).then((res) => {
                cardStore.setOriginNameOfCard(res.data.name)
                cardStore.setCardInfo(res.data)
            })
        }
        if (authStore.currentUser) {
            cardStore.setOrganiztionAndOwner()
        }
    }, [id, authStore.currentUser])

    const isCreateMode = location.href.includes(CARDS_CREATE_ROUTE)

    const pageTitle = isCreateMode ? <FormattedMessage id="newCard" /> : cardStore.nameOfCard

    useEffect(() => {
        return () => {
            cardStore.reset()
        }
    }, [])

    const goBackHandler = () => {
        if (!cardStore.changed) {
            navigate(CARDS_ROUTE)
        } else {
            setShowSaveModal(true)
        }
    }

    const saveCardBeforeExit = (saveAccepted) => {
        if (saveAccepted) {
            cardStore.saveProperties().then(() => navigate(CARDS_ROUTE))
        } else {
            navigate(CARDS_ROUTE)
        }
    }

    const handleSave = async () => {
        await cardStore.saveProperties()
        if (isCreateMode) {
            navigate(getCardById(cardStore.cardInfo.id))
        }
        setShowSaved(true)
    }

    return (
        <PageLayout titleMessage={pageTitle} goBackHandler={goBackHandler}>
            <Container>
                <Row>
                    <Col xs={12} md={9}>
                        <CardPropertiesEditor />
                    </Col>
                    <Col xs={12} md={3}>
                        <CardControlPanel handleSave={handleSave} />
                    </Col>
                </Row>
            </Container>

            {/* save on exit dialog */}
            <ModalDialog
                body={<FormattedMessage id="saveBeforeExit" />}
                show={showSaveModal}
                setShow={setShowSaveModal}
                onClose={saveCardBeforeExit}
                ok={<FormattedMessage id="yes" />}
                cancel={<FormattedMessage id="no" />}
                header={<FormattedMessage id="unsavedChanges" />}
                mustDecide
            />

            {/* saved info modal */}
            <Modal show={showSaved} onHide={() => setShowSaved(false)}>
                <Modal.Body>
                    <FormattedMessage id="saved" />
                </Modal.Body>
            </Modal>
        </PageLayout>
    )
})

export default CardPage
