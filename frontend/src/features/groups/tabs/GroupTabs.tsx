interface GroupTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const tabs = [
  "Overview",
  "Expenses",
  "Balances",
  "Settlements",
];

export function GroupTabs({
  activeTab,
  setActiveTab,
}: GroupTabsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
            activeTab === tab
              ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}