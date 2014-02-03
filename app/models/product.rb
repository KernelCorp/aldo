class Product < ActiveRecord::Base
  attr_accessible :name, :text, :background, :brend_id

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :brend

  has_attached_file :background
end
