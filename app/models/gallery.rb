class Gallery < ActiveRecord::Base
  attr_accessible :title, :images_attributes

  has_and_belongs_to_many :images

  accepts_nested_attributes_for :images, :allow_destroy => :true
end