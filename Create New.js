$(function() {
    $("#my-tools-menu").append('<li class="custom">' + mw.html.element('a', { id: 'linktext' }, 'New Article') + '</li>');
    $("#linktext").click(function() {
      $articletext =  // prompt("What is the text?");
      $createsummary =  // prompt("Please provide a summary");
      $articletitle = // prompt("What is the title?");
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
    });
});
