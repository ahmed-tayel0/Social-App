import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useUnreadCount } from "@/features/notifications/hooks";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { clearCredentials } from "@/features/auth/authSlice";
import { House, User, MessageCircle, Menu, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { data: unreadCount } = useUnreadCount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement | null;
    setAnchorEl((prevAnchorEl) => {
      if (prevAnchorEl === target) {
        return null;
      }
      return target as HTMLElement;
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/auth", { replace: true });
    handleClose();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-[#2d2e2f]/90 bg-white/95 backdrop-blur dark:border-[#2d2e2f] dark:bg-[#18191a]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
        {/* Left: logo + name */}
        <div className="flex items-center gap-3">
          <img
            src="/route.png"
            alt="Route Social"
            className="h-9 w-9 rounded-xl object-cover"
          />
          <p className="hidden text-xl font-extrabold text-slate-900 sm:block dark:text-[#e4e6eb]">
            Social App
          </p>
        </div>

        {/* Center: nav tabs */}
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#2d2e2f] bg-slate-50/90 dark:border-[#2d2e2f] dark:bg-[#242526]/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to="/feed"
            end
            className={({ isActive }) => `
              relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
              ${isActive ? "bg-white text-[#1f6fe5] dark:bg-[#3a3b3c] dark:text-[#5c9dff]" : "text-slate-600 hover:bg-white/90 hover:text-slate-900 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c] dark:hover:text-white"}
            `}
          >
            <House className="h-4 w-4" />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink
            to="/profile"
            end
            className={({ isActive }) => `
              relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
              ${isActive ? "bg-white text-[#1f6fe5] dark:bg-[#3a3b3c] dark:text-[#5c9dff]" : "text-slate-600 hover:bg-white/90 hover:text-slate-900 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c] dark:hover:text-white"}
            `}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </NavLink>

          <NavLink
            to="/notifications"
            end
            className={({ isActive }) => `
              relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
              ${isActive ? "bg-white text-[#1f6fe5] dark:bg-[#3a3b3c] dark:text-[#5c9dff]" : "text-slate-600 hover:bg-white/90 hover:text-slate-900 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c] dark:hover:text-white"}
            `}
          >
            <span className="relative inline-flex">
              <MessageCircle className="h-4 w-4" />
              <Badge count={unreadCount ?? 0} className="absolute -right-2 -top-2" />
            </span>
            <span className="hidden sm:inline">Notifications</span>
          </NavLink>
        </nav>

        {/* Right: user menu button */}
        <div className="relative">
          <div
            ref={userMenuRef}
            className="cursor-pointer flex items-center gap-2 rounded-full border border-slate-200 dark:border-[#2d2e2f] bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100 dark:border-[#2d2e2f] dark:bg-[#242526] dark:hover:bg-[#3a3b3c]"
            onClick={handleClick}
          >
            {user ? (
              <Avatar src={user.photo ?? undefined} alt={user.name} size={32} />
            ) : (
              <Avatar src="/route.png" alt="User" size={32} />
            )}
            <span className="hidden sm:block max-w-35  truncate text-sm font-semibold text-slate-800 dark:text-[#e4e6eb]">
              {user?.name ?? "User"}
            </span>
            <Menu className="h-4 w-4 text-slate-700 dark:text-[#b0b3b8]" />
          </div>

          {/* Dropdown menu */}
          {open && user ? (
            <div
              className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 dark:border-[#2d2e2f] bg-white p-2 shadow-lg dark:border-[#2d2e2f] dark:bg-[#242526]"
              role="menu"
            >
              <button
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
                className="flex w-full items-center gap-3 px-2 py-2 text-sm font-medium text-left text-slate-700 hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  handleClose();
                }}
                className="flex w-full items-center gap-3 px-2 py-2 text-sm font-medium text-left text-slate-700 hover:bg-slate-50 dark:text-[#e4e6eb] dark:hover:bg-[#3a3b3c]"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <hr className="my-1 border-slate-200 dark:border-[#2d2e2f]" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-2 py-2 text-sm font-medium text-left text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-[#3a3b3c]"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}