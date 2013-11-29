class Master < ActiveRecord::Base
  attr_accessible :fio, :photo, :biography

  has_attached_file :photo, :styles => { :art => "230x230#" }
end
