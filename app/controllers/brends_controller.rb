class BrendsController < ApplicationController
  def show
    @brend = Brend.find params[:id]
  end
end
