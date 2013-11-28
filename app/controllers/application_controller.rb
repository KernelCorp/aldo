class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter proc { |controller| (controller.action_has_layout = false) if controller.request.xhr? }
end
