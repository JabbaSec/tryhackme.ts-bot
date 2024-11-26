const { send } = require('@sapphire/plugin-editable-commands');
const { container } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');
const { RandomLoadingMessage } = require('./constants');
const { CommandInteraction } = require('discord.js');

const fs = require('fs');
const _ = require('lodash');

const CONFIG_FILE = './src/config.json';

function editConfigValue(variable, value) {
	try {
		const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

		let parsedValue;
		if (value.toLowerCase() === 'true') {
			parsedValue = true;
		} else if (value.toLowerCase() === 'false') {
			parsedValue = false;
		} else if (!isNaN(value)) {
			parsedValue = Number(value);
		} else {
			parsedValue = value;
		}

		_.set(config, variable, parsedValue);

		fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 4), 'utf8');
	} catch (error) {
		container.logger.error(error);
		return error;
	}
	return true;
}

function pickRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function sendLoadingMessage(message) {
	return send(message, { embeds: [new EmbedBuilder().setDescription(pickRandom(RandomLoadingMessage)).setColor('#FF0000')] });
}

function generateHiddenEmbedMessage(previewPart, embeddedPart) {
	return `${previewPart} ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||_ _ _ _ _ _ _ ${embeddedPart}`;
}

module.exports = {
	pickRandom,
	sendLoadingMessage,
	editConfigValue,
	generateHiddenEmbedMessage
};
