import { useEffect, useState } from 'react'
import './CardPage.css'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import {
    CARDS_ROUTE,
    getCardById,
    DYNAMIC_ID,
    CARDS_CREATE_ROUTE,
    SEARCH_TEMPLATE,
    CARDS_TEMPLATES_ROUTE
} from 'utils/urls'

import CardsAPI from 'api/cards'
import PageLayout from 'components/common/PageLayout'
import ModalDialog from 'components/common/ModalDialog'
import { useQuery } from 'utils/hooks'
import { useStore } from 'stores/rootStore'
import CardControlPanel from './CardControlPanel'
import CardPropertiesEditor from './CardPropertiesEditor'

const CardPage = observer(() => {
    const navigate = useNavigate()
    const { authStore, cardStore } = useStore()
    const { [DYNAMIC_ID]: id } = useParams()
    const searchParams = useQuery()
    const templateName = searchParams.get(SEARCH_TEMPLATE)

    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showSaved, setShowSaved] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        // FIXME: there's an issue on first load — will be automatically fixed, after "App preloader" will be created, which will manage loading properties/user data etc before ui
        if (!id) {
            cardStore.fillWithTemplate(templateName)
        }
        if (id) {
            cardStore.getPropertiesFromCardById(Number(id))

            CardsAPI.getCardByid(id).then((res) => {
                try {
                    cardStore.setCoverFileId(JSON.parse(res.data.cover).id)
                } catch (e) {
                    cardStore.setCoverFileId(res.data.cover)
                }
                cardStore.setOriginNameOfCard(res.data.name)
                cardStore.setCardInfo(res.data)
                cardStore.setOrganiztionAndOwner()
            })
        }
        if (authStore.currentUser) {
            cardStore.setOrganiztionAndOwner()
        }
    }, [id, authStore.currentUser, cardStore, templateName])

    const isCreateMode = window.location.href.includes(CARDS_CREATE_ROUTE)

    const pageTitle = isCreateMode ? <FormattedMessage id="newCard" /> : cardStore.nameOfCard

    useEffect(() => () => cardStore.reset(), [cardStore])

    const getBackPath = () => (isCreateMode ? CARDS_TEMPLATES_ROUTE : CARDS_ROUTE)

    const goBackHandler = () => {
        if (!cardStore.changed) {
            navigate(getBackPath())
        } else {
            setShowSaveModal(true)
        }
    }

    const saveCardBeforeExit = (saveAccepted: boolean) => {
        if (saveAccepted) {
            cardStore.saveProperties().then(() => navigate(CARDS_ROUTE))
        } else {
            navigate(getBackPath())
        }
    }

    const handleSave = async () => {
        await cardStore.saveProperties()
        if (isCreateMode) {
            navigate(getCardById(cardStore.cardInfo.id))
        }
        setShowSaved(true)
    }

    const handleConfirmDelete = async (deleteAccepted: boolean) => {
        if (deleteAccepted) {
            CardsAPI.deleteCardById(cardStore.cardInfo.id)
            navigate(CARDS_ROUTE)
        }
    }

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    return (
        <PageLayout titleMessage={pageTitle} goBackHandler={goBackHandler}>
            <Container>
                <Row>
                    <Col xs={12} md={9}>
                        <CardPropertiesEditor />
                    </Col>
                    <Col xs={12} md={3}>
                        <CardControlPanel handleSave={handleSave} handleDelete={handleDelete} />
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

            {/* deleting card dialog */}
            <ModalDialog
                body={<FormattedMessage id="deleteCardConfirm" />}
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                onClose={handleConfirmDelete}
                ok={<FormattedMessage id="yes" />}
                okVariant="danger"
                cancel={<FormattedMessage id="no" />}
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
