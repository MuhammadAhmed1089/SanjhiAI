import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import BottomNav from './components/BottomNav';
import { NavDrawerProvider } from './context/NavDrawerContext';
import MobileSideDrawer from './components/MobileSideDrawer';
import logo from './assets/screen.png';

// Auth pages
import Welcome from './pages/auth/Welcome';
import SignUp from './pages/auth/SignUp';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import OTPVerification from './pages/auth/OTPVerification';
const ProfileSetup = lazy(() => import('./pages/auth/ProfileSetup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// Committee pages
const CreateCommittee = lazy(() => import('./pages/committee/CreateCommittee'));
const SetSchedule = lazy(() => import('./pages/committee/SetSchedule'));
const LinkAccount = lazy(() => import('./pages/committee/LinkAccount'));
const ReviewConfirm = lazy(() => import('./pages/committee/ReviewConfirm'));
const CommitteeCreated = lazy(() => import('./pages/committee/CommitteeCreated'));
const CommitteeDetail = lazy(() => import('./pages/committee/CommitteeDetail'));
const CommitteeSettings = lazy(() => import('./pages/committee/CommitteeSettings'));
const CommitteeProgress = lazy(() => import('./pages/committee/CommitteeProgress'));
const CommitteeSetup = lazy(() => import('./pages/committee/CommitteeSetup'));
const JoinCommittee = lazy(() => import('./pages/committee/JoinCommittee'));
const JoinByCode = lazy(() => import('./pages/committee/JoinByCode'));
const JoinRequestSent = lazy(() => import('./pages/committee/JoinRequestSent'));
const MyPools = lazy(() => import('./pages/committee/MyPools'));
const PublicCommittees = lazy(() => import('./pages/committee/PublicCommittees'));

// Dashboard pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Assistant = lazy(() => import('./pages/dashboard/Assistant'));
const Notifications = lazy(() => import('./pages/dashboard/Notifications'));

// Members pages
const InviteMembers = lazy(() => import('./pages/members/InviteMembers'));
const JoinRequests = lazy(() => import('./pages/members/JoinRequests'));

// Payments pages
const ReleasePayout = lazy(() => import('./pages/payments/ReleasePayout'));
const MyPayments = lazy(() => import('./pages/payments/MyPayments'));
const PayNow = lazy(() => import('./pages/payments/PayNow'));

// Support pages
const SupportHome = lazy(() => import('./pages/support/SupportHome'));
const FileComplaint = lazy(() => import('./pages/support/FileComplaint'));
const MyComplaints = lazy(() => import('./pages/support/MyComplaints'));
const ComplaintDetail = lazy(() => import('./pages/support/ComplaintDetail'));

// Profile
const Profile = lazy(() => import('./pages/profile/Profile'));

// Admin pages
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminCommittees = lazy(() => import('./pages/admin/AdminCommittees'));
const AdminCommitteeDetail = lazy(() => import('./pages/admin/AdminCommitteeDetail'));
const AdminDisputes = lazy(() => import('./pages/admin/AdminDisputes'));
const AdminAnnouncements = lazy(() => import('./pages/admin/AdminAnnouncements'));
const AdminCnicVerification = lazy(() => import('./pages/admin/AdminCnicVerification'));
const ActivityLog = lazy(() => import('./pages/admin/ActivityLog'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Misc pages
const Offline = lazy(() => import('./pages/misc/Offline'));
const Loading = lazy(() => import('./pages/misc/Loading'));
const EmptyStates = lazy(() => import('./pages/misc/EmptyStates'));

/* ── Ultra-sleek, zero-lag glassmorphic page loader ── */
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#fbfaee] flex flex-col items-center justify-center p-4 selection:bg-transparent">
      <div className="relative flex flex-col items-center gap-4 p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-[#006972]/20 shadow-[0_20px_60px_-15px_rgba(0,105,114,0.15)] animate-fade-in">
        <div className="relative w-18 h-18 flex items-center justify-center rounded-2xl bg-white p-2.5 shadow-md border border-[#006972]/15">
          <div className="absolute -inset-1 rounded-2xl border-2 border-[#006972]/20 border-t-[#006972] animate-spin" />
          <img src={logo} alt="Sanjhi" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-headline font-bold text-[#006972] text-[16px] tracking-tight">Sanjhi AI</span>
          <span className="font-body text-[12px] text-on-surface-variant font-medium animate-pulse">Loading experience...</span>
        </div>
      </div>
    </div>
  );
}

/* ── Root Auth Redirector: checks session token on root path ── */
function RootRouteHandler() {
  const token = localStorage.getItem('sanjhi_token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Welcome />;
}

/* ── Global Viewport Bottom Navigation Handler ── */
function GlobalBottomNav() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const isAuthPage =
    path === '/' ||
    path === '/welcome' ||
    path.startsWith('/login') ||
    path.startsWith('/signup') ||
    path.startsWith('/otp') ||
    path.startsWith('/forgot-password') ||
    path.startsWith('/reset-password') ||
    path.startsWith('/profile-setup');

  if (isAuthPage) return null;

  return <BottomNav />;
}

export default function App() {
  return (
    <NavDrawerProvider>
      <MobileSideDrawer />
      <Suspense fallback={<PageLoader />}>
        <PageTransition>
          <Routes>
            {/* Auth Flow */}
            <Route path="/" element={<RootRouteHandler />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/:method" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/otp" element={<OTPVerification />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Committee Creation Flow */}
            <Route path="/committee/create" element={<CreateCommittee />} />
            <Route path="/committee/schedule" element={<SetSchedule />} />
            <Route path="/committee/link-account" element={<LinkAccount />} />
            <Route path="/committee/review" element={<ReviewConfirm />} />
            <Route path="/committee/created" element={<CommitteeCreated />} />
            <Route path="/committee/setup" element={<CommitteeSetup />} />

            {/* Committee Detail & Pools Hub */}
            <Route path="/pools" element={<MyPools />} />
            <Route path="/committees" element={<MyPools />} />
            <Route path="/committee/:id" element={<CommitteeDetail />} />
            <Route path="/committee/:id/settings" element={<CommitteeSettings />} />
            <Route path="/committee/:id/progress" element={<CommitteeProgress />} />

            {/* Join Committee */}
            <Route path="/join" element={<JoinByCode />} />
            <Route path="/join/:code" element={<JoinCommittee />} />
            <Route path="/join-request-sent" element={<JoinRequestSent />} />

            {/* Public Marketplace */}
            <Route path="/committees/public" element={<PublicCommittees />} />

            {/* Members */}
            <Route path="/committee/:id/invite" element={<InviteMembers />} />
            <Route path="/committee/:id/requests" element={<JoinRequests />} />

            {/* Payments */}
            <Route path="/payments" element={<MyPayments />} />
            <Route path="/payments/pay/:committeeId" element={<PayNow />} />
            <Route path="/payments/pay/:committeeId/:cycleId" element={<PayNow />} />
            <Route path="/payments/pay" element={<PayNow />} />
            <Route path="/payments/release" element={<ReleasePayout />} />
            <Route path="/payments/release/:committeeId/:cycleId" element={<ReleasePayout />} />

            {/* Support */}
            <Route path="/support" element={<SupportHome />} />
            <Route path="/support/complaints" element={<MyComplaints />} />
            <Route path="/support/complaints/:id" element={<ComplaintDetail />} />
            <Route path="/support/file-complaint" element={<FileComplaint />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/committees" element={<AdminCommittees />} />
            <Route path="/admin/committees/:id" element={<AdminCommitteeDetail />} />
            <Route path="/admin/disputes" element={<AdminDisputes />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/cnic-verification" element={<AdminCnicVerification />} />
            <Route path="/admin/activity" element={<ActivityLog />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Misc */}
            <Route path="/offline" element={<Offline />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/empty" element={<EmptyStates />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <GlobalBottomNav />
    </NavDrawerProvider>
  );
}
