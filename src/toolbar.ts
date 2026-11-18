import { Injectable } from '@angular/core'
import { Command, CommandContext, CommandLocation, CommandProvider, ConfigService } from 'tabby-core'

const SIDEBAR_ICON_SVG = '<svg class="ad-sidebar-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="fill: none !important; stroke: currentColor; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; opacity: 0.85;">'
    + '<rect x="1" y="1.5" width="14" height="13" rx="2" style="fill: none !important;"/>'
    + '<rect class="ad-pane-fill" x="10.25" y="1.75" width="4.5" height="12.5" rx="1" style="stroke: none !important; fill: currentColor !important;"/>'
    + '<line x1="10.25" y1="1.5" x2="10.25" y2="14.5" style="fill: none !important;"/>'
    + '</svg>'

const TOOLTIP_HOTKEY_MAP: Record<string, string[]> = {
    'Profiles & connections': ['profile-selector'],
    'New tab': ['agentdeck-new-tab', 'new-tab'],
    'Settings': ['settings'],
}

/**
 * Adds a dynamic right-sidebar toggle button to Tabby's top-right toolbar
 * with a tooltip reflecting the configured `agentdeck-toggle` hotkey.
 */
@Injectable()
export class AgentDeckCommandProvider extends CommandProvider {
    private tooltipObserverAttached = false

    constructor (private config: ConfigService) {
        super()
    }

    private formatHotkey (ids: string[]): string {
        const hotkeys = this.config.store?.hotkeys ?? {}
        for (const id of ids) {
            const raw = hotkeys[id]
            const keys = Array.isArray(raw) ? raw : (typeof raw === 'string' && raw ? [raw] : [])
            if (keys.length) {
                return String(keys[0]).replace(/-/g, '+')
            }
        }
        return ''
    }

    private attachTooltipShortcuts (): void {
        if (this.tooltipObserverAttached || typeof document === 'undefined') {
            return
        }
        this.tooltipObserverAttached = true
        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of Array.from(m.addedNodes)) {
                    if (!(node instanceof HTMLElement)) {
                        continue
                    }
                    const tip = node.matches('ngb-tooltip-window') ? node : node.querySelector('ngb-tooltip-window')
                    const inner = tip?.querySelector('.tooltip-inner')
                    if (!inner) {
                        continue
                    }
                    const text = (inner.textContent ?? '').trim()
                    const ids = TOOLTIP_HOTKEY_MAP[text]
                    if (!ids) {
                        continue
                    }
                    const binding = this.formatHotkey(ids)
                    if (binding) {
                        inner.textContent = `${text} (${binding})`
                    }
                }
            }
        })
        observer.observe(document.body, { childList: true })
    }

    async provide (_context: CommandContext): Promise<Command[]> {
        this.attachTooltipShortcuts()
        const binding = this.formatHotkey(['agentdeck-toggle'])
        const label = binding ? `Toggle AgentDeck (${binding})` : 'Toggle AgentDeck'

        return [
            Command.fromToolbarButton({
                icon: SIDEBAR_ICON_SVG,
                title: label,
                weight: 9,
                click: () => {
                    this.config.store.agentDeck.enabled = !this.config.store.agentDeck.enabled
                    this.config.save()
                },
            }),
        ]
    }
}
