class Master < ActiveRecord::Base
  attr_accessible :fio, :photo, :biography

  has_attached_file :image, :styles => { :medium => "230x230#" }
end
