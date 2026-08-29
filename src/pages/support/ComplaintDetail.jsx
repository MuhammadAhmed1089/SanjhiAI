import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';
import { getComplaint } from '../../services/supportService';

/* ── Skeleton Bone ── */
function Bone({ className = '' }) {
  return <div className={`skeleton-bone ${className}`} />;
}

/* ── Helpers ── */
function statusColor(status) {
  if (['resolved', 'ai_resolved'].includes(status)) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === 'needs_human_review') return 'bg-violet-50 text-violet-700 border-violet-200';
  if (status === 'dismissed') return 'bg-slate-100 text-slate-600 border-slate-200';
  return 'bg-amber-50 text-amber-800 border-amber-200';
}

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      setLoading(true);
      const data = await getComplaint(id);
      setComplaint(data?.complaint || data);
    } catch (err) {
      setError(err.message || 'Failed to load complaint details.');
    } finally {
      setLoading(false);
    }
  }

  const caseFile = complaint?.ai_case_file;
  const investigator = caseFile?.investigator_report;
  const judge = caseFile?.judge_verdict;

  return (
    <AuthAmbientBackground showTicker={true}>
      <div className="w-full max-w-lg mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col items-center min-h-[calc(100vh-36px)]">

        {/* Main Glass Card */}
        <main className="w-full bg-white/85 backdrop-blur-2xl border border-[#006972]/20 shadow-[0_24px_70px_-15px_rgba(0,105,114,0.22),0_0_0_1px_rgba(0,105,114,0.1)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 animate-fade-up relative z-10">

          {/* Header */}
          <header className="w-full flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate('/support/complaints')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/5 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>
            <div className="flex-1">
              <h1 className="font-headline text-[18px] sm:text-[20px] font-bold text-deep-navy">Complaint Details</h1>
              <p className="font-mono text-[11px] text-on-surface-variant">#{id}</p>
            </div>
          </header>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              <div className="flex justify-between"><Bone className="w-28 h-5 rounded-full" /><Bone className="w-20 h-5 rounded-full" /></div>
              <Bone className="w-full h-4 rounded-lg" />
              <Bone className="w-5/6 h-4 rounded-lg" />
              <Bone className="w-full h-24 rounded-xl" />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-body text-[13px] flex items-center gap-2">
              <Icon name="error" size={18} /> {error}
            </div>
          )}

          {/* Content */}
          {!loading && complaint && (
            <div className="space-y-5">
              {/* Status & Category Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full font-label text-[11px] font-bold border ${statusColor(complaint.status)}`}>
                  {complaint.status?.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                <span className="px-3 py-1 rounded-full font-label text-[11px] font-bold bg-[#006972]/8 text-[#006972] border border-[#006972]/15">
                  {(complaint.category || 'other').replace(/_/g, ' ')}
                </span>
                {complaint.created_at && (
                  <span className="font-body text-[11px] text-on-surface-variant ml-auto">
                    {new Date(complaint.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>

              {/* Description */}
              <section className="p-4 rounded-xl bg-[#006972]/3 border border-[#006972]/8">
                <p className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Your Complaint</p>
                <p className="font-body text-[13px] text-deep-navy leading-relaxed">{complaint.description}</p>
              </section>

              {/* ─── AI Case File Section ─── */}
              {caseFile ? (
                <section className="rounded-xl border border-[#006972]/15 overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-gradient-to-r from-[#006972]/8 to-[#006972]/3 px-4 py-3 flex items-center justify-between border-b border-[#006972]/10">
                    <div className="flex items-center gap-2">
                      <Icon name="auto_awesome" size={16} className="text-[#006972]" />
                      <span className="font-label text-[11px] font-bold text-[#006972] uppercase tracking-wider">AI Investigation Report</span>
                    </div>
                    {judge && (
                      <span className={`px-2 py-0.5 rounded-full font-label text-[10px] font-bold ${
                        judge.confidence_score >= 0.85 && judge.judge_satisfied
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {Math.round((judge.confidence_score ?? 0) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-4 bg-white">
                    {/* Case Summary */}
                    {investigator?.case_summary && (
                      <div>
                        <p className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Summary</p>
                        <p className="font-body text-[13px] text-deep-navy leading-relaxed">{investigator.case_summary}</p>
                      </div>
                    )}

                    {/* Contradictions Found */}
                    {(investigator?.contradictions || []).length > 0 && (
                      <div>
                        <p className="font-label text-[10px] font-bold uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1">
                          <Icon name="warning" size={12} /> Contradictions Detected
                        </p>
                        <div className="space-y-2">
                          {investigator.contradictions.map((item, i) => (
                            <div key={i} className="p-3 rounded-lg bg-rose-50/60 border border-rose-100">
                              <p className="font-body text-[12px] text-rose-900"><strong>Claim:</strong> {item.claim}</p>
                              <p className="font-body text-[12px] text-rose-700 mt-0.5"><strong>Fact:</strong> {item.fact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Evidence Trail */}
                    {(investigator?.evidence_trail || []).length > 0 && (
                      <div>
                        <p className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Evidence Trail</p>
                        <div className="space-y-1.5">
                          {investigator.evidence_trail.map((e, i) => (
                            <div key={i} className="flex items-start gap-2 text-[12px] font-body text-deep-navy">
                              <Icon name="check_circle" size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                              <span>{typeof e === 'string' ? e : `${e.source}: ${e.finding}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Action */}
                    {investigator?.recommended_action && (
                      <div className="pt-2 border-t border-[#006972]/8">
                        <p className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Agent Recommendation</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#006972]/10 text-[#006972] font-label text-[11px] font-bold capitalize">
                            {investigator.recommended_action.replace(/_/g, ' ')}
                          </span>
                          {investigator.recommended_priority && (
                            <span className={`px-2 py-0.5 rounded-full font-label text-[10px] font-bold ${
                              investigator.recommended_priority === 'URGENT' ? 'bg-rose-100 text-rose-800'
                                : investigator.recommended_priority === 'HIGH' ? 'bg-amber-100 text-amber-900'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {investigator.recommended_priority}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Judge Decision */}
                    {judge && (
                      <div className="pt-3 border-t border-[#006972]/8">
                        <p className="font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Judge Decision</p>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-body text-[12px] text-on-surface-variant">Routing:</span>
                            <span className="font-label text-[11px] font-bold text-deep-navy capitalize">{judge.routing_decision?.replace(/_/g, ' ')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-body text-[12px] text-on-surface-variant">Judge Satisfied:</span>
                            <span className={`font-label text-[11px] font-bold ${judge.judge_satisfied ? 'text-emerald-600' : 'text-amber-700'}`}>
                              {judge.judge_satisfied ? 'Yes' : 'No — Referred to Human'}
                            </span>
                          </div>
                          {(judge.concerns || []).length > 0 && (
                            <div className="mt-2 pt-2 border-t border-slate-100">
                              {judge.concerns.map((c, i) => (
                                <p key={i} className="font-body text-[11px] text-amber-800 mt-0.5">• {c}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              ) : (
                /* No Case File Yet */
                <section className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#006972]/8 flex items-center justify-center mx-auto mb-3">
                    <Icon name="hourglass_top" size={22} className="text-[#006972] animate-pulse" />
                  </div>
                  <p className="font-body text-[13px] text-on-surface-variant">
                    {['pending', 'open'].includes(complaint.status)
                      ? 'AI Agent is investigating your complaint. This usually takes 30-60 seconds.'
                      : 'AI case file not available for this complaint.'}
                  </p>
                </section>
              )}

              {/* Resolution Notes (if resolved) */}
              {complaint.resolution_notes && (
                <section className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="font-label text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">Resolution</p>
                  <p className="font-body text-[13px] text-emerald-900">{complaint.resolution_notes}</p>
                </section>
              )}
            </div>
          )}
        </main>
      </div>

      <BottomNav />
    </AuthAmbientBackground>
  );
}
