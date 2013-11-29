# encoding: UTF-8

class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.string :title
    end

    add_index :galleries, :title, unique: true
  end
end
