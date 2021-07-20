import Layout from '../../components/layout/layout';
import AllTracksView from '../../components/views/all-tracks-view';

export async function getServerSideProps({params}) {
    const {slug} = params;
    return {
        props: {slug}, // will be passed to the page component as props
    }
}

const App = ({slug}) => {
    console.log('slug', slug);
    return (
        <Layout>
            <AllTracksView/>
        </Layout>
    );
};

export default App;


