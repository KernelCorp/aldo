class Master < ActiveRecord::Base
  attr_accessible :fio, :photo, :biography

  has_attached_file :photo, :styles => { thumbnail: '50x50#', :art => "230x230#" }

  has_and_belongs_to_many :services
end
