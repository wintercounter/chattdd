/**
 * @module views/Chat
 */

var Backbone = require('backbone'),

/** @class Chat */
Chat = Backbone.Marionette.View.extend(
	/** @lends Backbone.Marionette.View */
	{

		/** @const MAX_LENGTH {Number} Maximum length of the message */
		MAX_LENGTH: 40,

		ui : {
			messagesBox : '.messages',
			chatInput   : '.chatMessage',
			sendButton  : '.send'
		},

		events : {
			'click @ui.sendButton' : 'onSendButtonClick'
		},

		/** @var message {String} The message itself */
		message: undefined,

		/**
		 * Message setter
		 * @method _setMessage
		 * @private
		 */
		_setMessage: function() {
			this.message = this.$(this.ui.chatInput).val().trim() || false;
		},

		/**
		 * Checks if the message is valid
		 * @method  _isValid
		 * @returns {Bool}
		 * @private
		 */
		_isValid: function() {
			return (this.message && this.message.length <= this.MAX_LENGTH);
		},

		/**
		 * Send button on click event handler
		 * @method _isValid
		 */
		onSendButtonClick: function() {
			this._setMessage();

			if (this._isValid()) {
				this.$(this.ui.messagesBox).append('<li>' + this.message + '</li>');
			}
		}
	});

module.exports = Chat;