$("#my-tools-menu").append('<li class="custom">' + mw.html.element('a', { id: 'hello' }, 'Test') + '</li>');
	$('#hello').click(function() {
	require(["wikia.ui.factory"], function(uiFactory) {
		uiFactory.init(["modal"]).then(function(uiModal) {
			$.msg = function() {
				return mw.message.call(this, arguments).text();
			};
			var config = {
				type: "default",
				vars: {
					id: "my-modals-element-id",
					title: "Create New Article",
					content: (
							"<h2>Article Title:</h2>" +
							"<p>Please insert a title for your article</p>"+
							"<form>" +
							"<textarea class=\"title\" name=\"Insert Title\" id=\"title\" style=\"margin: 0px;width: 200px;height: 20px;\"></textarea>" +
							"</form>" +
							// Edit summary for the page creation
								"<h2>Edit Summary</h2>" +
								"<p>Please insert a Summary for the creation, a default is given:</p>"+
								"<form>" +
								"<textarea class=\"summary\" name=\"Edit summary\" id=\"summary\" style=\"margin: 0px;width: 200px;height: 20px;\">Creating article!</textarea>" +
								"</form><br />"+
							// Article text
									"<h2>Article text</h2>" +
									"<p>Please enter the text to be present on the article. Beware, clicking confirm will publish anything in this box under your username and IP!</p>"+
									"<form>" +
									"<textarea class=\"summary\" name=\"Edit summary\" id=\"articletext\" style=\"margin: 0px;width: 500px;height: 500px; overflow: auto; float: center;\"></textarea>" +
									"</form>"
					),
					size: "large",
					buttons: [
						{vars: {
							value: "Cancel",
							data: [
								{key: "event", value: "close"}
							]
						}},
						{vars: {
							value: "Create!",
							data: [
								{key: "event", value: "confirm"}
							]
						}},
					]
				}
	};
	uiModal.createComponent(config, function(modal) {



		// when pressing esc - clsoe modal
		modal.$element.keydown(function(e) {
			if (e.which == 27) {
				e.preventDefault();
				console.log("User closed modal by pressing the 'X' icon, by pressing around the modal's blackout or using 'Esc'");
				modal.trigger("close");
			}
		});
		// cancel - user clicked 'Cancel'
		modal.bind("confirm", function(e) {
			e.preventDefault();
			console.log("User pressed 'Cancel'");
			modal.trigger("close");
		});
		// confirm - user clicked 'Ok'
		modal.bind("confirm", function(e) {
			e.preventDefault();
			var $articletext =  modal.$element.find('#articletext').val(),
			$createsummary =  modal.$element.find('#summary').val(),
			$articletitle =  modal.$element.find('#title').val();
			new mw.Api().post({
					action: 'edit',
					title: $articletitle,
					summary: $createsummary,
					text: $articletext,
					token: mw.user.tokens.get('editToken')
			}).done(function(d) {
					if(d.error) {
							new BannerNotification('Error while creating page: ' + d.error.code, 'error').show();
					} else {
							new BannerNotification('Successfully created page!', 'success').show();
					}
			}).fail(function() {
					new BannerNotification('Error while creating page', 'error').show();
			});

			modal.trigger("close");
		});



		// show modal
		modal.show();
	});
});
});
});
