// Layout primitives for the dashboard shell.
//
// This module is deliberately listener-free: it only exposes imperative
// helpers. All DOM event wiring lives in ./dashboard.js so that a single
// handler owns each control. (Previously both files attached a click handler
// to #sidebarToggle and each toggled `.collapsed`, so the two cancelled out
// and desktop collapse silently did nothing.)

export const MOBILE_BREAKPOINT = 768;
export const STORAGE_KEY = 'sidebarCollapsed';

const getSidebar = () => document.getElementById('sidebar');
const getMainWrapper = () => document.getElementById('mainWrapper');
const getOverlay = () => document.getElementById('sidebarOverlay');

export function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

/** Collapse/expand the sidebar on desktop and persist the choice. */
export function setCollapsed(collapsed) {
  const sidebar = getSidebar();
  const mainWrapper = getMainWrapper();
  if (!sidebar) return;

  sidebar.classList.toggle('collapsed', collapsed);
  mainWrapper?.classList.toggle('full-width', collapsed);

  try {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  } catch {
    // Storage can be unavailable (private mode, disabled cookies) — the
    // sidebar still works, it just won't remember its state.
  }
}

export function toggleSidebar() {
  const sidebar = getSidebar();
  if (!sidebar) return;
  setCollapsed(!sidebar.classList.contains('collapsed'));
}

export function collapseSidebar() {
  setCollapsed(true);
}

export function expandSidebar() {
  setCollapsed(false);
}

/** Show/hide the mobile off-canvas sidebar. No persistence on mobile. */
export function setMobileOpen(open) {
  getSidebar()?.classList.toggle('active', open);
  getOverlay()?.classList.toggle('active', open);
}

export function openMobileSidebar() {
  setMobileOpen(true);
}

export function closeMobileSidebar() {
  setMobileOpen(false);
}

/** Restore the persisted desktop collapse state. Called once on load. */
export function restoreSidebarState() {
  const sidebar = getSidebar();
  if (!sidebar || isMobile()) return;

  let stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    return;
  }

  if (stored === 'true') {
    sidebar.classList.add('collapsed');
    getMainWrapper()?.classList.add('full-width');
  }
}

export default {
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  openMobileSidebar,
  closeMobileSidebar,
  setCollapsed,
  isMobile,
};
