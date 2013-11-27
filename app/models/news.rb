class News < ActiveRecord::Base
  attr_accessible :body, :preview, :title

  has_and_belongs_to_many :images
end
