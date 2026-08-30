import { useEffect, useRef, useState } from 'react';
import { getCnicStatus, submitCnic } from '../services/authService';
import Button from './Button';
import Icon from './Icon';

function formatCnic(value) {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  const parts = [digits.slice(0, 5), digits.slice(5, 12), digits.slice(12, 13)].filter(Boolean);
  return parts.join('-');
}

function isValidCnic(value) {
  return /^\d{5}-\d{7}-\d$/.test(value);
}

export default function CnicVerificationModal({ isOpen, onClose, onVerified }) {
  const [status, setStatus] = useState(null);
  const [cnicNumber, setCnicNumber] = useState('');
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setFetching(true);
    getCnicStatus()
      .then((data) => {
        const cnic = data.cnic || data;
        setStatus(cnic.cnic_status);
        if (cnic.cnic_number) setCnicNumber(formatCnic(cnic.cnic_number));
      })
      .catch(() => setStatus('unverified'))
      .finally(() => setFetching(false));
  }, [isOpen]);

  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setter(file);
    previewSetter(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError('');
    if (!isValidCnic(cnicNumber)) {
      setError('Enter a valid CNIC number (e.g., 35201-1234567-1).');
      return;
    }
    if (!frontFile || !backFile) {
      setError('Please upload both front and back side images of your CNIC.');
      return;
    }

    setLoading(true);
    try {
      await submitCnic({
        cnic_number: cnicNumber,
        front: frontFile,
        back: backFile,
      });
      const refreshed = await getCnicStatus();
      const refreshedCnic = refreshed.cnic || refreshed;
      setStatus(refreshedCnic.cnic_status);
      if (refreshedCnic.cnic_status === 'verified') {
        onVerified?.();
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Failed to submit CNIC. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full sm:w-[480px] max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 animate-in slide-in-from-bottom-8 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading text-deep-navy">CNIC Verification</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
            aria-label="Close"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {fetching ? (
          <div className="py-12 flex flex-col items-center gap-3 text-deep-navy/70">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            <p>Loading verification status…</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-deep-navy/80 mb-5">
              Public committees require a verified CNIC to prevent fraud. Your data is encrypted and
              only reviewed by authorized staff.
            </p>

            <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-surface-container">
              <span
                className={`material-symbols-outlined ${
                  status === 'verified'
                    ? 'text-success'
                    : status === 'pending'
                    ? 'text-warning'
                    : status === 'rejected'
                    ? 'text-error'
                    : 'text-outline'
                }`}
                style={{ fontSize: 28 }}
              >
                {status === 'verified'
                  ? 'verified'
                  : status === 'pending'
                  ? 'schedule'
                  : status === 'rejected'
                  ? 'error'
                  : 'badge'}
              </span>
              <div>
                <p className="font-label font-semibold text-deep-navy capitalize">
                  {status?.replace('_', ' ') || 'Unverified'}
                </p>
                <p className="text-xs text-deep-navy/70">
                  {status === 'verified'
                    ? 'You can join public committees.'
                    : status === 'pending'
                    ? 'Your submission is under review.'
                    : status === 'rejected'
                    ? 'Your submission was rejected. Please resubmit.'
                    : 'Submit your CNIC to join public committees.'}
                </p>
              </div>
            </div>

            {status !== 'verified' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-label font-semibold text-deep-navy mb-2">
                    CNIC Number
                  </label>
                  <input
                    type="text"
                    value={cnicNumber}
                    onChange={(e) => setCnicNumber(formatCnic(e.target.value))}
                    placeholder="35201-1234567-1"
                    maxLength={15}
                    className="w-full px-4 py-3 rounded-2xl border border-deep-navy/15 bg-white text-deep-navy placeholder:text-deep-navy/40 focus:outline-none focus:ring-2 focus:ring-teal-emerald/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => frontInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed transition-colors ${
                      frontPreview
                        ? 'border-teal-emerald bg-teal-emerald/5'
                        : 'border-deep-navy/20 hover:border-teal-emerald/50'
                    }`}
                  >
                    <input
                      ref={frontInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange(setFrontFile, setFrontPreview)}
                    />
                    {frontPreview ? (
                      <img
                        src={frontPreview}
                        alt="CNIC front preview"
                        className="w-full h-24 object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <Icon name="id_card" size={32} className="text-deep-navy/50" />
                        <span className="text-xs font-medium text-deep-navy/80">Front side</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => backInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed transition-colors ${
                      backPreview
                        ? 'border-teal-emerald bg-teal-emerald/5'
                        : 'border-deep-navy/20 hover:border-teal-emerald/50'
                    }`}
                  >
                    <input
                      ref={backInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange(setBackFile, setBackPreview)}
                    />
                    {backPreview ? (
                      <img
                        src={backPreview}
                        alt="CNIC back preview"
                        className="w-full h-24 object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <Icon name="flip_camera_android" size={32} className="text-deep-navy/50" />
                        <span className="text-xs font-medium text-deep-navy/80">Back side</span>
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-error text-sm bg-error/10 p-3 rounded-xl">
                    <Icon name="error" size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                  icon={loading ? 'progress_activity' : 'check_circle'}
                >
                  {loading ? 'Submitting…' : status === 'pending' ? 'Resubmit CNIC' : 'Submit for Verification'}
                </Button>
              </div>
            )}

            {status === 'verified' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/15 flex items-center justify-center">
                  <Icon name="verified" size={32} className="text-success" />
                </div>
                <p className="text-deep-navy font-label font-semibold">Your CNIC is verified!</p>
                <p className="text-sm text-deep-navy/70 mt-1">
                  You can now join public committees.
                </p>
                <Button fullWidth onClick={onClose} className="mt-6">
                  Continue
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
