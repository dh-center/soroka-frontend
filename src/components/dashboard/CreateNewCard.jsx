import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function CreateNewCard() {
    return (
        <Container>
            <Col>
                <Row>
                    <Col sm="3">
                        <button className="back-to-list">Назад к карточкам</button>
                    </Col>
                    <Col>
                        <h3 className="create-new-card__current-title">Новая карточка</h3>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col><div className="create-new-card__properties">
                        
                        </div></Col>
                </Row>
            </Col>
            <Col sm="3">
                <div className="create-new-card__save-alert">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti expedita autem maxime, sequi modi
                    quae ratione necessitatibus eum deserunt quasi dolorem dicta, asperiores natus reprehenderit.
                    Necessitatibus, dignissimos laboriosam! Corporis dolor impedit dolore et. Eligendi quas autem
                    aliquam expedita! Perspiciatis iusto, repellat delectus, consequatur porro a eaque in suscipit, iure
                    hic reiciendis! Quo error totam magnam. Numquam placeat nihil libero officia adipisci a tempora
                    praesentium, neque laudantium doloribus natus quisquam doloremque alias aspernatur optio. Dolorem
                    modi nostrum sapiente. Suscipit quaerat eveniet ipsum iste soluta, libero maxime totam accusamus
                    harum quisquam voluptatum natus, dolorum assumenda, dolor autem corporis iure earum iusto eum?
                </div>
            </Col>
        </Container>
    )
}

export default CreateNewCard
