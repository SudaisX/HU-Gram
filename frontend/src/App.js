import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import LandingScreen from './screens/LandingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeFeedScreen from './screens/HomeFeedScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import ProfileScreen from './screens/ProfileScreen';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.loadedUser);
    const { userInfo } = user;

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            {userInfo ? <Header userInfo={userInfo} /> : ''}
            <Routes>
                <Route path='/' element={<LandingScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/home' element={<PrivateRoute component={HomeFeedScreen} />} />
                <Route path='/dashboard' element={<PrivateRoute component={DashboardScreen} />} />
                <Route path='/profile' element={<PrivateRoute component={ProfileScreen} />} />
                <Route
                    path='/profile/create'
                    element={<PrivateRoute component={CreateProfileScreen} />}
                />
            </Routes>
            {userInfo ? <Footer /> : ''}
        </>
    );
}

export default App;
