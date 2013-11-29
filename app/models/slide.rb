class Slide < ActiveRecord::Base
  attr_accessible :title, :content, :href, :background

  has_attached_file :background, :styles => { :background => "x390" }
end
