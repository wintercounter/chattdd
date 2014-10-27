var assert = require('chai').assert,
	sinon  = require('sinon'),

	testUtils   = require('../setup_utils'),
	testContent = require('./content/testcontent.html'),

	ChatView = require('../../libs/Chat/view');

suite('testing chat view', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);
		sinon.spy(ChatView.prototype, 'onSendButtonClick');
		this.chat        = new ChatView({el : '.chat'});
		this.sendButton  = this.chat.$(this.chat.ui.sendButton);
		this.chatInput   = this.chat.$(this.chat.ui.chatInput);
		this.messagesBox = this.chat.$(this.chat.ui.messagesBox);
	});

	teardown(function() {
		this.chatInput.val('');
		this.messagesBox.html('');
		ChatView.prototype.onSendButtonClick.restore();
	});

	test('test validator', function() {
		[{
			'dfssdffsdfdfssfsdf'                                      : true,
			''                                                        : false,
			'dfssdffsdfdfssfsdfdfssdffsdfdfssfsdfdfdfssdffsdfdssfsdf' : false,
			' '                                                       : false,
			'    dsssfffdddssfsdfsdfdfgfdffdfgdfgdfgdfgf    '         : true,
			'    dsssfffdddssfsdfsdfdfgfdffdfgdfgdfgdfgf    3'        : false
		}].forEach(function(msg) {
			this.chatInput.val(msg[0]);
			assert.strictEqual(this.chat._isValid(), msg[1]);
		}.bind(this));
	});

	test('test submit', function() {
		this.sendButton.click();
		assert.strictEqual(this.chat.onSendButtonClick.calledOnce, true);
	});

	test('test submit and append', function() {
		this.chatInput.val('dsad');
		this.sendButton.click();
		assert.strictEqual(this.messagesBox.find('li').size(), 1);
	});

	test('test submit with empty', function() {
		this.sendButton.click();
		assert.strictEqual(this.messagesBox.find('li').size(), 0);
	});

	test('test multiple', function() {
		this.chatInput.val('dsad');
		this.sendButton.click();
		this.chatInput.val('dfgdfh');
		this.sendButton.click();
		this.chatInput.val('dshfhgjhjghjghjg hjgh jgjghjghj gh jgh gjghgh jad');
		this.sendButton.click();
		this.chatInput.val('dfhdfh');
		this.sendButton.click();
		assert.strictEqual(this.messagesBox.find('li').size(), 3);
	});
});
