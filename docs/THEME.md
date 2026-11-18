# Tabby Charcoal Folder-Tab Theme & Layout

Pair this guide with the `feat/view-panel-i18n` branch of this fork to reproduce the full seamless charcoal UI.

## 1. Tabby Settings (`config.yaml`)

- **Disable vibrancy / translucency** (prevents background bleed-through around the terminal canvas):
  - `appearance.vibrancy: false`
  - `appearance.opacity: 1`
  - `appearance.frame: thin`
  - `appearance.tabsLocation: top`
- **Solid terminal background** (Base16 Dark without alpha):
  - `terminal.colorScheme.background: '#151515'`
- **Optional sidebar toggle hotkey**:
  - `hotkeys.agentdeck-toggle: ['Ctrl-B']` (or set via **Settings → Hotkeys**; the top-right toggle tooltip updates dynamically).
- **Optional Profile Selector ordering**:
  - Tabby sorts profile groups alphabetically by `name`. Naming your local group `Local Shells` and remote group `SSH & Devices` places local shells first.

## 2. Custom CSS (**Settings → Appearance → Custom CSS**)

```css
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}


/* Unify content & terminal pane backgrounds so no border/margin bleeds
through */

tab-body,

split-tab,

terminaltab {
  background: #181818 !important;
}


/* Tab bar & tab spacing */

.tab-bar {
  background: #09090b !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14) !important;
}

.tab-bar > .tabs {
  padding-left: 4px !important;
  padding-top: 3px !important;
  gap: 3px;
  order: 2 !important;
}

/* Profile Selector far-left, then tabs, then +, then spacer, then AgentDeck
+ Settings far-right */

.tab-bar > .tabs + .btn-group {
  display: contents !important;
}

.tab-bar > .tabs + .btn-group > .d-flex:nth-child(2) {
  order: 1 !important;
  padding-left: 4px;
}

.tab-bar > .tabs + .btn-group > .d-flex:first-child {
  order: 3 !important;
}

.tab-bar > .btn-space {
  order: 4 !important;
}

.tab-bar > .btn-space + .btn-group {
  order: 5 !important;
  gap: 2px;
  padding-right: 4px;
}

.tab-bar > .window-controls-spacer {
  order: 6 !important;
}

.ad-sidebar-toggle-icon .ad-pane-fill {
  opacity: 0;
  transition: opacity 0.12s ease;
}

body.agentdeck-active .ad-sidebar-toggle-icon .ad-pane-fill {
  opacity: 1;
}

.tab-bar .btn-tab-bar {
  border-radius: 6px !important;
  margin: 2px 2px 4px !important;
  height: calc(var(--tabs-height) - 6px) !important;
  padding: 0 8px !important;
}

.tab-bar .btn-tab-bar:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}


/* Individual tabs (VS Code recessed outline + iTerm slightly lowered) */

tab-header {
  border-radius: 6px 6px 0 0 !important;
  background: rgba(255, 255, 255, 0.025) !important;
  border: 1px solid rgba(255, 255, 255, 0.07) !important;
  border-bottom: none !important;
  margin-top: 3px !important;
  color: #7d8590 !important;
  transition: color 0.12s ease !important;
}

tab-header:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  color: #c9d1d9 !important;
}


/* Selected / Active tab (Full-height folder tab extending up from #181818
page) */

tab-header.active {
  margin-top: 0 !important;
  background: #181818 !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  border-bottom: 1px solid #181818 !important;
  margin-bottom: -1px !important;
  position: relative !important;
  z-index: 2 !important;
  transition: none !important;
}

/* Suppress default top line, bottom profile stripe, and cramped activity
bar */

tab-header .current-tab-indicator,

tab-header .colorbar,

tab-header .activity-indicator {
  display: none !important;
}

/* Subtle top-down Base16 attention gradients for inactive tabs */

tab-header:not(.active):has(.activity-indicator) {
  background: linear-gradient(to bottom, rgba(244, 191, 117, 0.10) 0%, rgba(255, 255, 255, 0.025) 65%) !important;
  border-color: rgba(244, 191, 117, 0.20) !important;
  color: #9aa1ab !important;
}

tab-header.ad-status-running:not(.active) {
  background: linear-gradient(to bottom, rgba(244, 191, 117, 0.11) 0%, rgba(255, 255, 255, 0.025) 65%) !important;
  border-color: rgba(244, 191, 117, 0.22) !important;
  color: #9aa1ab !important;
}

tab-header.ad-status-waiting:not(.active) {
  background: linear-gradient(to bottom, rgba(106, 159, 181, 0.13) 0%, rgba(255, 255, 255, 0.025) 65%) !important;
  border-color: rgba(106, 159, 181, 0.26) !important;
  color: #9aa1ab !important;
}

tab-header.ad-status-done:not(.active) {
  background: linear-gradient(to bottom, rgba(144, 169, 89, 0.12) 0%, rgba(255, 255, 255, 0.025) 65%) !important;
  border-color: rgba(144, 169, 89, 0.24) !important;
  color: #9aa1ab !important;
}

tab-header.ad-status-error:not(.active) {
  background: linear-gradient(to bottom, rgba(172, 65, 66, 0.16) 0%, rgba(255, 255, 255, 0.025) 65%) !important;
  border-color: rgba(172, 65, 66, 0.30) !important;
  color: #9aa1ab !important;
}

tab-header.ad-status-limited:not(.active) {
  background: linear-gradient(to bottom, rgba(170, 117, 159, 0.13) 0%, rgba(255, 255, 255, 0.025) 65%) !important;
  border-color: rgba(170, 117, 159, 0.26) !important;
  color: #9aa1ab !important;
}

/* Outline-only copper/amber cue for Administrator tabs (preserves status
backgrounds) */

tab-header.ad-tab-admin:not(.active) {
  border-color: rgba(210, 132, 69, 0.42) !important;
}

tab-header.ad-tab-admin.active {
  border-color: rgba(210, 132, 69, 0.58) !important;
  border-bottom: 1px solid #181818 !important;
}


/* Split pane drag bar / resize handles */

split-tab-spanner {
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
}

/* Vertical divider between left/right panes */

split-tab-spanner.h {
  width: 10px !important;
  margin-left: -5px !important;
}

split-tab-spanner.h::after {
  content: '';
  display: block;
  width: 2px;
  height: 100%;
  background: #3e3e3e;
  border-radius: 1px;
  transition: width 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

/* Horizontal divider between top/bottom panes */

split-tab-spanner.v {
  height: 10px !important;
  margin-top: -5px !important;
}

split-tab-spanner.v::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: #3e3e3e;
  border-radius: 1px;
  transition: height 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

/* Highlight and expand grab bar on hover or dragging */

split-tab-spanner:hover::after,

split-tab-spanner.resizing::after {
  background: #6a9fb5 !important;
  box-shadow: 0 0 6px rgba(106, 159, 181, 0.7) !important;
}

split-tab-spanner.h:hover::after,

split-tab-spanner.h.resizing::after {
  width: 4px;
}

split-tab-spanner.v:hover::after,

split-tab-spanner.v.resizing::after {
  height: 4px;
}

/* AgentDeck sidebar — neutral charcoal theme + unified 10px grid */

#agentdeck-sidebar {
  background: #111113 !important;
  border-color: rgba(255, 255, 255, 0.09) !important;
}

#agentdeck-sidebar .ad-head {
  padding: 10px 10px 6px !important;
}

#agentdeck-sidebar .ad-search {
  padding: 0 10px 6px !important;
}

#agentdeck-sidebar .ad-list {
  padding: 2px 10px 8px !important;
}

#agentdeck-sidebar .ad-resume-drawer {
  border-top-color: rgba(255, 255, 255, 0.09) !important;
}

#agentdeck-sidebar .ad-history-search {
  padding: 8px 10px 4px !important;
  gap: 4px !important;
}

#agentdeck-sidebar .ad-history-search > div:empty {
  display: none !important;
}

#agentdeck-sidebar .ad-resume-rows {
  padding: 2px 10px 4px !important;
}

#agentdeck-sidebar .ad-foot {
  padding: 6px 10px 8px !important;
  border-top-color: rgba(255, 255, 255, 0.09) !important;
}

#agentdeck-sidebar input, #agentdeck-sidebar .ad-search-input,
#agentdeck-sidebar .ad-history-search .ad-history-query {
  background: #0b0b0d !important;
  border-color: rgba(255, 255, 255, 0.09) !important;
  color: #d4d4d8 !important;
  padding: 4px 8px !important;
  font-size: 11px !important;
  line-height: 1.4 !important;
}

input:focus, .form-control:focus, #agentdeck-sidebar input:focus,
#agentdeck-sidebar .ad-search-input:focus {
  border-color: rgba(255, 255, 255, 0.28) !important;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08) !important;
  outline: none !important;
}

#agentdeck-sidebar .ad-tab.active {
  background: rgba(255, 255, 255, 0.07) !important;
}

#agentdeck-sidebar .ad-btn {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.09) !important;
  color: #d4d4d8 !important;
}

#agentdeck-sidebar .ad-btn:hover {
  background: rgba(255, 255, 255, 0.09) !important;
}

/* Profile Selector modal (+ New Tab) — Raycast-inspired floating card */

.modal-dialog:has(selector-modal) {
  margin-top: 13vh !important;
}

.modal-content:has(selector-modal) {
  background: #161618 !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: 12px !important;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.72) !important;
  overflow: hidden !important;
}

selector-modal input.form-control {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 0 !important;
  padding: 14px 16px !important;
  font-size: 14px !important;
  box-shadow: none !important;
}

selector-modal input.form-control:focus {
  border-color: rgba(255, 255, 255, 0.18) !important;
  box-shadow: none !important;
}

selector-modal .list-group {
  max-height: calc(70vh - 34px) !important;
  padding: 8px 10px 0 !important;
}

selector-modal .list-group-item {
  border-radius: 8px !important;
  margin: 1px 8px !important;
  background: transparent !important;
  border: none !important;
}

selector-modal .list-group-item.active, selector-modal
.list-group-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}
```
