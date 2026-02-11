import './App.css'
import "./server"
import { BrowserRouter, Routes, Route } from 'react-router'
import AuthProvider from './components/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import HostLayout from './components/HostLayout.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Vans from "./pages/Van/Vans.jsx"
import VanDetail from "./pages/Van/VanDetail.jsx"
import Dashboard from './pages/Host/Dashboard.jsx'
import Income from './pages/Host/Income.jsx'
import HostVans from "./pages/Host/HostVans.jsx"
import HostVanDetail from "./pages/Host/HostVanDetail.jsx"
import HostVanInfo from "./pages/Host/HostVanInfo.jsx"
import HostVanPricing from "./pages/Host/HostVanPricing.jsx"
import HostVanPhotos from "./pages/Host/HostVanPhotos.jsx"
import Reviews from './pages/Host/Reviews.jsx'
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>      
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/vans" element={<Vans />}/>
          <Route path="/vans/:id" element={<VanDetail />}/>
          <Route element={<AuthRequired />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />}/>
              <Route path="income" element={<Income />}/>
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
              <Route path="reviews" element={<Reviews />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
