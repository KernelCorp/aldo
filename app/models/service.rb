class Service < ActiveRecord::Base
  attr_accessible :name, :description, :background

  has_and_belongs_to_many :masters

  has_attached_file :background

  extend FriendlyId
  friendly_id :name, use: :slugged
end
