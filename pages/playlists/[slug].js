import Layout from '../../components/layout/layout';
import AllTracksView from '../../components/views/all-tracks-view';

export const getServerSideProps = async({params}) => ({props: params});

const App = ({params}) => {
    return (
        <Layout params={params}>
            <AllTracksView/>
        </Layout>
    );
};

export default App;


