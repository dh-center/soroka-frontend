import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LANGUAGES, USER_ROLES_DEFINITION } from '../../utils/constants'
import { FormattedMessage } from 'react-intl'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import { ConeStriped } from 'react-bootstrap-icons'
import { WUNDERKAMMER } from '../../utils/urls'

const Header = observer(({ baseStore, authStore }) => {
    const navigate = useNavigate()

    const logout = () => {
        authStore.logout()
    }
    const getUserOrganizationName = () => baseStore.getOrganizationById(authStore.currentUser?.organization)?.name
    const getUserRoleString = () => USER_ROLES_DEFINITION[authStore.currentUser.userRole].roleMessageId

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Container>
                <Navbar.Brand role="button" onClick={() => navigate('/')}>
                    <ConeStriped />
                    <FormattedMessage id="soroka" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        {authStore.currentUser && (
                            <Navbar.Text>
                                <FormattedMessage id={getUserRoleString()} /> {authStore.currentUser.name} (
                                {getUserOrganizationName()})
                            </Navbar.Text>
                        )}
                    </Nav>
                    <Nav>
                        <Nav.Link href={WUNDERKAMMER}>Wunderkammer</Nav.Link>

                        <NavDropdown title={<FormattedMessage id="language" />} id="basic-nav-dropdown">
                            {LANGUAGES.map(({ name, code }) => {
                                return (
                                    <NavDropdown.Item
                                        disabled={baseStore.uiLang === code}
                                        key={code}
                                        onClick={() => baseStore.setUiLang(code)}>
                                        {name}
                                    </NavDropdown.Item>
                                )
                            })}
                        </NavDropdown>
                        {authStore.currentUser && (
                            <Nav.Link onClick={logout}>
                                <FormattedMessage id="exit" />
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default Header
