# encoding: UTF-8

class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.string :title
    end

    add_index :galleries, :title, unique: true

    Gallery.create title: 'искусство красоты'
    Gallery.create title: 'интерьер'
  end
end
