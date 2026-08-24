import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScreenNav from './components/ScreenNav';

// Auth pages
import Welcome from './pages/auth/Welcome';
import SignUp from './pages/auth/SignUp';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
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

/* ── Skeleton bone: shimmer block ── */
function Bone({ className = '' }) {
  return <div className={`skeleton-bone ${className}`} />;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-white font-body overflow-hidden pb-24 md:pb-0">

      {/* Live ticker bar skeleton */}
      <div className="h-9 bg-[#006972]/6 border-b border-[#006972]/10" />

      {/* App bar skeleton */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#006972]/10 shadow-sm h-20 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bone className="w-11 h-11 rounded-full" />
          <div className="flex flex-col gap-2">
            <Bone className="w-24 h-3 rounded-full" />
            <Bone className="w-36 h-5 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Bone className="w-28 h-9 rounded-full hidden sm:block" />
          <Bone className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 space-y-6">

        {/* Hero row: trust card + side cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Trust score card */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden" style={{ height: 240 }}>
            <Bone className="w-full h-full rounded-3xl" />
          </div>
          {/* Side metric cards */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <div className="flex-1 bg-white rounded-3xl p-5 border-2 border-[#006972]/10 flex items-center gap-4 shadow-sm">
              <Bone className="w-12 h-12 rounded-2xl shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Bone className="w-24 h-3 rounded-full" />
                <Bone className="w-32 h-6 rounded-full" />
                <Bone className="w-20 h-3 rounded-full" />
              </div>
            </div>
            <div className="flex-1 bg-white rounded-3xl p-5 border-2 border-[#006972]/10 flex items-center gap-4 shadow-sm">
              <Bone className="w-12 h-12 rounded-2xl shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Bone className="w-24 h-3 rounded-full" />
                <Bone className="w-32 h-6 rounded-full" />
                <Bone className="w-20 h-3 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0,1,2,3].map(i => (
            <Bone key={i} className="h-20 rounded-2xl" />
          ))}
        </div>

        {/* Committees section */}
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <Bone className="w-48 h-7 rounded-full" />
            <div className="flex gap-2">
              <Bone className="w-14 h-7 rounded-full" />
              <Bone className="w-24 h-7 rounded-full" />
              <Bone className="w-18 h-7 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[0,1].map(i => (
              <div key={i} className="bg-white rounded-3xl p-6 border-2 border-[#006972]/10 space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Bone className="w-12 h-12 rounded-2xl shrink-0" />
                    <div className="flex flex-col gap-2">
                      <Bone className="w-36 h-4 rounded-full" />
                      <Bone className="w-28 h-3 rounded-full" />
                    </div>
                  </div>
                  <Bone className="w-20 h-6 rounded-full" />
                </div>
                <Bone className="w-full h-14 rounded-2xl" />
                <Bone className="w-full h-2 rounded-full" />
                <div className="flex justify-between">
                  <Bone className="w-32 h-4 rounded-full" />
                  <Bone className="w-20 h-4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity rows */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#006972]/10 shadow-sm space-y-3">
          <div className="flex justify-between mb-2">
            <Bone className="w-40 h-6 rounded-full" />
            <Bone className="w-20 h-4 rounded-full" />
          </div>
          {[0,1,2].map(i => (
            <div key={i} className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#fbfaee]">
              <Bone className="w-10 h-10 rounded-xl shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <Bone className="w-1/3 h-4 rounded-full" />
                <Bone className="w-2/3 h-3 rounded-full" />
              </div>
              <Bone className="w-16 h-3 rounded-full shrink-0" />
            </div>
          ))}
        </div>

      </div>

      {/* Mobile bottom nav skeleton */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 border-t border-[#006972]/15 px-2 py-2 flex justify-around items-center">
        {[0,1,2,3,4].map(i => (
          <div key={i} className="flex flex-col items-center gap-1.5 px-3 py-1">
            <Bone className="w-6 h-6 rounded-full" />
            <Bone className="w-10 h-2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScreenNav />
      <Routes>
        {/* Auth Flow */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/:method" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<OTPVerification />} />
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
