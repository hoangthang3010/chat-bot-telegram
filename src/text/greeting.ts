import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
  });
const downloading = (bot: any, msg: any) => {
  // bot.deleteMessage(msg.chat.id, msg.message_id);
  // bot.sendMessage(msg.chat.id, "Đang tải...").then((sentMessage) => {
  //   setTimeout(() => {
  //     bot.deleteMessage(msg.chat.id, sentMessage.message_id);
  //   }, 2000);
  // });
};

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');
  
  const chatId = ctx.message?.message_id;
  const messageText = ctx.message?.['text' as keyof object] || '';

  if (chatId) {
    const {
      ndown,
      tikdown,
      ytdown,
      twitterdown,
    } = require('nayan-media-downloader');
    let data = {
      url: '',
      thumbnail: '',
      type: '',
    };
    if (messageText.includes('facebook') || messageText.includes('instagram')) {
      // downloading(bot, msg);
      const res = await ndown(messageText);
      data = {
        ...data,
        type: 'fb',
        url: res.data[0].url || res.data[1].url,
        thumbnail: res.data[0].thumbnail,
      };
    } else if (messageText.includes('youtube')) {
      // downloading(bot, msg);
      const res = await ytdown(messageText);
      data = {
        ...data,
        type: 'ytb',
        url: res.data.video,
        thumbnail: res.data.picture,
      };
    } else if (messageText.includes('tiktok')) {
      // downloading(bot, msg);
      const res = await tikdown(messageText);
      data = {
        ...data,
        type: 'tik',
        url: res.data.video,
      };
    } else if (messageText.includes('twitter')) {
      // downloading(bot, msg);
      const res = await twitterdown(messageText);
      data = {
        ...data,
        type: 'twi',
        url: res.data.HD || res.data.SD,
      };
    }
    if (data.url) {
      const markdownText = `[${'👉ẤN ĐỂ TẢI👈🏻'}](${data.url})\nVideo gốc 👇👇\n${messageText}\n${data.type !== 'fb' ? '\n[![Image](' + data.thumbnail + ')]' : ''}`;
      replyToMessage(ctx, chatId, markdownText)
      // bot.sendMessage(chatId, markdownText, { parse_mode: 'Markdown' });
    } else replyToMessage(ctx, chatId, `Video gốc 👇👇\n ${messageText}`)
    // bot.deleteMessage(chatId, `Video gốc 👇👇\n ${messageText}`);
    // await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  }
};

export { greeting };
