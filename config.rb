require 'sinatra/base'

class IMDB < Sinatra::Base
  configure do
    enable :sessions
  end

  set :root, File.dirname(__FILE__)

  use Sass::Plugin::Rack

  configure :production do
    use Rack::Static,
        urls: ['/stylesheets'],
        root: File.expand_path('../tmp', __FILE__)

    Sass::Plugin.options.merge!({
      template_location: 'public/stylesheets/sass',
      css_location: 'tmp/stylesheets'
      })
  end
end