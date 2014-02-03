class ServicesController < ApplicationController
  def index
  end

  def show
    @service = Service.find params[:id]
  end
end
