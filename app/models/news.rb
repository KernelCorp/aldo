class News < ActiveRecord::Base
  attr_accessible :title, :body, :preview

  has_and_belongs_to_many :images

  extend FriendlyId
  friendly_id :title, use: :slugged
end
