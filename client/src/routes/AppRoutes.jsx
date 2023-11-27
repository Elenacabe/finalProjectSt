
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import LogInPage from '../pages/LogInPage'
import StoryListPage from '../pages/StoryListPage'
import UserListPage from '../pages/UserListPage'
import UserDetailsPage from '../pages/UserDetailsPage'
import StoryDetailsPage from '../pages/StoryDetailsPage'
import MyProfilePage from '../pages/MyProfilePage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<HomePage></HomePage>} />
            <Route path={"/signUp"} element={<SignUpPage />} />
            <Route path={"/logIn"} element={<LogInPage />} />
            <Route path={"/microrrelatos"} element={<StoryListPage />} />
            <Route path={"/usuarios"} element={<UserListPage />} />
            <Route path={"/usuarios/detalles/:_id"} element={<UserDetailsPage />} />
            <Route path={"/microrrelatos/detalles/:_id"} element={<StoryDetailsPage />} />
            <Route path={"/miPerfil"} element={<MyProfilePage />} />
            <Route path={"/logOut"} element={<HomePage />} />
        </Routes >
    )
}
export default AppRoutes