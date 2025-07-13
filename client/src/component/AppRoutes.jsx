import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from "./UserContext";
import { GlobalMessageProvider } from "./GlobalMessageContext";
import Login from "./User/Login";
import Register from './User/Register';
import Home from './Home/Home';
import Nav from './nav/Nav';
import Order from './orders/NewOrder';
import Info from './info/Info';
import UserManagement from './admin/UserManagement';
import Contact from './contact/Contact';
import ProtectedRoute from './ProtectedRoute';
import AllComments from './comments/allComments/AllComments';
import OrderHistory from './orderHistory/OrderHistory';
import OrderManagement from './admin/adminReservations/ReservationsManagement';
import AdminDayReservations from './admin/AdminDayReservations';
import PageNotFound from './notFound/PageNotFound';
import Guide from './guide/Guide';
import Updates from './updates/Updates';
import Pricing from './pricing/Pricing';
function Main() {

    return (
        <GlobalMessageProvider>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Nav />}>
                            <Route index element={<Home />} />
                            <Route path="/newOrder" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                            <Route path='/info' element={<ProtectedRoute><Info /></ProtectedRoute>}></Route>
                            <Route path='/orderHistory' element={<ProtectedRoute><OrderHistory /></ProtectedRoute>}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/register" element={<Register />}></Route>
                            <Route path="/home" element={<Home />}></Route>
                            <Route path="/contact" element={<Contact />}></Route>
                            <Route path="/guide" element={<Guide />}></Route>
                            <Route path="/updates" element={<Updates />}></Route>
                            <Route path="/pricing" element={<Pricing />}></Route>
                            <Route path="/comments" element={<AllComments />}></Route>
                            <Route path='/admin/orderManagement' element={
                                <ProtectedRoute adminOnly={true}>
                                    <OrderManagement />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/userManagement" element={
                                <ProtectedRoute adminOnly={true}>
                                    <UserManagement />
                                </ProtectedRoute>
                            } />
                            <Route path='/admin/day-reservations' element={
                                <ProtectedRoute adminOnly={true}>
                                    <AdminDayReservations />
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<PageNotFound />} />



                        </Route>
                    </Routes >
                </Router>
            </UserProvider>
        </GlobalMessageProvider>
    )
}
export default Main;