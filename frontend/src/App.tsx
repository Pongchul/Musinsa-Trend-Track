import MainPage from "./pages/MainPage/MainPage.tsx";
import { Routes, Route } from 'react-router-dom'
import DashboardPage from "./pages/DashboardPage/DashboardPage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage.tsx";

const App = () => {

  return (
    <>
      <Routes>
          <Route path="/" element={ <MainPage />} />
          <Route path="/dashboard" element={ <DashboardPage /> } />
          <Route path="/analytics" element={ <AnalyticsPage />} />
      </Routes>
    </>
  )
}

export default App
