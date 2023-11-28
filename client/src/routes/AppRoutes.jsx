
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import LogInPage from '../pages/LogInPage'
import UserListPage from '../pages/UserListPage'
import UserDetailsPage from '../pages/UserDetailsPage'
import StoryDetailsPage from '../pages/StoryDetailsPage'
import MyProfilePage from '../pages/MyProfilePage'
import CreateStoryPage from '../pages/CreateStoryPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<HomePage></HomePage>} />
            <Route path={"/signUp"} element={<SignUpPage />} />
            <Route path={"/logIn"} element={<LogInPage />} />
            <Route path={"/microrrelatos"} element={<CreateStoryPage />} />
            <Route path={"/usuarios"} element={<UserListPage />} />
            <Route path={"/usuarios/detalles/:userId"} element={<UserDetailsPage />} />
            <Route path={"/microrrelatos/detalles/:storyId"} element={<StoryDetailsPage />} />
            <Route path={"/miPerfil"} element={<UserDetailsPage />} />
            <Route path={"/logOut"} element={<HomePage />} />
        </Routes >
    )
}
export default AppRoutes