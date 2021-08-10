import { Listener, UserError } from '@sapphire/framework';
import { PieceContext } from '@sapphire/pieces';
import { Events, SlashCommandErrorPayload } from '../models/framework/lib/types/Events';
import { Emotion, Emotions } from '../models/Emotion';

export default class SlashCommandError extends Listener<typeof Events.SlashCommandError> {
    constructor(context: PieceContext) {
        super(context, {
            event: Events.SlashCommandError,
        });
    }

    public async run(error: UserError, payload: SlashCommandErrorPayload): Promise<void> {
        const method = payload.interaction.replied ? 'followUp' : 'reply';
        const embed = Emotion.getEmotionEmbed(Emotions.SAD)
            .setTitle('Command error')
            .setDescription(error.message)
            .setColor(0xFF0000);

        await payload.interaction[method]({
            embeds: [embed],
            ephemeral: true,
        });
    }
}