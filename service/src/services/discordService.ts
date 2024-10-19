// src/services/discordService.ts

import axios from 'axios';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const sendDiscordMessage = async (message: string) => {
  if (!DISCORD_WEBHOOK_URL) {
    throw new Error("Discord webhook URL is not defined");
  }

  await axios.post(DISCORD_WEBHOOK_URL, {
    content: message,
  });
};