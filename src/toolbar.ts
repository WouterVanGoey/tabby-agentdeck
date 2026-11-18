import { Injectable } from '@angular/core'
import { Command, CommandContext, CommandLocation, CommandProvider, ConfigService } from 'tabby-core'

const SIDEBAR_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">'
    + '<rect x="1.75" y="2.25" width="12.5" height="11.5" rx="1.75"/>'
    + '<line x1="10.25" y1="2.25" x2="10.25" y2="13.75"/>'
    + '</svg>'

/**
 * Adds a minimalist right-sidebar toggle button to Tabby's top-right toolbar
 * with a tooltip reflecting the configured `agentdeck-toggle` hotkey.
 */
@Injectable()
export class AgentDeckCommandProvider extends CommandProvider {
    constructor (private config: ConfigService) {
        super()
    }

    async provide (_context: CommandContext): Promise<Command[]> {
        const raw = this.config.store?.hotkeys?.['agentdeck-toggle']
        const keys = Array.isArray(raw) ? raw : (typeof raw === 'string' && raw ? [raw] : [])
        const binding = keys.length ? String(keys[0]).replace(/-/g, '+') : ''
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
