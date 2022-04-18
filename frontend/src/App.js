import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/userActions';
import LandingScreen from './screens/LandingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeFeedScreen from './screens/HomeFeedScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    const user = useSelector((state) => state.loadedUser);
    const { userInfo } = user;

    return (
        <>
            {userInfo ? <Header /> : ''}
            <Routes>
                <Route path='/' element={<LandingScreen />} />
                <Route path='/home' element={<HomeFeedScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
            </Routes>
            {userInfo ? <Footer /> : ''}
        </>
    );
}

export default App;
