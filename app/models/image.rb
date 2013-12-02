class Image < ActiveRecord::Base
  attr_accessible :path

  has_attached_file :path,
                    styles: {
                      thumb:["50x50", :png],
                      art: ["230x230#", :png],
                      news: ["247x247#", :png]
                    },
                    path: ':rails_root/public/system/images/:style/:filename',
                    url: '/system/images/:style/:filename'

  has_and_belongs_to_many :news
  has_and_belongs_to_many :galleries
end