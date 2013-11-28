class ArtsController < ApplicationController
  def index
  end

  def show
    gallery = GalleryArt.find params[:id]
    render locals: { gallery: gallery }
  end
end