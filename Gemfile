source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# Ruby 4.0 compatibility - these gems were removed from stdlib
gem "csv"
gem "base64"
gem "bigdecimal"

# Windows timezone data
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Use Jekyll directly instead of github-pages for Ruby 4.0 compatibility
gem "jekyll", "~> 4.3"

# gem "github-pages", group: :jekyll_plugins  # Disabled - incompatible with Ruby 4.0

# gem "wdm", "~> 0.1.0" if Gem.win_platform?  # Disabled - incompatible with Ruby 4.0

# If you have any plugins, put them here!
group :jekyll_plugins do
  # gem "jekyll-archives"
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-gist"
  gem "jekyll-redirect-from"
  gem "jekyll-remote-theme"
  gem "jekyll-include-cache"
  gem "jekyll-seo-tag"
  gem "faraday-retry"
  # gem 'hawkins'  # Disabled - incompatible with Jekyll 4, use --livereload instead
end
