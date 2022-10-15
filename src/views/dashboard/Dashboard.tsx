import PageLayout from 'components/common/PageLayout'
import ListOfCards from 'components/dashboard/ListOfCards'

function Dashboard() {
    return (
        <PageLayout titleMessageId="cards">
            <ListOfCards />
        </PageLayout>
    )
}

export default Dashboard
