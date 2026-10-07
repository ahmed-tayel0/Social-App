
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center dark:border-[#2d2e2f] dark:bg-[#18191a]">
      {icon && (
        <div className="mx-auto mb-4">
          <div className="h-12 w-12 rounded-full bg-[#eef3ff] text-[#1877f2] dark:bg-[#263951] dark:text-[#5c9dff] flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-lg font-extrabold text-slate-800 mb-2 dark:text-[#e4e6eb]">{title}</h3>
      <p className="text-sm font-medium text-slate-500 mb-4 dark:text-[#b0b3b8]">{description}</p>
      {action && <div className="mx-auto">{action}</div>}
    </div>
  );
};
EmptyState.displayName = "EmptyState";