$(function() {

    var $defaultPopoverTrigger = $('#btn-popover-example');

    $defaultPopoverTrigger.popover({
        html: true,
        content: function() {
            return "<p>And here's some amazing content. <a href='#' id='link-popover-example'>Click here to update append content.</a></p>";
        }
    });

    $defaultPopoverTrigger.on('inserted.bs.popover', function () {
        $('#link-popover-example').click(function(e) {
            e.preventDefault();
            $('.popover-content').append('<p>Dynamically added long peace of content, which changes popover size.</p>');
        });
    });

    var $extendedPopoverTrigger = $('#btn-ext-popover-example');

    $extendedPopoverTrigger.popover({
        html: true,
        content: function() {
            return "<p>And here's some amazing content. <a href='#' id='link-ext-popover-example'>Click here to update append content.</a></p>";
        }
    });

    function updatePopoverPlacement() {
        $extendedPopoverTrigger.popover('update');
    }

    $extendedPopoverTrigger.on('inserted.bs.popover', function () {
        // Update popover placement on resize.
        $(window).resize(updatePopoverPlacement);

        $('#link-ext-popover-example').click(function(e) {
            e.preventDefault();
            
            // Add some content.
            $('.popover-content').append('<p>Dynamically added long peace of content, which changes popover size.</p>');
            
            // Update popover placement.
            updatePopoverPlacement();
        });
    });
});