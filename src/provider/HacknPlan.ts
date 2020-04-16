import { Embed } from '../model/Embed'
import { BaseProvider } from '../provider/BaseProvider'
import { json } from 'body-parser'

/**
 * https://api.hacknplan.com/reference/index#!/Webhook/Webhook_GetWebhookEvents
 */
class HacknPlan extends BaseProvider {
    constructor() {
        super()
        this.setEmbedColor(0x1e45a8)
    }

    public getName() {
        return 'Hack N Plan'
    }

    public getPath() {
        return 'hacknplan'
    }

    public async parseData() {
        this.payload.content = "Test Payload"
        const embed = new Embed()
        embed.title = "test Title"
        embed.url = "https://app.hacknplan.com/p/2221"
        embed.description = JSON.stringify(this.body) + " Headers: " + JSON.stringify(this.headers)
        this.addEmbed(embed)
    }
}

export { HacknPlan }
