class Press < ActiveRecord::Base
  attr_accessible :title, :image, :document
  
  has_attached_file :document

  has_attached_file :image, :styles => { :medium => "230x230#" }
end