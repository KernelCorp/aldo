class Brend < ActiveRecord::Base
  attr_accessible :name, :header, :text, :background

  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :products

  has_attached_file :background
end
