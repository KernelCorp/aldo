# encoding: UTF-8

class SeedGaleries < ActiveRecord::Migration
  def migrate(direction)
    super
    
    if direction == :up
      Gallery.create title: 'искусство красоты'
      Gallery.create title: 'интерьер'
    end
  end
end
