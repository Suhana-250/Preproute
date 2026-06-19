import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTests, deleteTest, updateTest } from "../api";
import type { TestListItem } from "../interfaces";

// Import modular components
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";
import { DashboardFilters } from "../components/Dashboard/DashboardFilters";
import { TestCard } from "../components/Dashboard/TestCard";
import { DeleteConfirmationModal } from "../components/Dashboard/DeleteConfirmationModal";
import { PublishConfirmationModal } from "../components/Dashboard/PublishConfirmationModal";

const PAGE_SIZE = 21;

function Dashboard() {
    const navigate = useNavigate();
    const [allTests, setAllTests] = useState<TestListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedSubject, setSelectedSubject] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Action states
    const [testToDelete, setTestToDelete] = useState<TestListItem | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [testToPublish, setTestToPublish] = useState<TestListItem | null>(null);
    const [publishing, setPublishing] = useState(false);

    const [retryTrigger, setRetryTrigger] = useState(0);

    useEffect(() => {
        let active = true;
        const fetchTests = async () => {
            try {
                const response = await getTests();
                if (active) {
                    setAllTests(response.data.data);
                }
            } catch (err) {
                console.error(err);
                if (active) {
                    setError("Failed to load tests. Please try again.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchTests();

        return () => {
            active = false;
        };
    }, [retryTrigger]);

    // Filter tests based on query, status, and subject
    const filteredTests = allTests.filter(test => {
        // Exclude test if its expiry date has passed
        if (test.expires_at) {
            const expiryDate = new Date(test.expires_at);
            if (new Date() > expiryDate) {
                return false;
            }
        }

        const matchesSearch = test.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                              (test.subject || "").toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "all" || test.status === selectedStatus;
        const matchesSubject = selectedSubject === "all" || test.subject === selectedSubject;
        return matchesSearch && matchesStatus && matchesSubject;
    });

    // Sort tests by date
    const sortedTests = [...filteredTests].sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortBy === "newest" ? timeB - timeA : timeA - timeB;
    });

    // Slice the cached array for the current page
    const totalPages = Math.ceil(sortedTests.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageTests = sortedTests.slice(start, start + PAGE_SIZE);

    // Unique subjects list for filtering dropdown
    const subjectsList = Array.from(new Set(allTests.map(t => t.subject).filter(Boolean)));

    const handleConfirmDelete = async () => {
        if (!testToDelete) return;
        setDeleting(true);
        try {
            await deleteTest(testToDelete.id);
            setAllTests(prev => prev.filter(t => t.id !== testToDelete.id));
            setTestToDelete(null);
        } catch (err) {
            console.error(err);
            alert("Failed to delete test. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    const handleConfirmPublish = async () => {
        if (!testToPublish) return;
        setPublishing(true);
        try {
            await updateTest(testToPublish.id, { status: "live" });
            setAllTests(prev => prev.map(t => t.id === testToPublish.id ? { ...t, status: "live" } : t));
            setTestToPublish(null);
        } catch (err) {
            console.error(err);
            alert("Failed to publish test. Please try again.");
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 relative overflow-hidden">
            {/* Background glowing decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

            {/* Header */}
            <DashboardHeader
                onCreateClick={() => navigate("/tests/create")}
            />

            {/* Filter and Search Bar */}
            <DashboardFilters
                searchQuery={searchQuery}
                onSearchChange={(val) => {
                    setSearchQuery(val);
                    setCurrentPage(1);
                }}
                selectedStatus={selectedStatus}
                onStatusChange={(val) => {
                    setSelectedStatus(val);
                    setCurrentPage(1);
                }}
                selectedSubject={selectedSubject}
                onSubjectChange={(val) => {
                    setSelectedSubject(val);
                    setCurrentPage(1);
                }}
                subjectsList={subjectsList}
                sortBy={sortBy}
                onSortChange={(val) => {
                    setSortBy(val);
                    setCurrentPage(1);
                }}
            />

            {/* Content area */}
            <div className="max-w-7xl mx-auto">
                {error ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm max-w-lg mx-auto mt-16 flex flex-col items-center animate-fade-in">
                        {/* Unable to fetch illustration */}
                        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6 border border-red-100/50">
                            <svg className="w-12 h-12 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-outfit">Unable to fetch tests at the moment</h3>
                        <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
                            Something went wrong while connecting to the server. Please verify your connection and try again.
                        </p>
                        <button
                            onClick={() => {
                                setError("");
                                setLoading(true);
                                setRetryTrigger(prev => prev + 1);
                            }}
                            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                        >
                            Try again
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="border border-gray-200 p-5 rounded-lg shadow-sm bg-white h-56 animate-pulse" />
                        ))}
                    </div>
                ) : sortedTests.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-16 text-center shadow-sm">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-700">No tests matched your filters</h3>
                        <p className="text-gray-400 text-sm mt-1">Try resetting search query or status filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pageTests.map((test) => (
                            <TestCard
                                key={test.id}
                                test={test}
                                onViewClick={() => navigate(`/tests/${test.id}/preview`)}
                                onEditClick={() => navigate(`/tests/${test.id}/edit`)}
                                onDeleteClick={() => setTestToDelete(test)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination controls */}
            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all shadow-sm cursor-pointer"
                    >
                        ← Prev
                    </button>

                    <span className="text-sm font-bold text-gray-600 bg-white px-3 py-2 rounded-md border border-gray-300 shadow-sm">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all shadow-sm cursor-pointer"
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {testToDelete && (
                <DeleteConfirmationModal
                    test={testToDelete}
                    onCancel={() => setTestToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    deleting={deleting}
                />
            )}

            {/* Publish Confirmation Modal */}
            {testToPublish && (
                <PublishConfirmationModal
                    test={testToPublish}
                    onCancel={() => setTestToPublish(null)}
                    onConfirm={handleConfirmPublish}
                    publishing={publishing}
                />
            )}
        </div>
    );
}

export default Dashboard;
