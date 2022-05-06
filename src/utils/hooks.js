import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
}

export function navigateToLogin(authStore){
    // const nav = useNavigate()
    // authStore.logout()
    // nav('/')
}