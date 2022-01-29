import buildClient from '../api/build-client';
const Landingpage = ({currentUser}) => {
return currentUser ? <h1>You are signed in</h1>: <h1>You are Not Signed In</h1>
}
Landingpage.getInitialProps = async (context) => {
    console.log('Landing Page');
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');
    
    return data;
};

export default Landingpage;