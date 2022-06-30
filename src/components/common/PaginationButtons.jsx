import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationButtons = ({ page, total, pageSize, setPage }) => {
    const totalPages = Math.ceil(total / pageSize) || 1

    // show first, last, current, pages before and after current
    const buttons = [...new Set([0, totalPages - 1, page - 1, page, page + 1])]
        .filter((p) => p >= 0 && p < totalPages)
        .sort((a, b) => a - b)

    const nodes = buttons.reduce((acc, current, index) => {
        const paginationButton = (
            <Pagination.Item
                key={`pagination_button_${current}`}
                active={current === page}
                onClick={() => setPage(current)}>
                {current + 1}
            </Pagination.Item>
        )

        acc.push(paginationButton)

        // if pages are not consecutive — add ellipsis
        if (index !== buttons.length - 1) {
            const nextButton = buttons[index + 1]
            if (nextButton !== current + 1) {
                acc.push(
                    <Pagination.Ellipsis
                        key={`pagination_elipsis_${current}`}
                        onClick={() => setPage(Math.ceil((nextButton + current) / 2))}
                    />
                )
            }
        }

        return acc
    }, [])

    return (
        <Pagination>
            <Pagination.First onClick={() => setPage(0)} />
            {nodes}
            <Pagination.Last onClick={() => setPage(totalPages - 1)} />
        </Pagination>
    )
}

export default PaginationButtons
