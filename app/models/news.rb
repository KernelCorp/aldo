class News < ActiveRecord::Base
  attr_accessible :title, :body, :preview, :images_attributes

  extend FriendlyId
  friendly_id :title, use: :slugged

  has_and_belongs_to_many :images

  accepts_nested_attributes_for :images, :allow_destroy => :true
end
