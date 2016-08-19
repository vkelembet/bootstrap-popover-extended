(function ($) {

  if (!$.fn.popover) throw new Error('Popover extension requires popover.js');

  var Popover = $.fn.popover.Constructor;

  // Update tooltip placement.
  Popover.prototype.update = function () {
    var e = $.Event('update.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      var docElement = this.$element[0].ownerDocument.documentElement,
          inDom = $.contains(docElement, this.$element[0]);
      
      if (e.isDefaultPrevented() || !inDom) { return }

      this.updatePlacement();
    }
  };

  Popover.prototype.updatePlacement = function () {
    var $tip = this.tip();
    
    var isPlacementFunction = typeof this.options.placement == 'function';
    
    var placement = isPlacementFunction ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement;

    var autoToken = /\s?auto?\s?/i,
        autoPlace = autoToken.test(placement);

    if (autoPlace) {
      placement = placement.replace(autoToken, '') || 'top';
    }

    var pos          = this.getPosition(),
        actualWidth  = $tip[0].offsetWidth,
        actualHeight = $tip[0].offsetHeight;

    if (autoPlace) {
      placement = this.applyAutoPlacement($tip, placement, pos, actualWidth, actualHeight);
    }

    var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

    this.applyPlacement(calculatedOffset, placement);
  };

  Popover.prototype.applyAutoPlacement = function ($tip, placement, pos, actualWidth, actualHeight, viewportDim) {
    var orgPlacement  = placement,
        viewportDim   = this.getPosition(this.$viewport);

    placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                placement;

    $tip
        .removeClass(orgPlacement)
        .addClass(placement);

    return placement;
  };

})(jQuery);