class NewsController < ApplicationController
  def index
  end

  def index_line
    render locals: { offset: Integer(params['offset']) }, layout: false
  end

  def show
    news_item = News.find params[:id]

    render locals: { news_item: news_item }
  end
end