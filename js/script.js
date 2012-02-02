(function() {
  var $, async_snippet, blocking_snippet, demo_widget_update, script_location;

  $ = jQuery;

  script_location = "js/platform/widgets.min.js";

  async_snippet = "<script>(function(a,b,c){var d=a.getElementsByTagName(b)[0],e=a.createElement(b);if(!a.getElementById(c)){e.async=true;e.id=c;e.src=\"" + script_location + "\";d.parentNode.insertBefore(e,d)}})(document,\"script\",\"gameolith-js\");</script>";

  blocking_snippet = "<script src=\"" + script_location + "\" id=\"gameolith-js\"></script>";

  demo_widget_update = function() {
    var button_text, field, name, slug, snippet, value, widget_code, widget_type, _i, _len, _ref;
    _ref = $("#demo_widget").serializeArray();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      name = field.name;
      value = field.value;
      if (name === "demo_game") slug = field.value;
      if (name === "demo_widget-type") widget_type = field.value;
      if (name === "demo_button-text") button_text = field.value;
      if (name === "demo_async") {
        snippet = async_snippet;
      } else {
        snippet = blocking_snippet;
      }
    }
    widget_code = "<a href=\"http://www.gameolith.com/game/" + slug + "/\" class=\"gameolith-demo\" data-game=\"" + slug + "\" data-widget=\"" + widget_type + "\">" + button_text + "</a>";
    $("#demo_code").val(widget_code + snippet);
    $("#demo_preview").empty();
    if (widget_type === "box") {
      $("#demo_preview").addClass("darken");
    } else {
      $("#demo_preview").removeClass("darken");
    }
    $("#demo_preview").html(widget_code);
    Gameolith.init();
    return 0;
  };

  $("#demo_widget input").blur(demo_widget_update);

  $("#demo_async").click(demo_widget_update);

  $("#demo_widget input[type='radio']").click(demo_widget_update);

  $(window).load(demo_widget_update);

}).call(this);
