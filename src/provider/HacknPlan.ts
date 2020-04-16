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
        if(!this.body.ProjectId) {
            return
        }
        var type = 'project';


        var url =`https://app.hacknplan.com/p/${this.body.ProjectId}`
        if(this.body.WorkItemId) {
            url += `/kanban?taskId=${this.body.WorkItemId}`
            type = 'task'
        }
        if(this.body.CommentId) {
            type = 'comment'
        }

        var title = `Project ${this.body.ProjectId}`;
        var desc = '';

        switch(type) {
            case 'task':
                title = `#${this.body.WorkItemId} ${this.body.Title} ${this.body.Stage.Status}`
                if(this.body.Description) {
                    desc = this.body.Description;
                }
                desc += ` ${JSON.stringify(this.body)}`
                 break
            case 'comment':
                title = `#${this.body.WorkItemId} comment`
                desc = `${this.body.Text}`;
                break
            default:
                desc = JSON.stringify(this.body)
                break
        }


        const embed = new Embed()
        embed.title = title
        embed.url = url
        embed.description = desc
        this.addEmbed(embed)
    }
}

export { HacknPlan }
