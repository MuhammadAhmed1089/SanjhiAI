import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth pages
import Welcome from './pages/auth/Welcome';
import SignUp from './pages/auth/SignUp';
import PhoneInput from './pages/auth/PhoneInput';
import OTPVerification from './pages/auth/OTPVerification';
const ProfileSetup = lazy(() => import('./pages/auth/ProfileSetup'));

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
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminCommittees = lazy(() => import('./pages/admin/AdminCommittees'));
const AdminDisputes = lazy(() => import('./pages/admin/AdminDisputes'));
const ActivityLog = lazy(() => import('./pages/admin/ActivityLog'));

// Misc pages
const Offline = lazy(() => import('./pages/misc/Offline'));
const Loading = lazy(() => import('./pages/misc/Loading'));
const EmptyStates = lazy(() => import('./pages/misc/EmptyStates'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-surface-warm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-emerald border-t-transparent rounded-full animate-spin" />
        <p className="font-label text-[14px] text-on-surface-variant">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth Flow */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/phone" element={<PhoneInput />} />
        <Route path="/signup/email" element={<PhoneInput />} />
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

        {/* Committee Detail */}
        <Route path="/committee/:id" element={<CommitteeDetail />} />
        <Route path="/committee/:id/settings" element={<CommitteeSettings />} />
        <Route path="/committee/:id/progress" element={<CommitteeProgress />} />

        {/* Join Committee */}
        <Route path="/join" element={<JoinByCode />} />
        <Route path="/join/:code" element={<JoinCommittee />} />
        <Route path="/join-request-sent" element={<JoinRequestSent />} />

        {/* Members */}
        <Route path="/committee/:id/invite" element={<InviteMembers />} />
        <Route path="/committee/:id/requests" element={<JoinRequests />} />

        {/* Payments */}
        <Route path="/payments" element={<MyPayments />} />
        <Route path="/payments/pay" element={<PayNow />} />
        <Route path="/payments/release" element={<ReleasePayout />} />

        {/* Support */}
        <Route path="/support" element={<SupportHome />} />
        <Route path="/support/complaints" element={<MyComplaints />} />
        <Route path="/support/complaints/:id" element={<ComplaintDetail />} />
        <Route path="/support/file-complaint" element={<FileComplaint />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/committees" element={<AdminCommittees />} />
        <Route path="/admin/disputes" element={<AdminDisputes />} />
        <Route path="/admin/activity" element={<ActivityLog />} />

        {/* Misc */}
        <Route path="/offline" element={<Offline />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/empty" element={<EmptyStates />} />
      </Routes>
    </Suspense>
  );
}
