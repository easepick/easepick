module Jekyll
  module AnchorTag
    def anchor_tag(text, group)
      id = "#{group}-#{text}"
      return "<a href=\"##{id}\" id=\"#{id}\">#{text}</a>"
    end
  end
end

Liquid::Template.register_filter(Jekyll::AnchorTag)
=begin
class AnchorTag < Liquid::Tag
  def initialize(tag_name, markup, parse_context)
    super
    @input = input
    puts input;
    puts tokens;
  end

  def render(context)
    output =  "<span id=\"#{@input}\">#{@input}</span>"

    return output;
  end
end
Liquid::Template.register_tag('anchor_tag', AnchorTag)
=end