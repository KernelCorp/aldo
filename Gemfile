source 'https://rubygems.org'

gem 'rails', '~>3.2.13'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'mysql2', '>= 0.3.11'
gem "slim-rails", "~> 2.0.3"
gem 'paperclip'


gem 'devise'
gem 'cancan'
gem 'activeadmin'
gem 'russian'

gem 'simple_form'

gem 'friendly_id', '~> 4.0.10'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'
gem 'activeadmin_tinymce'

# For deploy
group :development do
  gem 'capistrano'
  gem 'rvm-capistrano'
  gem 'nginx-config'
end

# Use unicorn as the app server
gem 'unicorn', :platforms => :ruby

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'

local_gemfile = File.join(File.dirname(__FILE__), "Gemfile.local")
if File.exists?(local_gemfile)
  puts "Loading Gemfile.local ..." if $DEBUG # `ruby -d` or `bundle -v`
  instance_eval File.read(local_gemfile)
end

