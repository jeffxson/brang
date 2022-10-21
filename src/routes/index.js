// Authentication related pages
import Login from "../pages/Authentication/Login"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import AppSearch from "../pages/AppSearch"
import Superuser from "pages/Dashboard/SuperUser/Superuser"
import Dashboard from "pages/Dashboard/Dashboard"
import WebsiteMonitoring from "pages/WebsiteMonitoring/WebsiteMonitoring"
import TwistedDNS from "pages/TwistedDns/TwistedDns"
import { Redirect } from "react-router-dom"
import DataLeak from "pages/DataLeak/DataLeak"
import ImageTakeDown from "pages/ImageTakeDown/ImageTakeDown"
import DarkWeb from "pages/DarkWeb/DarkWeb"
import SocialMedia from "pages/SocialMedia/SocialMedia"
import Takedown from "pages/TakeDown/Takedown"
import WebsiteMonitoringInside from "pages/WebsiteMonitoring/WebsiteMonitoringInside"
import TwistedDnsInside from "pages/TwistedDns/TwistedDnsInside"
import Account from "pages/Settings/Account"
import SystemHealth from "pages/SystemHealth/SystemHealth"
import Teams from "pages/Teams/Teams"
import TeamInfo from "pages/Teams/TeamInfo"
import Security from "pages/Settings/Security"
import SocialAccounts from "pages/Twitter Timeline/index"
import Notifications from "pages/Settings/Notifications"
import CompanySettingsPage from "pages/Settings/CompanySettingsPage"
import ForgetPassword from "../pages/Authentication/ForgetPassword"
import VerifyOtp from "pages/Authentication/VerifyOtp"
import ChangeForgotPassword from "pages/Authentication/UpdatePassword"
import TopGoogleSearch from "pages/Dashboard/TopGoogleSearch"
import News from "pages/Dashboard/News"
import JobSearches from "pages/JobSearches"
import GoogleReview from "pages/GoogleReview"
import RaisedIncidents from "pages/RaisedIncidents/RaisedIncidents"
import NewRegister from "pages/Authentication/Register"
import YoutubeSearch from "pages/YoutubeSearch/YoutubeSearch"
import Register from "pages/Invitation/Register"
import Analytics from "pages/Analytics"
import Featured from "pages/Featured/Featured"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/admin-dashboard", component: Superuser },
  { path: "/dashboard/top-google-search", component: TopGoogleSearch },
  { path: "/dashboard/news", component: News },
  { path: "/job-searches", component: JobSearches },
  { path: "/featured", component: Featured },
  { path: "/app-search", component: AppSearch },
  { path: "/website-monitoring", component: WebsiteMonitoring },
  { path: "/twisted-dns", component: TwistedDNS },
  { path: "/website-monitoring-inside", component: WebsiteMonitoringInside },
  { path: "/twisted-dns-inside", component: TwistedDnsInside },
  { path: "/data-leak", component: DataLeak },
  { path: "/dark-web-search", component: DarkWeb },
  { path: "/social-media", component: SocialMedia },
  { path: "/youtube-search", component: YoutubeSearch },
  { path: "/raised-incidents", component: RaisedIncidents },
  { path: "/image-search", component: ImageTakeDown },
  { path: "/takedown", component: Takedown },
  { path: "/settings/account", component: Account },
  { path: "/settings/teams", component: Teams },
  { path: "/settings/team/:id", component: TeamInfo },
  { path: "/settings/company", component: CompanySettingsPage },
  { path: "/twitter-timeline", component: SocialAccounts },
  { path: "/settings/notifications", component: Notifications },
  { path: "/settings/security", component: Security },
  { path: "/google-review", component: GoogleReview },
  { path: "/system-health", component: SystemHealth },
  { path: "/analytics", component: Analytics },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/forgot-password", component: ForgetPassword },
  { path: "/verify-otp", component: VerifyOtp },
  { path: "/change-forgot-password", component: ChangeForgotPassword },
  { path: "/register", component: NewRegister },
  { path: "/users/invitation/:token", component: Register },
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

export { authProtectedRoutes, publicRoutes }
