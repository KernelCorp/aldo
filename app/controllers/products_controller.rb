class ProductsController < ApplicationController
  def index
    @brend = Brend.find params[:brend_id]
  end

  def show
    @product = Product.find params[:id]
  end
end
