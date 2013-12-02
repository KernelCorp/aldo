class Slide < ActiveRecord::Base
  attr_accessible :title, :content, :href, :background

  has_attached_file :background, :styles => { thumbnail: '50x50#', :background => "x390" }
end
